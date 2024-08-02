import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'User',
});

export { User };
