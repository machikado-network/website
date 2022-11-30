import Container from "~/components/Container"
import {useCallback, useState} from "react"
import {sendInvite} from "~/lib/aptos"
import {useAptos} from "~/hooks/useAptos"
import type {WalletAddress} from "~/lib/aptos/browser"
import {LargeButton} from "~/components/Button"

const SendInvite = () => {
    const {account} = useAptos()
    const [address, setAddress] = useState("")

    const send = useCallback(async () => {
        await sendInvite(account.address, address as unknown as WalletAddress)
    }, [account.address, address])

    return <Container>
        <div className={"text-center text-primary-900 text-sm my-2"}>招待をアドミン権限で送信する</div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Address
        </label>
        <div className="mt-1 mb-2">
            <input
                value={address}
                onChange={event => setAddress(event.target.value)}
                type="text"
                name="address"
                id="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="0x1ddebc78b10a4a2a4cb55cd73fd80805513bf3b224caaf8fb93e659d9ec9fd29"
            />
        </div>
        <LargeButton onClick={send}>送信</LargeButton>
    </Container>
}

export const AdminView = () => {
    return <>
        <SendInvite />
    </>
}
