const yup = require('yup');

const createArtistValidators = yup.object({
    firstname: yup.string().max(100).trim().required(),
    lastname: yup.string().max(50).trim(),
    birthdate: yup.date(),
    deathdate: yup.date()
})
module.exports = createArtistValidators;