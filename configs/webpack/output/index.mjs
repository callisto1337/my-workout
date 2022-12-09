import dotenv from 'dotenv';

dotenv.config();

const { PUBLIC_PATH } = process.env;

export default {
  publicPath: PUBLIC_PATH,
};
