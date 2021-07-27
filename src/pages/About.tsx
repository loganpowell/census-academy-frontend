import React, { useContext } from "react"
import { CTX } from "../context"
import { Breadcrumbs, Link } from "../components"
import styled from "styled-components"
import { Row, Col } from "antd"

const LinkStyles = {
    color: "white",
    fontWeight: 500,
    backgroundColor: "#048392",
    padding: "4px 8px",
    borderRadius: "5px",
}

export const About = () => {
    return (
        <>
            <Row>
                <Col lg={16} sm={24}>
                    video here
                </Col>
                <Col lg={8} sm={24}>
                    call to action here
                </Col>
            </Row>
            <div>
                <h1>About Census Academy</h1>
                <h2>Mission Statement</h2>
                <p>
                    The Census Academy team is your virtual hub for learning data skills. We are
                    made of a team that aims to give free, accessible data resources, information,
                    and courses to all level of data users.
                </p>
                <h2>Our Materials</h2>
                <p>
                    Our team of experts is excited to share with you their favorite tips and tricks
                    about how to access and use Census Bureau Data. Our materials will introduce you
                    to various concepts and techniques to improve your ability to navigate our
                    website and use our data-access tools.
                </p>
                <p>
                    Drop us a line at{" "}
                    <a href="mailto: census.academy@census.gov">census.academy@census.gov</a> to let
                    use us know what you think.
                </p>
            </div>
        </>
    )
}
