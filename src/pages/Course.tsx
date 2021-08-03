import React, { useEffect, useContext } from "react"
import { CTX } from "../context"
import { CourseHome, CourseContent, Breadcrumbs, Link } from "../components"
import { Layout, Menu } from "antd"

const { Content, Sider } = Layout
const { SubMenu } = Menu

export const Course = ({ data }) => {
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()
    const { T_OG_TITLE, T_BODY, connectedNodes, courseId, path } = data
    let displayComponent
    console.log("data", data)

    switch (path.pop()) {
        case "home":
            displayComponent = (
                <CourseHome
                    courseTitle={T_OG_TITLE.content}
                    courseDescription={T_BODY.content}
                    modules={connectedNodes}
                    courseId={courseId}
                />
            )
            break
        default:
            displayComponent = <CourseContent />
    }

    return (
        <Layout style={{ margin: "32px" }}>
            <Sider style={{ background: "white" }}>
                {/* populate sidebar with sections and navigation */}
                <Menu mode="inline">
                    {/* we do not want to use asset ids here,
                        ultimately we want to re-work C_COURSE nodes data structure
                        to have children node, which we then render their
                        titles, instead of IDs
                    */}
                    {connectedNodes.map(module => (
                        <SubMenu key={module.id} title={module.id}>
                            {module.node.assets?.items.map(asset => (
                                <Menu.Item key={asset.id}>
                                    <Link href={`courses/${courseId}/module/${module.node.id}`}>
                                        {asset.id}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    ))}
                </Menu>
            </Sider>
            <Content style={{ marginLeft: "16px", maxWidth: "1400px" }}>
                <Breadcrumbs path={URL_PATH} />
                {displayComponent}
            </Content>
        </Layout>
    )
}
