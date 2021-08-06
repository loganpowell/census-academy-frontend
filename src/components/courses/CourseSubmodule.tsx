import React from "react"
import styled from "styled-components"
import YouTube from "react-youtube"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import { Link } from "../../components/Link"

const SectionWrapper = styled.div`
    font-size: 1rem;
    background: white;
    padding: 16px;
    border: thin solid #d9d9d9;
    margin-bottom: 16px;
    max-width: 1000px;
`

const Wrapper = styled.div`
    width: 100%;
    max-width: 650px;
    margin: 16px 0;
`

const StyledHeader = styled.h1`
    font-size: 1.125rem;
    display: inline;
`

const LinkStyles = {
    display: "inline",
    float: "right",
    margin: "0 8px",
}

export const CourseSubmodule = ({ submodule, prev, next }) => {
    const { T_OG_TITLE, T_BODY, A_VIDEO } = submodule
    const id = A_VIDEO?.content.split("/").pop()
    const body = unified().use(parse).use(remark2react).processSync(T_BODY?.content).result

    // TODO
    // should have more robust ways to check assets attached to a node
    // and render + lay them out appropriately (e.g. similar to how we
    // handle content preview on COPE)
    return (
        <SectionWrapper>
            <StyledHeader>{T_OG_TITLE ? T_OG_TITLE.content : "Course Submodule"}</StyledHeader>
            {next.length !== 0 && (
                <Link
                    style={LinkStyles}
                    // TODO refactor!!
                    // not a clean implementation!! next and prev are arrays with
                    // objects in them, when we really would just like the object
                    // this works for now but really need to refactor this
                    href={`courses/${submodule.courseId}/submodule/${next[0].toNode}`}
                >
                    Next
                </Link>
            )}
            {prev.length !== 0 && (
                <Link
                    style={LinkStyles}
                    href={`courses/${submodule.courseId}/submodule/${prev[0].fromNode}`}
                >
                    Previous
                </Link>
            )}

            {A_VIDEO && (
                <Wrapper>
                    <YouTube videoId={id} />
                </Wrapper>
            )}

            {T_BODY && body}
        </SectionWrapper>
    )
}
