
import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { numbers, operator, property, results, thenFormProperties } from '../../constants/data'
import ThenForm from './ThenForm'
import { useCreateLinkedList } from '../../hooks/rules/useCreateLinkedList'
import { useCreateSentenceFromLinkedList } from '../../hooks/rules/useCreateSentence'
import { useReplaceComma } from '../../hooks/rules/useReplaceComma'

const RuleCreatePage = () => {

    // for adding form fields
    const [formFields, setFormFields] = useState([{
        property: '',
        operator: '',
        value: 0,
    }])

    const [ifSentence, setIfSentence] = useState('')

    // adding form fields
    const addFields = (e: any) => {
        e.preventDefault()
        let object = {
            property: '',
            operator: '',
            value: 0,
        }
        setFormFields([...formFields, object])
    }

    // for taking inputs from the form fields
    const handleFormChange = (event: any, index: any) => {
        // event.preventDefault()
        let data: any = [...formFields]
        data[index][event.target.name] = event.target.value
        console.log(data)
        setFormFields(data)
    }

    const submit = (e: any) => {
        e.preventDefault();
        // const linkedList = useCreateLinkedList(formFields)
        // const sentence = useCreateSentenceFromLinkedList(linkedList)
        // const modifiedSentence = useReplaceComma(sentence, 'or')
        // setIfSentence(modifiedSentence)
    }
    const save = async (e) => {
        e.preventDefault();

        // Constructing the rule data
        const ruleData = {
            name: 'rule2', // You can replace this with a dynamic value if needed
            description: 'description12ß', // You can replace this with a dynamic value if needed
            connectedBy: 'someValueasx', // Replace with the actual value if needed
            ifRuleSchema: formFields, // Using the array of form fields for 'if' conditions
            thenRuleSchema: thenFormFields // Using the array of form fields for 'then' actions
        };
        console.log("RuleData", ruleData)
        createQuery()
        try {
            const response = await fetch('http://localhost:5002/create-rule', { // Replace with your actual endpoint
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
            // Handle further logic here, such as redirecting or displaying a success message
        } catch (error) {
            console.error('Error saving rule:', error);
            // Handle the error, such as displaying a message to the user
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

        const connectedBy = 'AND'; // Or 'OR', depending on your application's logic

        let conditions = formFields.map((item) => {
            return `${item.property} ${item.operator} '${item.value}'`; // Assuming value is a string or number
        }).join(` ${connectedBy} `);

        let sentence = `SELECT * FROM userdata WHERE ${conditions}`;
        console.log(sentence); // For debugging, remove in production
    }
    return (
        <>
            <Breadcrumb pageName="Create Rule" />

            <br />
            <br />
            <div className='border-2'>
                <h1>Select the condtions in the if statement, property in the variables, operator for setting up the condition, and values that need to be defined</h1>
                <br />
                <br />
                <div className='w-full flex justify-center items-center'>

                    <p className='text-[3rem] text-black'>If</p>
                    <div className='w-10/12 border-2' >
                        <div className="flex gap-5.5 px-3">
                            <div>
                                <form action="" >
                                    <div className='flex flex-col'>
                                        {formFields.map((form, index) => {
                                            return (
                                                <>
                                                    <div className="flex gap-4 justify-center items-end border-2 border-red-500" style={{ marginLeft: `${(index + 1) * 20}px` }} key={index} >

                                                        <div>
                                                            <label className="mb-3 block text-black dark:text-white">
                                                                Select Property
                                                            </label>
                                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" name="property" value={form.property} onChange={(e) => handleFormChange(e, index)}>
                                                                    {property.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item.value} key={item.id}>{item.name}</option>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </select>
                                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                                    <svg
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <g opacity="0.8">
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                                fill="#637381"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="mb-3 block text-black dark:text-white">
                                                                Select Operator
                                                            </label>
                                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                                    name="operator" value={form.operator} onChange={(e) => handleFormChange(e, index)}
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
                                                                    <svg
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <g opacity="0.8">
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                                fill="#637381"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="mb-3 block text-black dark:text-white">
                                                                Select Value
                                                            </label>
                                                            <div className="relative z-20 bg-white dark:bg-form-input">

                                                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                                    name="value" value={form.value} onChange={(e) => handleFormChange(e, index)}
                                                                >
                                                                    {numbers.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item.value} key={item.id} >{item.name}</option>
                                                                            </>
                                                                        )
                                                                    })}

                                                                </select>
                                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                                    <svg
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <g opacity="0.8">
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                                fill="#637381"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <button className="flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={(e) => addFields(e)}>
                                                            Add +
                                                        </button>
                                                    </div>
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
                </div >


                {/* <ThenForm /> */}

                {/* Then form */}
                <div className='w-full flex justify-center items-center mt-8'>

                    <p className='text-[3rem] text-black'>Then</p>
                    <div className='w-10/12 border-2' >
                        <div className="flex gap-5.5 px-3">
                            <div>
                                <form action="" className='flex flex-col'>
                                    {thenFormFields.map((form, index) => {
                                        return (
                                            <>
                                                <div className="flex gap-4 justify-center items-end border-2 border-red-500" style={{ marginLeft: `${(index + 1) * 20}px` }}>

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
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g opacity="0.8">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                            fill="#637381"
                                                                        ></path>
                                                                    </g>
                                                                </svg>
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
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g opacity="0.8">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                            fill="#637381"
                                                                        ></path>
                                                                    </g>
                                                                </svg>
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
                                {/* <button className="flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={submit}>
                                    Set
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div >
                <button className="ml-5 flex  justify-center rounded bg-primary p-3 font-medium text-gray" onClick={save} >Save</button>
            </div >

        </>
    )
}

export default RuleCreatePage
