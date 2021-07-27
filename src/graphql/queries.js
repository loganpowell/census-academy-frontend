import { API } from "cope-client-utils"

const type = API.NodeType
export const getNodesByType = /* GraphQL */ `
    query getNodesByType($type: NodeType!, $status:NodeStatus!) {
        nodesByStatusType(status:$status, typeCreatedAt:{beginsWith:{type:$type}}){
            items{
                id
                type
                createdAt
                assets{
                    items{
                        type
                        name
                        content
                        index
                    }
                }
            }
        }
    }        
`

export const getNodeByID = /* GraphQL */ `
  query getNodeByID($id:ID!){
    getNode(id:$id){
      status
      type
      createdAt
      updatedAt
      owner
      assets{
        items{
          type
          name
          content
          index
        }
      }
    }
  }
`
