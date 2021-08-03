import React, { useEffect } from "react"
import { CourseHome, CourseContent } from "../components"
import { node } from "cope-client-utils"
import { EdgeType } from "cope-client-utils/lib/graphql/API"

export const Course = ({ data }) => {
    const { T_OG_TITLE, connectedNodes, courseId, path } = data
    let displayComponent
    console.log("data", data)
    console.log("current path:", path)

    switch (path.pop()) {
        case "home":
            displayComponent = (
                <CourseHome
                    courseTitle={T_OG_TITLE.content}
                    modules={connectedNodes}
                    courseId={courseId}
                />
            )
            break
        default:
            displayComponent = <CourseContent />
    }

    return displayComponent
}
