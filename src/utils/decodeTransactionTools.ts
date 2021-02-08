import createKeccakHash from 'keccak'
import { Decoder } from '@bitgo/eth-contracts';
import { Coin, SupportERC20CoinList } from './supportCoin';
const decoder = new Decoder();


// util function start---------------------------------------
export const CustomTrimLeft = (text:string) =>{
    if (text === undefined)
        text = "\s";

    return text.replace(/^0+/, '')
}

export const ToChecksumAddress = (address:string)=>{
    try {
        if(address !== null){
            address = address.toLowerCase().replace('0x', '')
            const hash = createKeccakHash('keccak256').update(address).digest('hex')
            let ret = '0x'

            for (let i = 0; i < address.length; i++) {
                if (parseInt(hash[i], 16) >= 8) {
                ret += address[i].toUpperCase()
                } else {
                ret += address[i]
                }
            }

            return ret
        }

    } catch (error) {
        console.error("ToChecksumAddress error", error)
        return null
    }

}

// output:
// address, value, coin
export function DecodeContractTransaction(from:string, to:string, value:string, input:string){
    let coin:Coin = null
    let fromAddress:string = null
    let toAddress:string = null
    let txValue:string = null; // txValue can be Dec or Hex, bignumber outside will convert and process it

    if(input === "0x"){
        coin = Coin.ETH
        fromAddress = ToChecksumAddress(from)
        toAddress = ToChecksumAddress(to)
        txValue = value
    }else if(input.slice(0,10) === "0xa9059cbb"){
        // input.slice(0,10) === "0xa9059cbb" is to limit Transfer method signature only
        // Transfer method is only we need for ERC20 token
        const inputBody = input.split("0x")[1]
        const supportTokenFound = SupportERC20CoinList.find(e=>e.contractAddress === to)
        if(supportTokenFound !== undefined){
            coin = supportTokenFound.tokenName
            fromAddress = ToChecksumAddress(from)
            toAddress = ToChecksumAddress("0x"+inputBody.slice(32,72))
            txValue = "0x"+CustomTrimLeft(inputBody.slice(72,136))
        }
    }else if(input.slice(0,10) === "0x39125215"){
        // this to process contract WalletSimple tx, supported by Bitgo / Bitstamp
        // input.slice(0,10) === "0x39125215" is contract WalletSimple - sendMultiSig
        // ref https://github.com/BitGo/eth-multisig-v4/blob/master/contracts/WalletSimple.sol
        const inputBody = input.split("0x")[1]
        const decodedDataSendMultiSig = decoder.decode(Buffer.from(inputBody, 'hex'));
        const toAddressData = decodedDataSendMultiSig.args[0]
        const valueData = decodedDataSendMultiSig.args[1]
        // const tokenData = decodedDataSendMultiSig.args[2]
        coin = Coin.ETH
        fromAddress = ToChecksumAddress(from)
        toAddress = ToChecksumAddress(toAddressData.value)
        txValue = valueData.value
    }else if(input.slice(0,10) === "0x0dcd7a6c"){
        // this to process contract WalletSimple tx, supported by Bitgo / Bitstamp
        // input.slice(0,10) === "0x0dcd7a6c" is contract WalletSimple - sendMultiSigToken
        // ref https://github.com/BitGo/eth-multisig-v4/blob/master/contracts/WalletSimple.sol
        const inputBody = input.split("0x")[1]
        const decodedDataSendMultiSig = decoder.decode(Buffer.from(inputBody, 'hex'));
        const toAddressData = decodedDataSendMultiSig.args[0]
        const valueData = decodedDataSendMultiSig.args[1]
        const tokenData = decodedDataSendMultiSig.args[2]

        const supportTokenFound = SupportERC20CoinList.find(e=>e.contractAddress === tokenData.value)
        if(supportTokenFound !== undefined){
            coin = supportTokenFound.tokenName
            fromAddress = ToChecksumAddress(from)
            toAddress = ToChecksumAddress(toAddressData.value)
            txValue = valueData.value
        }
    }


    return {
        coin,
        fromAddress,
        toAddress,
        txValue,
    }

}