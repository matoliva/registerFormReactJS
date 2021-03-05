import { useState } from "react";

import './registerForm.css';

const RegisterForm = () => {

    const [fields, setFields] = useState({
        name: null,
        lastName: null,
        email: null,
        emailVerification: null,
        day: 1,
        month: 1,
        year: 1900
    });

    const [errors, setErrors] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);

    const handleInputChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    const handleValidation = () => {
        let isValid = true;
        let errors = {};

        for (let key in fields) {
            switch (key) {
                case 'lastName':
                    if (!fields[key]) {
                        errors = { ...errors, [key]: 'Cannot be empty' };
                        isValid = false;
                    }
                    break;
                case 'name':
                    if (!fields[key]) {
                        errors = { ...errors, [key]: 'Cannot be empty' };
                        isValid = false;
                    }
                    break;
                case 'email':
                    if (!fields[key]) {
                        errors = { ...errors, [key]: 'Cannot be empty' };
                        isValid = false;
                    } else if (!fields[key].match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                        errors = { ...errors, [key]: 'Verify the email format' };
                        isValid = false;
                    }
                    break;
                case 'emailVerification':
                    if (!fields[key]) {
                        errors = { ...errors, [key]: 'Cannot be empty' };
                        isValid = false;
                    } else if (fields.email !== fields.emailVerification) {
                        errors = { ...errors, [key]: 'the emails do not match' };
                        isValid = false;
                    }
                    break;
                case 'day':
                case 'month':
                case 'year':
                    break;
                default: console.log('the input doesnt exist');
            }
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = handleValidation();
        setFormIsValid(isValid)

        if (isValid) {
            alert('data enviada');
            console.log(fields);
        }
    };

    const createDaysOfTheMonthOptions = () => {
        let options = [];

        for (let i = 1; i <= 31; i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        };

        return options;
    }

    const getCurrentYear = () => {
        const now = new Date();
        const currentYear = now.getFullYear();

        return currentYear;
    }

    const createMonthsOptions = () => {
        let options = [];

        for (let i = 1; i <= 12; i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        };

        return options;
    }

    const createYearsOptions = () => {
        let options = [];

        for (let i = 1900; i <= getCurrentYear(); i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        };

        return options;
    }

    return (
        <form className="form">
            <label htmlFor="lastName"> Last Name: </label>
            <input
                name="lastName"
                type="text"
                onChange={handleInputChange}
                required />
            <span style={{ color: "red" }}>{errors["lastName"]}</span>
            <label htmlFor="name"> Name: </label>
            <input
                name="name"
                type="text"
                onChange={handleInputChange}
                required />
            <span style={{ color: "red" }}>{errors["name"]}</span>
            <label htmlFor="email">Email: </label>
            <input
                name="email"
                type="email"
                onChange={handleInputChange}
                required />
            <span style={{ color: "red" }}>{errors["email"]}</span>
            <label htmlFor="emailVerification">Repeat Email: </label>
            <input
                name="emailVerification"
                type="email"
                onChange={handleInputChange}
                required />
            <span style={{ color: "red" }}>{errors["emailVerification"]}</span>
            <div className="form__birth">
                <div className="form__birth__select">
                    <label htmlFor="day">Day: </label>
                    <select
                        value={fields.day}
                        name="day"
                        type="text"
                        onChange={handleInputChange}>
                        {createDaysOfTheMonthOptions()}
                    </select>
                </div>
                <div className="form__birth__select">
                    <label htmlFor="month">Month: </label>
                    <select
                        value={fields.month}
                        name="month"
                        type="text"
                        onChange={handleInputChange}>
                        {createMonthsOptions()}
                    </select>
                </div>
                <div className="form__birth__select">
                    <label htmlFor="year">Year: </label>
                    <select
                        value={fields.year}
                        name="year"
                        type="text"
                        onChange={handleInputChange}>
                        {createYearsOptions()}
                    </select>
                </div>
            </div>
            <button
                className="form__btn-submit"
                name="register"
                type="submit"
                onClick={handleSubmit}
            >Register
            </button>
        </form>
    )
};

export default RegisterForm;