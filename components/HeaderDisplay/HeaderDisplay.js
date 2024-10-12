/*
 * HeaderDisplay
 *
 * Description: Displays the header text at the top of the home page
 *
 * Props:
 *		N/A
 *
 */

// REACT IMPORTS
import React from 'react';

// COMPONENT IMPORTS

// CSS IMPORTS
import './css/HeaderDisplay.css';


export default class HeaderDisplay extends React.Component {
    render() {
        return (
            <div id="HeaderDisplay">
                <span>Auto vs Train</span>

                {/* TODO: Remove the following line in production build */}
                <br /><a href="/DB_Maintenance">(dev DB page)</a>
            </div>
        );
    }
}