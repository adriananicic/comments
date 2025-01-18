import { PrismaClient } from '@prisma/client';
import { listUsersReturn } from '../types/list-return';
import { UserDbActions } from './interface/userdbInterface';
import prisma from '../../../lib/prisma/prisma-client';

export class PrismaUserRepository implements UserDbActions {
  async listUsers(): Promise<listUsersReturn> {
    try {
      const users = prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Unexpected error while fetching users from database.');
    }
  }
}
