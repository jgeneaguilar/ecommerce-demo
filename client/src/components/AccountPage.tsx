import React, { useEffect, useState } from 'react';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from '../api/accounts';
import { Account } from '../types/accounts';

export const AccountPage: React.FC = () => {
  const [createAccountName, setCreateAccountName] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  const [updateAccountName, setUpdateAccountName] = useState<string>('');
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await getAccounts();
      setAccounts(res.accounts);
    };

    fetchAccounts();
  }, []);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCreateAccountName(event.target.value);
  };

  const handleCreateAccount = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    console.log('Submit', createAccountName);
    try {
      const res = await createAccount({ name: createAccountName });
      setAccounts(prev => {
        const newAccounts = [...prev];
        newAccounts.push(res);
        return newAccounts;
      });
      setCreateAccountName('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAccount = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const res = await updateAccount(accountId, { name: updateAccountName });
      setAccounts(prev =>
        prev.map(account =>
          account.id === res.id ? { ...account, ...res } : account
        )
      );
      setAccountId('');
      setUpdateAccountName('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();

    try {
      const res = await deleteAccount(id);
      if (res) {
        setAccounts(prev => prev.filter(account => account.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateAccount}>
        <label className="">
          Create account
          <input
            name="name"
            className="block p-2 border border-gray-300 rounded"
            placeholder="Name of the account"
            type="text"
            value={createAccountName}
            onChange={handleNameChange}
          />
        </label>
        <button
          className="mt-2 p-2 bg-blue-600 text-white rounded"
          type="submit"
        >
          Submit
        </button>
      </form>

      <form onSubmit={handleUpdateAccount}>
        <label className="">
          Update account
          <input
            className="block p-2 border border-gray-300 rounded"
            placeholder="Account ID"
            type="text"
            value={accountId}
            onChange={e => setAccountId(e.target.value)}
          />
          <input
            className="block p-2 border border-gray-300 rounded cursor-pointer"
            placeholder="Name of the account"
            type="text"
            value={updateAccountName}
            onChange={e => setUpdateAccountName(e.target.value)}
          />
        </label>
        <button
          className="mt-2 p-2 bg-blue-600 text-white rounded cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Accounts</h2>
        <ul>
          {accounts && accounts.length > 0 ? (
            accounts.map(account => (
              <li key={account.id} className="p-2 border-b border-gray-200">
                <span className="font-medium">{account.id}</span>
                <br />
                <span className="font-medium">{account.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  (Created: {new Date(account.createdAt).toLocaleString()})
                </span>
                <br />
                <button
                  className="mt-2 p-2 bg-red-600 text-white rounded cursor-pointer"
                  onClick={e => handleDelete(e, account.id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No accounts found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};
