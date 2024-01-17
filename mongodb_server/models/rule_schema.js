const mongoose = require('mongoose')
const validator = require('validator')

const rule_schema = new mongoose.Schema({
    id: string,
    name: {
        type: string,
        required: false,
        unique: false
    },
    datecreated: Date,
    descriptiopn: {
        type: string,
        required: false,
        unique: false
    },
    connectedBy: string,
    ruleSchema: {
        property: {
            type: string,
            required: true,
            unique: true,

        },
        operator: {
            type: string,
            required: true,
            unique: true,

        },
        value: {
            type: number,
            required: true,
            unique: true
        }
    }
})

const RuleSchema = mongoose.model('RuleSchema', rule_schema)

module.exports = RuleSchema