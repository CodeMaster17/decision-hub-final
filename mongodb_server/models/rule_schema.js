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

const rule_schema = new mongoose.Schema({

    name: {
        type: String,
        required: false,
        unique: false
    },

    description: {
        type: String,
        required: false,
        unique: false
    },
    connectedBy: String,
    ifRuleSchema: [ifRruleItemSchema],
    thenRuleSchema: [thenRruleItemSchema],
});

const RuleSchema = mongoose.model('RuleSchema', rule_schema);

module.exports = RuleSchema;
