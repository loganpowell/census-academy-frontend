import { getIn, setIn } from "@thi.ng/paths"
import { isPlainObject, isArray, isPrimitive } from "@thi.ng/checks"
import { map, transduce, comp, push } from "@thi.ng/transducers"
import {
    squash,
    collect_by_path,
    aggregate_by_key,
    coll_by_path_aggregate,
    apply_kv_ops,
    coll_aggregator_sender,
    convert_assets_to_object,
} from "../../lib/utils/data"

const test_assets = [
    {
        type    : "T_BODY",
        name    : "Body",
        index   : 1,
        content :
            "Some sample markdown content!\n\n​\n\n# Heading 1\n\n​\n\n## Heading 2\n\n​\n\n### Heading 3\n\n​\n\nthis is some code but it's not really being rendered as code i wonder why\n\n​\n\nBut it's not being rendered correctly! Oh no!\n\n​\n\n​\n\nRandom image example\n\n​\n",
    },
    {
        type    : "T_OG_TITLE",
        name    : "Title",
        index   : 2,
        content : "Example Title",
    },
    {
        type    : "A_VIDEO",
        name    : "Video",
        index   : 0,
        content : "https://youtu.be/RSdqooZIRwI",
    },
]

convert_assets_to_object(test_assets) //?

//unnest(tbs.data.listTopics.items, ["id"], ["bulletins", "items"]) //?

const test_coll = {
    one   : 1,
    two   : 2,
    three : [ { a: 111, b: "🤞", c: "🕗" }, { a: 333, b: "😻", c: "🍑" } ],
    four  : {
        five : [
            {
                id    : 6,
                bloop : "blop",
            },
            {
                id    : 7,
                bloop : "poop",
            },
        ],
    },
}

const isEmpty = coll => {
    return isPlainObject(coll) && !Object.keys(coll).length
        ? true
        : isArray(coll) && !coll.length ? true : false
}

/**
 * @example
 *
 * const coll = {
 *     one: 1,
 *     two: 2,
 *     three: [
 *         { a: 111, b: "🤞", c: "🕗" },
 *         { a: 333, b: "😻", c: "🍑" },
 *     ],
 *     four: {
 *         five: [
 *             {
 *                 id: 6,
 *                 bloop: "blop",
 *             },
 *             {
 *                 id: 7,
 *                 bloop: "poop",
 *             },
 *         ],
 *     },
 * }
 *
 * collapse(coll)
 * // => {
 * //    "one": 1,
 * //    "two": 2,
 * //    "three/0/a": 111,
 * //    "three/0/b": "🤞",
 * //    "three/0/c": "🕗",
 * //    "three/1/a": 333,
 * //    "three/1/b": "😻",
 * //    "three/1/c": "🍑",
 * //    "four/five/0/id": 6,
 * //    "four/five/0/bloop": "blop",
 * //    "four/five/1/id": 7,
 * //    "four/five/1/bloop": "poop"
 * // }
 */
export const collapse = (coll, crumbs = [], acc = {}, sep = "/") => {
    Object.entries(coll).forEach(([ key, val ]) => {
        if (isPrimitive(val)) {
            const composite = `${[ ...crumbs, key ].join(sep)}`
            //if (!acc[key]) return (acc[key] = val)
            return (acc[composite] = val)
        }
        if (isArray(val)) {
            val.forEach((obj, idx) => {
                collapse(obj, [ ...crumbs, key, idx ], acc, sep)
            })
        }
        if (isPlainObject(val)) {
            collapse(val, [ ...crumbs, key ], acc, sep)
        }
    })
    return acc
}

export const prune = (coll, acc = {}, sep = "/") => {
    Object.entries(coll).forEach(([ k, v ]) => {
        const key = k.split(sep).slice(-1)
        acc[key] = v
    })
    return acc
}

//collapse(test_coll) //?
//LT.data.listTopics.items.map(xy => collapse(xy)) //?
//LB.data.listCampaigns.items.map(xy => collapse(xy)).map(z => prune(z)) //?

const xf_smash = comp(map(x => collapse(x)), map(x => prune(x)))

export const smash = coll => transduce(xf_smash, push(), coll)
//smash(LB.data.listCampaigns.items) //?
