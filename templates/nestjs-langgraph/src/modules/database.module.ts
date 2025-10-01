import { testConfig } from '@/test/integration/datasource';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5434,
			username: 'postgres',
			password: 'postgres',
			database: 'db-template',
			entities: [],
			synchronize: false,
			logging: false,
			...(process.env.NODE_ENV === 'test' ? testConfig : {}),
		}),
	],
})
export class DatabaseModule {}

