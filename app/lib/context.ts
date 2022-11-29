import type { Dispatch} from "react"
import {createContext} from "react"
 import type {WalletAddress} from "~/lib/aptos/browser"

export type AptosContextState = {
    address: WalletAddress
    chainId: number
    connected: boolean
}

export const aptosDefaultState = {
    address: "0x" as WalletAddress,
    chainId: -1,
    connected: false
}

export const AptosContext = createContext<{state: AptosContextState, dispatch: Dispatch<Partial<AptosContextState>>}>({
    state: aptosDefaultState,
    dispatch: () => {}
})

export const aptosReducer = (state: AptosContextState, action: Partial<AptosContextState>) => {
    return {...state, ...action}
}
