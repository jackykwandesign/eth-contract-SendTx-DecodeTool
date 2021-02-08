# eth-contract-SendTx-DecodeTool 

This example support simple ether transactions and contract transactions under sendMultiSig & sendMultiSigToken  

## To run example

```

yarn 
yarn start

```

## example output

```
resUSDT {
  coin: 'USDT',
  fromAddress: '0xeb3daaFEcaFd286a916CdaFB1Dd4066c3DeC17e1',
  toAddress: '0x300064bEceE698Ad0149c5eDe42456B901c0c1d3',
  txValue: '0x2255100'
}
resUnknownToken { coin: null, fromAddress: null, toAddress: null, txValue: null }
resBitstampETH {
  coin: 'ETH',
  fromAddress: '0x00BDb5699745f5b860228c8f939ABF1b9Ae374eD',
  toAddress: '0x2887Ce63EA341924F24D3579a49d19cbDAd4b15f',
  txValue: '1000000000000000000'
}
resBitstampETH2 {
  coin: 'ETH',
  fromAddress: '0x00BDb5699745f5b860228c8f939ABF1b9Ae374eD',
  toAddress: '0xFBf4942f00faC134Cab553C57A4D72a20E2C4cc7',
  txValue: '180000000000000000'
}
resBitstampTokenUSD {
  coin: 'USDC',
  fromAddress: '0x00BDb5699745f5b860228c8f939ABF1b9Ae374eD',
  toAddress: '0x475Bf1F770FEc3F4812E22e0ac7163cfD3501C95',
  txValue: '1264652040'
}
```
### Check /src/utils/decodeTransactionTools.ts for the implementation
### To add coin, add in /src/utils/supportCoin.ts


