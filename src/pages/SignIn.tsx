import React, { useEffect, useState } from "react"
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react"

const required_fields = [
    {
        type: "username",
        placeholder: "john@email.com",
        required: true,
        label: "Email Address",
    },
    { type: "password", required: true },
]

export const SignIn = () => {
    console.log("SIGN IN PAGE")
    return (
        <AmplifyAuthenticator>
            <AmplifySignIn slot="sign-in" formFields={required_fields} />
        </AmplifyAuthenticator>
    )
}
