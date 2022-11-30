import {SolidWalletConnectButton} from "~/components/App/WalletConnectButton"
import {useAccountCount} from "~/hooks/useAccountCount"
import Container from "~/components/Container"
import {NodeListView} from "~/components/App/content/NodeListView"

export const NotConnectedContent = () => {
    const count = useAccountCount()

    return <>
        <Container>
            <Container.Title>まちカドネットワーク アカウント</Container.Title>
            <div className={"text-center font-bold text-4xl my-2"}>{count}アカウント</div>
            <div className={"p-3"}>
                <SolidWalletConnectButton />
            </div>
        </Container>
        <Container>
            <Container.Title>ノード一覧</Container.Title>
            <NodeListView />
        </Container>
    </>
}
