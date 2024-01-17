const mongoose = require('mongoose');
const validator = require('validator');

const ifRruleItemSchema = new mongoose.Schema({
    property: {
        type: String,
        required: true,
        unique: false
    },
    operator: {
        type: String,
        required: true,
        unique: false
    },
    value: {
        type: Number,
        required: true,
        unique: false
    }
});
const thenRruleItemSchema = new mongoose.Schema({
    property: {
        type: String,
        required: true,
        unique: false
    },
    result: {
        type: String,
        required: true,
        unique: false
    },

});

const rule_schema = new mongoose.Schema({

    name: {
        type: String,
        required: false,
        unique: false
    },
    datecreated: Date,
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
