import User,{ IUser } from "./user.model";

export class UserService{

    private user;

    constructor(){
        this.user = User;
    }

    async createUser(userData : IUser){
        try{
            const isExisting = await this.user.findOne({
                email : userData.email
            });

            if(isExisting){
                return false;
            }

            const newUser = new this.user({
                ...userData
            });

            await newUser.save();
        }catch(error){
            console.error("Error while creating user",error);
            throw error;
        }
    }
}