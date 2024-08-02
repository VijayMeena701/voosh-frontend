import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'Vijay84529@',
    database: 'task_manager',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});