import React from 'react'
import './MainPanel.css'
import { CustomRouter, Route } from './CustomRouter'
import Home from './Home/Home'
import Projects from './Projects/Projects'

const ControlButton = (props) => {
    return (
        <div 
            className='-main-controls-button'
            onClick={() => props.x(props.name)}
        >
            {props.name.substring(0, 1).toUpperCase() + props.name.slice(1)}
        </div>
    )
}

export default function MainPanel() {
    const [currentRoute, setCurrentRoute] = React.useState("home");

    return (
        <div className='-main'>
            <div className='-main-controls'>
                <div className='-main-logo josefin'>
                    HALCYON.
                </div>
                <div className='-main-controls-buttons-wrapper'>
                    <ControlButton 
                        x={setCurrentRoute} 
                        name="home"
                    />
                    <ControlButton 
                        x={setCurrentRoute} 
                        name="projects"
                    />
                </div>
            </div>
            <div className='-main-display-y-fade'></div>
            <div className='-main-display'>
                <CustomRouter currentRoute={currentRoute}>
                    <Route route="home">
                        <Home/>
                    </Route>
                    <Route route="projects">
                        <Projects/>
                    </Route>
                </CustomRouter>
            </div>
        </div>
    )
}
