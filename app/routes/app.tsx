import {useEffect, useReducer} from "react"
import {AptosContext, aptosDefaultState, aptosReducer} from "~/lib/context"
import {SolidWalletConnectButton, WalletConnectButton} from "~/components/App/WalletConnectButton"
import {useAptos} from "~/hooks/useAptos"
import {useAccountCount} from "~/hooks/useAccountCount";
import {NotConnectedContent} from "~/components/App/content/NotConnectedContent";
import {MachikadoAccountDetailView} from "~/components/App/content/MachikadoAccountDetailView";
import {MachikadoAccountAddress} from "~/lib/aptos";
import {AdminView} from "~/components/App/content/AdminView";

function Header() {
    return <header className="relative mb-20 lg:pt-6">
        <div className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap mx-auto max-w-full px-4 sm:px-6">
            <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
            </div>
            <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
                <a className="mx-auto flex items-center gap-4 px-4" href={"/app"}>
                    <img src={"/logo_with_text.svg"} className="h-12 w-auto text-slate-900"  alt={"logo"}/>
                </a>
            </div>
            <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
                <WalletConnectButton />
            </div>
        </div>
    </header>
}


export default function App() {
    const [state, dispatch] = useReducer(aptosReducer, aptosDefaultState)
    const {startup} = useAptos()

    useEffect(() => {
        startup().catch(console.error)
    }, [startup])

    return <AptosContext.Provider value={{state, dispatch}}>
        <Header />
        <div className={"container mx-auto justify-center items-center"}>
            {MachikadoAccountAddress === state.address
                ? <AdminView />
                : state.connected
                    ? <>
                        <MachikadoAccountDetailView />
                    </>
                    : <NotConnectedContent />
            }
        </div>
    </AptosContext.Provider>
}
