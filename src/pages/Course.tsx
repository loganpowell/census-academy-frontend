import React, { useEffect } from "react"
import { CourseHome } from "../components"
import { node } from "cope-client-utils"
import { EdgeType } from "cope-client-utils/lib/graphql/API"

export const Course = ({ data }) => {
    const { courseId } = data
    console.log("data", data)

    return <CourseHome />
}
