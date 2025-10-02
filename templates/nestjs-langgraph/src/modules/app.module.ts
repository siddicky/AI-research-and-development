import { DatabaseModule } from '@/modules/database.module';
import { AgentModule } from '@/modules/agent.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [AgentModule, DatabaseModule],
})
export class AppModule {}
