import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../Context/globalContext';
import Button from '../Components/Button';
import { plus } from '../Utils/Icons';

function Form() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(inputState)
        addIncome(inputState);
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                    className="w-full p-2.5 rounded-md border-2 border-white bg-transparent shadow-md text-gray-900 placeholder-gray-400 focus:placeholder-gray-900"
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Salary Amount'}
                    onChange={handleInput('amount')}
                    className="w-full p-2.5 rounded-md border-2 border-white bg-transparent shadow-md text-gray-900 placeholder-gray-400 focus:placeholder-gray-900"
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                    className="w-full p-2.5 rounded-md border-2 border-white bg-transparent shadow-md text-gray-900 placeholder-gray-400 focus:placeholder-gray-900"
                />
            </div>
            <div className="selects input-control flex justify-end">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                    className="w-full p-2.5 rounded-md border-2 border-white bg-transparent shadow-md text-gray-900 placeholder-gray-400 focus:placeholder-gray-900"
                >
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder='Add A Reference'
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                    className="w-full p-2.5 rounded-md border-2 border-white bg-transparent shadow-md text-gray-900 placeholder-gray-400 focus:placeholder-gray-900"
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Income'}
                    icon={plus}
                    bPad={'py-2 px-6'}
                    bRad={'rounded-full'}
                    bg={'bg-blue-500'}
                    color={'text-white'}
                />
            </div>
        </form>
    );
}

export default Form;
