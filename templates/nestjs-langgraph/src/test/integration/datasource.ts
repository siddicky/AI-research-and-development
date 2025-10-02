import { PrismaClient } from '@prisma/client';

type TestConfig = {
	port: number;
	database: string;
};

export const testConfig: TestConfig = {
	port: 5435,
	database: 'db-template-test',
};

export const prismaClientIntegrationTest = new PrismaClient({
	datasources: {
		db: {
			url: `postgresql://postgres:postgres@localhost:${testConfig.port}/${testConfig.database}`,
		},
	},
	log: process.env.NODE_ENV === 'test' ? ['error'] : ['query', 'error', 'warn'],
});
