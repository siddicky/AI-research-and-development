import { Injectable } from '@nestjs/common';
import { Annotation, StateGraph } from '@langchain/langgraph';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

/**
 * A simple LangGraph agent service that demonstrates:
 * - State management with Annotation
 * - Graph workflow with nodes and edges
 * - Integration with OpenAI chat models
 *
 * This is a basic example that can be extended for more complex use cases.
 */

// Define the state structure for the agent
const AgentStateAnnotation = Annotation.Root({
	messages: Annotation<(HumanMessage | AIMessage)[]>({
		reducer: (current, update) => [...current, ...update],
		default: () => [],
	}),
});

@Injectable()
export class SimpleAgentService {
	private model: ChatOpenAI;
	private graph: any;

	constructor() {
		// Initialize the OpenAI model
		this.model = new ChatOpenAI({
			modelName: 'gpt-4o-mini',
			temperature: 0,
		});

		// Build the agent graph
		this.graph = this.buildGraph();
	}

	/**
	 * Build the state graph for the agent
	 */
	private buildGraph() {
		// Node that calls the model
		const callModel = async (state: typeof AgentStateAnnotation.State) => {
			const response = await this.model.invoke(state.messages);
			return { messages: [response] };
		};

		// Create and compile the graph
		const workflow = new StateGraph(AgentStateAnnotation)
			.addNode('agent', callModel)
			.addEdge('__start__', 'agent')
			.addEdge('agent', '__end__');

		return workflow.compile();
	}

	/**
	 * Process a message through the agent
	 * @param message - The user's message
	 * @returns The agent's response
	 */
	async processMessage(message: string): Promise<string> {
		const result = await this.graph.invoke({
			messages: [new HumanMessage(message)],
		});

		const lastMessage = result.messages[result.messages.length - 1];
		return lastMessage.content;
	}

	/**
	 * Process a conversation with context
	 * @param messages - Array of message strings
	 * @returns The agent's response
	 */
	async processConversation(messages: string[]): Promise<string> {
		const humanMessages = messages.map((msg) => new HumanMessage(msg));

		const result = await this.graph.invoke({
			messages: humanMessages,
		});

		const lastMessage = result.messages[result.messages.length - 1];
		return lastMessage.content;
	}
}
