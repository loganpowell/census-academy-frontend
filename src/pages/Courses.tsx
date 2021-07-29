import React, { useContext } from "react"
import { CTX } from "../context"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import styled from "styled-components"
import { primary_color } from "../theme/colors"
import { Row, Col } from "antd"
import { Link, Breadcrumbs } from "../components"

const Image = styled.img`
    display: block;
    width: 100%;
    border-bottom: 2px solid ${primary_color};
`

const CourseWrapper = styled.div`
    margin: 0px 8px;
    padding: 16px;
    border: 1px solid ${primary_color};
    border-radius: 4px;
`

const CourseCardHeader = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
    display: inline-block;
`

const LinkStyles = {
    color: "white",
    fontSize: "1.125rem",
    fontWeight: 500,
    backgroundColor: "#048392",
    padding: "4px 8px",
    borderRadius: "5px",
    float: "right",
}

const CourseCard = ({ image, title, date, link }) => {
    return (
        <CourseWrapper>
            {image && <Image src={image} alt={title} />}
            <CourseCardHeader>{title}</CourseCardHeader>
            <Link href={link} style={LinkStyles}>
                Start Course
            </Link>
        </CourseWrapper>
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

export const Courses = ({ data }) => {
    // console.log("Gems data:", data)
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()
    const items = data

    return (
        <>
            <Breadcrumbs path={URL_PATH} />
            <Row>
                <Col span={24}>
                    <StyledHero>
                        <HeroHeader>Courses</HeroHeader>
                        <HeroSubHeading>
                            Take courses with Census Academy to help build your knowledge and
                            skillsets!
                        </HeroSubHeading>
                    </StyledHero>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Wrapper>
                        <SectionHeading>All Courses</SectionHeading>
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

                    console.log("cover", cover)
                    return (
                        <Col sm={24} key={index}>
                            <CourseCard
                                image={cover}
                                title={title}
                                date={formattedDate}
                                link={`courses/${id}`}
                            />
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
