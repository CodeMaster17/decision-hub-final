const rules = require('../models/rule_schema')

exports.rulepost = async (req, res) => {
    console.log("Inside rulepost")
    const { name, description, connectedBy, ifRuleSchema, thenRuleSchema } = req.body;
    console.log("Body: ", req.body)

    // Validate ifRuleSchema and thenRuleSchema
    if (!Array.isArray(ifRuleSchema) || ifRuleSchema.length === 0) {
        return res.status(400).json({ error: "ifRuleSchema must be a non-empty array" });
    }
    if (!Array.isArray(thenRuleSchema) || thenRuleSchema.length === 0) {
        return res.status(400).json({ error: "thenRuleSchema must be a non-empty array" });
    }

    // Optional: Validate each rule in ifRuleSchema and thenRuleSchema

    try {
        // Optional: Check for existing rules based on your business logic

        // Create a new rule
        const newRule = new rules({
            name,
            description,
            connectedBy,
            ifRuleSchema,
            thenRuleSchema
        });
        // console.log("New Rule: ", newRule)

        await rules.create({
            name,
            description,
            connectedBy,
            ifRuleSchema,
            thenRuleSchema
        });
        res.status(201).json({ message: "Rule added successfully", rule: newRule });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// get all the rules
exports.getAllRules = async (req, res) => {
    try {
        const rulesData = await rules.find({}); // Fetch all rules
        res.status(200).json(rulesData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rules', error: error.message });
    }
};

// get a rule by id
exports.getRuleById = async (req, res) => {
    try {
        const rule = await rules.findById(req.params.id); // Fetch rule by id
        res.status(200).json(rule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rule', error: error.message });
    }
};

// to register user
exports.register = async (req, res) => {
    console.log("Inside register")
    const { email, password } = req.body;
    console.log("Body: ", req.body)

    // Validate ifRuleSchema and thenRuleSchema
    if (!Array.isArray(ifRuleSchema) || ifRuleSchema.length === 0) {
        return res.status(400).json({ error: "ifRuleSchema must be a non-empty array" });
    }
    if (!Array.isArray(thenRuleSchema) || thenRuleSchema.length === 0) {
        return res.status(400).json({ error: "thenRuleSchema must be a non-empty array" });
    }

    // Optional: Validate each rule in ifRuleSchema and thenRuleSchema

    try {
        // Optional: Check for existing rules based on your business logic

        // Create a new rule
        const newRule = new rules({
            name,
            description,
            connectedBy,
            ifRuleSchema,
            thenRuleSchema
        });
        // console.log("New Rule: ", newRule)

        await rules.create({
            name,
            description,
            connectedBy,
            ifRuleSchema,
            thenRuleSchema
        });
        res.status(201).json({ message: "Rule added successfully", rule: newRule });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};