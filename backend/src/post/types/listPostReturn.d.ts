import { getPostReturn } from './getPostReturn';

export type listPostReturn = Omit<getPostReturn, 'comments'>[];
