import { Body, Controller, Post } from '@nestjs/common';
import { SimpleAgentService } from '@/agents/simple-agent/simple-agent.service';

interface ChatRequest {
	message: string;
}

interface ConversationRequest {
	messages: string[];
}

@Controller('agent')
export class AgentController {
	constructor(private readonly simpleAgentService: SimpleAgentService) {}

	@Post('chat')
	async chat(@Body() body: ChatRequest) {
		const response = await this.simpleAgentService.processMessage(body.message);
		return {
			response,
		};
	}

	@Post('conversation')
	async conversation(@Body() body: ConversationRequest) {
		const response = await this.simpleAgentService.processConversation(
			body.messages,
		);
		return {
			response,
		};
	}
}
