import {client, MachikadoAccountAddress} from "~/lib/aptos"
import type {AccountStore, Invite} from "~/lib/aptos/MachikadoNetwork"
import useSWRImmutable from "swr/immutable"

const fetcher = async (url: string, address: string) => {
    const resource = await client.getAccountResource(MachikadoAccountAddress, `${MachikadoAccountAddress}::MachikadoAccount::AccountStore`)
    const handle = (resource.data as unknown as AccountStore).invites.handle
    return await client.getTableItem(handle, {
        key: {
            invitee: address
        },
        key_type: `${MachikadoAccountAddress}::MachikadoAccount::InviteKey`,
        value_type: `${MachikadoAccountAddress}::Invite::Invite`
    })
}

export function useInvite(address?: string) {
    const {data, error, mutate} = useSWRImmutable<Invite>(address ? ["/invite", address] : null, fetcher,
        {
            shouldRetryOnError: false
        })

    return {
        invite: typeof data === "undefined" || typeof error !== "undefined" ? null : data,
        mutate,
    }
}
