// EPA Emission numbers for autos: https://nepis.epa.gov/Exe/tiff2png.cgi/P1009YZK.PNG?-r+75+-g+7+D%3A%5CZYFILES%5CINDEX%20DATA%5C00THRU05%5CTIFF%5C00001687%5CP1009YZK.TIF
// EPA Emission numbers for electric generation: https://www.epa.gov/sites/production/files/2018-12/documents/power_profiler_terms_calculations_and_data_sources_12-1-2018.pdf
// EPA Emission numbers for train: https://www.epa.gov/sites/production/files/2018-02/documents/420b18007.pdf

// Source for CO2_lpg: https://www.salon.com/2017/08/30/planes-trains-or-automobiles-what-will-the-most-carbon-efficient-way-to-travel_partner/
// Source for car size mpg: http://css.umich.edu/factsheets/personal-transportation-factsheet
// Source for age of cars on the road: https://www.cnet.com/roadshow/news/average-vehicle-age-increase-america/
// Constants...could move to a config file
const data = {"train-electric": {"CO2_lpm": 0.25}, "train-diesel": {"CO2_lpm": 0.5}, "car-xsmall": {"mpg": 36},  "car-small": {"mpg": 29}, "car-medium": {"mpg": 23}, "car-large": {"mpg": 19}, "car-xlarge": {mpg: 15}, "car-electric": {"kwhp100": 26} }
const ticket_ppm = 0.22 // placeholder guess of $0.22 a mile.  A ticket fare schedule would be more accurate
const gas_price = 2.50  //$ per gallon
const electric_price = 0.12   //$ per kw/hr
const cost_IRS = 0.572 // placeholder using 2020 IRS cost per mile for cars, not currently used, alternate calculation
const CO2_lpm_d = data["train-diesel"].CO2_lpm  // CO2 emitted for a diesel train in pounds per mile
const CO2_lpm_e = data["train-electric"].CO2_lpm  // CO2 emitted for an electric train in pounds per mile
const CO2_lpg = 19  // number of pounds of CO2 release per gallon of gas burned
const CO2_lpkwh = 0.99  // based of eia.gov, a kwh produces on average 0.99 pounds of CO2
const NOx_gpg = 1.39 * 21.5  //based on epa
const NOx_gpkwh = 0.7 / 1000.0 * 453.6  //based on epa
const NOx_gpm_d = 132.86 * 2.44  // g/gal  gal/mi
const NOx_gpm_e = 0.69 * 0     // g/kwh   placeholder, not finished

export {data, ticket_ppm, gas_price, electric_price, cost_IRS, CO2_lpm_d, CO2_lpm_e, CO2_lpg, 
    CO2_lpkwh, NOx_gpg, NOx_gpkwh, NOx_gpm_d, NOx_gpm_e}