import { PrismaClient } from '@prisma/client';

type TestConfig = {
	url: string;
};

export const testConfig: TestConfig = {
	url:
		process.env.TEST_DATABASE_URL ||
		'mysql://mysql:mysql@localhost:3307/db_template_test',
};

export const dataSourceIntegrationTest = new PrismaClient({
	datasources: {
		db: {
			url: testConfig.url,
		},
	},
});
