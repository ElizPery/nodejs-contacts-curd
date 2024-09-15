import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        const validateError = createHttpError(400, 'Invalid id request');
        next(validateError);
    };

    next();
};

export default isValidId;