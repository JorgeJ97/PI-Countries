import {  FILTER_BY_CONTINENT, ORDERED_BY_POPULATION, GET_COUNTRIES, GET_COUNTRIES_BY_NAME, GET_COUNTRY_BY_ID, ALPHABETICAL_ORDER, GET_ACTIVITIES, FILTER_BY_ACTIVITIES } from "./actions";




const initialState = {
    countries: [],
    allCountries: [],
    country: {},
    activities: [],
}

const reducer = (state = initialState, action)=>{


    switch(action.type){

        case FILTER_BY_ACTIVITIES:
            if(action.payload === 'All') return {...state, countries: state.allCountries}
            const filteredActivities = state.activities.find(activity => activity.name === action.payload)
            const filterCountries = filteredActivities.countries
            return {...state, countries: filterCountries}

        case GET_ACTIVITIES:
            return { ...state, activities: action.payload}
        case ALPHABETICAL_ORDER:
            if(action.payload === "") return {...state, countries: state.countries}
            if(action.payload === 'Z-A'){
                state.countries.sort((a, b) => {
                    
                    if(a.name === b.name) return 0
                    if(a.name > b.name) return -1
                    return 1
                })
                return {...state, countries: state.countries}
            }
            if(action.payload === 'A-Z') {
                state.countries.sort((a, b) => {
                   
                    if(a.name === b.name) return 0
                    if(a.name < b.name) return -1
                    return 1
                })
                return {...state, countries: state.countries}

            }
            break;


        case ORDERED_BY_POPULATION:
            if(action.payload === "") return {...state, countries: state.countries}
            if(action.payload === 'Asc'){
                state.countries.sort((a, b) => {
                    return b.population - a.population
                })
                return {...state, countries: state.countries}
            }
            if(action.payload === 'Dsc') {
                state.countries.sort((a, b) => {
                    return a.population - b.population;
                })
                return {...state, countries: state.countries}

            }
            break;
           
        case FILTER_BY_CONTINENT:
            if(action.payload === "") return {...state, countries: state.countries}
            const allCountries = state.allCountries
            const filteredCountries =  action.payload === 'All' ? allCountries : state.countries.filter(country => country.region === action.payload)
            return {...state, countries: filteredCountries }

        case GET_COUNTRIES_BY_NAME:
            return {...state, countries: action.payload}

        case GET_COUNTRY_BY_ID:
            return {...state, country: action.payload}

        case GET_COUNTRIES:
            return {...state, countries: action.payload, allCountries: action.payload}

        default:
            return {...state};
    }

}

export default reducer;