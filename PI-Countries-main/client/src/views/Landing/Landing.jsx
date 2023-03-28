import {Link} from 'react-router-dom'
import styles from './Landing.module.css';



export const Landing = () => {
    return(
        <div className={styles.landing}>
            <h1> Bienvenido! </h1>
            <Link to = '/home'>
            <button>Ingresar</button>
            </Link>

        </div>
       
    )
}