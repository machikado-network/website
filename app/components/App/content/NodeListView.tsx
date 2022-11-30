import {memo, useCallback} from "react";
import {useNodes} from "~/hooks/useNodes";
import {fromHex} from "~/lib/aptos";
import {useAptos} from "~/hooks/useAptos";
import {NodeEditView} from "~/components/App/content/NodeEditView";
import {toast} from "react-toastify";


const NodeListViewRaw = () => {
    const {data: nodes} = useNodes()
    const {account} = useAptos()

    const copyPublicKey = useCallback(async (publicKey: string) => {
        await navigator.clipboard.writeText(publicKey)
        toast.success("クリップボードにコピーしました")
    }, [])

    return <div>
        <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                            >
                                ユーザー名
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                            >
                                ノード名
                            </th>
                            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                パブリックキー
                            </th>
                            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                ホスト名
                            </th>
                            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                ポート
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {nodes.map((node, i) => (
                            <tr key={i}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                                    {fromHex(node.username)}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                                    {fromHex(node.name)}
                                </td>
                                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                    <button
                                        className={"hover:text-primary-700"}
                                        onClick={() => copyPublicKey(fromHex(node.public_key))}
                                    >
                                        {fromHex(node.public_key).substring(0, 12)}...
                                    </button>
                                </td>
                                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{node.inet_hostname.vec[0] ?? "なし"}</td>
                                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{node.inet_port.vec[0] ?? "なし"}</td>
                                {account.address === node.address
                                    ? <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                                        <NodeEditView node={node} />
                                    </td>
                                    : null
                                }
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export const NodeListView = memo(NodeListViewRaw)
