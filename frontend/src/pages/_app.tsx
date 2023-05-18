import "../styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import { NotificationProvider } from "web3uikit"
import Header from "../components/Header"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <NotificationProvider>
                <Header />
                <Component {...pageProps} />
            </NotificationProvider>
        </>
    )
}
export default MyApp
