import React from "react"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import { Link } from "../components"
import { Card } from "antd"
import YouTube from "react-youtube"
const { Meta } = Card

export const Gem = ({ data }) => {
    //console.log("Gems data:",  data )

    const { T_BODY, T_OG_TITLE, A_VIDEO } = data
    const title = T_OG_TITLE.content
    const body = unified().use(parse).use(remark2react).processSync(T_BODY.content).result
    //console.log({ body })
    const parts = A_VIDEO.content.split("/")
    const id = parts[parts.length - 1]
    const cover = `https://img.youtube.com/vi/${id}/0.jpg`
    const opts = {
        width: "100%",
        //height: "500",
    }
    return (
        <Card hoverable style={{ width: "100%" }} cover={<YouTube videoId={id} opts={opts} />}>
            <Meta title={title} description={body} />
        </Card>
    )
}
