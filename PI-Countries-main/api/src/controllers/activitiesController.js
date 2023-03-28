const {Activity, Country} = require('../db');



const getActivities = async() =>{
    return await Activity.findAll({
        include: {
            model: Country,
            through: {
                attributes: [],
            },
        },
    });
}


const createActivity = async(name, difficulty, duration, season, countriesId) =>{

    const existingActivity = await Activity.findOne({
        where: {
          name,
          duration,
          difficulty,
          season,
        },
      });
      if (existingActivity) {
        throw Error('Activity already exist');
      }
    const activity = await Activity.create({name, difficulty, duration, season})

    for(let countryId of countriesId){
        activity.addCountry(await Country.findOne({ where:{id: countryId.toUpperCase()}}))
    }

    return activity;

}


module.exports = {
    getActivities,
    createActivity,
}



