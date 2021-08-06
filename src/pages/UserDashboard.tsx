import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { Row, Col, Divider, Card, Button } from "antd"
import { Breadcrumbs, Link } from "../components"
import { CTX } from "../context"
import { primary_color } from "../theme/colors"

// importing this and using this query here
// isn't in the spirit of our architecture
// data queries should live within `router/index.ts`
// but for now we need to query here since to get user data since
// we either need to make a call to the amplify API OR
// useContext(CTX) and pull `user` from the context
// since these are the two ways I'm aware to get the user ID so we can
// then query the user node...i'm querying the user node here, since
// `router/index.ts` is not a react component
import { node } from "cope-client-utils"

const mockData = {
    coursesAndChallenges: [
        {
            type: "course",
            image: "https://i.picsum.photos/id/126/300/200.jpg?hmac=fXUWYFrtVitPvv_lkslT9QHgCh-cy7bJyDSF65Rqcr0",
            title: "Census Data with R",
            link: "#",
        },
        {
            type: "course",
            image: "https://i.picsum.photos/id/126/300/200.jpg?hmac=fXUWYFrtVitPvv_lkslT9QHgCh-cy7bJyDSF65Rqcr0",
            title: "Open Mapping Education Series",
            link: "#",
        },
        {
            type: "course",
            image: "https://i.picsum.photos/id/126/300/200.jpg?hmac=fXUWYFrtVitPvv_lkslT9QHgCh-cy7bJyDSF65Rqcr0",
            title: "Analyzing Census Data in Excel",
            link: "#",
        },
    ],
    gems: [
        {
            image: "https://i.picsum.photos/id/126/300/200.jpg?hmac=fXUWYFrtVitPvv_lkslT9QHgCh-cy7bJyDSF65Rqcr0",
            title: "Spatial Shifts in Daytime Population Due to COVID - Impacts and Increasing Levels of Remote Work",
            date: "July 21, 2021",
            link: "#",
        },
        {
            image: "https://i.picsum.photos/id/126/300/200.jpg?hmac=fXUWYFrtVitPvv_lkslT9QHgCh-cy7bJyDSF65Rqcr0",
            title: "Exploring Census Data: How Americans Spend Leisure Time",
            date: "July 22, 2021",
            link: "#",
        },
        {
            image: "https://i.picsum.photos/id/126/300/200.jpg?hmac=fXUWYFrtVitPvv_lkslT9QHgCh-cy7bJyDSF65Rqcr0",
            title: "Economic Censuses and Surveys",
            date: "July 28, 2021",
            link: "#",
        },
        {
            image: "https://i.picsum.photos/id/126/300/200.jpg?hmac=fXUWYFrtVitPvv_lkslT9QHgCh-cy7bJyDSF65Rqcr0",
            title: "Economic Censuses and Surveys",
            date: "July 28, 2021",
            link: "#",
        },
    ],
    webinars: [
        {
            title: "How to Create and Customize a Map using data.census.gov",
            date: "June 28, 2021",
            description:
                "In this Data Gem, we will show you how to use this feature to customize and visualize data for your area.",
            link: "#",
        },
        {
            title: "How to Access American Community Survey Data Using Census Reporter",
            date: "May 14, 2021",
            description:
                "In this Data Gem, you will learn about Census Reporter, a data tool that allows you to access and visualize American Community Survey data for a variety of topics and geographic levels.",
            link: "#",
        },
        {
            title: "How to Use the COVID-19 Data Hub",
            date: "September 04, 2020",
            description:
                "This Data Gem will explore the new COVID-19 Hub and the resource page developed by the Census Bureau.",
            link: "#",
        },
    ],
}

const ProfilePicture = styled.img`
    width: 100%;
    border-radius: 50%;
    border: 3px solid var(--amplify-primary-tint);

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`

const ProfileHeader = styled.h1`
    font-size: 2rem;
    font-weight: bold;
`

const ProfileDescription = styled.p`
    font-size: 1.25rem;
    width: 75%;
`

const SectionHeader = styled.h2`
    margin: 8px 0;
    font-size: 1.5rem;
    font-weight: 700;
`

const StyledCard = styled(Card)`
    border-radius: 5px;
    border: 2px solid ${primary_color};
    margin: 0px 12px;
    height: 100%;
    position: relative;
`

const LinkStyles = {
    color: "white",
    fontWeight: 500,
    backgroundColor: "#048392",
    padding: "4px 8px",
    borderRadius: "5px",
}

const CenteredWrapper = styled.div`
    align-items: center;
    text-align: center;
`

const ImageWrapper = styled.div`
    margin: -24px -24px 0px;
`

const Image = styled.img`
    display: block;
    width: 100%;
    border-bottom: 2px solid ${primary_color};
`

const CourseCard = ({ type, image, title, link }) => {
    return (
        <StyledCard>
            <ImageWrapper>
                <Image src={image} alt={title} />
            </ImageWrapper>
            <h2>{title}</h2>
            <CenteredWrapper>
                {type === "course" && (
                    <Link href={link} style={LinkStyles}>
                        Continue Course
                    </Link>
                )}
                {type === "dataChallenge" && (
                    <Link href={link} style={LinkStyles}>
                        Take the Challenge
                    </Link>
                )}
            </CenteredWrapper>
        </StyledCard>
    )
}
const WebinarDate = styled.p`
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
`
const WebinarCard = ({ title, date, description, link }) => {
    return (
        <StyledCard>
            <h2>{title}</h2>
            <WebinarDate>{date}</WebinarDate>
            <p>{description}</p>
            <CenteredWrapper>
                <Link href={link} style={LinkStyles}>
                    Watch Webinar
                </Link>
            </CenteredWrapper>
        </StyledCard>
    )
}

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

// TODO populate user dashboard with data from user account node!!
export const UserDashboard = ({ data }) => {
    const [userNode, setUserNode] = useState(null)
    const { parse, user, authState } = useContext(CTX)
    const { URL_PATH } = parse()
    useEffect(() => {
        const fetchAccountNode = async () => {
            // this query should work, but I haven't been able
            // to test this query fully since my account does not have
            // an account node yet -- Tommy
            const res = await node.read({ id: `ACCOUNT-${user?.username}` })
            setUserNode(res)
        }
        fetchAccountNode()
    }, [user])

    return (
        <>
            <Breadcrumbs path={URL_PATH} />
            <Row>
                <Col span={4} style={{ textAlign: "center" }}>
                    <ProfilePicture
                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                        alt="Placeholder profile picture"
                    />
                </Col>
                <Col span={2} />
                <Col span={18}>
                    <ProfileHeader>My Profile</ProfileHeader>
                    <ProfileDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </ProfileDescription>
                </Col>
            </Row>
            <Row>
                <Col span={6}></Col>
                <Col span={2}>Badge</Col>
                <Col span={2}>Badge</Col>
                <Col span={2}>Badge</Col>
                <Col span={2}>Badge</Col>
                <Col span={2}>Badge</Col>
                <Col span={2}>Badge</Col>
            </Row>
            <Divider />
            {/* Subsection Header */}
            <Row>
                <SectionHeader>Courses & Data Challenges</SectionHeader>
            </Row>
            <Row>
                {mockData.coursesAndChallenges.map((item, i) => (
                    <Col span={8} key={i}>
                        <CourseCard
                            type={item.type}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                        />
                    </Col>
                ))}
            </Row>
            {/* Subsection Header */}
            <Row>
                <SectionHeader>Webinars</SectionHeader>
            </Row>
            <Row style={{ display: "flex" }}>
                {mockData.webinars.map((webinar, i) => (
                    <Col span={8} key={i} style={{ flex: 1 }}>
                        <WebinarCard
                            title={webinar.title}
                            date={webinar.date}
                            description={webinar.description}
                            link={webinar.link}
                        />
                    </Col>
                ))}
            </Row>
            {/* Subsection Header */}
            <Row>
                <SectionHeader>Recommended for you</SectionHeader>
            </Row>
            <Row>
                {mockData.gems.map((gem, i) => (
                    <Col span={6} key={i}>
                        <DataGemCard
                            title={gem.title}
                            image={gem.image}
                            date={gem.date}
                            link={gem.link}
                        />
                    </Col>
                ))}
            </Row>
        </>
    )
}
