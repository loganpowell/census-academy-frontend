import React from "react"
import styled from "styled-components"
import YouTube from "react-youtube"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"

const Wrapper = styled.div`
    width: 100%;
    max-width: 650px;
`

export const CourseSubmodule = ({ submodule }) => {
    const { T_OG_TITLE, T_BODY, A_VIDEO } = submodule
    const id = A_VIDEO?.content.split("/").pop()
    const body = unified().use(parse).use(remark2react).processSync(T_BODY?.content).result

    console.log("course submodule info", submodule)

    // TODO
    // should have more robust ways to check assets attached to a node
    // and render + lay them out appropriately (e.g. similar to how we
    // handle content preview on COPE)
    return (
        <div style={{ maxWidth: "1000px" }}>
            <h1>{T_OG_TITLE ? T_OG_TITLE.content : "Course Submodule"}</h1>

            {A_VIDEO && (
                <Wrapper>
                    <YouTube videoId={id} />
                </Wrapper>
            )}

            {T_BODY && body}
        </div>
    )
}
