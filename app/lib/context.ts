import type { Dispatch} from "react"
import {createContext} from "react"

export type AptosContextState = {
    address: string
    chainId: number
    connected: boolean
}

export const aptosDefaultState = {
    address: "",
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
