import React, { useState, useEffect } from "react"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { Auth } from "@aws-amplify/auth"
import { DOMnavigated$ } from "@-0/browser"
import { Link } from "./Link"
import { primary_color } from "../theme/colors.js"
import { CTX, default_context } from "../context"
import { Breadcrumbs, Header } from "../components"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import { CensusAcademyFooter } from "./CensusAcademyFooter"

import { Layout } from "antd"

const { Content, Footer } = Layout

export const Chrome = ({ authUser, children }) => {
    const [authState, setAuthState] = useState()
    const [user, setUser] = useState()
    //console.log({ authUser, authState, user })

    useEffect(() => {
        //console.log("App useEffect Triggered ⚠")
        setUser(authUser)
        return onAuthUIStateChange((nextAuthState, authData) => {
            //@ts-ignore
            setAuthState(nextAuthState)
            //@ts-ignore
            setUser(authData)
        })
    }, [authState, user, authUser])

    return (
        <Layout>
            <Header authState={authState} user={user} />
            <Content
                className="site-layout"
                style={{ padding: "0 32px", marginTop: 64, width: "100%" }}
            >
                <div className="site-layout-background" style={{ minHeight: 380 }}>
                    <CTX.Provider
                        value={{
                            ...default_context,
                            authState,
                            user,
                        }}
                    >
                        {children}
                    </CTX.Provider>
                </div>
            </Content>
            <Footer style={{ background: primary_color }}>
                <CensusAcademyFooter />
            </Footer>
        </Layout>
    )
}
