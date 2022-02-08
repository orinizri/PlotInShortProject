import React from 'react';
import './about.css'


const About = () => {
    return (
        <div className="about-container">
            <h1>In short, graphs are fun!</h1>
            <h3>The purpose of this website is to allow plotting pretty graphs in an easy and convenient way.</h3>
            <p>However, there are few restrictions you should be aware of while using this website:</p>
            <ul>
                <li>Columns' names must be unique.</li>
                <li>Y axis values must be numeric.</li>
            </ul>
            <h3>That's it, enjoy your data!</h3>
        </div>
        )
}
export default About;