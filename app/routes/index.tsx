import {Button} from "~/components/Button"
import {useAccountCount} from "~/hooks/useAccountCount"
import {useNodes} from "~/hooks/useNodes"

const ScrapboxUrl = "https://scrapbox.io/machikado-network/%E3%81%BE%E3%81%A1%E3%82%AB%E3%83%89%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF"

function Header() {
    return <header className="relative z-50 pb-11 lg:pt-11">
        <div
            className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
                <img src={"/logo_with_text.svg"} className="h-12 w-auto text-slate-900" alt={"logo"}/>
            </div>
            <div
                className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
                <div className="mx-auto flex items-center gap-4 px-4">
                </div>
            </div>
            <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
                <Button
                    href={ScrapboxUrl}>詳しく知る</Button>
                <Button href="/app">住人の方はこちら</Button>
            </div>
        </div>
    </header>
}


function Hero() {
    const count = useAccountCount()
    const nodes = useNodes()

    return (
        <div className="relative pt-10 pb-20 sm:py-24">
            <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden bg-primary-50">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-50"/>
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50"/>
            </div>
            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl lg:max-w-4xl lg:px-12">
                    <h1 className="font-display text-3xl font-bold tracking-tighter text-primary-600 sm:text-6xl">
                        <span className="sr-only">まちカドネットワーク - </span>
                        50人くらいでやってる<br className={""}/>インターネットを作ろう。
                    </h1>
                    <div className="mt-6 space-y-6 font-display sm:text-lg tracking-tight text-primary-900">
                        <p>
                            まちカドネットワークは、インターネットから完全に分離されたちいさな「第二のインターネット」をつくるプロジェクトです。
                        </p>
                        <p>
                            インターネットが現在のように世界中のあらゆる人のものになる以前、そこはまるで「まちかど」のような場所でした。<br/>
                            開けてはいるけれど、決して広い世界ではなかったのです。<br/>
                            そこでは、今よりもゆっくりと時間が流れていました。<br/>
                            インターネットと同じように使えるけれど、インターネットからは独立した小さな空間をつくったら、そこは新たな「まちかど」になるのではないか？これが「まちカドネットワーク」の出発点です。
                        </p>
                        <p>
                            もしあなたが「結界」を超えられたなら、ニンゲンもまぞくも魔法少女も、どうぞいらしてください。
                        </p>
                    </div>
                    <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
                        {[
                            ['Nodes', nodes.data.length.toString()],
                            ['People', count.toString()],
                            ['Location', 'World\'s edge'],
                        ].map(([name, value]) => (
                            <div key={name}>
                                <dt className="font-mono text-sm text-primary-600">{name}</dt>
                                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-primary-900">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <a href={ScrapboxUrl} className={"sm:hidden block text-center mt-10 py-3 bg-primary-500 rounded-md text-white hover:bg-primary-700 duration-300 w-full"}>
                        詳しく知る
                    </a>
                </div>
            </div>
        </div>
    )
}

export default function Index() {
    return (
        <>
            <Header/>
            <main>
                <Hero/>
            </main>
        </>
    )
}
