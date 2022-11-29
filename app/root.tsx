import type {MetaFunction} from "@remix-run/cloudflare"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react"
import styles from "./styles/app.css"
import toast from 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify"

export function links() {
    return [
        {rel: "stylesheet", href: styles},
        {rel: "stylesheet", href: toast},
    ]
}


export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "まちカドネットワーク 公式ウェブサイト",
    viewport: "width=device-width,initial-scale=1",
})

export default function App() {
    return (
        <html lang="ja">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        <ToastContainer/>
        </body>
        </html>
    )
}
