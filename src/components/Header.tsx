import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { DOMnavigated$ } from "@-0/browser"
import { Link } from "./Link"
import { primary_color } from "../theme/colors.js"
import { SignInButton, SignOutButton } from "../components"
import { AuthState } from "@aws-amplify/ui-components"
import { Layout, Menu } from "antd"

const { Header: HEADER } = Layout
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

export const Header = ({ authState, user }) => {
    return (
        <HEADER style={{ position: "fixed", zIndex: 1, width: "100%", padding: "0 1rem" }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">
                    <a href="/">
                        <img
                            src={process.env.PUBLIC_URL + "us-census-bureau-logo-white.svg"}
                            alt="US Census Bureau logo"
                            style={{ width: "6rem" }}
                        />
                    </a>
                </Menu.Item>
                <Menu.Item key="2" style={{}}>
                    <Link to="gems">Data Gems</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="#">Webinars</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="#">Courses</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="#">About</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    {authState === SignedIn && <Link to="user">User Dashboard</Link>}
                </Menu.Item>
                <Menu.Item key="7" style={{ marginLeft: "auto" }}>
                    {(authState === SignedIn && <SignOutButton />) || <SignInButton />}
                </Menu.Item>
            </Menu>
        </HEADER>
    )
}
