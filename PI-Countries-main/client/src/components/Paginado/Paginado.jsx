import styles from './Paginado.module.css';

const Paginado = ({handlePageChange, size, currentPage}) =>{
    const pageNumers = [];
    // console.log(currentPage)

    for(let i=1; i<= Math.ceil(size); i++){
        pageNumers.push(i)
    }
    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumers && pageNumers.map(number =>(
  
                    <li className={`${currentPage === number && styles.btn}`}  key= {number}>
                        <button  onClick={() => handlePageChange(number)}> {number}</button>
                    </li>
                    
                ))}
            </ul>
        </nav>
    )

}

export default Paginado;