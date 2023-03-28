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

            <div>
                <h3 className={styles.title}>

                Capital: {country.capital?.map(cap => {
                return (
                    <p className= {styles.info} key= {cap}>{cap}</p>
                )
            })}
                </h3>

            </div>

           
            <h3 className={styles.title}>
                Activities:
                
           {country.activities?.map(act => {
                return (
                    <div>
                        <h3 className={styles.title} key= {act.id}>{act.name}:
                        
                        </h3>
                        <p className= {styles.info}>Difficulty: {act.difficulty}</p>
                        <p className= {styles.info}>Season: {act.season}</p>

                    </div>
                    

                )
            })}
            </h3>
                        

           
           
        
           

            
        </div>
        </>
    )
}

