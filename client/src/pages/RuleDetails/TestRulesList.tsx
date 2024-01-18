import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'

const TestRules = () => {
    const [rules, setRules] = useState([]); // State to hold the rules

    useEffect(() => {
        // Function to fetch rules from the server
        const fetchRules = async () => {
            try {
                const response = await fetch('http://localhost:5002/rules'); // Replace with your actual API endpoint
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
            <Breadcrumb pageName="Test Rules" />
            <Link to="/rule/create" className="flex  justify-center rounded bg-primary p-3 font-medium text-gray w-[200px]">
                Create rules +
            </Link>
            <br />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Top Channels
                </h4>

                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Source
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Visitors
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Revenues
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Sales
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Conversion
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
                                        <div className="flex-shrink-0">
                                            <img src="" alt="Brand" />
                                        </div>
                                        <p className="hidden text-black dark:text-white sm:block">{rule.name}</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="text-black dark:text-white">3.5K</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                                        <p className="text-meta-3">$5,768</p>
                                    </div>

                                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                        <p className="text-black dark:text-white">590</p>
                                    </div>

                                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                        <p className="text-meta-5">4.8%</p>
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

export default TestRules
