import {memo, useCallback} from "react";
import {useNodes} from "~/hooks/useNodes";
import {fromHex} from "~/lib/aptos";
import {useAptos} from "~/hooks/useAptos";
import {NodeEditView} from "~/components/App/content/NodeEditView";
import {toast} from "react-toastify";
import {UsersIcon} from "@heroicons/react/24/solid";
import {GlobeAltIcon} from "@heroicons/react/24/outline";


const NodeListViewRaw = () => {
    const {data: nodes} = useNodes()
    const {account} = useAptos()

    const copyPublicKey = useCallback(async (publicKey: string) => {
        await navigator.clipboard.writeText(publicKey)
        toast.success("クリップボードにコピーしました")
    }, [])

    return <ul className={"divide-y divide-gray-200 w-full"}>
        {nodes.sort((x, y) => fromHex(x.name).localeCompare(fromHex(y.name)) ? -1 : 1).map((node, i) => (
            <li key={i}>
                <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-indigo-600">{fromHex(node.name)}</p>
                        <div className="ml-2 flex flex-shrink-0">
                            <button
                                className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                onClick={() => copyPublicKey(fromHex(node.public_key))}
                            >
                                {fromHex(node.public_key).substring(0, 12)}...{fromHex(node.public_key).substring(fromHex(node.public_key).length-12, fromHex(node.public_key).length)}
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                                <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                {fromHex(node.username)}
                            </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <GlobeAltIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <p>
                                {node.inet_hostname.vec[0] ? fromHex(node.inet_hostname.vec[0]) : "なし"}:{node.inet_port.vec[0] ?? ""}
                            </p>
                            {account.address === node.address
                                ? <div className={"ml-4"}>
                                    <NodeEditView node={node} />
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
}

export const NodeListView = memo(NodeListViewRaw)
