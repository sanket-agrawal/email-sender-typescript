import mongoose, {Schema, Document} from "mongoose";

export interface ICompany extends Document{
    name : string,
    email? : string,
    website? : string,
    careerPage? : string,
    contact? : string,
    location? : string,
    isApplied : boolean,
    isActive : boolean,
    isDeleted : boolean
};

const companySchema = new Schema<ICompany>({
    name : String,
    email : String,
    website : String,
    careerPage : String,
    contact : String,
    location : String,
    isApplied : {
        type : Boolean,
        default : true
    },
    isActive : {
        type : Boolean,
        default : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
});

const Company = mongoose.model<ICompany>("Company",companySchema);

export default Company;