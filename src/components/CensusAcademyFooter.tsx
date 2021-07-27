import React from "react"
import styled from "styled-components"
import { Row, Col } from "antd"

const LinkCol = styled(Col)`
    text-align: center;
`

const SeparatedLinks = styled.a`
    color: #fff;
    margin: 0px 4px;

    &:hover {
        color: #fff;
        text-decoration: underline;
    }
`

const ColorSpan = styled.span`
    color: #fff;
`

const FooterSeparator = styled.hr`
    border-top-width: thin;
    border-top-style: solid;
    border-top-color: #405773;
    border-bottom: none;
    margin: 8px 0;
`

const VisionStatement = styled.p`
    text-align: center;
    color: #fff;
    font-size: 1.125rem;
    margin: 0px 0px 0px 0px;
`

export const CensusAcademyFooter = () => (
    <>
        <Row>
            <LinkCol span={24}>
                <SeparatedLinks href="#">Census Jobs</SeparatedLinks>
                <ColorSpan>|</ColorSpan>
                <SeparatedLinks href="#">Information Quality</SeparatedLinks>
                <ColorSpan>|</ColorSpan>
                <SeparatedLinks href="#">Data Linkage Infrastructure</SeparatedLinks>
                <ColorSpan>|</ColorSpan>
                <SeparatedLinks href="#">Data Protection and Privacy Policy</SeparatedLinks>
                <ColorSpan>|</ColorSpan>
                <SeparatedLinks href="#">Accessibility</SeparatedLinks>
                <ColorSpan>|</ColorSpan>
                <SeparatedLinks href="#">FOIA</SeparatedLinks>
                <ColorSpan>|</ColorSpan>
                <SeparatedLinks href="#">U.S. Department of Commerce</SeparatedLinks>
                <ColorSpan>|</ColorSpan>
                <SeparatedLinks href="#">USA.gov</SeparatedLinks>
            </LinkCol>
        </Row>
        <FooterSeparator />
        <Row>
            <Col span={24}>
                <VisionStatement>
                    Measuring America&apos;s People, Places, and Economy
                </VisionStatement>
            </Col>
        </Row>
    </>
)
