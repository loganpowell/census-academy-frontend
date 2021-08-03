import React, { useEffect, useState, useContext } from "react"
import { CTX } from "../context"
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react"
import { AuthState } from "@aws-amplify/ui-components"

const required_fields = [
    {
        type: "username",
        placeholder: "john@email.com",
        required: true,
        label: "Email Address",
    },
    { type: "password", required: true },
]

const SignUp = () => <AmplifySignUp slot="sign-up" formFields={required_fields} />

export const SignIn = ({ data }) => {
    const { authState } = useContext(CTX)
    //console.log("SignIn page data:", data)
    //{
    //    !authState || authState === AuthState.SignedOut || authState === AuthState.SignIn ? <SignIn />
    //    : authState === AuthState.SignedIn && user ? <SignedIn />
    //    : <SignUp />
    //}
    return (
        <AmplifyAuthenticator>
            {!authState || authState === AuthState.SignedOut || authState === AuthState.SignIn ? (
                <AmplifySignIn slot="sign-in" formFields={required_fields} />
            ) : (
                <SignUp />
            )}
            {/*<pre>{JSON.stringify(data, null, 4)}</pre>*/}
        </AmplifyAuthenticator>
    )
}
