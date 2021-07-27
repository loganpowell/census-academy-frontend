import React, { useEffect, useState } from "react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import { Hub } from "@aws-amplify/core"
import { Auth } from "@aws-amplify/auth"
import { trace, stream } from "@thi.ng/rstream"
import { out$, log$, registerCMD } from "@-0/spool"
import { NAV } from "./commands"

import { log } from "./utils"
import { Chrome, View } from "./components"

const HUB = stream()

const AUTH_REDIR = registerCMD({
    sub$ : "AUTH_REDIR",
    args : payload => payload,
    src$ : HUB,
    work : ({ data, event, message }) => {
        console.log({ data, event, message })
        if (event === "signIn") {
            window.history.back()
            return false
        }
    },
})
// default value ({ run$  }) is applied when no Provider is found in the inheritance tree of the component (orphans)

//log$.subscribe(trace("log$:"))

const App = () => {
    let [ authUser, setAuthUser ] = useState(null)
    useEffect(() => {
        const update = async AS => {
            try {
                let user = await Auth.currentAuthenticatedUser()
                setAuthUser(user)
            } catch (e) {
                setAuthUser(null)
            }
        }
        Hub.listen("auth", data => {
            const { payload } = data
            update(data)
            //console.log({ payload })
            HUB.next(payload)
        })
        update() // check manually once
        return () => Hub.remove("auth", update)
    }, [])

    return (
        <div className="App">
            <Chrome authUser={authUser}>
                <View />
            </Chrome>
        </div>
    )
}

log("registered Commands:", out$.topics.entries())

log("starting...")

export default App
