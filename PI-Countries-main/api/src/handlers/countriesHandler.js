const {getAllCountries, getCountryById} = require('../controllers/countriesController')



const getCountriesHandler = async(req, res)=> {
    const {name} = req.query;
    try {
        const response = await getAllCountries(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}

const getCountryByIdHandler = async(req, res) =>{
    const {id} = req.params
    try {
        const response = await getCountryById(id)
        res.status(200).json(response)

        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}


module.exports = {
    getCountriesHandler,
    getCountryByIdHandler,
}