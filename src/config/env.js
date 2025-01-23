import { config } from 'dotenv';

config()

export const env = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI
}
