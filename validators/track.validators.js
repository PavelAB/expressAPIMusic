const yup = require('yup');

const createTrackValidator = yup.object({
    title: yup.string().max(100).trim().required(),
    duration : yup.number().integer().positive(),
    GenreId: yup.number().integer().positive(),
    albums:yup.array().of(
        yup.number().integer().positive()
    ).required(),
    artists : yup.array().of(
        yup.object({
            id : yup.number().integer().positive().required(),
            feat: yup.boolean()
        })
    ).required().min(1)
})
module.exports = createTrackValidator