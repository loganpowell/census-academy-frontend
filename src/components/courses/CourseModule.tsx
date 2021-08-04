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

const SectionTitle = styled.h2`
    font-size: 1rem;
`

const SectionWrapper = styled.div`
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

export const CourseModule = ({ courseId, moduleTitle, moduleDescription, submodules }) => {
    return (
        <>
            <StyledTitle>{moduleTitle ? moduleTitle : "Module Title"}</StyledTitle>
            {/* this lorem ipsum text should be replaced with a T_OG_DESCRIPTION asset that is
                attached to a module node */}
            {moduleDescription && (
                <SectionWrapper>
                    <SectionTitle>Module Description</SectionTitle>
                    <p>{moduleDescription}</p>
                </SectionWrapper>
            )}

            <SectionWrapper>
                <SectionTitle>Module Content</SectionTitle>
                <ol>
                    {submodules.map(submodule => {
                        const items = convert_assets_to_object(submodule.node.assets.items)
                        const { T_OG_TITLE } = items
                        return (
                            <StyledItem key={submodule.node.id}>
                                <Link href={`courses/${courseId}/submodule/${submodule.node.id}`}>
                                    {T_OG_TITLE ? T_OG_TITLE.content : submodule.node.id}
                                </Link>
                            </StyledItem>
                        )
                    })}
                </ol>
            </SectionWrapper>
        </>
    )
}
