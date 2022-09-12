import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = Number(process.env.PORT);

export const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const DATABASE = path.join(__dirname, "../../../", process.env.DATABASE);
