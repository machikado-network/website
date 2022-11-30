import {memo, useState} from "react";
import {useAptos} from "~/hooks/useAptos";
import {useSWRConfig} from "swr";
import {useForm} from "react-hook-form";
import type { DialogProps} from "~/components/App/Dialog/index";
import {Dialog} from "~/components/App/Dialog/index";
import {toast} from "react-toastify";
import {fromHex, updateNodeInet} from "~/lib/aptos";
import type {NodeWithUser} from "~/hooks/useNodes";

type FormData = {
    inetHost: string
    inetPort: string
}

const EditNodeRaw = ({open, setOpen, node}: DialogProps & {node: NodeWithUser}) => {
    const [loading, setLoading] = useState(false)
    const {account} = useAptos()
    const { mutate } = useSWRConfig()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

    const onSubmit = handleSubmit(async data => {
        if (data.inetHost.length === 0 && data.inetPort.length === 0) {
            reset()
            setLoading(false)
            setOpen(false)
            return
        }

        const id = toast.loading("送信しています...")
        const result = await updateNodeInet(account.address, fromHex(node.name), data.inetHost, parseInt(data.inetPort))
        if (!result) {
            toast.update(id, {
                type: "error",
                render: "更新に失敗しました。",
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
        await mutate("/nodes")
        reset()
        setLoading(false)
        setOpen(false)
    })

    return <Dialog open={open} setOpen={setOpen} >
        <div className="font-bold text-lg text-center">ノード編集</div>
        <div className={"text-gray-600 text-center"}>ノードのホスト名・ポートを編集できます。</div>
        <form onSubmit={onSubmit}>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                ホスト名
            </label>
            <div className="mt-1 mb-2">
                <input
                    {...register("inetHost", {
                        required: true,
                        minLength: 3,
                        maxLength: 100,
                    })}
                    className="py-2 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="syamimomo.d.mchkd.net"
                />
                {!errors.inetHost ? null : <p className={"text-red-500 text-sm"}>3文字以上100文字以下で入力してください</p>}
            </div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                ポート
            </label>
            <div className="mt-1 mb-2">
                <input
                    type={"number"}
                    {...register("inetPort", {
                        required: false,
                        min: 1,
                        max: 65535,
                        pattern: /^[0-9]+$/g
                    })}
                    className="py-2 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="655"
                />
                {!errors.inetPort ? null : <p className={"text-red-500 text-sm"}>1から65535の中から入力してください</p>}
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

export const EditNode = memo(EditNodeRaw)
