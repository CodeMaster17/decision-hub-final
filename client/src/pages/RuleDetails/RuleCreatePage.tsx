
import { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { combine, numbers, operator, results, thenFormProperties } from '../../constants/data'
import RightSidebar from '../../components/RightSidebar'
import DropDownIcon from '../../svg/DropDownIcon'
import { useFetchColumns } from '../../hooks/rules/useFetchCcolumnsHook'

import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";



const RuleCreatePage = () => {

    //* prime react
    const [value, setValue] = useState<string>('');
    const [items, setItems] = useState<string[]>([]);

    const search = (event: AutoCompleteCompleteEvent) => {
        const query = event.query.toLowerCase();
        const filteredProperties = property.filter(item => item.toLowerCase().includes(query));
        setItems(filteredProperties);
    };


    // * Testing functionality
    const [testState, setTestState] = useState(false)
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [ruleData, setRuleData] = useState({
        name: '',
        description: '',
        connectedBy: '',
        ifRuleSchema: [{}],
        thenRuleSchema: [{}]
    })

    const [connect, setConnect] = useState('')

    const TestHandler = (e) => {
        e.preventDefault();
        const ruleData = {
            name: name,
            description: description,
            connectedBy: connect,
            ifRuleSchema: formFields,
            thenRuleSchema: thenFormFields
        };
        setRuleData(ruleData)
        console.log(rightSidebarOpen)
        setRightSidebarOpen(!rightSidebarOpen)
        console.log("RuleData", ruleData)
    }

    // * Testing functionality

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    // for adding form fields
    const [formFields, setFormFields] = useState([{
        property: '',
        operator: '',
        value: '',
        connectedBy: ''
    }])

    // adding form fields
    const addFields = (e: any) => {
        e.preventDefault()
        let object = {
            property: '',
            operator: '',
            value: '',
        }
        setFormFields([...formFields, object])
    }

    // for taking inputs from the form fields
    const handleFormChange = (event, index, name) => {
        // let data: any = [...formFields];
        // data[index][event.target.name] = event.target.value;
        // setFormFields(data);
        let data = [...formFields];
        data[index][name] = event.target ? event.target.value : event;
        setFormFields(data);
    };
    const save = async (e) => {
        e.preventDefault();

        // Constructing the rule data
        const ruleData = {
            name: name,
            description: description,
            connectedBy: connect,
            ifRuleSchema: formFields,
            thenRuleSchema: thenFormFields
        };
        console.log("RuleData", ruleData)
        createQuery()
        try {
            const response = await fetch('http://localhost:5002/create-rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ruleData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Rule saved:', responseData);

        } catch (error) {
            console.error('Error saving rule:', error);
        }
    };

    // For then form
    const [thenFormFields, setThenFormFields] = useState([{
        property: '',
        result: '',
    }])
    const addThenFields = (e: any) => {
        e.preventDefault()
        let object = {
            property: '',
            result: '',
        }
        setThenFormFields([...thenFormFields, object])
    }
    // for taking inputs from the form fields
    const handleThenFormChange = (event: any, index: any) => {
        // event.preventDefault()
        let data: any = [...thenFormFields]
        data[index][event.target.name] = event.target.value
        console.log("Then form", data)
        setThenFormFields(data)
    }

    // creating the sentence 
    const createQuery = () => {

        const connectedBy = connect; // Or 'OR', depending on your application's logic

        let conditions = formFields.map((item) => {
            return `${item.property} ${item.operator} '${item.value}'`; // Assuming value is a string or number
        }).join(` ${connectedBy} `);

        let sentence = `SELECT * FROM userdata WHERE ${conditions}`;
        console.log(sentence); // For debugging, remove in production
    }

    // fetching columns from the database
    const [property, setProperty] = useState([])
    useEffect(() => {
        const fetcFunction = async () => {
            let columns = await useFetchColumns();
            const columnNames = columns.map(column => column.column_name);

            console.log("Array Values", columnNames)
            setProperty(columnNames)
        }
        fetcFunction()
    }, []);


    return (
        <>
            {rightSidebarOpen ? <RightSidebar isOpen={rightSidebarOpen} data={ruleData} /> : null}
            <Breadcrumb pageName="Create Rule" />
            <label className="mb-2.5 block text-black dark:text-white">
                Name
            </label>
            <input
                type="text"
                placeholder="Enter rule name"
                className="w-full rounded border-[1.5px] bg-white border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />


            <div className="w-full flex flex-col gap-5.5">
                <div className='w-full'>
                    <label className="mb-3 block text-black dark:text-white">
                        Enter Rule Description
                    </label>
                    <textarea
                        rows={6}
                        placeholder="Rule Description"
                        className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

            </div>
            <br />
            <br />
            <div className=' bg-white rounded-lg p-4'>
                <h1 className='font-bold'>Select the condtions in the if statement, property in the variables, operator for setting up the condition, and values that need to be defined</h1>
                <br />
                <br />
                <div className='w-full flex flex-col justify-center items-start'>

                    <p className='text-[2rem] text-black'>Rule :</p>
                    <div className='w-10/12 ' >
                        <br />


                        <div className="flex gap-5.5 p-3 bg-slate-100 rounded-[5px]">
                            <div>
                                <form action="" >
                                    <div className='flex flex-col '>
                                        <div>
                                            <label className="mb-3 block text-black dark:text-white">
                                                Select Combining Entity
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" name="connectedBy" value={connect} onChange={(e) => setConnect(e.target.value)}>
                                                    {combine.map((item) => {
                                                        return (
                                                            <>
                                                                <option value={item.value} key={item.id}>{item.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                    <DropDownIcon />
                                                </span>
                                            </div>
                                        </div>
                                        {formFields.map((form, index) => {
                                            return (
                                                <>
                                                    <div className="flex flex-col gap-2 justify-center items-start " key={index} >
                                                        <div>

                                                        </div>
                                                        <div className='flex gap-2 justify-center items-end'>

                                                            <div>
                                                                <label className="mb-3 block text-black dark:text-white">
                                                                    Select Property
                                                                </label>
                                                                {/*
                                                                <div className="relative z-20 bg-white dark:bg-form-input">
                                                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" name="property" value={form.property} onChange={(e) => handleFormChange(e, index)}>
                                                                        {property.map((item) => {
                                                                            return (
                                                                                <>
                                                                                    <option value={item.value} key={item.id}>{item.column_name}</option>
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                                        <DropDownIcon />
                                                                    </span>
                                                                </div> */}

                                                                <AutoComplete value={form.property} suggestions={items}
                                                                    completeMethod={search}
                                                                    className="w-full rounded border-white bg-white bg-transparent py-3 h-full font-medium outline-none transition 
                                                                    active:border-white
                                                                    disabled:cursor-default disabled:bg-whiter  dark:bg-form-input "
                                                                    onChange={(e) => handleFormChange(e.value, index, 'property')} />



                                                            </div>
                                                            <div>
                                                                <label className="mb-3 block text-black dark:text-white">
                                                                    Select Operator
                                                                </label>
                                                                <div className="relative z-20 bg-white dark:bg-form-input">

                                                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                                        name="operator" value={form.operator} onChange={(e) => handleFormChange(e, index, 'operator')}
                                                                    >
                                                                        {operator.map((item) => {
                                                                            return (
                                                                                <>
                                                                                    <option value={item.value} key={item.id}>{item.name}</option>
                                                                                </>
                                                                            )

                                                                        })}
                                                                    </select>
                                                                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                                        <DropDownIcon />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="mb-3 block text-black dark:text-white">
                                                                    Select Value
                                                                </label>
                                                                <div className="relative z-20 bg-white dark:bg-form-input">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Enter rule name"
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        id='value'
                                                                        name="value"
                                                                        value={form.value}
                                                                        onChange={(e) => handleFormChange(e, index, 'value')}

                                                                    />

                                                                </div>
                                                            </div>

                                                            <button className="flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={(e) => addFields(e)}>
                                                                Add +
                                                            </button>

                                                        </div>
                                                    </div >
                                                </>
                                            )
                                        })}
                                    </div>
                                </form>
                                {/* <button className="flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={submit}>
                                    Set
                                </button> */}
                            </div>
                        </div>
                    </div>



                    {/* Then form */}
                    <div div className='w-full flex flex-col justify-center items-start mt-8' >

                        <p className='text-[2rem] text-black'>Action :</p>
                        <br />
                        <div className='w-10/12 ' >
                            <div className="flex gap-5.5 p-3 bg-slate-100 rounded-[5px]">
                                <div>
                                    <form action="" className='flex flex-col'>
                                        {thenFormFields.map((form, index) => {
                                            return (
                                                <>
                                                    <div className="flex gap-4 justify-center items-end " >

                                                        <div>
                                                            <label className="mb-3 block text-black dark:text-white">
                                                                Select Property
                                                            </label>
                                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" name="property" value={form.property} onChange={(e) => handleThenFormChange(e, index)}>
                                                                    {thenFormProperties.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item.value} key={item.id}>{item.name}</option>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </select>
                                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                                    <DropDownIcon />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="mb-3 block text-black dark:text-white">
                                                                Select Result
                                                            </label>
                                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                                    name="result" value={form.result} onChange={(e) => handleThenFormChange(e, index)}
                                                                >
                                                                    {results.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item.value} key={item.id} >{item.name}</option>
                                                                            </>
                                                                        )
                                                                    })}

                                                                </select>
                                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                                    <DropDownIcon />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button className="flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={(e) => addThenFields(e)}>
                                                            Add +
                                                        </button>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div >
                    <div className='flex mt-4'>

                        <button className=" flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={save} >Save</button>
                        <button className="ml-4 flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={TestHandler} >Test</button>
                    </div>
                </div >

            </div >
        </>
    )
}

export default RuleCreatePage
