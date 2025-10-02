import { Module, Global } from '@nestjs/common';
import { PrismaService } from '@/@nestjs-prisma-singleton';

@Global()
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class DatabaseModule {}
