import { Static } from '@sinclair/typebox';
import { ErrorSchema, PaginationSchema } from '../schemas/common.schemas';

export type ErrorResponse = Static<typeof ErrorSchema>;
export type Pagination = Static<typeof PaginationSchema>;
