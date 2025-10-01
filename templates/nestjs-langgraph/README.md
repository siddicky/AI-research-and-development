# NestJS + LangGraphJS Template

A production-ready starter template for building AI-powered applications using **NestJS** and **LangGraphJS**. This template provides a solid foundation with best practices for integrating state-based AI agents into a scalable NestJS application.

## Features

- ✅ **NestJS Framework**: Modern, scalable Node.js framework with TypeScript
- 🤖 **LangGraphJS Integration**: State-based agent workflows with LangGraph
- 🔗 **LangChain Support**: Full LangChain ecosystem integration
- 🗄️ **PostgreSQL + TypeORM**: Database with pg-ai and pgai-vectorizer support
- 🧪 **Testing Setup**: Jest configured for E2E testing
- 📝 **TypeScript**: Strict type checking and modern TypeScript features
- 🎨 **Biome**: Fast formatter and linter
- 🐳 **Docker Compose**: PostgreSQL with TimescaleDB and Ollama

## Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0 (or npm/yarn)
- Docker and Docker Compose

## Getting Started

### 1. Clone or Copy the Template

```bash
# If in a monorepo, copy the template
cp -r templates/nestjs-langgraph my-new-project
cd my-new-project

# Or clone directly
git clone <your-repo-url> my-new-project
cd my-new-project
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# OpenAI API Key (required for LangGraph agent)
OPENAI_API_KEY=your-api-key-here

# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5434
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=db-template
```

### 4. Start PostgreSQL

```bash
docker-compose up -d
```

This will start:
- PostgreSQL with TimescaleDB (port 5434)
- PostgreSQL for testing (port 5435)
- pgai-vectorizer-worker
- Ollama (port 11434)

### 5. Run the Application

```bash
# Development mode with hot reload
pnpm run dev

# Production mode
pnpm run build
pnpm run start:prod
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── agents/                    # LangGraph agent implementations
│   └── simple-agent/         # Example simple agent
│       └── simple-agent.service.ts
├── controllers/              # API controllers
│   └── agent.controller.ts  # Agent endpoints
├── infrastructure/           # Infrastructure layer
│   ├── database/            # Database entities and migrations
│   └── seeding/             # Database seeding
├── modules/                  # NestJS modules
│   ├── app.module.ts        # Root module
│   ├── agent.module.ts      # Agent module
│   └── database.module.ts   # Database module
├── test/                     # Test utilities
└── main.ts                   # Application entry point
```

## Usage Examples

### Using the Simple Agent

The template includes a simple LangGraph agent that demonstrates:
- State management with Annotation
- Graph workflow with nodes and edges
- Integration with OpenAI chat models

**API Endpoints:**

```bash
# Single message
curl -X POST http://localhost:3000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, what can you do?"}'

# Conversation with context
curl -X POST http://localhost:3000/agent/conversation \
  -H "Content-Type: application/json" \
  -d '{"messages": ["What is the capital of France?", "What is its population?"]}'
```

### Creating a New Agent

1. Create a new agent service in `src/agents/`:

```typescript
// src/agents/my-agent/my-agent.service.ts
import { Injectable } from '@nestjs/common';
import { StateGraph, Annotation } from '@langchain/langgraph';

@Injectable()
export class MyAgentService {
  // Your agent implementation
}
```

2. Register it in a module:

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

3. Import the module in `app.module.ts`.

## Available Scripts

```bash
# Development
pnpm run dev                 # Start in watch mode

# Building
pnpm run build              # Build for production

# Testing
pnpm run test               # Run tests
pnpm run test:watch         # Run tests in watch mode
pnpm run test:cov           # Run tests with coverage

# Code Quality
pnpm run format             # Check formatting
pnpm run format:fix         # Fix formatting
pnpm run lint               # Run linter

# Database
pnpm run migration:generate --name=<migration-name>  # Generate migration
pnpm run migration:run                                # Run migrations
pnpm run seed                                         # Seed database
```

## Database & Migrations

### Creating a New Entity

1. Create entity in `src/infrastructure/database/entities/`:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
```

2. Add to database module entities array
3. Generate migration:

```bash
pnpm run migration:generate --name=create_my_entity
```

4. Run migration:

```bash
pnpm run migration:run
```

## LangGraph Examples

The template demonstrates several LangGraph patterns:

### Simple Agent
Located in `src/agents/simple-agent/`, this shows:
- Basic state management
- Single-node workflow
- OpenAI integration

### Adding Tools

To add tools to your agent:

```typescript
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';

const tools = [new TavilySearchResults({ maxResults: 3 })];
const toolNode = new ToolNode(tools);

const model = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0,
}).bindTools(tools);
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key for LangGraph | Yes | - |
| `PORT` | Application port | No | 3000 |
| `NODE_ENV` | Environment mode | No | development |
| `DB_HOST` | PostgreSQL host | No | localhost |
| `DB_PORT` | PostgreSQL port | No | 5434 |
| `DB_USERNAME` | Database username | No | postgres |
| `DB_PASSWORD` | Database password | No | postgres |
| `DB_NAME` | Database name | No | db-template |

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraphjs/)
- [LangChain Documentation](https://js.langchain.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [pgai Documentation](https://github.com/timescale/pgai)

## License

MIT
