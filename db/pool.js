const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

module.exports = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
});
