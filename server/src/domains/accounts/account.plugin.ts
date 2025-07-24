import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { AccountService } from './account.service';
import { AccountQuery, CreateAccount, UpdateAccount } from './account.types';
import {
  AccountSchema,
  AccountListResponseSchema,
  AccountQuerySchema,
  AccountResponseSchema,
  CreateAccountSchema,
  ErrorSchema,
  UpdateAccountSchema,
} from './account.schemas';

interface AccountParams {
  id: string;
}

export const accountPlugin: FastifyPluginAsync = async (fastify) => {
  const accountService = new AccountService();

  fastify.get<{
    Querystring: AccountQuery;
  }>(
    '/',
    {
      schema: {
        querystring: AccountQuerySchema,
        response: {
          200: AccountListResponseSchema,
          500: ErrorSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Querystring: AccountQuery }>,
      reply: FastifyReply
    ) => {
      try {
        const result = await accountService.findAll(request.query);

        return result;
      } catch (error: any) {
        reply.status(500);
        return {
          error: 'Internal Server Error',
          message: error.message,
          statusCode: 500,
        };
      }
    }
  );

  fastify.post<{
    Body: CreateAccount;
  }>(
    '/',
    {
      schema: {
        body: CreateAccountSchema,
        response: {
          201: AccountResponseSchema,
          400: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: CreateAccount }>,
      reply: FastifyReply
    ) => {
      try {
        const account = await accountService.create(request.body);
        reply.status(201);

        return account;
      } catch (error: any) {
        if (error.message === 'Name already exists') {
          reply.status(400);

          return {
            error: 'Validation Error',
            message: error.message,
            statusCode: 400,
          };
        }

        reply.status(500);
        return {
          error: 'Internal Server Error',
          message: error.message,
          statusCode: 500,
        };
      }
    }
  );

  fastify.get<{ Params: AccountParams }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        response: {
          200: AccountResponseSchema,
          404: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const account = await accountService.findById(request.params.id);

        if (!account) {
          reply.status(404);
          return {
            error: 'Not Found',
            message: 'Account not found',
            statusCode: 404,
          };
        }

        return account;
      } catch (error: any) {
        reply.status(500);
        return {
          error: 'Internal Server Error',
          message: (error as Error).message,
          statusCode: 500,
        };
      }
    }
  );

  fastify.put<{ Params: AccountParams; Body: UpdateAccount }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        body: UpdateAccountSchema,
        response: {
          200: AccountSchema,
          404: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Params: AccountParams; Body: UpdateAccount }>,
      reply: FastifyReply
    ) => {
      try {
        const accountId = request.params.id;
        const account = await accountService.update(accountId, request.body);

        if (!account) {
          reply.status(404);

          return {
            error: 'Not Found',
            message: 'Account not found',
            statusCode: 404,
          };
        }

        return account;
      } catch (error: any) {
        reply.status(500);

        return {
          error: 'Internal Server Error',
          message: error.message,
          statusCode: 500,
        };
      }
    }
  );

  fastify.delete<{
    Params: AccountParams;
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
            },
          },
          404: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Params: AccountParams }>,
      reply: FastifyReply
    ) => {
      try {
        const accountId = request.params.id;
        const success = await accountService.delete(accountId);

        if (!success) {
          reply.status(404);
          return {
            error: 'Not Found',
            message: 'Account not found',
            statusCode: 404,
          };
        }

        return { success: true };
      } catch (error: any) {
        reply.status(500);
        return {
          error: 'Internal Server Error',
          message: error.message,
          statusCode: 500,
        };
      }
    }
  );
};
