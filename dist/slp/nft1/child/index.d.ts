export default class SlpNft1Child {
    constructor(apiBaseUrl: any, isChipnet: any);
    isChipnet: any;
    _api: import("axios").AxiosInstance;
    dustLimit: number;
    tokenType: number;
    getNftUtxos(handle: any, tokenId: any, rawTotalSendAmount: any): Promise<{
        cumulativeAmount: BigNumber;
        convertedSendAmount: BigNumber;
        utxos: any[];
        tokenDecimals?: undefined;
    } | {
        cumulativeAmount: BigNumber;
        convertedSendAmount: BigNumber;
        tokenDecimals: number;
        utxos: {
            tokenId: any;
            tx_hash: any;
            tx_pos: any;
            tokenQty: number;
            value: number;
            wallet_index: any;
            address_path: any;
        }[];
    }>;
    getBchUtxos(handle: any, value: any): Promise<{
        cumulativeValue: BigNumber;
        utxos: {
            tx_hash: any;
            tx_pos: any;
            value: BigNumber;
            wallet_index: any;
            address_path: any;
        }[];
    }>;
    retrievePrivateKey(mnemonic: any, derivationPath: any, addressPath: any): Promise<any>;
    broadcastTransaction(txHex: any): Promise<import("axios").AxiosResponse<any>>;
    send({ sender, feeFunder, childTokenId, recipient, changeAddress, broadcast }: {
        sender: any;
        feeFunder: any;
        childTokenId: any;
        recipient: any;
        changeAddress: any;
        broadcast: any;
    }): Promise<any>;
}
import BigNumber from 'bignumber.js';
//# sourceMappingURL=index.d.ts.map