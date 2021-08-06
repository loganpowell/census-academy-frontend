import React, { useState, useEffect } from "react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import { run$ } from "@-0/spool"
import { $store$, registerRouterDOM, DOMnavigated$ } from "@-0/browser"
import { URL2obj, diff_keys } from "@-0/utils"
import * as K from "@-0/keys"

import { CTX } from "../context"
import { log } from "../utils"
import { Landing } from "../pages"
import { useCursor } from "../hooks"

//prettier-ignore
export const Provider = ({ children, CFG = {} }) => {
   
    //const DOMRoot     = CFG[K.CFG_ROOT] || document.body 
    // ⬆ ⚠ can't refer to the root node (circular reference)

    // default wrapper for pages before they are specified
    const DefaultView = CFG[K.CFG_VIEW] || Landing
    const router      = CFG[K.CFG_RUTR]
    // clean URL
    const knowns      = Object.values(K.CFG) || []
    const prfx        = router[K.RTR_PRFX] || null
    const [, others]  = diff_keys(knowns, CFG)
    const escRGX      = /[-/\\^$*+?.()|[\]{}]/g
    const escaped     = str => str.replace(escRGX, "\\$&")
    const RGX         = prfx ? new RegExp(escaped(prfx || ""), "g") : null



    if (router) registerRouterDOM(router)
    else throw new Error(`no \`${K.CFG_RUTR}\`: router found in Provider CFG`)
    
    // Prime store with CFG state
    $store$.swap(x => ({...CFG, ...x}))

    // FIXME: log
    //log("$store$.deref():", $store$.deref() )

    return (
        <CTX.Provider value={{
            $store$,
            parse: () => URL2obj(window.location.href, RGX),
            authState: null,
            user: null
          }}>
            { children }
        </CTX.Provider>
    )
}
