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

export const CourseModule = ({ courseId, moduleTitle, submodules }) => {
    return (
        <>
            <StyledTitle>{moduleTitle}</StyledTitle>
            {/* this lorem ipsum text should be replaced with a T_OG_DESCRIPTION asset that is
                attached to a module node */}
            <SectionWrapper>
                <SectionTitle>Module Description</SectionTitle>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </SectionWrapper>

            <SectionWrapper>
                <SectionTitle>Module Content</SectionTitle>
                <ol>
                    {submodules.map(submodule => (
                        <StyledItem key={submodule.node.id}>
                            <Link href={`courses/${courseId}/submodule/${submodule.node.id}`}>
                                {submodule.node.id}
                            </Link>
                        </StyledItem>
                    ))}
                </ol>
            </SectionWrapper>
        </>
    )
}