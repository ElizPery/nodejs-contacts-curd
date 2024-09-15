import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';

export const createContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20).email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList).required()
});