import React from "react"
import styled from "styled-components"
import { Collapse } from "antd"
import { Link } from ".."
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import { convert_assets_to_object } from "../../utils"

const { Panel } = Collapse

const StyledTitle = styled.h1`
    font-size: 1.5rem;
`

const CourseDescription = styled.div`
    font-size: 1rem;
    background: white;
    padding: 8px;
    border: thin solid #d9d9d9;
    margin-bottom: 16px;
`

const LinkStyles = {
    color: "white",
    fontSize: ".8rem",
    fontWeight: 500,
    backgroundColor: "#048392",
    padding: "4px 8px",
    borderRadius: "5px",
    float: "right",
    bottom: "32px",
}

export const CourseHome = ({ courseTitle, courseDescription, modules, courseId }) => {
    // TODO make this page mobile friendly!!!
    // the antd Layout component is not mobile friendly!!
    const body = unified().use(parse).use(remark2react).processSync(courseDescription).result

    return (
        <>
            {/* populate content with overview of each submodule */}
            <StyledTitle>{courseTitle}</StyledTitle>
            <CourseDescription>{body}</CourseDescription>
            <Collapse>
                {modules.map(module => {
                    const items = convert_assets_to_object(module.node.assets.items)
                    const { T_OG_DESCRIPTION } = items
                    const description = unified()
                        .use(parse)
                        .use(remark2react)
                        .processSync(T_OG_DESCRIPTION?.content).result

                    return (
                        <Panel
                            key={module.node.id}
                            // for the header currently just using node id
                            // however what would likely be a better choice is
                            // using a T_OG_TITLE asset on the node
                            header={module.node.id}
                        >
                            <p>What this module will cover:</p>
                            {T_OG_DESCRIPTION ? description : ""}
                            <Link
                                href={`courses/${courseId}/module/${module.node.id}`}
                                style={LinkStyles}
                            >
                                Go to Module
                            </Link>
                        </Panel>
                    )
                })}
            </Collapse>
        </>
    )
}
