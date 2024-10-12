/*
 * Name: TableDisplay
 *
 * Description: Displays the numbers calculated for cost, time, co2, and no2 
 *      for comparison by the user between the car and taking various trains
 *
 * Props: 
 *      data - A dictionary of arrays storing information for each mode of
 *          transportation for each metric. This is the same formatting as
 *          used by the ResultsDisplay component.
 *      costSettings - the settings sent to the react-chart-js-2 component for 
 *          the cost graph, including an element named sourceInfo that includes
 *          text to show in the tool tip
 *      timeSettings - the settings sent to the react-chart-js-2 component for 
 *          the time graph, including an element named sourceInfo that includes
 *          text to show in the tool tip
 *      emissionsSettings - the settings sent to the react-chart-js-2 
 *          component for the emissions graph, including an element named 
 *          sourceInfo that includes text to show in the tool tip
 */

// REACT IMPORTS
import React from 'react';

// COMPONENT IMPORTS
import ToolTip from "../ToolTip/ToolTip";

// CSS IMPORTS
import './css/TableDisplay.css';

export default class TableDisplay extends React.Component {

    colorOnMin(arr, index, id) {
        // if (arr[index] == Math.min(...arr)) {
        //     return (
        //         <style jsx>{`
        //             #${id} {
        //                 background-color: #93CC72;
        //             }
        //         `}</style>
        //     );
        // } else {
        //     return null;
        // }
        return null;
    }

    render() {
        return (
            <div id="tables">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="outline">
                                Cost ($)
                                <ToolTip
                                    cssId={"cost-table-source"}
                                    placeholderString={"?"}
                                    cssClass={"tool-tip table-tool-tip"}
                                    text={this.props.timeSettings.sourceInfo}
                                />
                            </th>
                            <th className="outline">
                                Time (min)
                                <ToolTip
                                    cssId={"time-table-source"}
                                    placeholderString={"?"}
                                    cssClass={"tool-tip table-tool-tip"}
                                    text={this.props.costSettings.sourceInfo}
                                />
                            </th>   
                            <th className="outline">
                                CO<sub>2</sub> (lbs)
                                <ToolTip
                                    cssId={"co2-table-source"}
                                    placeholderString={"?"}
                                    cssClass={"tool-tip table-tool-tip"}
                                    text={this.props.emissionsSettings.sourceInfo}
                                />
                            </th>
                            <th className="outline">
                                NO<sub>2</sub> (lbs)
                                <ToolTip
                                    cssId={"no2-table-source"}
                                    placeholderString={"?"}
                                    cssClass={"tool-tip table-tool-tip"}
                                    text={this.props.emissionsSettings.sourceInfo}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="outline" id="car-title">
                                Car
                            </td>
                            <td className="outline" id="car-cost">
                                {this.props.data.cost[0]}
                                {this.colorOnMin(this.props.data.cost, 0, "car-cost")}
                            </td>
                            <td className="outline" id="car-time">
                                {this.props.data.time[0]}
                                {this.colorOnMin(this.props.data.time, 0, "car-time")}
                            </td>

                            <td className="outline" id="car-co2">
                                {this.props.data.co2[0]}
                                {this.colorOnMin(this.props.data.co2, 0, "car-co2")}
                            </td>
                            <td className="outline" id="car-no2">
                                {this.props.data.no2[0]}
                                {this.colorOnMin(this.props.data.no2, 0, "car-no2")}
                            </td>
                        </tr>
                        <tr>
                            <td className="outline" id="diesel-title">
                                Diesel Train
                            </td>
                            <td className="outline" id="diesel-cost">
                                {this.props.data.cost[1]}
                                {this.colorOnMin(this.props.data.cost, 1,"diesel-cost")}
                            </td>
                            <td className="outline" id="diesel-time">
                                {this.props.data.time[1]}
                                {this.colorOnMin(this.props.data.time, 1,"diesel-time")}
                            </td>
                            <td className="outline" id="diesel-co2">
                                {this.props.data.co2[1]}
                                {this.colorOnMin(this.props.data.co2, 1,"diesel-co2")}
                            </td>
                            <td className="outline" id="diesel-no2">
                                {this.props.data.no2[1]}
                                {this.colorOnMin(this.props.data.no2, 1,"diesel-no2")}
                            </td>
                        </tr>
                        <tr>
                            <td className="outline" id="electric-title">
                                Electric Train
                            </td>
                            <td className="outline" id="electric-cost">
                                {this.props.data.cost[2]}
                                {this.colorOnMin(this.props.data.time, 2,"electric-cost")}
                            </td>
                            <td className="outline" id="electric-time">
                                {this.props.data.time[2]}
                                {this.colorOnMin(this.props.data.time, 2,"electric-time")}
                            </td>
                            <td className="outline" id="electric-co2">
                                {this.props.data.co2[2]}
                                {this.colorOnMin(this.props.data.co2, 2,"electric-co2")}                                
                            </td>
                            <td className="outline" id="electric-no2">
                                {this.props.data.no2[2]}
                                {this.colorOnMin(this.props.data.no2, 2,"electric-no2")}
                            </td>
                        </tr>                
                    </tbody>
                </table>
            </div>
        );
    }
}