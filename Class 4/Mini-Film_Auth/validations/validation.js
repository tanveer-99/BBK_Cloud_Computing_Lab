import joi from 'joi'

export const registerValidation = (data) => {
    const schemaValidation = joi.object({
        username: joi.string().required().min(3).max(256),
        email: joi.string().required().min(3).max(256).email(),
        password: joi.string().required().min(6).max(1024),
    })
    return schemaValidation.validate(data)
}

export const loginValidation = (data) => {
    const schemaValidation = joi.object({
        email: joi.string().required().min(3).max(256).email(),
        password: joi.string().required().min(6).max(1024),
    })
    return schemaValidation.validate(data)
}

