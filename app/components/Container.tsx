import type {ReactNode} from "react"

interface ContainerProps {
    children?: ReactNode
}

const Container = ({children}: ContainerProps) => {
    return <div className={"max-w-2xl mx-auto p-2 rounded-xl border-4 border-primary-500"}>
        {children}
    </div>
}


export default Container
