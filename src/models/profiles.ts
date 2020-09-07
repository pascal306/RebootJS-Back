import { Document, Schema, model, Model} from 'mongoose';
//import { string } from '@hapi/joi';
import {SHA256} from 'crypto-js';
export interface IProfile extends Document {
    email:string;
    lastname:string;
    firstname:string;
    getFullname: () => string;
    setPassword: (password : string) => void;
    verifPassword: (password : string) => boolean;
}

const profileSchema = new Schema({
    email: { type:String, required:true,unique:true},
    firstname:{ type: String,required:true },
    lastname: { type: String, required:true },
    password: { type: String, required: true}
});

profileSchema.methods.getFullname = function () {
    return `${this.firsname} ${this.lastname}`;
}

profileSchema.methods.setPassword = function (password: string) {
    this.password = SHA256(password).toString();

}

profileSchema.methods.verifPassword = function (password: string) : boolean{
    return this.password === SHA256(password).toString();

}
export const Profile = model<IProfile>("profile",profileSchema);

//export default Profile;

//Profiles-> .. en mongo
// mongoose creer les classes
/// new Profile({email:"...",...})
// profile.save()...

