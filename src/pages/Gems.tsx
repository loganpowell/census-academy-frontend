import React from "react"
import { unified } from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import { Card } from "antd"
const { Meta } = Card

export const Gems = ({ data }) => {
    //console.log("Gems data:",  data )
    const items = data
    return <div style={{ display: "flex"}}>
        {items.map((item, idx) => {
          
          const assets = item?.assets?.items
          if(!assets.length) return null
        //  console.log({assets})
          const { cover, title, body } = assets.reduce((a, c) => {
              const { type, name, content } = c
              switch(type){
                  case "T_BODY": {
                    //  console.log("content:", content)
                      const b = unified().use(parse).use(remark2react).processSync(content).result
                      return (a.body = b, a)
                  }
                  case "A_VIDEO":{
                      const parts = content.split("/")
                      const id = parts[parts.length - 1]
                      return (a.cover = `https://img.youtube.com/vi/${id}/0.jpg`, a)
                  }
                  case "A_IMAGE":
                      return (a.cover = content, a)
                  case "T_OG_TITLE":
                      return (a.title = content, a)
                  default:
                      return a
              }
          }, { cover: null, title: null , body: null })

          return <Card
              key={idx}
              hoverable
              style={{ width: "33%", margin: '1rem', alignSelf: "flex-start"}}
              cover={<img alt={title} src={cover} />}
            >
              <Meta title={title} description={body} />
            </Card>
        })}
    </div>
}