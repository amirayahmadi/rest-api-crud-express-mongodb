const joi = require('@hapi/joi')

const CreateUserValidation = data => {
    const schema = joi.object({
        username: joi
            .string()
            .min(3)
            .max(20)
            .required()
        ,
        email: joi
            .string()
            .required()
            .email()
        ,
        password: joi
            .string()
            .min(6)
            .alphanum()
            .required()
        ,
        phone: joi
            .string().length(8).pattern(/^[0-9]+$/).required()
        ,
        address: joi
            .string()
            .required()
        ,
        zip_code: joi
            .number()
        ,
        role: joi
            .string()
            .required()
            .valid('admin', 'client', 'livreur')
    })

    return schema.validate(data, { abortEarly: false })
}

module.exports = {
    CreateUserValidation
}