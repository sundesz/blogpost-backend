import crypto from 'crypto';
import { Seeder } from '..';

const seedUsers = [
  {
    user_id: crypto.randomUUID(),
    name: 'admin',
    email: 'admin@admin.com',
    role: 'admin',
    password_hash:
      '$2a$12$ZBeEeJK/vnt.h9CG.1KIv.URtwNZOR4Ip1BwjEGOIC.No9padVSTa', //admin
  },
];

export const up: Seeder = async ({
  context: queryInterface,
}): Promise<void> => {
  await queryInterface.bulkInsert('users', seedUsers);
};

export const down: Seeder = async ({
  context: queryInterface,
}): Promise<void> => {
  await queryInterface.bulkDelete('users', {
    user_id: seedUsers.map((u) => u.user_id),
  });
};
