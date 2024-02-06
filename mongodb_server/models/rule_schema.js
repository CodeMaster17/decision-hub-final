const mongoose = require('mongoose');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

const ifRruleItemSchema = new mongoose.Schema({

    property: {
        type: String,
        required: true,
        // Add the following line to prevent null values

    },
    operator: {
        type: String,
        required: true,

    },
    value: {
        type: Number,
        required: true,

    }
});
const thenRruleItemSchema = new mongoose.Schema({

    property: {
        type: String,
        required: true,
        // Add the following line to prevent null values


    },
    result: {
        type: String,
        required: true,

    },

});

const register_schema = new mongoose.Schema({

    email: {
        type: String,

    },
    password: {
        type: String,
    },

});

const register = mongoose.model('register', register_schema);
module.exports = register;


// const RuleSchema = mongoose.model('RuleSchema', rule_schema);

// module.exports = RuleSchema;

