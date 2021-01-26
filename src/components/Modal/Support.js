import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios'
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {hideSupportModal} from "../../store/actions";
import SelectInput from "../SelectInput";
import categories from "../../utils/categories";
import config from '../../config'


const Support = props => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [formError, setFormError] = useState()
    const dispatch = useDispatch()

    const handleChange = (e, method) => {
        method(e.target.value)
    }
    const any = () => {
        return {label: 'Selectează o categorie', value: ''}
    }

    const [category, setCategory] = useState(any())

    const handleSubmit = (e) => {
        e.preventDefault()
        const ticket = {
            name: name,
            email: email,
            category: category.value,
            description: description
        }
        axios.post(`${config.apiUrl}/api/support/ticket`, ticket)
            .then(res => {
                // clear input fields
                setName('')
                setDescription('')
                setCategory(any())
                setEmail('')
                // show toast & hide form
                toast.success('Tichetul tău a fost trimis cu success. Vei fi contactat curând.', {
                    position: "top-right",
                    className: 'success-toast',
                    autoClose: 5000,
                    closeButton: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(hideSupportModal())
            })
            .catch(err => setFormError(err.response.data.message))
    }

    return (
        <form className="flex-col" onSubmit={handleSubmit}>
            <div className="w-full">
                <input type="text"
                       placeholder="Nume"
                       className="rounded flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="name" value={name}
                       onChange={(e) => handleChange(e, setName)}/>
            </div>
            <div className="w-full mt-4">
                <input type="text"
                       placeholder="Email"
                       className="rounded flex w-full border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="email" value={email}
                       onChange={(e) => handleChange(e, setEmail)}/>
            </div>
            <div className="w-full mt-4">
                <SelectInput options={[any(), ...categories]} selected={category} setSelected={setCategory}
                             placeholder="Selecteaza o categorie"/>
            </div>
            <div className="w-full mt-4">
                <textarea required
                          placeholder="Descrie problema care a apărut"
                          className="rounded flex resize-none w-full mt-2 border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                          name="description" value={description}
                          onChange={(e) => handleChange(e, setDescription)}/>
            </div>
            {formError &&
            <div className="mt-4 p-1 bg-red-200 border border-red-400 rounded text-xs text-red-600">{formError}</div>}
            <div className="mt-4 text-sm text-gray-500">
                <p>Asigură-te că ai citit <span
                    className="cursor-pointer underline transition-all duration-200 hover:text-indigo-500 text-indigo-600">Termenii și Condițiile</span> înainte
                    de a trimite un tichet de suport.</p>
            </div>
            <input type="submit" value="Trimite"
                   className="rounded w-full mt-8 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 cursor-pointer"/>
        </form>
    )
}

export default Support