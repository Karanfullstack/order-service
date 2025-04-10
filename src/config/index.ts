import { config } from 'dotenv';
config();

const { PORT, NODE_ENV, MONGO_URI, JWKS_URI } = process.env;

export const Config = { PORT, NODE_ENV, MONGO_URI, JWKS_URI };
