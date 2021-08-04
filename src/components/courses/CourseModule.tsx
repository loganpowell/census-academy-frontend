import React from "react"

export const CourseModule = ({ moduleTitle, submodules }) => {
    console.log("course module rendering")
    console.log("submodules", submodules)

    return (
        <div>
            <h1>{moduleTitle}</h1>
            <div>{submodules}</div>
        </div>
    )
}
