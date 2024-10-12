/*
 * getIP()
 *
 * Description: 
 *      Fetches the client IP address for use in the search log
 *      
 * Arguments:
 *      N/A
 *
 * Returns:
 *      Client IP address in string form
 */

async function getIP(){
    const publicIp = require('public-ip');
    var myIP;

    myIP = await publicIp.v4();

    var StringIP = JSON.stringify(myIP);

    return StringIP;
}

module.exports = {
    getIP
};