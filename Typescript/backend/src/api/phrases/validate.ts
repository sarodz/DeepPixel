import * as Joi from 'joi';

export default {
    create: {
        payload: {
            content: Joi.string().required(),
        },
    },
    getById: {
        params: {
            id: Joi.string().required(),
        },
    },
    deleteById: {
        params: {
            id: Joi.string().required(),
        },
    },
};
