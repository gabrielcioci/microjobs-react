import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SearchInput = (props) => {

    const handleSearch = (e) => {
        const term = e.target.value
        let elements = document.getElementsByClassName(props.elementClass)
        for (let i = 0; i < elements.length; i++) {
            const content = elements[i].innerHTML.replace(/(<([^>]+)>)/gi, '').trim().toLowerCase()
            const contentNoDiacritics = elements[i].innerHTML
                .replace(/(<([^>]+)>)/gi, '')
                .trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')

            if (content.indexOf(term.toLowerCase()) === -1 && contentNoDiacritics.indexOf(term.toLowerCase()) === -1) {
                elements[i].classList.add('hidden')
            } else {
                elements[i].classList.remove('hidden')
            }
        }
    }
    return (
        <div
            className={props.className}>
            <FontAwesomeIcon
                icon="search"
                className="flex text-gray-500"/>
            <input type="text" name="search" className={`${props.inputClass} ml-2 outline-none min-w-0 w-full`}
                   onChange={(e) => handleSearch(e)}
                   placeholder="Caută joburi"/></div>
    )
}

export default SearchInput