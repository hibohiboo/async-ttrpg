// eslint-disable-next-line import/no-relative-packages
import { PrismaClient } from '../../generated/client';
// https://github.com/glaucia86/azure-sql-prisma-vue/blob/main/api/shared/prisma.js
export const prisma = new PrismaClient();
