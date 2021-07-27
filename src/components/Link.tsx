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
                const { target, currentTarget } = e
                //@ts-ignore
                const href = target.href || path
                const curr = currentTarget || document
                e.preventDefault()
                run$.next({
                    ...NAV,
                    args: {
                        target: { href },
                        currentTarget: curr,
                    },
                })
            }}
            style={style}
        >
            {children}
        </a>
    )
}
