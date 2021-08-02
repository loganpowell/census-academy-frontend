import React, { useContext } from "react"
import styled from "styled-components"
import { CTX } from "../../context"
import { Layout, Menu, Collapse } from "antd"
import { Breadcrumbs, Link } from ".."

const { Panel } = Collapse
const { SubMenu } = Menu
const { Content, Sider } = Layout

const StyledItem = styled.li`
    list-style-type: circle;
    margin-left: 32px;
`
const LinkStyles = {
    color: "white",
    fontSize: ".8rem",
    fontWeight: 500,
    backgroundColor: "#048392",
    padding: "4px 8px",
    borderRadius: "5px",
    float: "right",
    bottom: "32px",
}

export const CourseHome = ({ courseTitle, modules, courseId }) => {
    const context = useContext(CTX)
    const { URL_PATH } = context.parse()

    // TODO make this page mobile friendly!!!
    // the antd Layout component is not mobile friendly!!
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
                    {modules.map(module => (
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
            <Content style={{ marginLeft: "16px" }}>
                {/* populate content with overview of each submodule */}
                <Breadcrumbs path={URL_PATH} />
                <h1>{courseTitle}</h1>
                <Collapse>
                    {modules.map(module => (
                        <Panel
                            key={module.node.id}
                            // for the header currently just using node id
                            // however what would likely be a better choice is
                            // using a T_OG_TITLE asset on the node
                            header={module.node.id}
                        >
                            <p>What this module will cover:</p>
                            <ul>
                                {/* we should not be using the asset id.
                                    ideally, this would actually be another list
                                    of connected nodes representing the
                                    sub modules on this section.
                                    and on the node itself, it should have a T_OG_TITLE
                                    asset, which we can use instead of asset id
                                */}
                                {module.node.assets?.items.map(asset => (
                                    <StyledItem key={asset.id}>{asset.id}</StyledItem>
                                ))}
                            </ul>
                            <Link
                                href={`courses/${courseId}/module/${module.node.id}`}
                                style={LinkStyles}
                            >
                                Go to Module
                            </Link>
                        </Panel>
                    ))}
                </Collapse>
            </Content>
        </Layout>
    )
}
