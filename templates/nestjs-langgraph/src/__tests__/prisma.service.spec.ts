import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/@nestjs-prisma-singleton';

describe('PrismaService', () => {
	let service: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService],
		}).compile();

		service = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should extend PrismaClient', () => {
		expect(service.$connect).toBeDefined();
		expect(service.$disconnect).toBeDefined();
	});

	it('should have lifecycle hooks', () => {
		expect(service.onModuleInit).toBeDefined();
		expect(service.onModuleDestroy).toBeDefined();
	});
});
