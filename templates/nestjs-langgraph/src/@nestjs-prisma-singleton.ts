import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService is a singleton service that extends PrismaClient
 * and implements NestJS lifecycle hooks for proper connection management.
 * 
 * This service can be injected into any module that needs database access.
 * 
 * @example
 * ```typescript
 * @Injectable()
 * export class UserService {
 *   constructor(private prisma: PrismaService) {}
 *   
 *   async findAll() {
 *     return this.prisma.user.findMany();
 *   }
 * }
 * ```
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor() {
		super({
			log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
		});
	}

	/**
	 * Connect to the database when the module initializes
	 */
	async onModuleInit() {
		await this.$connect();
	}

	/**
	 * Disconnect from the database when the module is destroyed
	 */
	async onModuleDestroy() {
		await this.$disconnect();
	}
}
