import type { DialogProps} from "~/components/App/Dialog/index"
import {Dialog} from "~/components/App/Dialog/index"
import {memo, useState} from "react"
import {useAptos} from "~/hooks/useAptos"
import {useSWRConfig} from "swr"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {createNode} from "~/lib/aptos"

const PLACEHOLDER = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEArAlqLBAronTRJQPUqtnLo/yZqxwJZiel5XEEdZPZYWtpxZvsm7p9
ku82P0I3QtwCkNAAuf28c6QEYQ2PGChnTLrC+PsWNF8Jwgc6jTteA3N5rpOP7ISJ
NqTATh9g21Hxoz/P0nfBv+aqv1l/ghsSZA18zhzpOYtd7Oemc8TUhrafuYPUET+J
s47SqYZQZ77tKrOKXNn0nStIL7beJPbBWTLS/+57mzZTilDDS8DXFeyDZIfiQg0Z
Y3UesikxX0fn23VemFsTyJg/Rm8jkcdAy53Qpzh2re1ugmZRRWRyXzt0QvWkp4ld
jYjoxbU0fN6/2bP0nL/+VwGdI2elaSKITwIDAQAB
-----END RSA PUBLIC KEY-----`

type FormData = {
    name: string
    publicKey: string
}

const CreateNodeRaw = ({open, setOpen}: DialogProps) => {
    const [loading, setLoading] = useState(false)
    const {account} = useAptos()
    const { mutate } = useSWRConfig()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)
        const id = toast.loading("送信しています...")
        const result = await createNode(account.address, data.name, data.publicKey)
        if (!result) {
            toast.update(id, {
                type: "error",
                render: "失敗しました。名前の重複がないか確認してください。",
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
        <div className="font-bold text-lg text-center">ノード作成</div>
        <div className={"text-gray-600 text-center"}>まちカドネットワークに接続するノードを登録できます。</div>
        <form onSubmit={onSubmit}>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                ノード名
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
                    placeholder="syamimomo"
                />
                {!errors.name ? null : <p className={"text-red-500 text-sm"}>名前は3文字以上32文字以下で、0-9a-zの文字にしてください。</p>}
            </div>
            <div className={"my-2"}>
                <textarea
                    {...register("publicKey", {
                        minLength: 400,
                        maxLength: 430,
                        required: true
                    })}
                    placeholder={PLACEHOLDER}
                    className={"w-full p-2 rounded-md border-primary-500 border-2 h-64"}
                ></textarea>
                {!errors.publicKey ? null : <p className={"text-red-500 text-sm"}>有効なパブリックキーを入力してください。</p>}
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

export const CreateNode = memo(CreateNodeRaw)
