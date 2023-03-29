import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getCountry} from "../../redux/actions"
import { useParams} from "react-router-dom"
import styles from './Detail.module.css';




export const Detail = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const country = useSelector(state => state.country)

    useEffect(() => {
        dispatch(getCountry(id))
    }, [dispatch, id])


    return(
        <>
        <div className={styles.detail}>
            <h3 className={styles.title}>{country.id}</h3>
            <img src={country.flag} alt={country.id} className={styles.image}/>
            <h3 className={styles.title}>{country.name}</h3>
            <h3 className={styles.title}> Continent: {country.region}</h3>
            <h3 className={styles.title}> Population: {country.population} hab.</h3>
            <h3 className={styles.title}> Area: {country.area}  km²</h3>
            <h3 className={styles.title}> Subregion: {country.subregion}</h3>

            <div>
                <h3 className={styles.title}>

                Capital: {country.capital?.map(cap => {
                return (
                    <h3 className= {styles.title} key= {cap}>{cap}</h3>
                )
            })}
                </h3>

            </div>

            <h3 className={styles.title}>
            Activities:
                <table className={styles.table}>
                    <thead>
                            <tr>
                                <th>Name</th>
                                <th>Difficulty</th>
                                <th>Season</th>
                            </tr>
                    </thead>
                    <tbody>
                        {country.activities?.map(act => {
                            return (
                                    <tr key={act.id}>
                                        <td>{act.name}</td>
                                        <td>{act.difficulty}</td>
                                        <td>{act.season}</td>
                                    </tr>
        )
                        })}
                    </tbody>
                </table>
            </h3>

           
         
                        

           
           
        
           

            
        </div>
        </>
    )
}

