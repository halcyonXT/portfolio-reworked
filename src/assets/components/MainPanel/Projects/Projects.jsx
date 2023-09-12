import React from 'react'
import './Projects.css'
import ProjectCard from './ProjectCard/ProjectCard'

export default function Projects(props) {
    const [selectedProject, setSelectedProject] = React.useState("typerate")

    return (
        <div className='-projects-wrapper'>
            <ProjectCard
                name="typerate"
                selected={selectedProject === "typerate"}
            />
            <ProjectCard
                name="noteplace"
                selected={selectedProject === "noteplace"}
            />
            <ProjectCard
                name="archess"
                selected={selectedProject === "archess"}
            />
        </div>
    )
}
