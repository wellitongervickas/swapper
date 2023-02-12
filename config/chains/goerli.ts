import { Chain } from "./factory";

const goerli = new Chain({
  id: 5,
  title: "Goerli",
  name: "goerli",
  scanURL: "goerli.etherscan.io",
});

goerli.addHub({
  uniswap: {
    address: process.env.NEXT_PUBLIC_GOERLI_POOL_ADDRESS!,
  },
});

export default goerli;
