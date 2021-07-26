import React from "react"
import styled from "styled-components"
import { Row, Col, Button } from "antd"
import { primary_color, tertiary_color } from "../theme/colors"

const Wrapper = styled.div`
    margin: 8px 24px;
`

const StyledButton = styled(Button)`
    color: white;
    font-weight: 500;
    background: #ff7359;
    margin: 16px 16px 16px 0px;
    border-radius: 5px;
    border: none;

    &:hover {
        color: white;
        background: #ff7359;
    }
`

const StyledHero = styled(Col)`
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(4, 131, 146, 1) 80%);
    text-align: center;
`

const HeroHeader = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin: 0;
    color: white;
`

const HeroSubHeading = styled.h2`
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 300;
    text-align: center;
    margin: 0;
    color: white;
`

const SectionHeader = styled.h2`
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
`

const SectionText = styled.p`
    font-size: 1.75rem;
    font-weight: 500;
    width: 60%;
    margin: 0;
`

const DataTopicsHeader = styled.h2`
    font-size: 1rem;
    color: ${primary_color};
`
export const Landing = ({ children }) => (
    <>
        <Row>
            <StyledHero span={24}>
                <HeroHeader>Census Academy</HeroHeader>
                <HeroSubHeading>Your Virtual Hub for Learnign Data Skills</HeroSubHeading>
                <StyledButton style={{ background: "#048392" }}>Start Learning</StyledButton>
                <StyledButton style={{ background: "#048392" }}>Request Data Training</StyledButton>
            </StyledHero>
        </Row>
        {/* Header */}
        <Row style={{ background: "#fff" }}>
            <Col span={24}>
                <Wrapper>
                    <SectionHeader>Browse our data topics</SectionHeader>
                </Wrapper>
            </Col>
        </Row>
        <Row style={{ background: "#fff" }}>
            <Col span={4}>
                <Wrapper>
                    <div>Graphic Here</div>
                    <DataTopicsHeader>Data Science</DataTopicsHeader>
                </Wrapper>
            </Col>
            <Col span={4}>
                <Wrapper>
                    <div>Graphic Here</div>
                    <DataTopicsHeader>Geography</DataTopicsHeader>
                </Wrapper>
            </Col>
            <Col span={4}>
                <Wrapper>
                    <div>Graphic Here</div>
                    <DataTopicsHeader>Data Visualization</DataTopicsHeader>
                </Wrapper>
            </Col>
            <Col span={4}>
                <Wrapper>
                    <div>Graphic Here</div>
                    <DataTopicsHeader>Population</DataTopicsHeader>
                </Wrapper>
            </Col>
            <Col span={4}>
                <Wrapper>
                    <div>Graphic Here</div>
                    <DataTopicsHeader>Business & Economy</DataTopicsHeader>
                </Wrapper>
            </Col>
            <Col span={4}>
                <Wrapper>
                    <div>Graphic Here</div>
                    <DataTopicsHeader>Housing</DataTopicsHeader>
                </Wrapper>
            </Col>
        </Row>
        {/* Header */}
        <Row>
            <Col span={24}>
                <Wrapper>
                    <SectionHeader>For all users of all levels</SectionHeader>
                </Wrapper>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Wrapper>
                    <SectionText>
                        Take courses to use Census data for your business, personal use, or analysis
                        at any level
                    </SectionText>
                    <StyledButton>Take Courses</StyledButton>
                </Wrapper>
            </Col>
            <Col span={12}>images</Col>
        </Row>
        {/* Header */}
        <Row style={{ background: tertiary_color }}>
            <Col span={12}></Col>
            <Col span={12}>
                <Wrapper>
                    <SectionHeader style={{ color: "white" }}>
                        For small businesses and data enthusiasts
                    </SectionHeader>
                </Wrapper>
            </Col>
        </Row>
        <Row style={{ background: tertiary_color }}>
            <Col span={12}>images</Col>
            <Col span={12}>
                <Wrapper>
                    <SectionText style={{ color: "white" }}>
                        Browse our Data Gem videos and apply those skills to analyze data and
                        business tools in Data Challenges
                    </SectionText>
                    <StyledButton>Browse Data Gems</StyledButton>
                    <StyledButton>Take Data Challenges</StyledButton>
                </Wrapper>
            </Col>
        </Row>
        {/* Header */}
        <Row style={{ background: "#048392" }}>
            <Col span={24}>
                <Wrapper>
                    <SectionHeader style={{ color: "white" }}>
                        For data enthusiasts and analysts
                    </SectionHeader>
                </Wrapper>
            </Col>
        </Row>
        <Row style={{ background: "#048392" }}>
            <Col span={12}>
                <Wrapper>
                    <SectionText style={{ color: "white" }}>
                        Watch webinars live or pre-recorded about Census data and current trends on
                        your own schedule
                    </SectionText>
                    <StyledButton>Watch Webinars</StyledButton>
                </Wrapper>
            </Col>
            <Col span={12}>images</Col>
        </Row>
    </>
)
