import React, { useContext } from "react"
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react"
import { run$ } from "@-0/spool"
import { Auth } from "@aws-amplify/auth"
import { Hub } from "@aws-amplify/core"
import { CTX } from "../context"
import { NAV } from "../commands"
import { Link } from "./Link"

export const SignInButton = ({ style = {} }) => {
    return (
        <Link href="sign-in" style={style}>
            Sign In
        </Link>
    )
}

export const SignOutButton = ({ style = {} }) => {
    //const { run$ } = useContext(CTX)
    return (
        <a
            href="/"
            onClick={async e => {
                e.preventDefault()
                try {
                    await Auth.signOut()
                    // channel must be 'UI Auth'
                    await Hub.dispatch("UI Auth", {
                        // event must be 'AuthStateChange'
                        event: "AuthStateChange",
                        // message must be 'signedout'
                        message: "signedout",
                    })
                    run$.next({ ...NAV, args: e })
                } catch (error) {
                    console.log("error signing out: ", error)
                }
            }}
            style={{ cursor: "pointer", ...style }}
        >
            Sign out
        </a>
    )
}
