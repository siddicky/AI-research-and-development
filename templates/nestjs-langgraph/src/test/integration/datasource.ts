import { DataSource } from 'typeorm';

type TestConfig = {
	port: number;
	database: string;
};

export const testConfig: TestConfig = {
	port: 5435,
	database: 'db-template-test',
};

export const dataSourceIntegrationTest = new DataSource({
	type: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'postgres',
	entities: [],
	...(process.env.NODE_ENV === 'test' ? testConfig : {}),
});
