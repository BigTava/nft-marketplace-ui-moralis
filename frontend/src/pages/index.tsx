import type { NextPage } from "next"

import networkConfig from "../../constants/networkMapping.json"
import { useMoralis } from "react-moralis"

// const PAGE_SIZE = 9

interface nftInterface {
    price: number
    nftAddress: string
    tokenId: string
    address: string
    seller: string
}

interface contractAddressesInterface {
    [key: string]: contractAddressesItemInterface
}

interface contractAddressesItemInterface {
    [key: string]: string[]
}

const Home: NextPage = () => {
    const { chainId } = useMoralis()
    const addresses: contractAddressesInterface = networkConfig
    const marketplaceAddress = chainId
        ? addresses[parseInt(chainId!).toString()]["NftMarketplace"][0]
        : null

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap"></div>
        </div>
    )
}
export default Home
