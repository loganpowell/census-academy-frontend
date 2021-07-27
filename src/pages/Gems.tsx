import React from "react"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import styled from "styled-components"
import { primary_color } from "../theme/colors"
//import {} from "styled-system"
import { Row, Col } from "antd"
import { Link } from "../components"
import { Card } from "antd"

const ImageWrapper = styled.div`
    margin: -24px -24px 0px;
`

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
            <Link to={link}>
                <Image src={image} alt={title} />
            </Link>
            <GemCardHeader>{title}</GemCardHeader>
            <GemDate>{date}</GemDate>
        </GemWrapper>
    )
}

export const Gems = ({ data }) => {
    console.log("Gems data:", data)
    const items = data

    return (
        <Row>
            {items.map((item, index) => {
                const { id } = item
                const assets = item?.assets?.items
                const { cover, title, body } = assets.reduce(
                    (a, c) => {
                        const { type, name, content } = c
                        switch (type) {
                            case "T_BODY": {
                                //  console.log("content:", content)
                                const b = unified()
                                    .use(parse)
                                    .use(remark2react)
                                    .processSync(content).result
                                return (a.body = b), a
                            }
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
                            date={"June 1, 2021"}
                            link={`/gems/${id}`}
                        />
                    </Col>
                )
            })}
        </Row>
    )
}
