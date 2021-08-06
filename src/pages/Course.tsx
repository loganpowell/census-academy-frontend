import React, { useEffect, useContext } from "react"
import { CTX } from "../context"
import { CourseHome, CourseModule, CourseSubmodule, Breadcrumbs, Link } from "../components"
import { Layout, Menu } from "antd"
import { MenuItem } from "@material-ui/core"

const { Content, Sider } = Layout
const { SubMenu } = Menu

export const Course = ({ data }) => {
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()
    const {
        T_OG_TITLE,
        T_OG_DESCRIPTION,
        T_BODY,
        modules,
        submodules,
        courseId,
        path,
        prev,
        next,
    } = data
    let displayComponent

    if (path.pop() === "home") {
        displayComponent = (
            <CourseHome
                courseTitle={T_OG_TITLE.content}
                courseDescription={T_BODY.content}
                modules={modules}
                courseId={courseId}
            />
        )
    } else if (path[2] === "module") {
        displayComponent = (
            <CourseModule
                courseId={courseId}
                moduleTitle={T_OG_TITLE?.content}
                moduleDescription={T_OG_DESCRIPTION?.content}
                submodules={submodules}
            />
        )
    } else if (path[2] === "submodule") {
        displayComponent = <CourseSubmodule submodule={data} prev={prev[0]} next={next[0]} />
    }

    return (
        <Layout style={{ margin: "32px" }}>
            {/* these min and max heights are placeholders -- not sure how sidebar nav
                will look given courses with many, many modules...could be better to
                not have these styles at all */}
            <Sider style={{ background: "white", minHeight: "400px", maxHeight: "600px" }}>
                {/* populate sidebar with sections and navigation */}
                <Menu mode="inline">
                    <Menu.Item key={courseId}>
                        <Link href={`courses/${courseId}/home`}>Course Home</Link>
                    </Menu.Item>
                    {/* we do not want to use asset ids here,
                        ultimately we want to re-work C_COURSE nodes data structure
                        to have children node, which we then render their
                        titles, instead of IDs
                    */}
                    {/* TODO
                        write logic to get nodes connected to module nodes
                        then display submodule titles in submenu items that a user
                        can directly navigate to if desired, based on antd example:
                        https://ant.design/components/layout/#components-layout-demo-top-side
                     */}
                    {modules.map(module => (
                        <Menu.Item key={module.node.id}>
                            <Link href={`courses/${courseId}/module/${module.node.id}`}>
                                {module.node.id}
                            </Link>
                        </Menu.Item>
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
