import React, { useContext } from "react"
import { CTX } from "../context"
import styled from "styled-components"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import YouTube from "react-youtube"
import { Row, Col, Button } from "antd"
import { Breadcrumbs, Link } from "../components"
import { primary_color } from "../theme/colors"

const Wrapper = styled.div`
    margin: 16px 64px;
`

const StyledHero = styled(Col)`
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(4, 131, 146, 1) 80%);
    padding: 48px 32px;
`

const HeroHeader = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    margin-left: 32px;
    color: white;
`

const HeroSubHeading = styled.h2`
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0;
    margin-left: 32px;
    color: white;
`

const StyledParagraph = styled.p`
    display: inline-block;
    font-size: 1.125rem;
    font-weight: bold;
`

const StyledSpan = styled.span`
    display: inline-block;
    margin: 0 4px;
    font-size: 1.125rem;
`

const CourseInfo = styled.div`
    text-align: center;
    padding-top: 16px;
    background: var(--amplify-primary-tint);
    color: white;
`

const LinkStyles = {
    color: "white",
    fontSize: "1rem",
    fontWeight: 500,
    backgroundColor: "#048392",
    margin: "16px",
    padding: "8px 16px",
    borderRadius: "5px",
}

export const CourseOverview = ({ data }) => {
    console.log("Course data:", data)
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()

    const { T_OG_DESCRIPTION, T_BODY, T_OG_TITLE, A_VIDEO, date } = data
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(Date.parse(date))
    const title = T_OG_TITLE?.content
    const body = unified().use(parse).use(remark2react).processSync(T_BODY?.content).result

    return (
        <div style={{ margin: "0px 192px" }}>
            <Breadcrumbs path={URL_PATH} />
            <Row>
                <StyledHero lg={24} md={24} sm={24}>
                    <HeroHeader>{title}</HeroHeader>
                    <HeroSubHeading>{T_OG_DESCRIPTION?.content}</HeroSubHeading>
                    <div style={{ marginLeft: "16px", marginTop: "24px" }}>
                        <Link href="#" style={LinkStyles}>
                            Start Course
                        </Link>
                        {/* User accounts and saving content not fully built out;
                            lets comment this button/link out until it's done */}
                        {/* <Link href="#" style={LinkStyles}>
                            Save for Later
                        </Link> */}
                    </div>
                </StyledHero>
                {/* in the mockup there's an SVG here */}
                {/* <StyledHero lg={6} md={24} sm={24}>
                    icon
                </StyledHero> */}
            </Row>
            <CourseInfo>
                {/* How should we store this information -- separate assets on the
                node? What type should we give those assets? */}
                <StyledParagraph>Skill level: {"Beginner"}</StyledParagraph>
                <StyledSpan>|</StyledSpan>
                <StyledParagraph>Duration: {"0-1 Hour"}</StyledParagraph>
                <StyledSpan>|</StyledSpan>
                <StyledParagraph>Content: {"14 Videos"}</StyledParagraph>
                <StyledSpan>|</StyledSpan>
                <StyledParagraph>Rewards: {"Certificate and 2 Badges"}</StyledParagraph>
            </CourseInfo>
            <Wrapper>
                <h2 style={{ fontWeight: 500 }}>Course Description</h2>
                <p>{body}</p>
            </Wrapper>
        </div>
    )
}
