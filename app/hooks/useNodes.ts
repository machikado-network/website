import {getChainId, getClient, MachikadoAccountAddress} from "~/lib/aptos"
import type {AccountStore, MachikadoAccount, TincNode} from "~/lib/aptos/MachikadoNetwork"
import useSWRImmutable from "swr/immutable"
import type {WalletAddress} from "~/lib/aptos/browser"

export type NodeWithUser = TincNode & {
    address: WalletAddress
    username: string
}

const fetcher = async (): Promise<NodeWithUser[]> => {
    const client = getClient(await getChainId())
    const resource = await client.getAccountResource(MachikadoAccountAddress, `${MachikadoAccountAddress}::MachikadoAccount::AccountStore`)
    const data = (resource.data as unknown as AccountStore)
    const nodes: NodeWithUser[] = []
    for (const addr of data.addresses) {
        try {
            const item = await client.getTableItem(data.accounts.handle, {
                key: {
                    owner: addr
                },
                key_type: `${MachikadoAccountAddress}::MachikadoAccount::AccountKey`,
                value_type: `${MachikadoAccountAddress}::MachikadoAccount::Account`,
            }) as MachikadoAccount
            const withUser: NodeWithUser[] = item.nodes.map(x => {
                return {...x, username: item.name, address: addr as unknown as WalletAddress}
            })
            nodes.push(...withUser)
        } catch (e) {
            console.error(e)
        }
    }
    return nodes
}

export function useNodes() {
    const {data, mutate, error} = useSWRImmutable<NodeWithUser[]>("/nodes", fetcher, {
        shouldRetryOnError: false
    })

    return {data: typeof data === "undefined" || typeof error !== "undefined" ? [] : data, mutate}
}
