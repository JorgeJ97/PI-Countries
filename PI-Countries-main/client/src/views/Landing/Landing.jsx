import {Link} from 'react-router-dom'
import styles from './Landing.module.css';



export const Landing = () => {
    return(
        <div className={styles.landing}>
            <h1> Welcome! </h1>
            <h3>Individual proyect by Jorge Jimenez</h3>
            <Link to = '/home'>
            <button>Login</button>
            </Link>

        </div>
       
    )
}