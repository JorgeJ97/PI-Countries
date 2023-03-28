import {Link, useLocation} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css';


const NavBar = ({handlePageChange}) => {
    const location = useLocation()
    return(
        <div className={style.mainContainer}>

            <Link to = '/home' className={style.button}> HOME</Link>
            {location.pathname === '/home' && <SearchBar handlePageChange={handlePageChange}/>}
            <Link to = '/create' className={style.button}> ADD ACTIVITY</Link>
            
        </div>
    )
}

export default NavBar;