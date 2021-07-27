import React, { useContext, useEffect } from "react"
import { Breadcrumb } from "antd"
import { CTX } from "../context"

export const Breadcrumbs = ({ path }) => {
    return (
        <Breadcrumb style={{ margin: "16px 0", textTransform: "capitalize" }}>
            <Breadcrumb.Item>Census Academy</Breadcrumb.Item>
            {path.map((crumb, i) => (
                <Breadcrumb.Item key={i}>{crumb}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}
