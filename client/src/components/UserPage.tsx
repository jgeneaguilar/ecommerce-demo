import React, { useEffect, useState } from 'react';
import { createUser, deleteUser, getUsers, updateUser } from '../api/users';
import { User } from '@project/shared';

export const UserPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [updateUsername, setUpdateUsername] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUsers(res.users);
    };

    fetchUsers();
  }, []);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.target.value);
  };

  const handleCreateUser = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    console.log('Submit', username);
    try {
      const res = await createUser({ name: username });
      setUsers(prev => {
        const newUsers = [...prev];
        newUsers.push(res);
        return newUsers;
      });
      setUsername('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const res = await updateUser(userId, { name: updateUsername });
      setUsers(prev =>
        prev.map(user => (user.id === res.id ? { ...user, ...res } : user))
      );
      setUserId('');
      setUpdateUsername('');
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
      const res = await deleteUser(id);
      if (res) {
        setUsers(prev => prev.filter(user => user.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleCreateUser}>
        <label className="">
          Create user
          <input
            name="name"
            className="block p-2 border border-gray-300 rounded"
            placeholder="Name of the user"
            type="text"
            value={username}
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

      <form onSubmit={handleUpdateUser}>
        <label className="">
          Update user
          <input
            className="block p-2 border border-gray-300 rounded"
            placeholder="User ID"
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
          <input
            className="block p-2 border border-gray-300 rounded cursor-pointer"
            placeholder="New name"
            type="text"
            value={updateUsername}
            onChange={e => setUpdateUsername(e.target.value)}
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
        <h2 className="text-lg font-semibold mt-6 mb-2">User List</h2>
        <ul>
          {users && users.length > 0 ? (
            users.map(user => (
              <li key={user.id} className="p-2 border-b border-gray-200">
                <span className="font-medium">{user.id}</span>
                <br />
                <span className="font-medium">{user.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  (Created: {new Date(user.createdAt).toLocaleString()})
                </span>
                <br />
                <button
                  className="mt-2 p-2 bg-red-600 text-white rounded cursor-pointer"
                  onClick={e => handleDelete(e, user.id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No users found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};
