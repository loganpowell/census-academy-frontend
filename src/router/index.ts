//import { getIn } from "@thi.ng/paths"
import { EquivMap } from "@thi.ng/associative"

import { URL2obj } from "@-0/utils"
import * as K from "@-0/keys"
import { registerCMD } from "@-0/spool"
import { cmd_inject_head } from "@-0/browser"
import { Auth } from "@aws-amplify/auth"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
//import { Chrome } from "../layout"
import { log } from "../utils"
import { node, API, utils } from "cope-client-utils"

// TODO: return types expected for routerCfg
export const routerCfg = async url => {
    //const session = await Auth.currentAuthenticatedUser()
    //console.log("session:", { session })
    const match = URL2obj(url)
    //const { URL_DOMN, URL_FULL, URL_HASH, URL_PATH, URL_QERY, URL_SUBD } = match

    //let { } = URL_QERY

    //limit = parseInt(limit)
    //const path = match[K.URL_PATH]

    const sign_in = {
        URL_DATA: () => ({
            DOM_HEAD: {},
            DOM_BODY: {},
        }),
        URL_PAGE: "home",
    }
    const RES =
        //!session ? sign_in :
        new EquivMap(
            [
                [
                    // home page (path = [])
                    { ...match, [K.URL_PATH]: [] },
                    {
                        [K.URL_DATA]: async () => {
                            const list = await node.list(
                                {
                                    type: API.NodeType.A_GEM,
                                    status: API.NodeStatus.DRAFT,
                                },
                                GRAPHQL_AUTH_MODE.API_KEY,
                            )
                            //  console.log({ list })
                            console.log(match)
                            return {
                                [K.DOM_HEAD]: {
                                    [K.HD_TITL]: "COPE frontend",
                                    [K.OG_DESC]: "COPE frontend tinkering",
                                    //img_url,
                                },
                                [K.DOM_BODY]: { data: list },
                            }
                        },
                        [K.URL_PAGE]: "home",
                    },
                ],
                [
                    { ...match, URL_PATH: [ "sign-in" ] },
                    {
                        URL_DATA: async () => {
                            console.log("sign-in Page")
                            const list = await utils.CRUD({
                                // prettier-ignore
                                query: /* GraphQL */ `
                                    query getNode($id: ID!){
                                        getNode(id: $id){
                                            id
                                            type
                                        }
                                    }
                                    `,
                                variables: { id: "testNode1" },
                                authMode: GRAPHQL_AUTH_MODE.API_KEY,
                            })
                            return {
                                DOM_HEAD: {
                                    title: "Page 1",
                                    og_description: "Description for Open Graph/sharing",
                                },
                                DOM_BODY: { data: list },
                            }
                        },
                        URL_PAGE: "sign-in",
                    },
                ],
                [
                    { ...match, URL_PATH: [ "admin", "collections" ] },
                    {
                        // TODO
                        // these async operations are not needed for the page
                        // but without them, we cannot navigate to a deep link
                        // without causing the page to stall
                        URL_DATA: async () => {
                            const list = await node.list({
                                type: API.NodeType.A_GEM,
                                status: API.NodeStatus.DRAFT,
                            })
                            return {
                                DOM_HEAD: {
                                    title: "View Collections",
                                    og_description: "Authoring side of COPE",
                                },
                                DOM_BODY: { type: match.URL_QERY.type },
                            }
                        },
                        URL_PAGE: "admin/collections",
                    },
                ],
                [
                    { ...match, URL_PATH: [ "admin", "collections", "edit" ] },
                    {
                        // TODO
                        // these async operations are not needed for the page
                        // but without them, we cannot navigate to a deep link
                        // without causing the page to stall
                        URL_DATA: async () => {
                            const list = await node.list({
                                type: API.NodeType.A_GEM,
                                status: API.NodeStatus.DRAFT,
                            })
                            return {
                                DOM_HEAD: {
                                    title: "Edit",
                                    og_description: "Authoring side of COPE",
                                },
                                DOM_BODY: { nodeId: match.URL_QERY.nodeId },
                            }
                        },
                        URL_PAGE: "admin/collections/edit",
                    },
                ],
            ],
            // TODO: create actual 404 Page
        ).get(match) || {
            [K.URL_DATA]: () => ({ DOM_HEAD: { title: "404" } }),
            [K.URL_PAGE]: "test",
        }

    const data = await RES[K.URL_DATA]()
    const page = RES[K.URL_PAGE]
    log("routed:", { page, data })

    return { [K.URL.DATA]: data, [K.URL.PAGE]: page }
}

//const Page2 = ({ data }) => {
//    return h(
//        "pre",
//        { className: "boobs" },
//        h("h1", null, `PAGE 2:`),
//        JSON.stringify(data, null, 2)
//    )
//}

export const INJECT_HEAD = registerCMD(cmd_inject_head)

export const router = {
    [K.CFG_RUTR]: routerCfg,
    [K.RTR_PRFX]: "cope-frontend-mockup/",
    [K.RTR_POST]: INJECT_HEAD,
}
