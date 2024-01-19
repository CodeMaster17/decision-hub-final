import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TableOne from '../../components/TableOne';
import { createQuery } from '../../hooks/rules/crateSQLQuery';
interface ToggleStates {
    [key: string]: boolean;
}
interface Rule {
    _id: string;
    // Include other properties of the rule here

}
interface DataResult {
    name: string;
    description: string;
    connectedBy: string;
    ifRuleSchema: Rule[];
    thenRuleSchema: Rule[];
}
const TestRule = () => {

    const { id } = useParams()
    const [SQLQUERY, setSQLQUERY] = useState('') // State to hold the rules
    const [toggleStates, setToggleStates] = useState<ToggleStates>({});
    const [dataResult, setDataResult] = useState({
        name: '',
        description: '',
        connectedBy: '',
        ifRuleSchema: [],
        thenRuleSchema: []
    });
    useEffect(() => {
        async function fetchRule() {
            if (!id) {
                console.log('No ID provided');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5002/rules/${id}`);
                if (!response.ok) {
                    console.error('Network response was not ok');
                    return;
                }
                const data = await response.json();



                if (data) {
                    setDataResult(data);
                    console.log(data);
                    // handling toggle states
                    const initialToggleStates: any = {};
                    dataResult.ifRuleSchema.forEach((rule: Rule) => {
                        initialToggleStates[rule._id] = false;
                    });
                    dataResult.thenRuleSchema.forEach((rule: Rule) => {
                        initialToggleStates[rule._id] = false;
                    });
                    setToggleStates(initialToggleStates);
                } else {
                    console.error('No data returned');
                }
            } catch (error) {
                console.error('Error fetching rules:', error);
            }
        }

        fetchRule();

    }, [id])

    const handleCheckboxChange = (ruleId: string) => {
        setToggleStates(prevStates => {
            const newState: ToggleStates = {
                ...prevStates,
                [ruleId]: !prevStates[ruleId]
            };

            return newState;
        });
    };


    useEffect(() => {
        // Generate SQL query based on updated toggleStates
        const activeRules = dataResult.ifRuleSchema.filter(rule => toggleStates[rule._id]);
        const SQLQUERY = createQuery(activeRules, dataResult.connectedBy);
        setSQLQUERY(SQLQUERY);
        sendSQlTOPG()
        console.log(SQLQUERY);
    }, [toggleStates, dataResult.ifRuleSchema]);



    const userDatacolumn = ['id', 'income', 'credit score', 'loan amount', 'employment status', 'age', 'debt/income ratio']
    // fetch user data
    const [userData, setUserData] = useState([])
    const getUserData = async () => {

        try {
            const response = await fetch(`http://localhost:3003/userdata`)
            const json = await response.json()
            setUserData(json)
        } catch (err) {
            console.log(err)
        }

    }


    const sendSQlTOPG = async () => {
        try {
            const response = await fetch(`http://localhost:3003/userdata/${SQLQUERY}`)
            const json = await response.json()
            console.log("SEND SQL TO PG response", json)
            setUserData(json)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='bg-white p-4 rounded-md'>
            {dataResult.name ? (
                <>
                    <h1 className='text-[1.5rem]'>Rule Name :<strong> {dataResult.name}</strong> </h1>
                    <br />
                    <p className='text-[1.5rem]'>{dataResult.description}</p>
                    <br />
                    <p className='text-[1.5rem]'>If statements are connected by {dataResult.connectedBy}</p>

                </>
            ) : (
                <p>Loading...</p>
            )}
            <br />
            <br />
            <br />
            <div className='w-full flex flex-col justify-start items-start'>
                <p className='text-[1.5rem] text-black'>Rule :</p>
                <br />
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Conditions:
                    </h4>

                    <div className="flex flex-col">
                        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                            <div className="p-2.5 xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Property
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Operator
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Value
                                </h5>
                            </div>
                            <div className="hidden p-2.5 text-center sm:block xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Toggle
                                </h5>
                            </div>
                        </div>
                    </div>
                    {dataResult.ifRuleSchema.map((rule: any) => {
                        return (
                            <>
                                <Link to={`/rule/${rule._id}`} key={rule._id} >
                                    <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                            <p className="hidden text-black dark:text-white sm:block">{rule.property}</p>
                                        </div>

                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="text-black dark:text-white">{rule.operator}</p>
                                        </div>

                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="text-meta-3">{rule.value}</p>
                                        </div>

                                        <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                                            {/* TOGGLE BUTTON */}
                                            <div key={rule._id}>
                                                <input
                                                    type="checkbox"
                                                    id={`checkbox-${rule._id}`}
                                                    checked={toggleStates[rule._id] || false}
                                                    onChange={() => handleCheckboxChange(rule._id)}
                                                />
                                                <label htmlFor={`checkbox-${rule._id}`}> Check to add query</label>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )
                    })}

                </div>
            </div >``

            {/* Then form */}
            <br />
            <br />
            <div className='w-full flex flex-col justify-start items-start'>
                <p className='text-[1.5rem] text-black'>Action :</p>
                <br />
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Top Channels
                    </h4>

                    <div className="flex flex-col">
                        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                            <div className="p-2.5 xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Property
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Operator
                                </h5>
                            </div>

                            <div className="hidden p-2.5 text-center sm:block xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Toggle
                                </h5>
                            </div>
                        </div>
                    </div>
                    {dataResult.thenRuleSchema.map((rule: any) => {
                        return (
                            <>
                                <Link to={`/rule/${rule._id}`} key={rule._id} >
                                    <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                            <p className="hidden text-black dark:text-white sm:block">{rule.property}</p>
                                        </div>

                                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                                            <p className="text-meta-3">{rule.result}</p>
                                        </div>

                                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">

                                            <form action="">
                                                <input type="checkbox" id="rule" name="rule" value="rule" />
                                                <label htmlFor="rule"> Check to add query</label><br />
                                            </form>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )
                    })}

                </div>
                <br />
                <br />
                <button className="flex  justify-center rounded bg-primary p-3 font-medium text-gray w-[200px]" onClick={getUserData} >Fetch User Data</button>
                <span className='text-red-500'>* This will fetch all the user data</span>
                <br />
                <br />
                <TableOne userData={userData} userDatacolumn={userDatacolumn} />
            </div >

        </div >
    )
}

export default TestRule