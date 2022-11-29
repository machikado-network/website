import {SolidWalletConnectButton} from "~/components/App/WalletConnectButton"
import {useAccountCount} from "~/hooks/useAccountCount"
import Container from "~/components/Container"

export const NotConnectedContent = () => {
    const count = useAccountCount()

    return <Container>
        <div className={"text-center text-sm font-sans text-primary-900"}>まちカドネットワーク アカウント</div>
        <div className={"text-center font-bold text-4xl my-2"}>{count}アカウント</div>
        <div className={"p-3"}>
            <SolidWalletConnectButton />
        </div>
    </Container>
}
