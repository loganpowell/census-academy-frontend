import React, { useContext, useLayoutEffect, useEffect } from "react"
import { getIn } from "@thi.ng/paths"
import { isFunction } from "@thi.ng/checks"
import * as K from "@-0/keys"
import { CTX } from "../context"
import { useCursor } from "../hooks"

/**
 * TODO: Abstract away
 * // PRIORITY: API
 * @params = {
 *      key: value
 *      page_key_returned_from_equivmap: ActualPageComponent
 * }
 */
export const View = () => {
    const { $store$ } = useContext(CTX)
    const [Page, pageCursor] = useCursor([K.$$_VIEW], "View Page")
    const [loading, loadingCursor] = useCursor([K.$$_LOAD], "View loading")
    const [path, pathCursor] = useCursor([K.$$_PATH], "Route Path")

    useLayoutEffect(() => {
        // re-render when loading state changes
        //console.log("re-rendered Page:", { loading })
        // cleanup
        return () => {
            //log("cleaning up:", { loading, Page })
            loadingCursor.release()
            pathCursor.release()
            pageCursor.release()
        }
    }, [loadingCursor, pathCursor, pageCursor, Page, loading, path])

    const store = $store$.deref()

    //console.log({ store })

    const loader = (
        <div className="spinner_container" style={{ marginTop: "64px" }}>
            <div className="spinner">
                <h1> fetching data... </h1>
            </div>
        </div>
    )

    const is_home = !store[K.$$_PATH].length
    const data =
        //@ts-ignore
        (is_home && getIn(store, ["data"])) || getIn(store, path)
    //console.log({ Page, data })

    return loading || !Page || !data ? loader : <Page data={data} />
}
