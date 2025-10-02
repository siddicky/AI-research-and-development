import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5434,
	username: 'postgres',
	password: 'postgres',
	database: 'db-template',
	entities: [],
	migrations: ['src/infrastructure/database/migrations/*.ts'],
	// logging: true,
});

export default AppDataSource;
