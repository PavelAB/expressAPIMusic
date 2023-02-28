const yup = require('yup')

const createAlbumValidators = yup.object({
    title: yup.string().max(50).required().trim(),
    cover: yup.string().trim()
})
module.exports = createAlbumValidators;