
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { useState, useEffect } from 'react';

const Rules = () => {

    const [rules, setRules] = useState([]); // State to hold the rules

    useEffect(() => {
        // Function to fetch rules from the server
        const fetchRules = async () => {
            try {
                const response = await fetch('https://decision-hub-final-1-0z6h.onrender.com/rules');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRules(data); // Update the state with the fetched rules
                console.log(data)
            } catch (error) {
                console.error('Error fetching rules:', error);
            }
        };

        fetchRules(); // Call the function to fetch rules
    }, []);


    return (
        <>
            <Breadcrumb pageName="Rules" />
            <Link to="/rule/create" className="flex  justify-center rounded bg-primary p-3 font-medium text-gray w-[200px]">
                Create rules +
            </Link>
            <br />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Rules
                </h4>

                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Name
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Description
                            </h5>
                        </div>

                    </div>
                </div>
                {rules.map((rule: any) => {
                    return (
                        <>
                            <Link to={`/rule/${rule._id}`}>
                                <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                        <p className="hidden text-black dark:text-white sm:block">{rule.name}</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="text-black dark:text-white">{rule.description}</p>
                                    </div>


                                </div>
                            </Link>
                        </>
                    )
                })}

            </div>

        </>
    )
}

export default Rules
