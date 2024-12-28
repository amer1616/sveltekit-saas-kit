import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name'),
	image: text('image'),
	email: text('email').unique(),

	credits: integer('credits').default(10)
});
