import type { DialogProps} from "~/components/App/Dialog/index"
import {Dialog} from "~/components/App/Dialog/index"
import {memo, useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {createMachikadoAccount} from "~/lib/aptos"
import {useAptos} from "~/hooks/useAptos"
import {useSWRConfig} from "swr"

type FormData = {
    name: string
}

const CreateAccountRaw = ({open, setOpen}: DialogProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const {account} = useAptos()
    const { mutate } = useSWRConfig()
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async data => {
        if (loading) return
        setLoading(true)
        const id = toast.loading("送信しています...")
        try {
            await createMachikadoAccount(account.address, data.name)
            toast.success("アカウントの作成に成功しました。", {updateId: id})
            await mutate(["/account", account.address])
        } catch (e) {
            toast.error("アカウントの作成に失敗しました。入力した内容を確認してください。", {updateId: id})
            setLoading(false)
        }
    })

    return <Dialog open={open} setOpen={setOpen} >
        <div className="font-bold text-lg text-center">まちカドアカウント作成</div>
        <div className={"text-gray-600 text-center"}>利用したいアカウント名を入力し、アカウントを作成してください。</div>
        <form onSubmit={onSubmit}>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                アカウント名
            </label>
            <div className="mt-1 mb-2">
                <input
                    {...register("name", {
                        required: true,
                        minLength: 3,
                        maxLength: 32,
                        pattern: /^[a-z0-9]+$/i
                    })}
                    className="py-2 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="0x1ddebc78b10a4a2a4cb55cd73fd80805513bf3b224caaf8fb93e659d9ec9fd29"
                />
                {!errors.name ? null : <p className={"text-red-500 text-sm"}>名前は3文字以上32文字以下で、0-9a-zの文字にしてください。</p>}
            </div>
            <div className={"mt-12"}>
                <input
                    type={"submit"}
                    className={"w-full bg-primary-600 hover:bg-primary-700 duration-300 py-2 rounded-md hover:cursor-pointer text-white disabled:cursor-not-allowed"}
                    disabled={loading}
                />
            </div>
        </form>
    </Dialog>
}

export const CreateAccount = memo(CreateAccountRaw)
