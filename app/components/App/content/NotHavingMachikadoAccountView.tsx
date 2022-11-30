import type {AptosContextState} from "~/lib/context"
import {useInvite} from "~/hooks/useInvite"
import {memo, useState} from "react"
import Container from "~/components/Container"
import {CreateAccount} from "~/components/App/Dialog/CreateAccount"
import {PlusIcon} from "@heroicons/react/24/outline"

const NotHavingMachikadoAccountViewRaw = ({account}: {account: AptosContextState}) => {
    const {invite} = useInvite(account.connected ? account.address : undefined)
    const [open, setOpen] = useState(false)

    return <Container>
        <div className="text-center">
            <h3 className="mt-2 text-sm font-medium text-primary-900">アカウントが見つかりません</h3>
            {!invite
                ? <p className="mt-1 text-sm text-gray-500">アカウントを作成するには招待が必要です。</p>
                : <>
                    <p className="mt-1 text-2xl font-bold">招待を受け取っています！</p>
                    <div className="mt-6">
                        <CreateAccount open={open} setOpen={setOpen} />
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => setOpen(true)}
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            アカウント作成
                        </button>
                    </div>
                </>
            }
        </div>
    </Container>
}

export const NotHavingMachikadoAccountView = memo(NotHavingMachikadoAccountViewRaw)
