#! /usr/bin/env node
const { Client } = require("pg");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const SQL = `
INSERT INTO messages (avatar, title, text, username, created_at)
VALUES
  ('female', 'Hi', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?', 'Amando', '2024-09-27 12:00:00'),
  ('male', 'hey', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?', 'Charles', '2024-09-27 12:00:00'),
  ('female', 'Hi twice', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?', 'Amando', '2024-09-27 12:00:00');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
