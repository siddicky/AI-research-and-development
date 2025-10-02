import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting database seed...');

	// Add your seed data here
	// Example:
	// const user = await prisma.user.create({
	//   data: {
	//     email: 'admin@example.com',
	//     name: 'Admin User',
	//   },
	// });
	// console.log('Created user:', user);

	console.log('Database seed completed!');
}

main()
	.catch((e) => {
		console.error('Error during seeding:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
