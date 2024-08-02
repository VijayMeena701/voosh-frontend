import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

class Status extends Model {
    [x: string]: any;
    public id!: number;
    public name!: string;
}

Status.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Status',
});

export { Status };
