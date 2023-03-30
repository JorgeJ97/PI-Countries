import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getCountries } from "../../redux/actions"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import style from "./Form.module.css";

const regexDifficulty = /^[1-5]$/
const regexName = /^[a-zA-Z][a-zA-Z\s]{1,48}[a-zA-Z]$/
const regexDuration = /^[a-zA-Z0-9][\w\d:. ]{1,48}[a-zA-Z0-9]$/

export const Form = () => {

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getCountries())
    }, [dispatch])

    const countries = useSelector(state => state.allCountries)
    const history = useHistory()



    const [form, setForm] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countriesId: [],
    })

    const [errors, setErrors] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countriesId: '',
    })

    const validate = (form) => {
        let errors = {}
        if(!form.name) {errors.name = 'Need a name'}
        
        if(form.name){
            if(regexName.test(form.name)){
                errors.name = ''
            }
            else errors.name = 'Invalid name'
        }

        if(form.difficulty){
            if(regexDifficulty.test(form.difficulty)) {
                errors.difficulty = ''
            }
            else {
                errors.difficulty = 'Must be an integer between 1 and 5'
            }
        }
        if(form.season) errors.season = ''
        
        if(form.season === '') errors.season = 'Select an option'

        if(form.countriesId.length === 0) errors.countriesId = 'Selected almost an option'

        if(form.duration) {
            if(regexDuration.test(form.duration)) {
                errors.duration = ''
            }
            else {
                errors.duration = 'Invalid duration'
            }
        } 
            return errors;
    }

    const changeHandler = (event) =>{
        const property = event.target.name
        const value = event.target.value
        setErrors(validate({
            ...form,
            [property]: value
        }))

        setForm({
            ...form,
            [property]: value
        })
    }

    const selectHandler = (event) => {
        const filterId = form.countriesId.filter(id => id === event.target.value) 
        if(filterId.length === 0){
            setForm({
                ...form,
                countriesId: [...form.countriesId, event.target.value]
            })
            setErrors(validate({...form, countriesId: [...form.countriesId, event.target.value]}))
        }
        else setErrors(validate(form))
        
    }

    const checkboxHandler = (event) =>{
        const value = event.target.value

        if(form.season === value){
            setForm({
                ...form,
                season: ''
            })
            setErrors(validate({
                ...form,
                season: ''

            }))
            
        }
        if(event.target.checked){
            setErrors(validate({...form, season: value}))
            
            setForm({
                ...form,
                season: value
        })
        }
        // else s   
    }
    const submitHandler = (event) => {
        event.preventDefault()
        // console.log(form)
        if(form.difficulty === '') setErrors({...errors, difficulty: 'Must be an integer between 1 and 5'})
        if(form.duration === '') setErrors({...errors, duration: 'Need a duration'})
        if(!form.countriesId.length) setErrors({...errors, countriesId: 'Selected almost an option'})
        if(form.name === '' || form.difficulty ==='' || form.duration === '' || form.season === ''|| form.countriesId.length === 0){
            return alert('there are invalid or incomplete fields, fill them correctly please')
        }
        
        if(errors.name === '' && errors.difficulty ==='' && errors.duration === '' ) {
            
            axios.post('http://localhost:3001/activities', form)
            .then(res => {
                return alert('Acivity created')})
            .catch(error => alert(error.message))
            setForm({        
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countriesId: [],
            })
            // history.push('/home')
        }
        
    }

    const handlerDelete  = (id) => {
        setForm({
            ...form, countriesId: form.countriesId.filter(countryId => countryId !== id)
        })
    }

    return(
        <div className={style.form}>
        <form  onSubmit={(event) => submitHandler(event)}>
            <Link to='/home'>
            <button>Back to home</button>
            </Link>
            <div>
                <label>Name: </label>
                <input type='text' value={form.name} name='name' onChange={(event) => changeHandler(event)} />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Difficulty: </label>
                <input type='number' value={form.difficulty} name='difficulty' onChange={(event) =>changeHandler(event)} min='1' max='5' />
                {errors.difficulty && <span>{errors.difficulty}</span>}
            </div>
            <div>
                <label>Duration: </label>
                <input type='text' value={form.duration} name='duration' onChange={(event) => changeHandler(event)} />
                {errors.duration && <span>{errors.duration}</span>}
            </div>
            <div className={style.checkbox}>
                <label>Season: </label>
                <label>
                    <input type="checkbox" onChange={(event) =>checkboxHandler(event)} checked={form.season === "Summer"} value="Summer" />Summer
                </label>
                <label>
                    <input type="checkbox" onChange={(event) => checkboxHandler(event)} checked={form.season === "Autum"} value="Autum" />Autum
                </label>
                <label>
                    <input type="checkbox" onChange={(event) => checkboxHandler(event)} checked={form.season === "Winter"} value="Winter" />Winter
                </label>
                <label>
                    <input type="checkbox" onChange={(event) => checkboxHandler(event)} checked={form.season === "Spring"} value="Spring" />Spring
                </label>
                <label>
                    <input  type="checkbox" onChange={checkboxHandler} checked={form.season === "All"} value="All" />All Seasons
                </label>
                {errors.season && <span>{errors.season}</span>}
            </div>

            <div>
                <label>Countries: </label>
                <select name="countries" onChange={event => selectHandler(event)}>
                    {countries.map(country => {
                        return (
                            <option key={country.id} value={country.id}>{country.id}-{country.name}</option>
                        )
                    })}
                </select>
                {errors.countriesId && <span>{errors.countriesId}</span>}

                <button type="submit" >SUBMIT</button>
            </div>
            {form.countriesId.length>0 && form.countriesId.map(id => {
                return(
                    <div key={id}>
                        <button onClick={(event) => handlerDelete(id)}>x</button>
                        <p>{id}</p>
                        
                    </div>
                )
            })}
        </form>

        
        </div>
    )
}