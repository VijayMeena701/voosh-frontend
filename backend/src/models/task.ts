import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { User } from './user';
import { Status } from './status';

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public createdAt!: Date;
    public userId!: number;
    public statusId!: number;
}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Task',
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

Status.hasMany(Task, { foreignKey: 'statusId' });
Task.belongsTo(Status, { foreignKey: 'statusId' });

export { Task };
