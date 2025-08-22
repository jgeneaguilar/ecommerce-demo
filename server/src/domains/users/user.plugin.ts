import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from './user.service';
import {
  UserListQuery,
  CreateUser,
  UpdateUser,
  UserSchema,
  UserListResponseSchema,
  UserListQuerySchema,
  UserResponseSchema,
  CreateUserSchema,
  ErrorSchema,
  UpdateUserSchema,
} from '@project/shared';

interface UserParams {
  id: string;
}

export const userPlugin: FastifyPluginAsync = async (fastify) => {
  const userService = new UserService();

  fastify.get<{
    Querystring: UserListQuery;
  }>(
    '/',
    {
      schema: {
        querystring: UserListQuerySchema,
        response: {
          200: UserListResponseSchema,
          500: ErrorSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Querystring: UserListQuery }>,
      reply: FastifyReply
    ) => {
      try {
        const result = await userService.findAll(request.query);

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
    Body: CreateUser;
  }>(
    '/',
    {
      schema: {
        body: CreateUserSchema,
        response: {
          201: UserResponseSchema,
          400: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: CreateUser }>,
      reply: FastifyReply
    ) => {
      try {
        const user = await userService.create(request.body);
        reply.status(201);

        return user;
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

  fastify.get<{ Params: UserParams }>(
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
          200: UserResponseSchema,
          404: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const user = await userService.findById(request.params.id);

        if (!user) {
          reply.status(404);
          return {
            error: 'Not Found',
            message: 'User not found',
            statusCode: 404,
          };
        }

        return user;
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

  fastify.put<{ Params: UserParams; Body: UpdateUser }>(
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
        body: UpdateUserSchema,
        response: {
          200: UserSchema,
          404: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Params: UserParams; Body: UpdateUser }>,
      reply: FastifyReply
    ) => {
      try {
        const userid = request.params.id;
        const user = await userService.update(userid, request.body);

        if (!user) {
          reply.status(404);

          return {
            error: 'Not Found',
            message: 'User not found',
            statusCode: 404,
          };
        }

        return user;
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
    Params: UserParams;
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
      request: FastifyRequest<{ Params: UserParams }>,
      reply: FastifyReply
    ) => {
      try {
        const userid = request.params.id;
        const success = await userService.delete(userid);

        if (!success) {
          reply.status(404);
          return {
            error: 'Not Found',
            message: 'User not found',
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
