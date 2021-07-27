import React, { useContext } from "react"
import { CTX } from "../context"
import { NAV } from "../commands"
import { run$ } from "@-0/spool"

export const Link = ({ to, style = {}, children }) => {
    const path = `/${to}`
    //log({ path })
    return (
        <a
            href={path}
            onClick={e => {
                //console.log({ e })
                e.preventDefault()
                run$.next({ ...NAV, args: e })
            }}
            style={style}
        >
            {children}
        </a>
    )
}
