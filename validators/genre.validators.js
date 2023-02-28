const yup = require('yup');

const createGenreValidators = yup.object({
    name: yup.string().max(50).required()
})

module.exports = createGenreValidators