import type {AccountStore} from "~/lib/aptos/MachikadoNetwork"
import {getChainId, getClient, MachikadoAccountAddress} from "~/lib/aptos"
import useSWRImmutable from "swr/immutable"


const fetcher = async () => {
    const client = getClient(await getChainId())
    const resource = await client.getAccountResource(MachikadoAccountAddress, `${MachikadoAccountAddress}::MachikadoAccount::AccountStore`)
    return (resource.data as unknown as AccountStore)
}

export function useAccountCount() {
    const {data, error} = useSWRImmutable<AccountStore>("/account/length", fetcher)

    return (typeof data === "undefined" || typeof error !== "undefined") ? 0 : data.addresses.length
}
