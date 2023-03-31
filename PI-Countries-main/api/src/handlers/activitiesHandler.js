const { json } = require('sequelize')
const { getActivities, createActivity} = require('../controllers/activitiesController')


const getActivitiesHandler = async  (req, res) =>{
    // getActivities()
    // .then(response => res.status(json(res)))
    // .catch(res => res.status(400).json(res))
    try {
        const response = await getActivities()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send(error.message)
        
    }
}


const createActivityHandler = async(req, res) =>{

    const {name, difficulty, duration, season, countriesId} = req.body
    try {
        const response = await createActivity(name, difficulty, duration, season, countriesId)
        res.status(200).json('Activity created')
        
    } catch (error) {
        res.status(400).send(error.message)
        
    }
}


module.exports = {
    getActivitiesHandler,
    createActivityHandler,
}