import mongoose,{Schema, Document} from "mongoose";
import { ICompany } from "../company/company.model";

export interface IUser extends Document{
    fname : string,
    lname? : string,
    password? : string,
    email : string,
    company? : ICompany | mongoose.Types.ObjectId,
    isActive : boolean,
    isDeleted : boolean,
    isMailed : boolean,
    isFollowedUp : boolean,
    
};

const userSchema = new Schema<IUser>({
    fname : {type :String , required : true, trim : true},
    lname : {type :String, trim : true},
    password : {type :String},
    email : {type : String, trim: true, unique : true},
    company : {type : mongoose.Types.ObjectId, ref : "Company"},
    isActive : {type : Boolean , default : true},
    isDeleted : {type : Boolean, default : false},
    isMailed : {type : Boolean, default : true},
    isFollowedUp : {type : Boolean, default : false}
});

const User = mongoose.model<IUser>("User",userSchema);

export default User;