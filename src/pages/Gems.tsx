import React, { useContext } from "react"
import { CTX } from "../context"
import { unified } from "unified"
// import parse from "remark-parse"
import remark2react from "remark-react"
import styled from "styled-components"
import { primary_color } from "../theme/colors"
//import {} from "styled-system"
import { Row, Col } from "antd"
import { Link, Breadcrumbs } from "../components"

const Image = styled.img`
    display: block;
    width: 100%;
    border-bottom: 2px solid ${primary_color};
`

const GemWrapper = styled.div`
    margin: 0px 8px;
`

const GemCardHeader = styled.h2`
    font-size: 0.8rem;
    font-weight: bold;
    margin: 0;
`

const GemDate = styled.p`
    margin: 0;
    font-size: 0.8rem;
`

const DataGemCard = ({ image, title, date, link }) => {
    return (
        <GemWrapper>
            <Link href={link}>
                <Image src={image} alt={title} />
            </Link>
            <GemCardHeader>{title}</GemCardHeader>
            <GemDate>{date}</GemDate>
        </GemWrapper>
    )
}

const StyledHero = styled.div`
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, rgba(2, 0, 36, 1) 0%, rgba(4, 131, 146, 1) 80%);
    text-align: center;
    padding: 48px;

    @media (max-width: 400px) {
        margin-left: -20%;
        margin-right: -20%;
    }
`

const HeroHeader = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin: 0;
    color: white;
`

const HeroSubHeading = styled.p`
    font-size: 1.25rem;
    font-weight: 300;
    text-align: center;
    margin: 0;
    color: white;
`

const Wrapper = styled.div`
    margin: 8px 24px;
`

const SectionHeading = styled.h2`
    font-size: 1.75rem;
    font-color ${primary_color};
    font-weight: 500;
`

export const Gems = ({ data }) => {
    const { parse } = useContext(CTX)
    const { URL_PATH } = parse()
    const items = data

    return (
        <>
            <Breadcrumbs path={URL_PATH} />
            <Row>
                <Col span={24}>
                    <StyledHero>
                        <HeroHeader>Data Gems</HeroHeader>
                        <HeroSubHeading>
                            Watch Data Gems: a series of &quot;how-to&ldquo; videos available for
                            data users who are looking for an easy and quick way to enhance their
                            knowledge of Census data.
                        </HeroSubHeading>
                    </StyledHero>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Wrapper>
                        <SectionHeading>All Data Gems</SectionHeading>
                    </Wrapper>
                </Col>
            </Row>
            <Row style={{ padding: "0px 16px", marginBottom: "64px" }} gutter={[8, 24]}>
                {items.map((item, index) => {
                    const { id } = item
                    const assets = item?.assets?.items
                    const date = Date.parse(item?.createdAt)
                    const formattedDate = new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }).format(date)
                    const { cover, title, body } = assets.reduce(
                        (a, c) => {
                            const { type, name, content } = c
                            switch (type) {
                                // case "T_BODY": {
                                //     //  console.log("content:", content)
                                //     const b = unified()
                                //         .use(parse)
                                //         .use(remark2react)
                                //         .processSync(content).result
                                //     return (a.body = b), a
                                // }
                                case "A_VIDEO": {
                                    const parts = content.split("/")
                                    const id = parts[parts.length - 1]
                                    return (a.cover = `https://img.youtube.com/vi/${id}/0.jpg`), a
                                }
                                case "A_IMAGE":
                                    return (a.cover = content), a
                                case "T_OG_TITLE":
                                    return (a.title = content), a
                                default:
                                    return a
                            }
                        },
                        { cover: null, title: null, body: null }
                    )

                    return (
                        <Col lg={6} md={12} sm={24} key={index}>
                            <DataGemCard
                                image={cover}
                                title={title}
                                date={formattedDate}
                                link={`gems/${id}`}
                            />
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
