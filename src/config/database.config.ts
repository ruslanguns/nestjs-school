import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  config: createMongoURI()
}));

const createMongoURI = (): string => {
  const host = process.env.DB_HOST;
  const username = process.env.DB_USERNAME;
  const name = process.env.DB_NAME;
  const password = process.env.DB_PASSWORD;
  return `mongodb+srv://${username}:${password}@${host}/${name}`
}