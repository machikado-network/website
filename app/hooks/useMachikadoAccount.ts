import {getChainId, getClient, MachikadoAccountAddress} from "~/lib/aptos"
import type {AccountStore, MachikadoAccount} from "~/lib/aptos/MachikadoNetwork"
import useSWRImmutable from "swr/immutable"

const fetcher = async (url: string, address: string) => {
    const client = getClient(await getChainId())
    const resource = await client.getAccountResource(MachikadoAccountAddress, `${MachikadoAccountAddress}::MachikadoAccount::AccountStore`)
    const handle = (resource.data as unknown as AccountStore).accounts.handle
    return await client.getTableItem(handle, {
        key: {
            owner: address
        },
        key_type: `${MachikadoAccountAddress}::MachikadoAccount::AccountKey`,
        value_type: `${MachikadoAccountAddress}::MachikadoAccount::Account`
    })
}

export function useMachikadoAccount(address?: string) {
    const {data, error, mutate} = useSWRImmutable<MachikadoAccount>(address ? ["/account", address] : null, fetcher, {
        shouldRetryOnError: false
    })

    return {
        account: typeof data === "undefined" || typeof error !== "undefined" ? null : data,
        mutate,
    }
}
