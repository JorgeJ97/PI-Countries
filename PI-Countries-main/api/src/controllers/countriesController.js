const {Country, Activity} = require('../db')
const axios = require('axios');
const { Op } = require("sequelize")
// const {API_KEY} = process.env;


const saveAll = async () => {
    const url = await axios('https://restcountries.com/v3/all')
    const api = await url.data.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[0],
            region: country.region,
            capital: country.capital? country.capital : ['unknown'],
            subregion: country.subregion,
            area: country.area,
            population: country.population,
          };
    })
    const countries = await Country.bulkCreate(api);
    return countries;
}

const getAllCountries = async(name) =>{
    if(!name){
        const allCountries = await Country.findAll();
        return !allCountries.length ? await saveAll() : allCountries;
    }
    let allCountries = await Country.findAll()
    if(!allCountries.length) allCountries = await saveAll()
    const filterCountries = allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    // if(!filterCountries.length) throw Error('Results not found')
    return filterCountries;
    // const filterCountries = await Country.findAll({
    //     where: { name: { [Op.iLike]: `%${name}%` } },
    //   })

}

const getCountryById = async(id) =>{
    let allCountries = await Country.findAll()
    if(!allCountries.length) allCountries = await saveAll()
    const countryFound = await Country.findByPk(id.toUpperCase(), {
        include: {
            model: Activity,
            through: {
                attributes: [],
            }
        }
    });
    if(!countryFound) throw Error('Result not found')
    return countryFound;

}

module.exports = {
    getAllCountries,
    getCountryById,
}