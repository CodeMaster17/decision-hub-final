import React, { useState } from 'react';
import { createQuery } from '../hooks/rules/crateSQLQuery';

interface RightSidebarProps {
    // Define any props here. For example:
    isOpen: boolean;
    data: [index: number, value: string]
}

interface ToggleStates {
    [key: string]: boolean;
}
const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, data }) => {

    const [sidebarState, setSideBarState] = useState(true);
    const [sideBarData, setSideBarDataState] = useState(data);
    const [SQLQUERY, setSQLQUERY] = useState('') // State to hold the rules
    const [toggleStates, setToggleStates] = useState<ToggleStates>({});
    const [dataResult, setDataResult] = useState({
        name: '',
        description: '',
        connectedBy: '',
        ifRuleSchema: [],
        thenRuleSchema: []
    });
    const sidebarHandler = () => {
        // e.preventDefault()
        setSideBarState(!sidebarState);
    }

    const handleCheckboxChange = (ruleId: string) => {
        setToggleStates(prevStates => {
            const newState: ToggleStates = {
                ...prevStates,
                [ruleId]: !prevStates[ruleId]
            };

            console.log("Checkbox for rule " + ruleId + " is now " + (newState[ruleId] ? "checked" : "unchecked"));
            const SQLQUERY = createQuery(dataResult.ifRuleSchema)
            setSQLQUERY(SQLQUERY)
            sendSQlTOPG();
            console.log(SQLQUERY)
            return newState;
        });
    };
    const sendSQlTOPG = async () => {
        try {
            const response = await fetch(`https://postgres-server-harshit.onrender.com/userdata/${SQLQUERY}`)
            const json = await response.json()
            console.log("SEND SQL TO PG response", json)
            setUserData(json)
            const initialToggleStates: any = {};
            dataResult.ifRuleSchema.forEach((rule: Rule) => {
                initialToggleStates[rule._id] = false;
            });
            dataResult.thenRuleSchema.forEach((rule: Rule) => {
                initialToggleStates[rule._id] = false;
            });
        } catch (err) {
            console.log(err)
        }
    }
    const [userData, setUserData] = useState([
        {
            property: '',
            operator: '',
            value: ''
        }
    ])

    {
        return sidebarState ? (
            <>
                <div className={`fixed bg-white top-0 z-999 right-0 w-[50vw] h-full bg-gray-100 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>

                    <div className="p-4">
                        <button className='border-2 float-right   flex  justify-center rounded bg-primary p-3 font-medium text-gray' onClick={sidebarHandler} >Close</button>
                        <h2 className="font-bold text-xl mb-4">Test Rules</h2>
                        <p className='font-bold'>Name :</p>
                        <p className="text-gray-600 text-sm">{sideBarData.name}</p>
                        <p className='font-bold'>Desciption :</p>
                        <p className="text-gray-600 text-sm">{sideBarData.description}</p>
                        <br />
                        <br />

                        <p>Rules :</p>

                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            Property
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Operator
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Value
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Toggle
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((item) => (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="py-4 px-6">{item.property}</td>
                                            <td className="py-4 px-6">{item.operator}</td>
                                            <td className="py-4 px-6">{item.value}</td>
                                            <td className="py-4 px-6">
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <br />
                        <p>Actions :</p>
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            Property
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sideBarData.thenRuleSchema.map((item) => (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="py-4 px-6">{item.property}</td>

                                            <td className="py-4 px-6">{item.result}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <p className='text-red-500'>* Make sure none of the fields in the above table is empty, if empty, once again select the rules.</p>
                        <br />
                        <button className=" flex  justify-center rounded bg-primary p-3 font-medium text-gray">Generate Data</button>
                    </div>
                </div >
            </>
        ) : null;
    }

};

export default RightSidebar;
