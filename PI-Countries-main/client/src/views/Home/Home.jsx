import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom"
import styles from './Home.module.css';
import CardsContainer from "../../components/CardsContainer/CardsContainer"
import Paginado from "../../components/Paginado/Paginado"
// import SearchBar from "../../components/SearchBar/SearchBar"
import { alphabeticalOrder, filterByContinent,  getCountries, orderedByPopulation, getActivities, filterByActivities } from "../../redux/actions"




export const Home = ({handlePageChange, firstIndex, lastIndex, countriesPerPage, currentPage}) => {
    const dispatch = useDispatch()
    const [order, setOrder] = useState('')
    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activities)
    const size = countries.length / countriesPerPage;
    const currentCountries = countries.slice(firstIndex, lastIndex)

   


    const handleFilterContinent = (event) => {
        dispatch(filterByContinent(event.target.value))
        handlePageChange(1)
    }

    const handleOrderPopulation = (event) => {
        dispatch(orderedByPopulation(event.target.value))
        setOrder(order + event.target.value)
        handlePageChange(1)
    }

    const handleAlphabeticalOrder = (event) => {
        dispatch(alphabeticalOrder(event.target.value))
        setOrder(event.target.value)
        handlePageChange(1);
    }

    const handleActivity = (event) => {
        dispatch(filterByActivities(event.target.value))
        setOrder(event.target.value)
        handlePageChange(1)
    }

    useEffect( () => {
        dispatch(getCountries())
        
    }, [dispatch])

    useEffect( () => {
        dispatch(getActivities())
    
    }, [dispatch])


    return(
        
        <div >
            <select className={styles.select} onChange={event => handleAlphabeticalOrder(event)}>
                <option value="">-select-</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            <select onChange={event => handleFilterContinent(event)} className={styles.select}>
                <option value="">-select-</option>
                <option value="All">All</option>
                <option value="Americas">America</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctic">Antarctic</option>
            </select>
            <select onChange={ event => handleOrderPopulation(event)} className={styles.select}>
                <option value="">-select-</option>
                <option value="Asc">Higher to lower population</option>
                <option value="Dsc">Lower to higher population</option>
            </select>

            <select onChange={ event => handleActivity(event)} className={styles.select}>
                <option value="">-select-</option>
                <option value="All">All</option>
                {activities.map(activity => {
                    return (
                        <option key={activity.id} value={activity.name}>{activity.name}</option>
                    )
                })}
            </select>

        {/* <SearchBar handlePageChange={handlePageChange}/> */}
        <CardsContainer currentCountries={currentCountries}/>
        <Paginado currentPage = {currentPage} size = {size} handlePageChange = {handlePageChange} />
        </div>
       
    )
}