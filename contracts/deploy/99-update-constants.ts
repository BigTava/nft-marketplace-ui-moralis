import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import path from "path"

const generatePath = (...args: string[]) => path.resolve(__dirname, "../..", ...args)

const FRONTEND_ADDRESSES_FILE = generatePath("frontend", "constants", "networkMapping.json")
const FRONTEND_ABI_FILE = generatePath("frontend", "constants", "abi.json")
const BACKEND_ADDRESSES_FILE = generatePath("moralis-backend", "constants", "networkMapping.json")
const BACKEND_ABI_FILE = generatePath("moralis-backend", "constants", "abi.json")

const updateConstants: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    await update(hre, FRONTEND_ADDRESSES_FILE, FRONTEND_ABI_FILE)
    await update(hre, BACKEND_ADDRESSES_FILE, BACKEND_ABI_FILE)
}

const update = async function (
    hre: HardhatRuntimeEnvironment,
    addressesFile: string,
    abiFile: string
) {
    const { network, ethers } = hre
    const chainId = network.config.chainId?.toString()!
    console.log(process.env.UPDATE_CONSTANTS)
    if (process.env.UPDATE_CONSTANTS) {
        console.log("Writing to constants...")
        const nftMarketplace = await ethers.getContract("NftMarketplace")

        let contractAddresses
        try {
            const parsedData = JSON.parse(fs.readFileSync(addressesFile, "utf8"))
            contractAddresses =
                typeof parsedData === "object" && !Array.isArray(parsedData) ? parsedData : {}
        } catch (error) {
            contractAddresses = {}
        }

        if (contractAddresses && chainId in contractAddresses) {
            if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.address)) {
                contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address)
            }
        } else {
            contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] }
        }

        fs.writeFileSync(addressesFile, JSON.stringify(contractAddresses))
        const formattedData = nftMarketplace.interface.format(ethers.utils.FormatTypes.json)

        !Array.isArray(formattedData) && fs.writeFileSync(abiFile, formattedData)

        console.log("Constants written!")
    }
}

export default updateConstants
updateConstants.tags = ["all", "constants"]
