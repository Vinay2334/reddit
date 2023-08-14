'use client'
import { ChakraProvider } from "@chakra-ui/react"
import { RecoilRoot } from "recoil"
import Navbar from "../Navbar/Navbar"
import { theme } from '@/chakra/theme';


export default function MainClientLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
       <RecoilRoot>
        <ChakraProvider theme={theme}>
        <Navbar/>
        {children}
        </ChakraProvider>
        </RecoilRoot>
      </>
    )
  }