import { Test, TestingModule } from '@nestjs/testing';
import { AgentController } from '@/controllers/agent.controller';
import { SimpleAgentService } from '@/agents/simple-agent/simple-agent.service';

describe('AgentController', () => {
	let controller: AgentController;
	let service: SimpleAgentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AgentController],
			providers: [
				{
					provide: SimpleAgentService,
					useValue: {
						processMessage: jest.fn(),
						processConversation: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<AgentController>(AgentController);
		service = module.get<SimpleAgentService>(SimpleAgentService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('chat', () => {
		it('should return a response', async () => {
			const mockResponse = 'Hello, I am an AI assistant.';
			jest.spyOn(service, 'processMessage').mockResolvedValue(mockResponse);

			const result = await controller.chat({ message: 'Hello' });

			expect(result).toEqual({ response: mockResponse });
			expect(service.processMessage).toHaveBeenCalledWith('Hello');
		});
	});

	describe('conversation', () => {
		it('should return a response from conversation', async () => {
			const mockResponse = 'Paris is the capital of France.';
			jest.spyOn(service, 'processConversation').mockResolvedValue(
				mockResponse,
			);

			const result = await controller.conversation({
				messages: ['What is the capital of France?'],
			});

			expect(result).toEqual({ response: mockResponse });
			expect(service.processConversation).toHaveBeenCalledWith([
				'What is the capital of France?',
			]);
		});
	});
});
