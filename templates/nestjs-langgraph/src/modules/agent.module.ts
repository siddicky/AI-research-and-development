import { Module } from '@nestjs/common';
import { SimpleAgentService } from '@/agents/simple-agent/simple-agent.service';
import { AgentController } from '@/controllers/agent.controller';

@Module({
	controllers: [AgentController],
	providers: [SimpleAgentService],
	exports: [SimpleAgentService],
})
export class AgentModule {}
