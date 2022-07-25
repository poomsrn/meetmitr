const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personalitySchema = new Schema({
    personalityId: {
        type: String,
        required: true
    },
    personalityName: {
        type: String,
        required: true
    }
});

// export model user with UserSchema
const Personality = mongoose.model("personality", personalitySchema);
module.exports = Personality;