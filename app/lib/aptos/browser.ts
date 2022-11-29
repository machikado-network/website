export declare interface AptosBrowserExtension {
    connect(): Promise<WalletConnectResponse>
    disconnect(): Promise<void>,
    getChainId(): Promise<{chainId: number}>
    getAccount(address: string): Promise<WalletAccountData>
    generateTransaction(address: WalletAddress, payload: WalletTransactionPayload): Promise<Transaction>
    signTransaction(txn: Transaction): Promise<SignedTransaction>
    submitTransaction(signedTxn: SignedTransaction): Promise<WalletTransactionHash>
    signAndSubmitTransaction(txn: Transaction): Promise<WalletTransactionHash>
    generateSignAndSubmitTransaction(address: WalletAddress, payload: WalletTransactionPayload): Promise<WalletTransactionHash>
    isConnected(): Promise<boolean>
    account(): Promise<WalletAccount>
}

type Transaction = string
type SignedTransaction = string
type WalletAddress = `0x${string}`

export type WalletConnectResponse = {
    address: WalletAddress
    id: number
    method: string
    publicKey: `0x${string}`
    tabId: string
}

export type WalletAccount = {
    address: WalletAddress
    publicKey: WalletAddress
}

export type WalletAccountData = {
    authentication_key: `0x${string}`
    sequence_number: string
}

export type MoveModuleAddress = `0x${string}::${string}::${string}`

export interface WalletTransactionPayload {
    function: MoveModuleAddress
    type_arguments: MoveModuleAddress[],
    arguments: (string | number)[]
}

export type WalletTransactionHash = {
    expiration_timestamp_secs: string
    gas_unit_price: string
    hash: WalletAddress
    max_gas_amount: string
    payload: WalletTransactionPayload
    sender: WalletAddress
    sequence_number: string
    signature: {
        public_key: WalletAddress
        signature: `0x${string}`
        type: "ed25519_signature"
    }
}
