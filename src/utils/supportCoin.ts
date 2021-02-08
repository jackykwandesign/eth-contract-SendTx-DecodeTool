export interface ERC20Coin{
    contractAddress:string;
    tokenName:Coin
}

// add coin in Enum Coin and SupportERC20CoinList for system to recognize the token
export enum Coin{
    USDT="USDT",
    BTC="BTC",
    ETH="ETH",
    USDC = "USDC"
}

export const SupportERC20CoinList:ERC20Coin[] = [
    {
        contractAddress:"0x",
        tokenName:Coin.ETH
    },
    {
        contractAddress:"0xdac17f958d2ee523a2206206994597c13d831ec7",
        tokenName:Coin.USDT
    },
    {
        contractAddress:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        tokenName:Coin.USDC
    }
]