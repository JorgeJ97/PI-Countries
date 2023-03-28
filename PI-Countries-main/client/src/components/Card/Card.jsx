import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
    return(
        <div className={styles.card}>
            <Link to= {`/detail/${props.id}`} >
            <img  className={styles.img} src={props.flag} alt={props.id} />
            </Link>
            <h3>{props.name}</h3>
            <p>{props.region}</p>
            
        </div>
    )

}

export default Card;