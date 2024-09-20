import bcrypt from 'bcrypt';
import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";

export const signup = async (payload) => { 
    const { email, password } = payload;
    const user = await UsersCollection.findOne({ email });
    if (user) {
        throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await UsersCollection.create({...payload, password: hashedPassword});
    delete data._doc.password;

    return data;
};
