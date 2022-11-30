import {Fragment, memo} from "react"
import { Transition, Dialog } from "@headlessui/react"
import {useAptos} from "~/hooks/useAptos"
import Container from "~/components/Container";
import {MachikadoAccountAddress} from "~/lib/aptos";

const AccountDetailContent = () => {
    const {account, disconnect} = useAptos()

    if (!account.connected) return <></>

    return <>
        <div className={"text-center font-bold mb-6"}>Hello, {account.address.substring(0, 6)}...{account.address.substring(account.address.length-7, account.address.length)}</div>
        <Container.Button href={`https://explorer.aptoslabs.com/account/${account.address}`}>アカウントをAptos Explorerで見る</Container.Button>
        <Container.Button href={`https://explorer.aptoslabs.com/account/${MachikadoAccountAddress}`}>まちカドネットワークアカウントをAptos Explorerで見る</Container.Button>

        <div className={"h-12"}/>

        <button
            className={"w-full py-3 bg-gray-400 font-bold text-xl hover:bg-primary-500 rounded-md duration-300"}
            onClick={disconnect}
        >
            Disconnect Wallet
        </button>
    </>
}

interface AccountDetailProps {
    open: boolean
    setOpen: (value: boolean) => void
}

const AccountDetailRaw = ({open, setOpen}: AccountDetailProps) => {
    return <Transition.Root show={open} as={Fragment} appear>
        <Dialog as="div" className="relative z-60" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-4">
                        <AccountDetailContent />
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
}

export default memo(AccountDetailRaw)
