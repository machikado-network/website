import type { ReactNode } from "react"
import {Fragment, memo} from "react"
import {Transition, Dialog as HeadlessDialog} from "@headlessui/react"

export interface DialogProps {
    open: boolean
    setOpen(value: boolean): void
}

const DialogRaw = ({open, setOpen, children}: DialogProps & {children?: ReactNode}) => {
    return <Transition.Root show={open} as={Fragment} appear>
        <HeadlessDialog as="div" className="relative z-60" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <HeadlessDialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-4">
                        {children}
                    </HeadlessDialog.Panel>
                </Transition.Child>
            </div>
        </HeadlessDialog>
    </Transition.Root>
}

export const Dialog = memo(DialogRaw)
