import {DataTypes} from "sequelize";
import {v4} from "uuid";
import {db} from "..";

const uuid = v4;

const User = db.schema.define (
    "Users" ,
    {
        id :{
            type :DataTypes.UUID ,
            allowNull :false ,
            primaryKey :true ,
        } ,
        fullname :{
            type :DataTypes.STRING (25) ,
        } ,
        dateOfBirth :{
            type :DataTypes.DATEONLY ,
        } ,
        age :{
            type :DataTypes.SMALLINT ,
        } ,
        gender :{
            type :DataTypes.ENUM ("Male" , "Female" , "Shemale") ,
        } ,
        phoneNumber :{
            type :DataTypes.STRING ,
            allowNull :false ,
            unique :true ,
        } ,
        email :{
            type :DataTypes.STRING ,
            unique :true ,
        } ,
        password :{
            type :DataTypes.STRING(150),
        } ,
        martialStatus :{
            type :DataTypes.ENUM (
                "Single" ,
                "Widowed" ,
                "Marriage" ,
                "Divorced" ,
                "Separated"
            ) ,
            defaultValue :"Single" ,
        } ,
        motherTongue :{
            type :DataTypes.STRING ,
        } ,
        isCasteBarrier :{
            type :DataTypes.BOOLEAN ,
            allowNull :false ,
            defaultValue :false ,
        } ,
        fathersName :{
            type :DataTypes.STRING ,
        } ,
        mothersName :{
            type :DataTypes.STRING ,
        } ,
        accountActive :{
            type :DataTypes.BOOLEAN ,
            defaultValue :true ,
        } ,
    } ,
    {
        freezeTableName :true ,
        tableName :"Users" ,
        indexes :[
            {fields :["age"]} ,
            {fields :["email" , "phoneNumber"]} ,
            {fields :["fullname"]} ,
            {fields :["martialStatus"]} ,
        ] ,
        hooks :{
            beforeValidate :function (payload: any , options: any) {
                payload.id = uuid ();
            }
        }
    }
);

export default User;
