import type {ReactNode} from "react"

export type ButtonProps = {
    href?: string
    onClick?: () => void
    children: ReactNode
}

const buttonClassName = "px-4 py-2 border-primary-600 border rounded-md text-black mx-2"

export const Button = (props: ButtonProps) => {
    return <>
        {typeof props.href === "undefined"
            ? <button onClick={props.onClick} className={buttonClassName}>{props.children}</button>
            : <a href={props.href} className={buttonClassName}>{props.children}</a>
        }
    </>
}
