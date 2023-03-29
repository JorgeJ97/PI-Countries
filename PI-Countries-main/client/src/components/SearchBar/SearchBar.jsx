import { useState } from "react";
import { useDispatch } from 'react-redux';
import {getCountriesByName} from '../../redux/actions';
import style from './SearchBar.module.css';


const SearchBar = ({handlePageChange}) => {

    const dispatch = useDispatch();
    const [name, setName]= useState('')

    const handleInputChange = (event) => {
        
        setName(event.target.value)
        dispatch(getCountriesByName(event.target.value))
        handlePageChange(1)

    }

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     dispatch(getCountriesByName(name))
    //     setName('')
    //     handlePageChange(1);
    // }

    return (
        <div className={style.searchBar}>
            <input 
            type = 'text' placeholder="Search countries" 
            value={name} 
            onChange = {handleInputChange}
            />
        </div>
    )

}

export default SearchBar;

// recordatorio: prevent default se usa unicamente con el evento "submit"