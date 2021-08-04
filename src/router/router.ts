//import { getIn } from "@thi.ng/paths"
import { EquivMap } from "@thi.ng/associative"
import { useContext } from "react"
import { URL2obj } from "@-0/utils"
import * as K from "@-0/keys"
import { registerCMD } from "@-0/spool"
import { cmd_inject_head } from "@-0/browser"
import { Auth } from "@aws-amplify/auth"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { node, API, utils } from "cope-client-utils"
//import { Chrome } from "../layout"
import { queries } from "../graphql"
import { log, convert_assets_to_object } from "../utils"
import { Page1, Page2, Page3, SignIn, Gems, Landing, Gem, Error404, Course } from "../pages"
import { UserDashboard } from "../pages"
import { Courses, CourseOverview } from "../pages"
import { About } from "../pages"
import { CTX } from "../context"
import { EdgeType, NodeStatus, NodeType } from "cope-client-utils/lib/graphql/API"

const { CRUD } = utils
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

const publicQuery = ({ query, variables }) =>
    CRUD({ query, variables, authMode: GRAPHQL_AUTH_MODE.API_KEY })

// TODO: return types expected for routerCfg
export const routerCfg = async url => {
    const session = await Auth.Credentials
    console.log("session:", { session })
    const match = URL2obj(url)
    const { URL_DOMN, URL_FULL, URL_HASH, URL_PATH, URL_QERY, URL_SUBD } = match

    //console.log({ match })
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

    const gems_path = ["gems", ...URL_PATH.slice(1)]
    const courses_path = ["courses", ...URL_PATH.slice(1)]
    const RES =
        //!session ? sign_in :
        new EquivMap(
            [
                [
                    { ...match, URL_PATH: gems_path },
                    {
                        URL_DATA: async () => {
                            // gems landing
                            if (gems_path.length === 1) {
                                const res = await publicQuery({
                                    query: queries.getNodesByType,
                                    variables: { type: NodeType.A_GEM, status: NodeStatus.DRAFT },
                                })
                                return {
                                    DOM_HEAD: {
                                        title: "Data Gems",
                                        og_description: "Bite-sized courses for Census data users",
                                    },
                                    DOM_BODY: res?.data?.nodesByStatusType?.items,
                                }
                            }
                            // gem focus page
                            if (gems_path.length === 2) {
                                const id = gems_path[1]
                                const res = await publicQuery({
                                    query: queries.getNodeByID,
                                    variables: { id },
                                })
                                const {
                                    data: { getNode },
                                } = res
                                const { status, type, createdAt, updatedAt, owner, assets } =
                                    getNode
                                if (assets.items) {
                                    const items = convert_assets_to_object(assets.items)
                                    const { T_OG_TITLE, A_VIDEO, T_BODY } = items
                                    return {
                                        DOM_HEAD: {
                                            title: T_OG_TITLE.content,
                                        },
                                        DOM_BODY: { ...items, date: createdAt },
                                    }
                                }
                            }
                        },
                        URL_PAGE: () => {
                            if (gems_path.length === 1) return Gems
                            if (gems_path.length === 2) return Gem
                        },
                    },
                ],
                [
                    { ...match, URL_PATH: courses_path },
                    {
                        URL_DATA: async () => {
                            // courses landing
                            if (courses_path.length === 1) {
                                // TODO replace this with course query
                                const res = await publicQuery({
                                    query: queries.getNodesByType,
                                    variables: {
                                        type: NodeType.C_COURSES,
                                        status: NodeStatus.DRAFT,
                                    },
                                })
                                return {
                                    DOM_HEAD: {
                                        title: "Courses",
                                        og_description:
                                            "Free courses to teach you how to use Census data. Learn how to use the US Census Bureau's free data for work, school, or other projects.",
                                    },
                                    DOM_BODY: res?.data?.nodesByStatusType?.items,
                                }
                            }
                            // courses focus page
                            if (courses_path.length === 2) {
                                const id = courses_path[1]
                                const res = await publicQuery({
                                    query: queries.getNodeByID,
                                    variables: { id },
                                })
                                const {
                                    data: { getNode },
                                } = res
                                const { status, type, createdAt, updatedAt, owner, assets } =
                                    getNode
                                if (assets.items) {
                                    const items = convert_assets_to_object(assets.items)
                                    const { T_OG_TITLE, A_VIDEO, T_BODY } = items
                                    return {
                                        DOM_HEAD: {
                                            title: T_OG_TITLE.content,
                                        },
                                        DOM_BODY: {
                                            ...items,
                                            date: createdAt,
                                            courseId: id,
                                            path: courses_path,
                                        },
                                    }
                                }
                            }
                            // courses home page
                            if (courses_path.length === 3) {
                                const courseId = courses_path[1]
                                const courseNodeInfo = await publicQuery({
                                    query: queries.getNodeByID,
                                    variables: { id: courseId },
                                })
                                const {
                                    data: { getNode },
                                } = courseNodeInfo
                                const { status, type, createdAt, updatedAt, owner, assets } =
                                    getNode
                                const modules = await node.connections({
                                    id: courseId,
                                    edgeType: EdgeType.HAS_PART,
                                })
                                if (assets.items) {
                                    const items = convert_assets_to_object(assets.items)
                                    const { T_OG_TITLE } = items
                                    return {
                                        DOM_HEAD: {
                                            title: T_OG_TITLE.content,
                                        },
                                        DOM_BODY: {
                                            ...items,
                                            date: createdAt,
                                            courseId: courseId,
                                            path: courses_path,
                                            modules: modules,
                                        },
                                    }
                                }
                            }
                            // courses module page
                            if (courses_path.length === 4) {
                                // to populate sidebar nav
                                const courseId = courses_path[1]
                                const modules = await node.connections({
                                    id: courseId,
                                    edgeType: EdgeType.HAS_PART,
                                })

                                const moduleId = courses_path[3]
                                const courseNodeInfo = await publicQuery({
                                    query: queries.getNodeByID,
                                    variables: { id: moduleId },
                                })
                                const {
                                    data: { getNode },
                                } = courseNodeInfo
                                const { status, type, createdAt, updatedAt, owner, assets } =
                                    getNode
                                const submodules = await node.connections({
                                    id: courseId,
                                    edgeType: EdgeType.HAS_CHILD,
                                })

                                if (assets.items) {
                                    const items = convert_assets_to_object(assets.items)
                                    const { T_OG_TITLE } = items
                                    return {
                                        DOM_HEAD: {
                                            title: T_OG_TITLE.content,
                                        },
                                        DOM_BODY: {
                                            ...items,
                                            path: courses_path,
                                            courseId: courseId,
                                            modules: modules,
                                            submodules: submodules,
                                        },
                                    }
                                }
                            }
                        },
                        URL_PAGE: () => {
                            if (courses_path.length === 1) return Courses
                            if (courses_path.length === 2) return CourseOverview
                            if (courses_path.length === 3) return Course
                            if (courses_path.length === 4) return Course
                        },
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
                                    [K.HD_TITL]: "Census Academy",
                                    [K.OG_DESC]:
                                        "Free courses to teach you how to use Census data. Learn how to use the US Census Bureau's free data for work, school, or other projects.",
                                    //img_url,
                                },
                                [K.DOM_BODY]: { data: list },
                            }
                        },
                        [K.URL_PAGE]: () => Landing,
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
                    { ...match, URL_PATH: ["user"] },
                    {
                        URL_DATA: async () => {
                            const list = await utils.CRUD(dummy_query)
                            return {
                                DOM_HEAD: {
                                    title: "Mock User Profile",
                                    og_description: "Mock of user profile page",
                                },
                                DOM_BODY: { data: list },
                            }
                        },
                        URL_PAGE: () => UserDashboard,
                    },
                ],
                [
                    { ...match, URL_PATH: ["about"] },
                    {
                        URL_DATA: async () => {
                            const list = await utils.CRUD(dummy_query)
                            return {
                                DOM_HEAD: {
                                    title: "About Census Academy",
                                    og_description:
                                        "Free courses to teach you how to use Census data. Learn how to use the US Census Bureau's free data for work, school, or other projects.",
                                },
                                DOM_BODY: { data: list },
                            }
                        },
                        URL_PAGE: () => About,
                    },
                ],
            ]
            // TODO: create actual 404 Page
        ).get(match) || {
            [K.URL_DATA]: () => ({ DOM_HEAD: { title: "404" }, DOM_BODY: { data: 404 } }),
            [K.URL_PAGE]: () => Error404,
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
