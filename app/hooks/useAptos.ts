import {useCallback, useContext} from "react"
import {AptosContext} from "~/lib/context"
import {toast} from "react-toastify"

export function useAptos() {
    const {state, dispatch} = useContext(AptosContext)

    const startup = useCallback(async () => {
        if (state.connected) return

        if (typeof window.martian === "undefined") return

        try {
            const account = await window.martian.account()
            if (!account) return

            const {chainId} = await window.martian.getChainId()
            dispatch({
                address: account.address,
                chainId,
                connected: true
            })
        } catch (e) {
            return
        }
    }, [dispatch, state.connected])

    const connect = useCallback(async () => {
        if (state.connected) return
        if (typeof window.martian === "undefined") {
            toast.error("Martian Walletを導入してください。")
            return
        }
        try {
            const result = await window.martian.connect()
            const {chainId} = await window.martian.getChainId()
            dispatch({
                address: result.address,
                chainId,
                connected: true,
            })
            await toast.success("接続しました。")
        } catch (e) {
            return
        }
    }, [dispatch, state.connected])

    const disconnect = useCallback(async () => {
        if (!state.connected) return
        try {
            await window.martian?.disconnect()
            dispatch({
                address: "",
                chainId: -1,
                connected: false,
            })
        } catch {}
    }, [dispatch, state.connected])

    return {
        connect,
        disconnect,
        startup,
        account: state,
    }
}
