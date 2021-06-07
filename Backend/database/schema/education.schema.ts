import {DataTypes} from "sequelize";
import {v4} from "uuid";
import {db} from "..";

const uuid = v4;

const Education = db.schema.define (
    "Educations" ,
    {
        id :{
            type :DataTypes.UUID ,
            allowNull :false ,
            primaryKey :true ,
        } ,
        type :{
            type :DataTypes.STRING ,
            allowNull :false ,
        } ,
        degree :{
            type :DataTypes.STRING ,
            allowNull :false ,
        } ,
        institutionName :{
            type :DataTypes.STRING (120) ,
            allowNull :false ,
        } ,
        specializationIn :{
            type :DataTypes.STRING (100) ,
            allowNull :false ,
        } ,
        passoutYear :{
            type :DataTypes.STRING (4) ,
            allowNull :false ,
        } ,
        interestInSettlingAboard :{
            type :DataTypes.BOOLEAN
        }
    } ,
    {
        freezeTableName :true ,
        tableName :"Educations" ,
        indexes :[{fields :["type" , "degree"] , using :"HASH"}] ,
        hooks :{
            beforeValidate :function (education , options) {
                (education as any).id = uuid ();
            } ,
        } ,
    }
);

export default Education;
