# Using the NestJS + LangGraphJS Template

This guide explains how to use this template to create a new AI-powered application.

## Quick Start

### Option 1: Copy the Template (Within Monorepo)

If you're working within the AI Research and Development monorepo:

```bash
# From the root of the monorepo
cp -r templates/nestjs-langgraph apps/my-new-app
cd apps/my-new-app

# Update the package.json name
# Edit package.json and change "name": "nestjs-langgraph-template" to your app name

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start database
docker-compose up -d

# Run the app
pnpm run dev
```

### Option 2: Create Standalone Project

To use this template as a standalone project outside the monorepo:

```bash
# Copy the template to a new location
cp -r templates/nestjs-langgraph ~/my-new-project
cd ~/my-new-project

# Remove monorepo-specific files (if any)
rm pnpm-workspace.yaml turbo.json 2>/dev/null || true

# Update package.json
# Edit package.json and customize name, description, author

# Initialize git
git init
git add .
git commit -m "Initial commit from template"

# Install dependencies
npm install  # or pnpm install

# Set up environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start database
docker-compose up -d

# Run the app
npm run dev  # or pnpm run dev
```

## Customizing Your Project

### 1. Update Project Metadata

Edit `package.json`:
- Change `"name"` to your project name
- Update `"description"` with your project description
- Add your name to `"author"`
- Update `"license"` if needed

### 2. Configure Database

The template uses PostgreSQL with Prisma ORM. Update these files if you need different settings:

- `docker-compose.yml` - Database ports, volumes, names
- `prisma/schema.prisma` - Prisma schema and database configuration
- `.env` - Runtime database configuration (DATABASE_URL)

### 3. Add Your AI Agents

Create new agent services in `src/agents/`:

```bash
mkdir -p src/agents/my-agent
```

Create your agent service:

```typescript
// src/agents/my-agent/my-agent.service.ts
import { Injectable } from '@nestjs/common';
import { StateGraph, Annotation } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class MyAgentService {
  private graph: any;

  constructor() {
    this.graph = this.buildGraph();
  }

  private buildGraph() {
    // Your agent implementation
  }

  async execute(input: string): Promise<string> {
    // Your execution logic
  }
}
```

Register your agent in a module:

```typescript
// src/modules/my-agent.module.ts
import { Module } from '@nestjs/common';
import { MyAgentService } from '@/agents/my-agent/my-agent.service';

@Module({
  providers: [MyAgentService],
  exports: [MyAgentService],
})
export class MyAgentModule {}
```

Add to `app.module.ts`:

```typescript
import { MyAgentModule } from '@/modules/my-agent.module';

@Module({
  imports: [MyAgentModule, DatabaseModule],
})
export class AppModule {}
```

### 4. Add Controllers and Endpoints

Create controllers in `src/controllers/`:

```typescript
// src/controllers/my-controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MyAgentService } from '@/agents/my-agent/my-agent.service';

@Controller('my-endpoint')
export class MyController {
  constructor(private readonly myAgentService: MyAgentService) {}

  @Post()
  async execute(@Body() body: any) {
    return await this.myAgentService.execute(body.input);
  }
}
```

### 5. Add Database Models

If you need to store data:

1. Add a model to `prisma/schema.prisma`:

```prisma
model MyEntity {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("my_entities")
}
```

2. Generate Prisma Client:

```bash
pnpm run prisma:generate
```

3. Create and apply migration:

```bash
pnpm run prisma:migrate
```

4. Use in your service:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/@nestjs-prisma-singleton';

@Injectable()
export class MyService {
  constructor(private prisma: PrismaService) {}
  
  async findAll() {
    return this.prisma.myEntity.findMany();
  }
  
  async create(data: { name: string }) {
    return this.prisma.myEntity.create({ data });
  }
}
```

## Testing Your Application

### Unit Tests

Run the included Jest tests:

```bash
pnpm run test
pnpm run test:watch  # Watch mode
pnpm run test:cov    # With coverage
```

Add tests for your new features in `__tests__` directories:

```typescript
// src/controllers/__tests__/my-controller.spec.ts
import { Test } from '@nestjs/testing';
import { MyController } from '@/controllers/my-controller';
import { MyAgentService } from '@/agents/my-agent/my-agent.service';

describe('MyController', () => {
  let controller: MyController;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MyController],
      providers: [
        {
          provide: MyAgentService,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<MyController>(MyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

### Manual Testing

Test the agent endpoint:

```bash
# Start the application
pnpm run dev

# In another terminal, test the endpoint
curl -X POST http://localhost:3000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, what can you do?"}'
```

## Deploying Your Application

### Production Build

```bash
# Build
pnpm run build

# Run in production
pnpm run start:prod
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

Build and run:

```bash
docker build -t my-app .
docker run -p 3000:3000 --env-file .env my-app
```

## Best Practices

1. **Environment Variables**: Never commit `.env` files. Use `.env.example` as a template.

2. **API Keys**: Store sensitive keys in environment variables, never in code.

3. **Database Migrations**: Always generate migrations for schema changes using Prisma. Never modify the database schema directly.

4. **Error Handling**: Add proper error handling in your agents and controllers.

5. **Logging**: Use NestJS built-in logger for consistent logging.

6. **Testing**: Write tests for your agents and controllers.

7. **Code Quality**: Run linting and formatting before commits:
   ```bash
   pnpm run format:fix
   pnpm run lint
   ```

## Common Issues

### Issue: "Module not found" errors

**Solution**: Check your TypeScript path aliases in `tsconfig.json` match your import statements.

### Issue: Database connection fails

**Solution**: Ensure Docker Compose is running (`docker-compose up -d`) and check `.env` settings.

### Issue: OpenAI API errors

**Solution**: Verify your `OPENAI_API_KEY` in `.env` is valid and has sufficient credits.

### Issue: Port already in use

**Solution**: Change the `PORT` in `.env` or stop the process using the port.

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraphjs/)
- [Prisma Documentation](https://www.prisma.io/docs)

## Support

For issues specific to this template, check the main repository documentation or create an issue.
