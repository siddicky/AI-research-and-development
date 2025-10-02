# TypeORM to Prisma Migration Guide

This template has been migrated from TypeORM to Prisma ORM. This document explains the changes and how to use the new setup.

## What Changed

### Removed
- TypeORM dependencies (`typeorm`, `@nestjs/typeorm`, `typeorm-extension`)
- TypeORM configuration files (`src/typeorm.config.ts`, `src/typeorm.integration.test.config.ts`)
- TypeORM migration scripts

### Added
- Prisma dependencies (`@prisma/client`, `prisma`)
- `prisma/schema.prisma` - Database schema definition
- `src/@nestjs-prisma-singleton.ts` - PrismaService singleton
- `prisma/seed.ts` - Database seeding template
- Prisma CLI scripts in package.json

## How to Use Prisma

### 1. Set Up Your Database Connection

Configure the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/db-template?schema=public"
```

### 2. Define Your Database Schema

Edit `prisma/schema.prisma` to add your models:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3. Generate Prisma Client

After defining your schema, generate the Prisma Client:

```bash
pnpm run prisma:generate
```

### 4. Create and Apply Migrations

Create a migration for your schema changes:

```bash
pnpm run prisma:migrate
# You'll be prompted to name your migration
```

### 5. Use PrismaService in Your Code

Inject `PrismaService` into your services:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/@nestjs-prisma-singleton';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: { email: string; name?: string }) {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: { name?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

## Available Scripts

```bash
# Generate Prisma Client (run after schema changes)
pnpm run prisma:generate

# Create and apply migrations
pnpm run prisma:migrate

# Apply migrations in production
pnpm run prisma:migrate:deploy

# Open Prisma Studio (database GUI)
pnpm run prisma:studio

# Seed the database
pnpm run prisma:seed
```

## Key Differences from TypeORM

| Feature | TypeORM | Prisma |
|---------|---------|--------|
| Schema Definition | Decorators in TypeScript classes | Declarative schema in `schema.prisma` |
| Query Building | Repository pattern or QueryBuilder | Type-safe query API |
| Migrations | CLI-generated from entities | Schema-first with `prisma migrate` |
| Database GUI | None built-in | Prisma Studio (`prisma studio`) |
| Type Safety | Good | Excellent |

## Benefits of Prisma

1. **Better Type Safety**: Prisma Client is fully type-safe based on your schema
2. **Schema-First**: Single source of truth for your database structure
3. **Developer Experience**: Auto-completion for all queries
4. **Prisma Studio**: Built-in database GUI for development
5. **Migration System**: Declarative migrations with automatic generation
6. **Performance**: Optimized queries and connection pooling

## Migration from Existing TypeORM Project

If you're migrating an existing project from TypeORM to Prisma:

1. **Create a Prisma schema from your database**:
   ```bash
   npx prisma db pull
   ```

2. **Generate Prisma Client**:
   ```bash
   pnpm run prisma:generate
   ```

3. **Update your services** to use `PrismaService` instead of TypeORM repositories

4. **Remove TypeORM imports** and replace with Prisma queries

5. **Test thoroughly** to ensure all database operations work correctly

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Migrating from TypeORM](https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-typeorm)

## Support

For issues or questions about this migration, please refer to the main repository documentation or create an issue.
