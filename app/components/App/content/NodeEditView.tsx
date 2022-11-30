import {memo, useState} from "react"
import type {NodeWithUser} from "~/hooks/useNodes"
import {EditNode} from "~/components/App/Dialog/EditNode"

interface NodeEditViewProps {
    node: NodeWithUser
}

const NodeEditViewRaw = ({node}: NodeEditViewProps) => {
    const [isOpen, setIsOpen] = useState(false)
      return <>
          <EditNode open={isOpen} setOpen={setIsOpen} node={node} />
          <button
              className={"bg-primary-600 hover:bg-primary-700 duration-300 px-3 py-2 rounded-md text-white"}
              onClick={() => setIsOpen(true)}
          >
              編集
          </button>
      </>
}

export const NodeEditView = memo(NodeEditViewRaw)
