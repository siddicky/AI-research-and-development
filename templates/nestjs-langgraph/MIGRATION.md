# Migration from TypeORM/PostgreSQL to Prisma/MySQL

This template has been updated to use Prisma ORM with MySQL instead of TypeORM with PostgreSQL.

## Key Changes

### 1. Dependencies
- **Removed**: `typeorm`, `@nestjs/typeorm`, `pg`, `typeorm-extension`
- **Added**: `prisma`, `@prisma/client`

### 2. Database Configuration
- **Old**: PostgreSQL on port 5434 (dev) and 5435 (test)
- **New**: MySQL on port 3306 (dev) and 3307 (test)

### 3. Database Scripts
- **Old TypeORM commands**:
  - `pnpm run migration:generate --name=<name>`
  - `pnpm run migration:run`
  - `pnpm run seed`

- **New Prisma commands**:
  - `pnpm run prisma:generate` - Generate Prisma Client
  - `pnpm run prisma:migrate --name=<name>` - Create and apply migration
  - `pnpm run prisma:studio` - Open Prisma Studio GUI
  - `pnpm run prisma:seed` - Seed database

### 4. File Structure Changes

**Removed files**:
- `src/typeorm.config.ts`
- `src/typeorm.integration.test.config.ts`

**New files**:
- `prisma/schema.prisma` - Database schema definition
- `prisma/seed.ts` - Database seeding script
- `src/infrastructure/database/prisma.service.ts` - Prisma service for DI

**Modified files**:
- `src/modules/database.module.ts` - Now exports PrismaService
- `src/test/integration/datasource.ts` - Uses PrismaClient
- `.env.example` - Updated with MySQL connection string

### 5. Environment Variables

**Old format**:
```bash
DB_HOST=localhost
DB_PORT=5434
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=db-template
```

**New format**:
```bash
DATABASE_URL="mysql://mysql:mysql@localhost:3306/db_template"
```

## Usage Examples

### Defining Models

**Old (TypeORM)**:
```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;
}
```

**New (Prisma)**:
```prisma
// In prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Using the Database

**Old (TypeORM)**:
```typescript
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/infrastructure/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }
}
```

**New (Prisma)**:
```typescript
import { PrismaService } from '@/infrastructure/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(email: string) {
    return this.prisma.user.create({
      data: { email },
    });
  }
}
```

### Migrations

**Old (TypeORM)**:
```bash
# Generate migration from entity changes
pnpm run migration:generate --name=create_users

# Run migrations
pnpm run migration:run
```

**New (Prisma)**:
```bash
# Edit prisma/schema.prisma to add your model
# Then generate and apply migration
pnpm run prisma:migrate --name=create_users

# Generate Prisma Client (do this after schema changes)
pnpm run prisma:generate
```

## Benefits of Prisma

1. **Type Safety**: Prisma Client is fully type-safe and auto-generates types from your schema
2. **Better DX**: Intuitive query API and excellent TypeScript support
3. **Visual Tools**: Prisma Studio provides a GUI for database browsing
4. **Simpler Setup**: No entity decorators or repository patterns to manage
5. **Migrations**: Declarative migrations based on schema changes

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with NestJS](https://docs.nestjs.com/recipes/prisma)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
