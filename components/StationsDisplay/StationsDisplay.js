/*
 * StationsDisplay
 *
 * Description: Displays the stations the train would pass through in a graphic
 *
 * Props:
 *      stations - an array of the name of each station visited
 *      screenWidth - a string describing the approximate screen size (i.e. 'xl', 's')
 *
 */

// REACT IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENT IMPORTS
import StationDotDisplay from './subComponents/StationDotDisplay/StationDotDisplay';


// CSS IMPORTS
import './css/StationsDisplay.css';


export default class StationsDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.tagAngle    = 0;
        this.tagDistance = 0;       
    }

    /*
     * createStationGraphic()
     *
     * Description: Creates a station dot component for each station and a 
     *      div for the connecting line. 
     *
     * Arguments:
     *      N/A
     * Returns
     *      N/A
     */ 
    createStationGraphic() {
        let stationDots = [];

        if ( this.props.stations.length != 0) {
            this.props.stations.forEach(function(item, id) {
                // console.log(item);


                if (this.props.screenWidth == "l") {
                    this.tagAngle = 10;
                    this.tagDistance = 15;
                  
                } else {

                    this.tagAngle = 40;
                    this.tagDistance = 20;            
                }

                stationDots.push(
                    <StationDotDisplay 
                        name={item} 
                        key={id} 
                        ref={`dot-${id}`}
                        tagAngle={this.tagAngle}
                        tagDistance={this.tagDistance}
                        xOffset={-10}
                        yOffset={-7}
                    />
                );

            }, this); 
            return (
                <div id="stations-graphic">
                    <div id="connecting-line" ref="connectingLine"></div>
                    <div id="dots" ref="dots">
                        {stationDots}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }


    /*
     * shortenConnectingLine()
     *
     * Description: The connecting line has to be shortened based on the width
     *      of the last station dot, which you can only get after it renders
     *
     * Arguments: 
     *      N/A
     * Returns:
     *      N/A
     */
    shortenConnectingLine() {

        if (this.props.stations.length != 0){
            let lastDot = this.refs[`dot-${this.props.stations.length-1}`].refs.station;
            let connectingLine = this.refs.connectingLine;

 

            if (["xs", "s", "m"].includes(this.props.screenWidth)) {

                let dots = this.refs['dots'];

                let height = 0;

                for (const e of dots.children) {
                    height += e.getBoundingClientRect().height;
                }

                let lastDotHeight = lastDot.getBoundingClientRect().height;


                connectingLine.setAttribute("style", `
                    height: ${height - lastDotHeight+15}px;
                `);

            } else {

                let lastDotWidth = lastDot.getBoundingClientRect().width; 

                connectingLine.setAttribute("style", `
                    width: calc(100% - ${lastDotWidth}px + 5px);
                `);

            }
        }  
    }

    componentDidUpdate() {
        this.shortenConnectingLine();

    }


    render() {
        return (
            <div id="StationsDisplay">
                <div className="section-title">
                    Stations
                </div>
                    {this.createStationGraphic()}
                    <style jsx>{`
                        #StationsDisplay{
                            display: ${this.props.stations.length == 0 ? 'none' : 'auto'};
                        }
                    `}</style>              
            </div>
        );
    }
}