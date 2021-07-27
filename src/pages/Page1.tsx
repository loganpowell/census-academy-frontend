import React, { useContext } from "react"
import { CTX } from "../context"
import { FormInput, Breadcrumbs } from "../components"
export const Page1 = ({ data = {} }) => {
    const { parse } = useContext(CTX)
    const { URL_PATH } = parse()
    //console.log({ URL_PATH })
    //console.log("Page1 data:", data)
    return (
        <div>
            <Breadcrumbs path={URL_PATH} />
            <h1>Page 1</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <FormInput />
        </div>
    )
}
