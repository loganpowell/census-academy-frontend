import React, { useState, useEffect } from "react"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { DOMnavigated$ } from "@-0/browser"
import { Link } from "./Link"
import { primary_color } from "../theme/colors.js"
import { CTX, default_context } from "../context"
import { Breadcrumbs, Header } from "../components"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import { CensusAcademyFooter } from "./CensusAcademyFooter"

import { Layout, Menu, Breadcrumb } from "antd"

const { Content, Footer } = Layout
const {
    ConfirmSignIn,
    ConfirmSignUp,
    CustomConfirmSignIn,
    ForgotPassword,
    Loading,
    ResetPassword,
    SettingMFA,
    SignIn,
    SignOut,
    SignUp,
    SignedIn,
    SignedOut,
    SigningUp,
    TOTPSetup,
    VerifyContact,
    VerifyingAttributes,
    confirmingSignInCustomFlow,
    confirmingSignUpCustomFlow,
} = AuthState

export const Chrome = ({ children }) => {
    const [authState, setAuthState] = useState()
    const [user, setUser] = useState()

    console.log({ authState, user })
    useEffect(
        () => {
            // PRIORITY: API
            console.log("App useEffect Triggered ⚠")
            DOMnavigated$.next({
                target: document,
                currentTarget: document,
            })
            return onAuthUIStateChange((nextAuthState, authData) => {
                //@ts-ignore
                setAuthState(nextAuthState)
                //@ts-ignore
                setUser(authData)
            })
        },
        // authState is a string, so equality checks don't
        // fire arbitrary rerenderings
        [authState]
    )

    return (
        <Layout>
            <Header authState={authState} user={user} />
            <Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
                <div
                    className="site-layout-background"
                    style={{ padding: "0 24px", minHeight: 380 }}
                >
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
