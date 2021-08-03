import React from "react"
import styled from "styled-components"
import { Collapse } from "antd"
import { Link } from ".."
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"

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

const StyledItem = styled.li`
    list-style-type: circle;
    margin-left: 32px;
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
                {modules.map(module => (
                    <Panel
                        key={module.node.id}
                        // for the header currently just using node id
                        // however what would likely be a better choice is
                        // using a T_OG_TITLE asset on the node
                        header={module.node.id}
                    >
                        <p>What this module will cover:</p>
                        <ul>
                            {/* we should not be using the asset id.
                                    ideally, this would actually be another list
                                    of connected nodes representing the
                                    sub modules on this section.
                                    and on the node itself, it should have a T_OG_TITLE
                                    asset, which we can use instead of asset id
                                */}
                            {module.node.assets?.items.map(asset => (
                                <StyledItem key={asset.id}>{asset.id}</StyledItem>
                            ))}
                        </ul>
                        <Link
                            href={`courses/${courseId}/module/${module.node.id}`}
                            style={LinkStyles}
                        >
                            Go to Module
                        </Link>
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}
