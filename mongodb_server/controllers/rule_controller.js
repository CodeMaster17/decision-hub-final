const rules = require('../models/rule_schema')

exports.rulepost = async (req, res) => {

    // TODO : idhr s scchema k according vale uthana h, frontend m input add krne h
    const { property, operator, value } = req.body
    if (!property || !operator || !value) {
        return res.status(401).json({ error: "Please fill all the fields" })
    }
    try {
        const pre_rules = await findOne({
            $and: [
                { property: property },
                { operator: operator },
                { value: value }
            ]
        })
        if (pre_rules) {
            return res.status(401).json({ error: "Rule already exists" })
        }
        else {
            const rule = new rules({ property, operator, value })
            await rule.save()
            res.status(201).json({ message: "Rule added successfully" })
        }
    } catch (error) {
        res.status(401).json({ error: "Something went wrong" })
        console.log(error)
    }
}