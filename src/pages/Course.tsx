import React, { useEffect } from "react"
import { CourseHome } from "../components"
import { node } from "cope-client-utils"
import { EdgeType } from "cope-client-utils/lib/graphql/API"

export const Course = ({ data }) => {
    const { T_OG_TITLE, connectedNodes, courseId } = data
    console.log("data", data)

    return (
        <CourseHome courseTitle={T_OG_TITLE.content} modules={connectedNodes} courseId={courseId} />
    )
}
