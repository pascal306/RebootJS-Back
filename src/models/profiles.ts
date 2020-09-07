import { Document, Schema, model, Model} from 'mongoose';

export interface IProfile extends Document {
    email:string;
    lastname:string;
    firstname:string;
    //getFullname()
}

const profileSchema = new Schema({
    email: { type:String, required:true,unique:true},
    firstname:{ type: String,required:true },
    lastname: { type: String, required:true }
});

profileSchema.methods.getFullname = function () {
    return `${this.firsname} ${this.lastname}`;
}

export const Profile = model<IProfile>("profile",profileSchema);

//Profiles-> .. en mongo
// mongoose creer les classes
/// new Profile({email:"...",...})
// profile.save()...

