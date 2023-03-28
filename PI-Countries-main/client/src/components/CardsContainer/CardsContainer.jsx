import Card from "../Card/Card"
import styles from './CardsContainer.module.css';



const CardsContainer = ({currentCountries}) => {
    
  
    return(
        <div  className={styles.cardsContainer}>
            {currentCountries.map(country =>{
                return  <Card 

                          id= {country.id}
                          name = {country.name}
                          flag = {country.flag}
                          region = {country.region}
                          key = {country.id}

                        />
                
            })}

        </div>
    )

}

export default CardsContainer;