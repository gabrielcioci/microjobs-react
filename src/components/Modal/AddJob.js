import React, {useState} from 'react'
import axios from 'axios'
import {connect, useDispatch} from "react-redux";
import {toast} from 'react-toastify';
import cities from "../../utils/cities";
import {hideAddJobModal} from "../../store/actions";
import {useCookies} from "react-cookie";
import SelectInput from "../SelectInput";
import 'react-toastify/dist/ReactToastify.css';

const AddJob = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(10)
    const [reward, setReward] = useState(10)
    const [tags, setTags] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState(cities[0])
    const [formError, setFormError] = useState()
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['token']);
    const {user} = props

    const onSubmit = (e) => {
        e.preventDefault();
        const headers = {}
        // Check for token
        if (!cookies.token) return
        headers['X-AUTH-TOKEN'] = cookies.token

        // build the object
        const job = {
            title: title,
            description: description,
            duration: duration,
            phone: phone,
            location: location.label,
            tags: tags.split(','),
            date: new Date(),
            reward: reward,
            postedBy: user._id
        }

        // make the post req
        axios.post(`${process.env.REACT_APP_API_URL}/api/jobs/add`, job, {headers})
            .then(() => {

                // clear input fields
                setTitle('')
                setDescription('')
                setDuration(10)
                setLocation('')
                setTags('')
                setPhone('')
                setReward(10)

                // show toast & hide form
                toast.success('Jobul tău a fost trimis la verificare. Va fi vizibil în lista de joburi după ce este verificat.', {
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

                dispatch(hideAddJobModal())
            })
            .catch((error) => {
                setFormError(error.response.data.message)
            })
    }

    const handleChange = (e, method) => {
        method(e.target.value)
    }

    return (
        <form className="flex-col" onSubmit={onSubmit}>
            <div className="flex-col">
                <label className="block text-gray-500">Titlu</label>
                <input type="text"
                       placeholder="Titlu job"
                       className="rounded flex w-full mt-2 border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="title" value={title}
                       onChange={(e) => handleChange(e, setTitle)}/>
            </div>
            <div className="flex-col mt-2">
                <label className="block text-gray-500">Descriere</label>
                <textarea required
                          placeholder="Descriere job"
                          className="rounded flex resize-none w-full mt-2 border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                          name="description" value={description}
                          onChange={(e) => handleChange(e, setDescription)}/>
            </div>
            <div className="flex-col w-full mt-2">
                <label className="block text-gray-500">Locație</label>
                <SelectInput options={cities} selected={location} setSelected={setLocation}/>
            </div>
            <div className="flex justify-between">
                <div className="flex-col w-1/2 mt-2">
                    <label className="block text-gray-500">Recompensă (LEI)</label>
                    <input type="number"
                           min={10}
                           step={1}
                           placeholder="LEI"
                           className="rounded flex w-full mt-2 border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                           name="reward" value={reward}
                           onChange={(e) => handleChange(e, setReward)}/>
                </div>
                <div className="flex-col ml-4 w-1/2 mt-2">
                    <label className="block text-gray-500">Durație (minute)</label>
                    <input type="number"
                           min={10}
                           step={5}
                           placeholder="Min"
                           className="rounded flex w-full mt-2 border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                           name="duration" value={duration}
                           onChange={(e) => handleChange(e, setDuration)}/>
                </div>
            </div>
            <div className="flex-col mt-2">
                <label className="block text-gray-500">Etichete (maxim 5)</label>
                <input type="text"
                       placeholder="Etichete separate prin virgulă"
                       className="rounded flex w-full mt-2 border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="tags" value={tags}
                       onChange={(e) => handleChange(e, setTags)}/>
            </div>
            <div className="flex-col mt-2">
                <label className="block text-gray-500">Tel. de contact</label>
                <input type="tel"
                       placeholder="Număr de telefon"
                       className="rounded flex w-full mt-2 border border-gray-300 p-2 outline-none focus:border-indigo-600 text-indigo-800 transition-all duration-200"
                       required name="phone" value={phone}
                       onChange={(e) => handleChange(e, setPhone)}/>
            </div>
            {formError &&
            <div className="mt-4 p-1 bg-red-200 border border-red-400 rounded text-xs text-red-600">{formError}</div>}
            <input type="submit" value="Trimite"
                   className="rounded py-2 mt-6 w-full px-4 bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 cursor-pointer"/>
        </form>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})
export default connect(mapStateToProps)(AddJob)