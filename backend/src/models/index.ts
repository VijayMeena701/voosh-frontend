import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class Status extends Model {
    [x: string]: any;
    public id!: number;
    public name!: string;
}

export class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public createdAt!: Date;
    public statusId!: number;
}

Status.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Status',
        timestamps: false
    }
);

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        statusId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Task',
        timestamps: false
    }
);

Status.hasMany(Task, { foreignKey: 'statusId' });
Task.belongsTo(Status, { foreignKey: 'statusId' });
