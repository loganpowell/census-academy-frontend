import React, { useContext } from "react"
import { CTX } from "../../context"
import { Layout } from "antd"
import { Breadcrumbs } from ".."
const { Header, Content, Footer, Sider } = Layout

export const CourseHome = () => {
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()

    return (
        <Layout style={{ margin: "32px" }}>
            <Sider style={{ background: "white" }}>
                {/* populate sidebar with sections and navigation */}
                <div>Some side bar content</div>
            </Sider>
            <Content style={{ marginLeft: "16px" }}>
                {/* populate content with overview of each submodule */}
                <Breadcrumbs path={URL_PATH} />
                <p>
                    Content content <code>:D</code>
                </p>
            </Content>
        </Layout>
    )
}
