import type {ReactNode} from "react"
import clsx from "clsx"

interface ContainerProps {
    children?: ReactNode
    half?: boolean
}

const Container = ({children, half = false}: ContainerProps) => {
    return <div className={clsx(half ? "w-1/2" : "max-w-2xl","mx-auto")}>
        <div className={"m-2 p-2 bg-white rounded-xl shadow-xl hover:shadow-sm duration-500"}>
            {children}
        </div>
    </div>
}

const ContainerWrapper = ({children}: {children: ReactNode}) => {
    return <div className={"flex justify-between max-w-2xl mx-auto"}>
        {children}
    </div>
}

const Title = ({children}: {children: ReactNode}) =>
    <div className={"my-2 text-sm font-bold text-primary-900 text-center"}>{children}</div>


const className = "my-1 block w-full py-2 font-bold text-white bg-primary-600 hover:bg-primary-700 duration-300 text-center rounded-md"

const Button = ({href, onClick, children}: {href?: string, onClick?: () => void, children: ReactNode}) => {
    return href
        ? <a className={className} href={href}>{children}</a>
        : <button className={className} onClick={onClick}>{children}</button>
}


export default Object.assign(Container, {Wrapper: ContainerWrapper, Title, Button})
