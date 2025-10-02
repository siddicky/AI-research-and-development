# Quick Start Guide

Get your NestJS + LangGraphJS application running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- OpenAI API key (get one at https://platform.openai.com/api-keys)

## Steps

### 1. Copy the Template

```bash
# If using within monorepo
cp -r templates/nestjs-langgraph apps/my-app
cd apps/my-app

# If creating standalone project
cp -r templates/nestjs-langgraph ~/my-app
cd ~/my-app
```

### 2. Install Dependencies

```bash
pnpm install
# or: npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-key-here
```

### 4. Start Database

```bash
docker-compose up -d
```

Wait a few seconds for PostgreSQL to start.

### 5. Run the Application

```bash
pnpm run dev
# or: npm run dev
```

### 6. Test It!

The application is now running on `http://localhost:3000`.

Test the agent endpoint:

```bash
curl -X POST http://localhost:3000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! What can you help me with?"}'
```

You should get a response from the AI agent!

## What's Next?

1. **Explore the Code**: Check out `src/agents/simple-agent/simple-agent.service.ts` to see how the LangGraph agent is implemented.

2. **Add Your Own Agent**: Create a new agent in `src/agents/` based on the simple agent example.

3. **Read the Docs**: See `README.md` for full documentation and `USAGE.md` for detailed customization instructions.

4. **Add Database Models**: If you need to store data, follow the Prisma instructions in the README.

## Troubleshooting

**Port 3000 already in use?**
Change the `PORT` in your `.env` file.

**Database connection error?**
Make sure Docker Compose is running: `docker-compose ps`

**OpenAI API error?**
Verify your API key is correct in `.env` and you have credits available.

**Module not found errors?**
Run `pnpm install` again and restart the dev server.

## Commands Cheat Sheet

```bash
# Development
pnpm run dev              # Start with hot reload
pnpm run build            # Build for production
pnpm run start:prod       # Run production build

# Code Quality
pnpm run format           # Check formatting
pnpm run format:fix       # Fix formatting
pnpm run lint             # Run linter

# Testing
pnpm run test             # Run tests
pnpm run test:watch       # Run tests in watch mode

# Database
docker-compose up -d      # Start database
docker-compose down       # Stop database
pnpm run prisma:generate  # Generate Prisma Client
pnpm run prisma:migrate   # Create and apply migrations
pnpm run prisma:studio    # Open Prisma Studio GUI
```

Happy coding! 🚀
