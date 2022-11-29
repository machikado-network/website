import {useAptos} from "~/hooks/useAptos"
import {useState} from "react"
import AccountDetail from "./AccountDetail"

const getChainName = (value: number) => {
    switch (value) {
        case -1:
            return "Unknown"
        case 1:
            return "Mainnet"
        case 2:
            return "Testnet"
        default:
            return "Devnet"
    }
}

const AccountButton = () => {
    const {account} = useAptos()
    const [open, setOpen] = useState(false)

    return <>
        <button
            className={"px-5 py-3 bg-white text-black border-black border-2 rounded-xl font-bold"}
            onClick={() => setOpen(true)}
        >
            [{getChainName(account.chainId)}]{' '}
            {account.address.substring(0, 6)}...{account.address.substring(account.address.length-7, account.address.length)}
        </button>
        <AccountDetail open={open} setOpen={setOpen} />
    </>
}

export const WalletConnectButton = () => {
    const {account, connect} = useAptos()


    return account.connected
        ? <AccountButton />
        : <button
            className={"px-5 py-3 bg-primary-500 rounded-md text-white hover:bg-primary-700 duration-300"}
            onClick={connect}
        >
            Connect Wallet with Martian
        </button>
}

export const SolidWalletConnectButton = () => {
    const {connect} = useAptos()

    return <button
        className={"py-3 bg-primary-500 rounded-md text-white hover:bg-primary-700 duration-300 w-full"}
        onClick={connect}
    >
        Connect Wallet with Martian
    </button>
}
