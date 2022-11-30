import type {DialogProps} from "~/components/App/Dialog/index"
import {memo, useState} from "react"
import {Dialog} from "~/components/App/Dialog/index"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {createSubnet} from "~/lib/aptos"
import {useAptos} from "~/hooks/useAptos"
import {useSWRConfig} from "swr"

type FormData = {
    subnet: number
}

const CreateSubnetRaw = ({open, setOpen}: DialogProps) => {
    const [loading, setLoading] = useState(false)
    const {account} = useAptos()
    const { mutate } = useSWRConfig()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)
        const id = toast.loading("送信しています...")
        const result = await createSubnet(account.address, data.subnet)
        if (!result) {
            toast.update(id, {
                type: "error",
                render: "失敗しました。サブネットは１つしか利用できません。",
                isLoading: false,
                autoClose: 2000,
            })
            setLoading(false)
            return
        }
        toast.update(id, {
            type: "success",
            render: "成功しました！",
            isLoading: false,
            autoClose: 2000,
        })
        await mutate(["/account", account.address])
        reset()
        setLoading(false)
        setOpen(false)
    })

    return <Dialog open={open} setOpen={setOpen}>
        <div className="font-bold text-lg text-center">サブネット作成</div>
        <div className={"text-gray-600 text-center"}>2から254の中から利用したいサブネットを登録してください。既に利用されているサブネットはご利用いただけません。</div>
        <form onSubmit={onSubmit}>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                サブネット
            </label>
            <div className="mt-1 mb-2">
                <input
                    {...register("subnet", {
                        required: true,
                        max: 254,
                        min: 2,
                        pattern: /^[0-9]+$/g
                    })}
                    className="py-2 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="24"
                />
                {!errors.subnet ? null : <p className={"text-red-500 text-sm"}>サブネットは2から254までで指定してください。</p>}
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

export const CreateSubnet = memo(CreateSubnetRaw)
