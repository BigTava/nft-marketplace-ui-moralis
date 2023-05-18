const Moralis = require("moralis").default;
const Chains = require("@moralisweb3/evm-utils");
const EvmChain = Chains.EvmChain;

const abi = require("./constants/abi.json");
const networkMapping = require("./constants/networkMapping.json");

const chain = EvmChain.SEPOLIA;
const contractAddress = networkMapping[chain]["NftMarketplace"][0];

const options = {
  chains: [chain],
  description: "All ETH NFT Transfers",
  tag: "nft",
  address: contractAddress,
  includeContractLogs: true,
};

const itemListedOptions = {
  ...options,
  abi: {
    type: "event",
    anonymous: false,
    name: "ItemListed",
    inputs: [
      { type: "address", name: "seller", indexed: true },
      { type: "address", name: "nftAddress", indexed: true },
      { type: "uint256", name: "tokenId", indexed: true },
      { type: "uint256", name: "price", indexed: false },
    ],
  },
  topic0: ["ItemListed(address,address,uint256,uint256)"],
};

const itemBoughtOptions = {
  ...options,
  abi: {
    type: "event",
    anonymous: false,
    name: "ItemBought",
    inputs: [
      { type: "address", name: "buyer", indexed: true },
      { type: "address", name: "nftAddress", indexed: true },
      { type: "uint256", name: "tokenId", indexed: true },
      { type: "uint256", name: "price", indexed: false },
    ],
  },
  topic0: ["ItemBought(address,address,uint256,uint256)"],
  webhookUrl: process.env.WEBHOOK_URL,
};

const itemCancelOptions = {
  ...options,
  abi: {
    type: "event",
    anonymous: false,
    name: "ItemCanceled",
    inputs: [
      { type: "address", name: "seller", indexed: true },
      { type: "address", name: "nftAddress", indexed: true },
      { type: "uint256", name: "tokenId", indexed: true },
    ],
  },
  topic0: ["ItemCanceled(address,address,uint256)"],
};
