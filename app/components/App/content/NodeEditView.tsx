import {memo, useState} from "react";
import {NodeWithUser} from "~/hooks/useNodes";

interface NodeEditViewProps {
    node: NodeWithUser
}

const NodeEditViewRaw = ({node}: NodeEditViewProps) => {
    const [isOpen, setIsOpen] = useState(false)
      return <>
          <button
              className={"bg-primary-600 hover:bg-primary-700 duration-300 px-3 py-2 rounded-md text-white"}
              onClick={() => setIsOpen(true)}
          >
              編集
          </button>
      </>
}

export const NodeEditView = memo(NodeEditViewRaw)
