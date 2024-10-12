
import {HOST} from '../config'


/*
 * LogSearch()
 *
 * Description: 
 *      Records each search in the database
 *      
 * Arguments:
 *      Time of search, starting longitude and latitude, ending longitude and latitude
 *
 * Returns:
 *      N/A
 */

async function LogSearch(searchtime, start_latitude, start_longitude, end_latitude, end_longitude){
    const axios = require('axios')
    const ip = require('./GetIPAddress');
    var ip_address = "null";

    const route = `http://${HOST}/addsearch`
    


    try {
        ip_address = await ip.getIP();
    } 
    
    catch (error) {
        alert("IP not found")
    }

    axios
        .post(route, {
            ipaddress: ip_address,     
            searchtime: searchtime,
            start_latitude: start_latitude,
            start_longitude: start_longitude,
            end_latitude: end_latitude,
            end_longitude: end_longitude
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
}

module.exports = {
    LogSearch
}