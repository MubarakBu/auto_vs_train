/*
 * Name: ToolTip
 *
 * Description: A simple wrapper to make using the react-tooltip component 
 *      drier. Read here: https://github.com/wwayne/react-tooltip
 *
 * Props:
 *      cssID - id of the tool tip, the placeholder is accessed via 
 *          cssID + "-placeholder", and tool tip by cssId + "-text"
 *      cssClass - class of the tool tip, naming same naming convention from 
 *          cssID applies
 *      placeholderString - the string displayed for the user to hover over
 *          to display the tool tip
 *      text - the text displayed by the tool tip while the user hovers
 */

// REACT IMPORTS
import React from 'react';
import ReactTooltip from "react-tooltip";

// COMPONENT IMPORTS
import StringWrapper from './subComponents/StringWrapper/StringWrapper'

// CSS IMPORTS
import './css/ToolTip.css'


export default class DryToolTip extends React.Component {
    render() {
        return (
            <span className={this.props.cssClass} id={this.props.cssId}>
                <a 
                    data-tip 
                    data-for={`${this.props.cssId}-tooltip`}
                >
                    {this.props.placeholderString}
                </a>
                <ReactTooltip 
                    dangerouslySetInnerHTML
                    id={`${this.props.cssId}-tooltip`}
                    effect="solid"
                >
                    {this.props.text}
                </ReactTooltip>
            </span>
        );
    }
}