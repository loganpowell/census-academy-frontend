import React, { useContext } from "react"
import { CTX } from "../../context"
import { Layout, Menu } from "antd"
import { Breadcrumbs } from ".."

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

export const CourseHome = () => {
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()

    return (
        <Layout style={{ margin: "32px" }}>
            <Sider style={{ background: "white" }}>
                {/* populate sidebar with sections and navigation */}
                <Menu mode="inline">
                    <SubMenu key="sub1" title="subnav 1">
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="subnav 2">
                        <Menu.Item key="4">nav 1</Menu.Item>
                        <Menu.Item key="5">nav 2</Menu.Item>
                        <Menu.Item key="6">nav 3</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ marginLeft: "16px" }}>
                {/* populate content with overview of each submodule */}
                <Breadcrumbs path={URL_PATH} />
                <div>
                    <p>Content content</p>
                </div>
            </Content>
        </Layout>
    )
}
