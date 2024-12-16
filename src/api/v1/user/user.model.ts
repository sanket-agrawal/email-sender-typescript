import mongoose,{Schema, Document} from "mongoose";

interface IUser extends Document{
    fname : string,
    lname? : string,
    password? : string
};

const userSchema = new Schema<IUser>({
    fname : {type :String , required : true, trim : true},
    lname : {type :String, trim : true},
    password : {type :String},
});

const User = mongoose.model<IUser>("User",userSchema);

export default User;