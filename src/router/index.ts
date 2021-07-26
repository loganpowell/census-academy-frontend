//import { getIn } from "@thi.ng/paths"
import { EquivMap } from "@thi.ng/associative"

import { URL2obj } from "@-0/utils"
import * as K from "@-0/keys"
import { registerCMD } from "@-0/spool"
import { cmd_inject_head } from "@-0/browser"
import { Auth } from "@aws-amplify/auth"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { node, API, utils } from "cope-client-utils"
//import { Chrome } from "../layout"
import { queries } from "../graphql"
import { log } from "../utils"
import { Page1, Page2, Page3, SignIn, Gems, Landing } from "../pages"
import { CRUD } from "cope-client-utils/lib/utils"
import { NodeStatus, NodeType } from "cope-client-utils/lib/graphql/API"

const dummy_query = {
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
}

// TODO: return types expected for routerCfg
export const routerCfg = async url => {
    //const session = await Auth.currentAuthenticatedUser()
    //console.log("session:", { session })
    const match = URL2obj(url)
    //const { URL_DOMN, URL_FULL, URL_HASH, URL_PATH, URL_QERY, URL_SUBD } = match

    console.log({ match })
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
                    { ...match, URL_PATH: ["gems"] },
                    {
                        URL_DATA: async () => {
                            const res = await CRUD({
                                query: queries.getNodesByType,
                                variables: { type: NodeType.A_GEM, status: NodeStatus.DRAFT },
                                authMode: GRAPHQL_AUTH_MODE.API_KEY,
                            })
                            return {
                                DOM_HEAD: {
                                    title: "Data Gems",
                                    og_description: "Bite-sized courses for Census data users",
                                },
                                DOM_BODY: res?.data?.nodesByStatusType?.items,
                            }
                        },
                        URL_PAGE: () => Gems,
                    },
                ],
                [
                    // home page (path = [])
                    { ...match, [K.URL_PATH]: [] },
                    {
                        [K.URL_DATA]: async () => {
                            const list = await utils.CRUD(dummy_query)

                            //  console.log({ list })
                            return {
                                [K.DOM_HEAD]: {
                                    [K.HD_TITL]: "COPE frontend",
                                    [K.OG_DESC]: "COPE frontend tinkering",
                                    //img_url,
                                },
                                [K.DOM_BODY]: { data: list },
                            }
                        },
                        [K.URL_PAGE]: () => Page1,
                    },
                ],
                [
                    { ...match, URL_PATH: ["sign-in"] },
                    {
                        URL_DATA: async () => {
                            const list = await utils.CRUD(dummy_query)
                            return {
                                DOM_HEAD: {
                                    title: "Page 1",
                                    og_description: "Description for Open Graph/sharing",
                                },
                                DOM_BODY: { data: list },
                            }
                        },
                        URL_PAGE: () => SignIn,
                    },
                ],
                [
                    { ...match, URL_PATH: ["page2"] },
                    {
                        URL_DATA: async () => {
                            const list = await utils.CRUD(dummy_query)
                            return {
                                DOM_HEAD: {
                                    title: "Page 1",
                                    og_description: "Description for Open Graph/sharing",
                                },
                                DOM_BODY: { data: list },
                            }
                        },
                        URL_PAGE: () => Page2,
                    },
                ],
                [
                    { ...match, URL_PATH: ["landing"] },
                    {
                        URL_DATA: async () => {
                            const list = await utils.CRUD(dummy_query)
                            return {
                                DOM_HEAD: {
                                    title: "Test Landing",
                                    og_description: "Test landing page",
                                },
                                DOM_BODY: { data: list },
                            }
                        },
                        URL_PAGE: () => Landing,
                    },
                ],
            ]
            // TODO: create actual 404 Page
        ).get(match) || {
            [K.URL_DATA]: () => ({ DOM_HEAD: { title: "404" }, DOM_BODY: { data: 404 } }),
            [K.URL_PAGE]: () => Page1,
        }

    const data = await RES[K.URL_DATA]()
    const page = RES[K.URL_PAGE]
    log("routed:", { page, data })

    return { [K.URL.DATA]: data, [K.URL.PAGE]: page }
}

export const INJECT_HEAD = registerCMD(cmd_inject_head)

export const router = {
    [K.CFG_RUTR]: routerCfg,
    [K.RTR_PRFX]: "cope-frontend-mockup/",
    [K.RTR_POST]: INJECT_HEAD,
}
