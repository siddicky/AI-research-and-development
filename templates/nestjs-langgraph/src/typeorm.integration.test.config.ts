import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5435,
	username: 'postgres',
	password: 'postgres',
	database: 'db-template-test',
	entities: [],
	synchronize: false,
	migrations: ['src/infrastructure/database/migrations/*.ts'],
	migrationsRun: false,
});

export default AppDataSource;
