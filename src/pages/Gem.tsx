import React, { useContext } from "react"
import { CTX } from "../context"
import styled from "styled-components"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import { Row, Col, Card } from "antd"
import YouTube from "react-youtube"
import { Breadcrumbs } from "../components"
import { primary_color } from "../theme/colors"
const { Meta } = Card

const Wrapper = styled.div`
    width: 100%;
    max-width: 650px;
`

const ContentHeading = styled.h1`
    font-size: 1.75rem;
    color: ${primary_color};
`

const DateText = styled.p`
    font-size: 1.125rem;
    margin: 8px 0;
`

export const Gem = ({ data }) => {
    // console.log("Gems data:", data)
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()

    const { T_BODY, T_OG_TITLE, A_VIDEO, date } = data
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(Date.parse(date))
    const title = T_OG_TITLE?.content
    const body = unified().use(parse).use(remark2react).processSync(T_BODY?.content).result
    const id = A_VIDEO?.content.split("/").pop()

    return (
        <div style={{ margin: "0px 192px" }}>
            <Breadcrumbs path={URL_PATH} />
            <ContentHeading>{title}</ContentHeading>
            <Wrapper>
                <YouTube videoId={id} />
            </Wrapper>
            <DateText>{formattedDate}</DateText>
            <p>{body}</p>
        </div>
    )
}
