import React from "react"
import { Result, Button } from "antd"
import { Link } from "../components"

export const Error404 = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<a href="/">Back Home</a>}
    />
)
