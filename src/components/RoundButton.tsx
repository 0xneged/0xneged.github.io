import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export default function RoundButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren
) {
  return (
    <button
      className="border-accent-bright from-accent-pale to-accent bg-from shadow-accent-bright text-alt-bright aspect-square h-40 w-40 cursor-pointer rounded-full border-2 bg-gradient-to-b p-4 text-center text-2xl font-black drop-shadow-[0_0.75rem_0_#1b1758] transition-all duration-700 select-none hover:brightness-110 hover:drop-shadow-[0_0.6rem_0_#1b1758]"
      {...props}
    >
      {props.children}
    </button>
  )
}
