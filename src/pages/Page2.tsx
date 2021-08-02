import React, { useContext } from "react"
import { CTX } from "../context"
import { Breadcrumbs } from "../components"

export const Page2 = ({ data = {} }) => {
    const { parse } = useContext(CTX)
    const { URL_PATH } = parse()
    console.log({ URL_PATH })
    console.log("Page2 data:", data)
    return (
        <div>
            <Breadcrumbs path={URL_PATH} />
            <h1>Page 2</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
