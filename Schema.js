const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string()
            .required()
            .min(3)
            .max(100)
            .messages({
                'string.empty': 'Title cannot be empty',
                'string.min': 'Title should have at least {#limit} characters',
                'string.max': 'Title cannot exceed {#limit} characters',
                'any.required': 'Title is required'
            }),

        description: Joi.string()
            .required()
            .min(10)
            .max(1000)
            .messages({
                'string.empty': 'Description cannot be empty',
                'string.min': 'Description should have at least {#limit} characters',
                'string.max': 'Description cannot exceed {#limit} characters',
                'any.required': 'Description is required'
            }),

        location: Joi.string()
            .required()
            .min(3)
            .max(100)
            .messages({
                'string.empty': 'Location cannot be empty',
                'string.min': 'Location should have at least {#limit} characters',
                'string.max': 'Location cannot exceed {#limit} characters',
                'any.required': 'Location is required'
            }),

        price: Joi.number()
            .required()
            .min(0)
            .max(999999)
            .messages({
                'number.base': 'Price must be a number',
                'number.min': 'Price cannot be negative',
                'number.max': 'Price cannot exceed {#limit}',
                'any.required': 'Price is required'
            }),

        image: Joi.string()
            .required()
            .uri()
            .messages({
                'string.empty': 'Image URL cannot be empty',
                'string.uri': 'Image URL must be a valid URL',
                'any.required': 'Image URL is required'
            })
    }).required()
});
const ReviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string()
            .required(),
        rating: Joi.number()
            .required()
            .min(1)
            .max(5)
    }).required()
});

module.exports = {
    listingSchema,ReviewSchema
};
