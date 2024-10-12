/*
 * Name: StringWrapper
 *
 * Description: A simple wrapper to display default Javascript strings without
 *      having to worry about React cleaning the input. USE /n FOR NEW LINES
 *
 * Props:
 *      string - the string to be displayed.
 *
 *
 */

// REACT IMPORTS
import React from 'react';

// COMPONENT IMPORTS

// CSS IMPORTS
import './css/StringWrapper.css'

export default function StringWrapper(props) {
    return(
        <span className="string-wrapper-text">{props.string}</span>
    );
}