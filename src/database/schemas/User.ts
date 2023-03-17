import mongoose, { Schema } from 'mongoose';

export interface User {
    id: string;
    discordId: string;
    accessToken: string;
    refreshToken: string;
}

const UserSchema = new Schema<User>({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

export default mongoose.model('users', UserSchema);
