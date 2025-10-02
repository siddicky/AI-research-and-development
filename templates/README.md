# Project Templates

This directory contains starter templates for creating new projects with specific technology stacks and best practices.

## Available Templates

### NestJS + LangGraphJS Template

**Location**: `templates/nestjs-langgraph/`

A production-ready starter template for building AI-powered applications using NestJS and LangGraphJS.

**Features:**
- ✅ NestJS framework with TypeScript
- ✅ LangGraphJS for state-based AI agents
- ✅ PostgreSQL with TypeORM and pg-ai support
- ✅ Docker Compose setup with TimescaleDB and Ollama
- ✅ Jest testing framework
- ✅ Biome for formatting and linting
- ✅ Complete example agent implementation
- ✅ Comprehensive documentation

**Quick Start:**
```bash
# Copy the template
cp -r templates/nestjs-langgraph apps/my-new-app
cd apps/my-new-app

# Install and configure
pnpm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start database and run
docker-compose up -d
pnpm run dev
```

**Documentation:**
- [README.md](nestjs-langgraph/README.md) - Comprehensive guide
- [QUICKSTART.md](nestjs-langgraph/QUICKSTART.md) - Get started in 5 minutes
- [USAGE.md](nestjs-langgraph/USAGE.md) - Detailed customization guide
- [STRUCTURE.md](nestjs-langgraph/STRUCTURE.md) - Architecture overview

**Best For:**
- Building AI chatbots and assistants
- Creating stateful AI agent applications
- Developing conversational AI systems
- Prototyping with LangChain and OpenAI

---

## Using Templates

### Option 1: Within Monorepo

Copy the template to the `apps/` directory:

```bash
cp -r templates/[template-name] apps/my-new-app
cd apps/my-new-app
pnpm install
```

### Option 2: Standalone Project

Copy the template outside the monorepo:

```bash
cp -r templates/[template-name] ~/my-new-project
cd ~/my-new-project
npm install  # or pnpm install
```

### Customization

After copying a template:

1. **Update package.json**
   - Change the `"name"` field
   - Update `"description"`, `"author"`, etc.

2. **Configure environment**
   - Copy `.env.example` to `.env`
   - Fill in required API keys and settings

3. **Review documentation**
   - Read the template's README.md
   - Follow template-specific setup instructions

## Contributing Templates

To add a new template:

1. Create a new directory in `templates/`
2. Include a comprehensive README.md
3. Add a QUICKSTART.md for rapid onboarding
4. Include .env.example with all required variables
5. Provide a working example implementation
6. Add tests that demonstrate best practices
7. Update this README with your template

### Template Requirements

Each template should include:

- [ ] README.md with features and setup instructions
- [ ] QUICKSTART.md for quick start
- [ ] .env.example with all environment variables
- [ ] .gitignore to exclude build artifacts
- [ ] package.json with appropriate scripts
- [ ] Working example code
- [ ] Test examples
- [ ] Documentation for customization

### Template Best Practices

- Keep templates minimal but complete
- Include only production-ready code
- Provide clear documentation
- Use industry best practices
- Include example tests
- Configure linting and formatting
- Add Docker configuration when appropriate
- Use TypeScript with strict settings

## Future Templates

Planned templates for future additions:

- **Express + LangChain**: Lightweight REST API with LangChain
- **Next.js + LangGraph**: Full-stack React application with AI
- **Fastify + LangGraph**: High-performance Node.js API
- **Python FastAPI + LangGraph**: Python-based AI backend

## Support

For issues with templates:
1. Check the template's README.md
2. Review the QUICKSTART.md guide
3. Check the main repository documentation
4. Open an issue in the repository

## License

Templates inherit the license from the main repository unless otherwise specified.
