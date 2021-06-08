import {db} from "../index";
import {uuid} from "../../server/utils";
import {DataTypes} from "sequelize";

const FamilyDetails = db.schema.define (
    "FamilyDetails" ,
    {
        id :{
            type :DataTypes.UUID ,
            primaryKey :true ,
            allowNull :false ,
        } ,
        fatherName :{
            type :DataTypes.STRING (100) ,
            allowNull :false ,
        } ,
        fatherOccupation :{
            type :DataTypes.STRING (100) ,
            allowNull :false ,
        } ,
        motherName :{
            type :DataTypes.STRING (100) ,
            allowNull :false ,
        } ,
        motherOccupation :{
            type :DataTypes.STRING (100) ,
            allowNull :false ,
        } ,
        noOfBrothers :{
            type :DataTypes.INTEGER ,
            defaultValue :0 ,
        } ,
        noOfSisters :{
            type :DataTypes.INTEGER ,
            defaultValue :0 ,
        } ,
        familyValues :{
            type :DataTypes.ENUM ("Orthodox" , "Traditional" , "Moderate" , "Liberal") ,
        } ,
        familyStatus :{
            type :DataTypes.ENUM ('Middle Class' , 'Upper Middle Class' , 'Rich/Affluent')
        } ,
        ancestralOrigin :{
            type :DataTypes.STRING (30) ,
        } ,
    } ,
    {
        tableName :"FamilyDetails" ,
        freezeTableName :true ,
        hooks :{
            beforeValidate :function (payload: any , options) {
                payload.id = uuid ();
            } ,
        } ,
    }
);

export default FamilyDetails;
