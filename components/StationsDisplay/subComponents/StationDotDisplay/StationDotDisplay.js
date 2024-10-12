// REACT IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENT IMPORTS

// CSS IMPORTS
import './css/StationDotDisplay.css';


export default class StationDotDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.component = React.createRef();
    }

    /*
     * positionDot()
     *
     * Description: Angles the station name tag correctly. This has to be done 
     *      specially because it is dependent on the height of the text which
     *      you can only get after rendering it.
     *
     * Arguments: 
     *      angle: integer - the angle the tag will be from horizontal. In the 
     *          4th quarter of the coordinate plane
     *      distFromDotCenterToText: integer - How far the text will be from 
     *          the center of the 
     * Returns:
     *      N/A
     */
    positonDot(angle, distFromDotCenterToText) {
        
        let xOffset = this.props.xOffset;
        let yOffset = this.props.yOffset;
        let width   = this.refs.stationName.getBoundingClientRect().width;
        let height  = this.refs.stationName.getBoundingClientRect().height;

        this.refs.stationName.setAttribute("style", ``);
        this.refs.stationName.setAttribute("style", `color: blue;`);
        this.refs.stationName.setAttribute("style", `
            transform: rotate(${angle}deg);
            transform-origin: -${distFromDotCenterToText}px ${height/2}px;
            top: ${yOffset}px;
            left: ${xOffset+distFromDotCenterToText}px;
        `);
    }

    componentDidMount() {

        // Style values, change these here
        let angle = this.props.tagAngle;
        let dist  = this.props.tagDistance;

        this.positonDot(angle, dist);
    }

    render() {
        return (
            <div className="station" ref="station">
                <div className="station-dot">
                    <div className="inner-station-dot"></div>
                </div>
                <span className="station-name" ref="stationName">{this.props.name}</span>
            </div>
        );
    }
}