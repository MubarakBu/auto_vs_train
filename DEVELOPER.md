# Summary

This project _will_ be a database driven web app with a specifically designed 
data flow that keeps as much of the data flow going down the component
hierarchy as possible. 

# Certain Files may not be included in archive that need to be created:
1. API.js
    - located in /components/
    - template:
    ```
        const API_KEY = [INSERT YOUR MAPBOX API KEY HERE (string format)] 
        export {API_KEY}
    ```
2. config.js
    - located in root
    - template:
    ```
    var ENV = process.env.NODE_ENV || 'development';

    if (ENV == 'production') {
        var HOST=[INSERT YOUR EXPRESS SERVER ADDRESS FOR DB REQUESTS]
    } else if (ENV ==  'development') {
        var HOST = 'localhost:3001'
    } else {
        console.log('Environment not set in Config')
        var HOST = 'localhost:3001'
    }

    export {HOST}
    ```
3. .env
    - located in /components/server/
    -template:
    ```
    NODE_ENV=development       [Note: production or development]
    PORT=3001                  [Note: express server port for db requests]
    HOST=[INSERT YOUR EXPRESS SERVER ADDRESS FOR DB REQUESTS, no quotes]
    DB_DATABASE=[INSERT YOUR DB name, no quotes]
    DB_USERNAME=[INSERT YOUR DB username, no quotes]
    DB_PASSWORD=[INSERT YOUR DB password, no quotes]
    DB_HOST=[INSERT YOUR DB server, relative to express server, no quotes, e.g. localhost]
    DB_PORT=[INSERT YOUR DB port, no quotes]
    DB_DIALECT=[INSERT THE DB DIALECT, e.g. mysql, no quotes]
    ```



# Data Flow

This document contains a high overview of each function, their arguments and return values are documented next to each function in their parent component's file.

 - _Downstream flows_ - props passed down from parent components
 - _Upstream flows_ - a function passed down to child components

### IndexComponent
 - The parent component of the entire website, used to handle accepting data from its child components.

#### Downstream flows
 - N/A

#### Upstream flows
 - `addressError()`
    - Description: runs if there is a validation error for the entered addresses
    - Passed to:
        - AddressInput

 - `handleDistanceAndDuration()`
    - Description: 
    - Passed to:
        - AddressInput

 - `handleToFinalStation()`
    - Description: 
    - Passed to:
        - AddressInput

 - `handleToFirstStation()`
    - Description: 
    - Passed to:
        - AddressInput

### AddressInput
 - Handles the styles and user input for addresses and car size

#### Downstream flows
 - `carOptions` - an array of dictionaries storing data for the car size dropdown. Each subaray storing:
    - `id`    - the JSX/HTML id
    - `value` - the value handled by the code (i.e. 'x', 'xl', 's')
    - `name`  - the text displayed to the user 
 - `addressError` - a function that runs when there is a validation error
 - `handleDistanceAndDuration` - 
 - `handleToFirstStation` -
 - `handleToFinaldestination` -
 - `pathCoord` - 
 - `onSubmit` - Handles the user data inputted from the address boxes, and updates inputUpdated state. Passed to AddressInput component

#### Upstream flows
 - `handleClick()`
    - Description: Handles when the user clicks the submit button
    - Passed to:
        - The JSX form object

 - `handleChange`
    - Description: Passed to a form element and runs each time the user changes the value
    - Passed to:
        - `#car-input`, the car size dropdown JSX object

### HeaderDisplay
 - Displays the header text at the top of the home page

#### Downstream flows
 - N/A

#### Upstream flows
 - N/A

 ### MapBox
 - Displays the paths taken by the car and the train on a map

#### Downstream flows
 - `userData` - 
 - `onError` - a function that runs when there is a validation error
 - `stationsCoor` - 

#### Upstream flows
 - N/A

### PathFinding
 - 

#### Downstream flows
 - `start_latitude` -
 - `start_longitude` -  
 - `end_latitude` - 
 - `end_longitude` - 
 - `handleStationsArr` - captures the information about the train's path

#### Upstream flows
 - N/A


### ResultsDisplay
 - Displays the data such as cost and time calculated from user inputs

#### Downstream flows
 - `data` - a formatted version of the data to be displayed
 - `updateNotifier` - changes whenever IndexPage has new data

#### Upstream flows
 - N/A

### GraphDisplay
 - Graphical representation of the datasets

#### Downstream flows
- `data` - the formatted information for the graph style
- `id` - the JSX/HTML id of the component
- `updateNotifier` - a value that changes whenever the IndexPage has new data
- `sourceInfo` - the information to display in the tool tip such as the source for the equation
- `values` - the formatted values for the graph to display

#### Upstream flows
 - N/A

### TableDisplay
 -Displays the numbers calculated for cost, time, co2, and no2 for comparison by the user between the car and taking various trains

#### Downstream flows
 - `data` - A dictionary of arrays storing information for each mode of transportation for each metric. This is the same formatting as used by the ResultsDisplay component.
 - `costSettings` - the settings sent to the react-chart-js-2 component for  the cost graph, including an element named sourceInfo that includes text to show in the tool tip
 - `timeSettings` - the settings sent to the react-chart-js-2 component for  the time graph, including an element named sourceInfo that includes text to show in the tool tip
 - `emissionsSettings` - the settings sent to the react-chart-js-2  component for the emissions graph, including an element named  sourceInfo that includes text to show in the tool tip

#### Upstream flows
 - N/A

### ToolTip
 - A simple wrapper to make using the react-tooltip component drier. Read here: https://github.com/wwayne/react-tooltip

#### Downstream flows
 - `cssID` - id of the tool tip, the placeholder is accessed via cssID + "-placeholder", and tool tip by cssId + "-text"
 - `cssClass` - class of the tool tip, naming same naming convention from cssID applies
 - `placeholderString` - the string displayed for the user to hover over to display the tool tip
 - `text` - the text displayed by the tool tip while the user hovers

#### Upstream flows
 - N/A

# Components

Functions.js has a collection of javascript functions:
*calculate_cost* - calculates the cost in $ of a trip
*calculate_CO2* - calculates the CO2 impact of a trip in lbs of CO2
*calculate_NOx* - calculates the NOx impact of the trip in grams
*find_route* - calculates the route between two train stations using an A* search
*findClosest* - calculates the closest train station to a given location
*resolveStationName* - looks up a station name given a station id
*namedPath* - like resolveStationName, it looks up station names, but for a list of station ids
*resolveStationCoord* - looks up a station lat/long given a station id
*coordPath* - like resulve StationCoord, it loops up station lat/long, but for a list of station ids

PathFinding.js
Finds the train routing information given an origin and destination and passes that info back up.  Includes the train stations in order visited, the time of the train trip, and the total distance traveled for the train trip.


## Using compoents 

According to React's documentation, components should be broken up into smaller parts if possible.

## Naming Scheme:
Use upper camel casing (MyVarName). React thinks that any components with a lowercase name is an HTML default.

## File Structure:
<pre>.  
|  
+-- /components  
    |  
    +-- /ComponentName
        |
        +-- ComponentName.js
        |
        +-- /css
        |   |
        |   +-- ComponentName.css
        |
        +-- /subComponents
            |
            +-- [Recursively use this pattern as needed]
</pre>

This means that any component can import any other component using the line

`import ComponentName from '../ComponentName/ComponentName'`

