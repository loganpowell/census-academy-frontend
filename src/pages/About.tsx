import React, { useContext } from "react"
import { CTX } from "../context"
import { Breadcrumbs, Link } from "../components"
import styled from "styled-components"
import { Row, Col } from "antd"
import { primary_color } from "../theme/colors"

const VideoContainer = styled.div`
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
`

const YoutubePlayer = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 32px 32px 32px 0;
`

const CallToActionBox = styled.div`
    border: 2px solid hsl(213 65% 19%);
    border-radius: 5px;
    margin: 32px 0;
    padding: 16px;
    text-align: center;
`

const CallToActionHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${primary_color};
`

const LinkStyles = {
    color: "white",
    fontSize: "1.125rem",
    fontWeight: 500,
    backgroundColor: "#048392",
    padding: "4px 8px",
    borderRadius: "5px",
}

const HeaderOne = styled.h1`
    font-size: 2rem;
`

const HeaderTwo = styled.h2`
    font-size: 1.5rem;
    color: ${primary_color};
`

const BodyText = styled.p`
    font-size: 1.125rem;
`

export const About = () => {
    const { parse } = useContext(CTX)
    const { URL_PATH } = parse()

    return (
        <>
            <Breadcrumbs path={URL_PATH} />
            <Row>
                <Col lg={16} sm={24}>
                    <VideoContainer>
                        <YoutubePlayer
                            src="https://www.youtube.com/embed/QHQCbglb3FM"
                            title="YouTube video player for Census Academy"
                        ></YoutubePlayer>
                    </VideoContainer>
                </Col>
                <Col lg={8} sm={24}>
                    <CallToActionBox>
                        <CallToActionHeader>
                            Meet one on one with our Census Academy team
                        </CallToActionHeader>
                        <BodyText>
                            Get personalized support and insider information by setting up an
                            appointment with our experienced data analysts and technicians. This
                            service is free for all interested data users.
                        </BodyText>
                        <a href="mailto: census.academy@census.gov" style={LinkStyles}>
                            Request Data Training
                        </a>
                    </CallToActionBox>
                </Col>
            </Row>
            <div>
                <HeaderOne>About Census Academy</HeaderOne>
                <HeaderTwo>Mission Statement</HeaderTwo>
                <BodyText>
                    The Census Academy team is your virtual hub for learning data skills. We are
                    made of a team that aims to give free, accessible data resources, information,
                    and courses to all level of data users.
                </BodyText>
                <HeaderTwo>Our Materials</HeaderTwo>
                <BodyText>
                    Our team of experts is excited to share with you their favorite tips and tricks
                    about how to access and use Census Bureau Data. Our materials will introduce you
                    to various concepts and techniques to improve your ability to navigate our
                    website and use our data-access tools.
                </BodyText>
                <BodyText>
                    Drop us a line at{" "}
                    <a href="mailto: census.academy@census.gov">census.academy@census.gov</a> to let
                    use us know what you think.
                </BodyText>
            </div>
        </>
    )
}
