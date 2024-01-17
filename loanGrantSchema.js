// for SQL

LoanGrantRuleSchema = [ // loan k grant ka rule ka schema
    {
        id: 1,
        creditScore: 123,
        income: 3453453,
        loanAmount: 23423423,
        emploment: true, // employment h ya ni : so true or false
        debt_to_income: 0.2,
        loan_grant: false
    },
]

// incentive grant schema






RuleGrantSchema = [
    {
        id: 1,
        name: "creditScore",
        ruleSchema: {
            property: "number",
            operator: "greater",
            value: 100
        }
    },
    {

    }
]