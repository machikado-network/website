import {AptosClient} from 'aptos'
import type {MachikadoAccount} from "~/lib/aptos/MachikadoNetwork"
import type {WalletAddress, WalletTransactionPayload} from "~/lib/aptos/browser"

export const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1')

export const MachikadoAccountAddress: WalletAddress = "0xfd320e6f9395c747dbf54cadea98426ec63716b6fe97ee0f8ce83eb1dda9d71a"

export async function getMachikadoAccount(handle: string, address: WalletAddress): Promise<MachikadoAccount> {
    return await client.getTableItem(handle, {
        key: {
            owner: address
        },
        key_type: `${MachikadoAccountAddress}::MachikadoAccount::AccountKey`,
        value_type: `${MachikadoAccountAddress}::MachikadoAccount::Account`
    })
}

export async function sendInvite(signer: WalletAddress, inviteTargetAddress: WalletAddress) {
    const txn: WalletTransactionPayload = {
        function: `${MachikadoAccountAddress}::MachikadoNetwork::create_invite`,
        type_arguments: [],
        arguments: [MachikadoAccountAddress, inviteTargetAddress]
    }
    try {
        return await window.martian!.generateSignAndSubmitTransaction(signer, txn)
    } catch (e) {
        return null
    }
}

const toHex = (s: string) => {
    const encoded = new TextEncoder().encode(s)
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("")
}

export const fromHex = (s: string) => {
    s = s.replace("0x", "")
    const chars = s.match(/.{2}/g) ?? []
    return chars.map(x => String.fromCharCode(parseInt(x, 16))).join("")
}

export async function createMachikadoAccount(signer: WalletAddress, name: string) {
    const txn: WalletTransactionPayload = {
        function: `${MachikadoAccountAddress}::MachikadoNetwork::create_account`,
        type_arguments: [],
        arguments: [MachikadoAccountAddress, toHex(name)]
    }
    try {
        return await window.martian!.generateSignAndSubmitTransaction(signer, txn)
    } catch (e) {
        return null
    }
}

export async function createSubnet(signer: WalletAddress, subnet: number) {
    const txn: WalletTransactionPayload = {
        function: `${MachikadoAccountAddress}::MachikadoNetwork::create_subnet`,
        type_arguments: [],
        arguments: [MachikadoAccountAddress, subnet]
    }
    try {
        return await window.martian!.generateSignAndSubmitTransaction(signer, txn)
    } catch (e) {
        console.log(e)
        return null
    }
}
