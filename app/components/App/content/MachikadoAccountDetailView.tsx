import {useMachikadoAccount} from "~/hooks/useMachikadoAccount"
import {useAptos} from "~/hooks/useAptos"
import Container from "~/components/Container"
import {fromHex} from "~/lib/aptos"
import { NotHavingMachikadoAccountView } from "./NotHavingMachikadoAccountView"
import {useState} from "react"
import {CreateSubnet} from "~/components/App/Dialog/CreateSubnet"


const MachikadoAccountDetail = () => {
    const {account} = useAptos()
    const {account: machikadoAccount} = useMachikadoAccount(account.connected ? account.address : undefined)
    const [isOpenCreateSubnet, setIsOpenCreateSubnet] = useState(false)

    return <>
        <div className={"mb-6 text-2xl font-bold text-center"}>ようこそ、{fromHex(machikadoAccount?.name ?? "")}さん</div>
        <Container.Wrapper>
            <Container half>
                <Container.Title>ノード数</Container.Title>
                <div className={"font-bold text-4xl text-center my-6"}>{machikadoAccount?.nodes.length ?? 0}</div>
                <Container.Button>ノード追加</Container.Button>
            </Container>
            <Container half>
                <Container.Title>サブネット</Container.Title>
                <div className={"font-bold text-4xl text-center my-6"}>::{machikadoAccount?.subnets[0].id ?? "なし"}</div>
                <CreateSubnet open={isOpenCreateSubnet} setOpen={setIsOpenCreateSubnet} />
                {!machikadoAccount?.subnets[0]
                    ? <Container.Button onClick={() => setIsOpenCreateSubnet(true)}>サブネット作成</Container.Button>
                    : <Container.Button disabled>サブネット所有済み</Container.Button>
                }
            </Container>
        </Container.Wrapper>
        {(machikadoAccount?.nodes.length ?? 0) > 0
            ? <Container>
                <Container.Title>ノード一覧</Container.Title>
            </Container>
            : null
        }
        <Container>
            <Container.Title>まちカドアカウント情報</Container.Title>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{fromHex(machikadoAccount?.name ?? "")}</dd>
                    </div>
                </dl>
            </div>
        </Container>
    </>
}

export const MachikadoAccountDetailView = () => {
    const {account} = useAptos()
    const {account: machikadoAccount} = useMachikadoAccount(account.connected ? account.address : undefined)

    return !machikadoAccount
        ? <NotHavingMachikadoAccountView account={account} />
        : <MachikadoAccountDetail />
}
