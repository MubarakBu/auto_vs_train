/*
 * GraphDisplay
 *
 * Description: Graphical representation of the datasets
 *
 * Props:
 *      data - the formatted information for the graph style
 *      id - the JSX/HTML id of the component
 *      updateNotifier - a value that changes whenever the IndexPage 
 *          has new data
 *      sourceInfo - the information to display in the tool tip such 
 *          as the source for the equation
 *      values - the formatted values for the graph to display
 *
 */

// REACT IMPORTS
import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import ReactTooltip from 'react-tooltip';
// COMPONENT IMPORTS
import ToolTip from "../ToolTip/ToolTip"

// CSS IMPORTS
import './css/GraphDisplay.css';

export default class GraphDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.refs = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.updateNotifier != prevProps.updateNotifier) {
            this.props.values.forEach((el, index) => {

                this.refs.chart.chartInstance.data.datasets[index].data = el;

            });
            this.refs.chart.chartInstance.update();
        }
    }

    render() {
        const options = {maintainAspectRatio: false, scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }}]}};

        return(
            <div className="chart-container">
                <ToolTip
                    cssId={`${this.props.id}-graph-tool-tip`}
                    placeholderString={"?"}
                    cssClass={"tool-tip"}
                    text={this.props.sourceInfo}
                /> 
                <HorizontalBar 
                    data={this.props.data} 
                    options={options}
                    className="chart" 
                    id={this.props.id}
                    ref={"chart"}
                />
            </div>
        );

    }
}