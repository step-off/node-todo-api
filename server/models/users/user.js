const {db} = require('../../db/db');

const User = db.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLegth: 1
    }
});

module.exports = {User}
