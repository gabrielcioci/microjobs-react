import React, {useState} from 'react'

const SelectInput = (props) => {
    const {options, selected, setSelected} = props
    const [optionsVisible, setOptionsVisible] = useState(false)

    const handleSelected = (e, option) => {
        setSelected(option)
        setOptionsVisible(false)
    }


    return (
        <div onClick={(e) => setOptionsVisible(!optionsVisible)}
             className="rounded flex w-full relative cursor-pointer mt-2 border border-gray-300 p-2 outline-none hover:border-indigo-600 transition-all duration-200">
            <div className="text-indigo-800 w-full">{selected.label}</div>
            {optionsVisible && <div
                className="select-options absolute rounded z-10 left-0 border border-gray-300 w-full py-2 bg-white shadow-md h-64 overflow-auto">
                {options && options.map(option => <div key={option.value}
                                                       className={`py-2 px-4 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-all duration-200 ${option.value === selected.value ? 'bg-gray-200 text-gray-800' : 'text-gray-600 bg-white'}`}
                                                       onClick={(e) => handleSelected(e, option)}>
                    {option.label}
                </div>)
                }
            </div>}
        </div>
    )
}

export default SelectInput