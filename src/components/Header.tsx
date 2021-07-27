import React, { useState, useEffect, useContext } from "react"
import { DOMnavigated$ } from "@-0/browser"
import { AuthState } from "@aws-amplify/ui-components"
import { primary_color } from "../theme/colors.js"
import { CTX } from "../context"
import { Link } from "./Link"
import { SignInButton, SignOutButton } from "../components"
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
                {/* TODO front end pages and routes for webinars and courses */}
                {/* <Menu.Item key="3">
                    <Link to="#">Webinars</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="#">Courses</Link>
                </Menu.Item> */}
                <Menu.Item key="3">
                    <Link to="about">About</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    {(authState === SignedIn || user) && <Link to="user">User Dashboard</Link>}
                </Menu.Item>
                <Menu.Item key="5" style={{ marginLeft: "auto" }}>
                    {authState === SignedIn ? (
                        <SignOutButton />
                    ) : authState === SignedOut ? (
                        <SignInButton />
                    ) : user ? (
                        <SignOutButton />
                    ) : (
                        <SignInButton />
                    )}
                </Menu.Item>
            </Menu>
        </HEADER>
    )
}
