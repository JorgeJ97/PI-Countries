import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_BY_ACTIVITIES = 'FILTER_BY_ACTIVITIES' 
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID';
export const GET_COUNTRIES_BY_NAME = 'GET_COUNTRIES_BY_NAME';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const ALPHABETICAL_ORDER = 'ALPHABETICAL_ORDER';
export const ORDERED_BY_POPULATION = 'ORDERED_BY_POPULATION';





export const getCountries = ()=> {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/countries');
        const countries = apiData.data

        dispatch({type: GET_COUNTRIES, payload: countries})
    }
}

export const getActivities = () => {
    return async function (dispatch) {
        const activities = await (await axios.get('http://localhost:3001/activities')).data
        dispatch({type: GET_ACTIVITIES, payload: activities})

    }
}


export const getCountry = (id) => {
    return async function (dispatch) {
        const country = await (await axios.get(`http://localhost:3001/countries/${id}`)).data
        dispatch({type: GET_COUNTRY_BY_ID, payload: country})
    }
    
}

export const getCountriesByName = (name)=> {
    return async function (dispatch) {
        let filteredCountries = await (await axios.get(`http://localhost:3001/countries?name=${name}`)).data
        
        dispatch({type: GET_COUNTRIES_BY_NAME, payload: filteredCountries})
    }
}
export const filterByActivities = (activity) => {
    return { type: FILTER_BY_ACTIVITIES, payload: activity}
   
}

export const filterByContinent = (continent) =>{
    return { type: FILTER_BY_CONTINENT, payload: continent}
}

export const alphabeticalOrder = (order) =>  {
    return { type: ALPHABETICAL_ORDER, payload: order }

}

export const orderedByPopulation = (order) => {
    return {type: ORDERED_BY_POPULATION, payload: order }
}