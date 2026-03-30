import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document{
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;