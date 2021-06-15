import {db} from "../index";
import {DataTypes} from "sequelize";
import User from "./user.schema";
import {v4} from "uuid";

const RequestReceived = db.schema.define('RequestReceived', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    senderId: {
        type : DataTypes.UUID,
        allowNull : false,
        references: {
            model: User,
            key: 'id'
        },
    },
    UserId: {
        type: DataTypes.UUID,
        allowNull : false,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    freezeTableName: true,
    tableName: 'RequestReceived',
    hooks: {
        beforeValidate(payload: any, options) {
            payload.id = v4();
        }
    }
});

export default RequestReceived;
