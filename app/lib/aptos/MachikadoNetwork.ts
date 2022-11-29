export type AccountStore = {
    accounts: TableHandle
    addresses: string[]
    invites: TableHandle
}

export type TableHandle = {
    handle: string
}

export type AptosOption<T> = {
    vec: [T] | []
}

export interface TincNode {
    name: string
    public_key: string
    inet_hostname: AptosOption<string>
    inet_port: AptosOption<number>
}

export interface Subnet {
    id: number
}

export interface MachikadoAccount {
    name: string
    nodes: TincNode[]
    subnets: Subnet[]
}

export type InviteKey = {
    invitee: string
}

export type Invite = {
    inviter: string
    used: boolean
}
