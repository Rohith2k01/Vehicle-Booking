import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_USER, DB_PASS } from './config.js';

const sequelize = new Sequelize(DB_NAME, DB_USER, String(DB_PASS), {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false
});

export default sequelize;
