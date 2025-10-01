# Template Structure

This document provides an overview of the NestJS + LangGraphJS template structure.

## Directory Structure

```
nestjs-langgraph/
├── src/                              # Source code
│   ├── agents/                      # LangGraph agent implementations
│   │   └── simple-agent/           # Example simple agent
│   │       └── simple-agent.service.ts
│   ├── controllers/                 # REST API controllers
│   │   ├── __tests__/              # Controller tests
│   │   │   └── agent.controller.spec.ts
│   │   └── agent.controller.ts     # Agent API endpoints
│   ├── infrastructure/              # Infrastructure layer
│   │   ├── database/               # Database-related code
│   │   │   └── migrations/         # TypeORM migrations
│   │   └── repositories/           # Data repositories
│   ├── modules/                     # NestJS modules
│   │   ├── agent.module.ts         # Agent module
│   │   ├── app.module.ts           # Root application module
│   │   └── database.module.ts      # Database configuration module
│   ├── test/                        # Test utilities
│   │   └── integration/            # Integration test config
│   │       └── datasource.ts
│   ├── main.ts                      # Application entry point
│   ├── typeorm.config.ts           # TypeORM configuration
│   └── typeorm.integration.test.config.ts
├── test-config/                     # Test configuration
│   └── jest-e2e.config.mjs         # Jest E2E config
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── QUICKSTART.md                    # Quick start guide
├── README.md                        # Main documentation
├── USAGE.md                         # Detailed usage instructions
├── biome.json                       # Biome formatter/linter config
├── docker-compose.yml               # Docker services definition
├── nest-cli.json                    # NestJS CLI configuration
├── package.json                     # Node.js dependencies
├── tsconfig.json                    # TypeScript configuration
└── tsconfig.build.json              # TypeScript build config
```

## Key Files Explained

### Configuration Files

- **package.json**: Defines project metadata, scripts, and dependencies
- **tsconfig.json**: TypeScript compiler options and path aliases
- **nest-cli.json**: NestJS CLI configuration
- **biome.json**: Code formatting and linting rules
- **docker-compose.yml**: Database and services setup

### Application Files

- **src/main.ts**: Bootstrap file that starts the NestJS application
- **src/modules/app.module.ts**: Root module that imports all other modules
- **src/modules/agent.module.ts**: Module for AI agent functionality
- **src/modules/database.module.ts**: Database connection configuration

### Agent Implementation

- **src/agents/simple-agent/simple-agent.service.ts**: Example LangGraph agent
  - Demonstrates state management with Annotation
  - Shows how to build a graph workflow
  - Integrates with OpenAI chat models

### API Layer

- **src/controllers/agent.controller.ts**: REST endpoints for the agent
  - POST /agent/chat - Single message endpoint
  - POST /agent/conversation - Multi-message endpoint

### Database

- **src/typeorm.config.ts**: Main database configuration
- **src/typeorm.integration.test.config.ts**: Test database config
- **src/infrastructure/database/migrations/**: Database schema migrations

## Technology Stack

### Core Framework
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe JavaScript
- **RxJS**: Reactive programming

### AI/ML
- **LangGraphJS**: State-based agent workflows
- **LangChain**: AI application framework
- **@langchain/openai**: OpenAI integration
- **@langchain/community**: Community tools and utilities

### Database
- **PostgreSQL**: Relational database
- **TypeORM**: Object-relational mapping
- **TimescaleDB**: Time-series database features
- **pgai**: PostgreSQL AI extensions

### Development Tools
- **Biome**: Fast formatter and linter
- **Jest**: Testing framework
- **ts-node**: TypeScript execution
- **tsx**: TypeScript execute and watch

### DevOps
- **Docker Compose**: Container orchestration
- **Ollama**: Local AI model hosting (optional)

## Module Dependencies

```
AppModule
├── AgentModule
│   └── SimpleAgentService
└── DatabaseModule
    └── TypeORM
```

## API Endpoints

### Agent Endpoints

**POST /agent/chat**
- Body: `{ "message": "string" }`
- Response: `{ "response": "string" }`
- Description: Process a single message through the agent

**POST /agent/conversation**
- Body: `{ "messages": ["string", "string", ...] }`
- Response: `{ "response": "string" }`
- Description: Process a conversation with multiple messages

## Environment Variables

Required:
- `OPENAI_API_KEY`: OpenAI API key for LangGraph

Optional:
- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment mode (default: development)
- `DB_HOST`: Database host (default: localhost)
- `DB_PORT`: Database port (default: 5434)
- `DB_USERNAME`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_NAME`: Database name (default: db-template)

## Docker Services

The template includes Docker Compose configuration for:

1. **dev**: PostgreSQL with TimescaleDB (port 5434)
2. **test**: PostgreSQL for testing (port 5435)
3. **vectorizer-worker**: pgai vectorizer worker
4. **test-vectorizer-worker**: Test vectorizer worker
5. **ollama**: Local AI model hosting (port 11434)

## Testing

- **Unit Tests**: Located in `__tests__` directories next to source files
- **E2E Tests**: Configured in `test-config/jest-e2e.config.mjs`
- **Test Command**: `pnpm run test`
- **Watch Mode**: `pnpm run test:watch`
- **Coverage**: `pnpm run test:cov`

## Building and Running

### Development
```bash
pnpm run dev          # Start with hot reload
```

### Production
```bash
pnpm run build        # Build
pnpm run start:prod   # Run production build
```

### Code Quality
```bash
pnpm run format       # Check formatting
pnpm run format:fix   # Fix formatting
pnpm run lint         # Run linter
```

## Extension Points

### Adding a New Agent

1. Create service in `src/agents/your-agent/`
2. Create module in `src/modules/your-agent.module.ts`
3. Import module in `app.module.ts`
4. Create controller if needed

### Adding Database Entities

1. Create entity in `src/infrastructure/database/entities/`
2. Add to database module entities array
3. Generate migration: `pnpm run migration:generate --name=<name>`
4. Run migration: `pnpm run migration:run`

### Adding New Endpoints

1. Create controller in `src/controllers/`
2. Add to appropriate module
3. Write tests in `__tests__` directory

## Best Practices

1. **Modules**: Keep modules focused and cohesive
2. **Services**: Business logic goes in services
3. **Controllers**: Keep controllers thin, delegate to services
4. **Agents**: Each agent in its own directory
5. **Tests**: Write tests alongside your code
6. **Migrations**: Never modify existing migrations
7. **Environment**: Use environment variables for configuration
8. **Types**: Leverage TypeScript's type system

## Getting Help

- See `README.md` for comprehensive documentation
- See `USAGE.md` for detailed usage instructions
- See `QUICKSTART.md` for quick start guide
- Check NestJS docs: https://docs.nestjs.com/
- Check LangGraph docs: https://langchain-ai.github.io/langgraphjs/
