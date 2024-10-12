/*
 * ResultsDisplay
 *
 * Description: Displays the data such as cost and time calculated from user inputs
 *
 * Props:
 *      data - a dictionary of arrays storing the calculated values as strings. It's 
 *          formatted for use by the HorizontalBar component
 *      updateNotifier - a value that changes whenever the IndexPage has new data
 *
 */

// REACT IMPORTS
import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

// COMPONENT IMPORTS
import GraphDisplay from './subComponents/GraphDisplay/GraphDisplay';
import TableDisplay from './subComponents/TableDisplay/TableDisplay'


// CSS IMPORTS
import './css/ResultsDisplay.css';

export default class ResultsDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.refs = React.createRef();

        this.state = {
            costData: {
                sourceInfo: "This is how we got the info for graph 1", 
                labels: ["Car", "Diesel Train", "Electric Train"],
                datasets: [
                    {
                        label: "Cost (in $)",
                        backgroundColor: "#9067A7",
                        borderColor: 'rgb(255, 99, 132)',
                        data: []
                    }
                ]
            },

            timeData: {
                sourceInfo: "This is how we got the info for graph 2",
                labels: ["Car", "Diesel Train", "Electric Train"],
                datasets: [
                    {
                        label: "Time (in minutes)",
                        backgroundColor: "#AB6857",
                        borderColor: 'rgb(255, 99, 132)',
                        data: []
                    }

                ]                
            },

            emissionsData: {
                sourceInfo: "This is how we got the info for graph 3. \n And this is a new line",
                labels: ["Car", "Diesel Train", "Electric Train"],
                datasets: [
                    {
                        label: "CO2 (in lbs)",
                        backgroundColor: "#7293CB",
                        borderColor: 'rgb(255, 99, 132)',
                        data: []
                    },
                    {
                        label: "NO2 (in gm)",
                        backgroundColor: "#93CC72",
                        borderColor: 'rgb(255, 99, 132)',
                        data: []
                    }

                ]                
            },

            visualize: "graph" //graph|table  
        }

        this.updatedCostData = this.state.costData;
    }

    render() {

        return this.props.data === null ? null : (
            <div id="ResultsDisplay">
                <div id="results-header">
                    <div className="section-title">
                        Results
                    </div>
                    <button id="toggleResultsDisplay" 
                        onClick={() => this.setState({
                            visualize: this.state.visualize=="graph"?"table":"graph"
                        })}
                    >
                        {this.state.visualize=="graph"?"Show Table":"Show Graph"}
                    </button>
                </div>

                <div id="graphs">
                    <GraphDisplay
                        data={this.state.costData}
                        id={"cost-chart"}
                        updateNotifier={this.props.updateNotifier}
                        sourceInfo={this.state.costData.sourceInfo}
                        values={[
                            this.props.data.cost
                        ]}
                    />

                    <GraphDisplay
                        data={this.state.timeData}
                        id={"time-chart"}
                        updateNotifier={this.props.updateNotifier}
                        sourceInfo={this.state.timeData.sourceInfo}
                        values={[
                            this.props.data.time
                        ]}
                    />

                    <GraphDisplay
                        data={this.state.emissionsData}
                        id={"emissions-chart"}
                        updateNotifier={this.props.updateNotifier}
                        sourceInfo={this.state.emissionsData.sourceInfo}
                        values={[
                            this.props.data.co2, 
                            this.props.data.no2
                        ]}
                    />
                </div>
                <TableDisplay 
                    data={this.props.data} 
                    id="tables"
                    costSettings={this.state.costData}
                    timeSettings={this.state.timeData}
                    emissionsSettings={this.state.emissionsData}
                />

                {<style jsx>{`

                    #ResultsDisplay{
                        display: ${this.props.data.time[1] == 0 ? 'none' : 'auto'};
                    }
                                     
                    #graphs {
                        display: ${this.state.visualize == "graph" ? 'auto' : 'none'};
                    }

                    #tables {
                        display: ${this.state.visualize == "table" ? '' : 'none'};                        
                    }
                `}</style>}
            </div>
        );

    }
}