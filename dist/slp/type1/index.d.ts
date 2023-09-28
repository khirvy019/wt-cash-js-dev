export default class SlpType1 {
    constructor(apiBaseUrl: any, isChipnet: any);
    isChipnet: any;
    _api: import("axios").AxiosInstance;
    dustLimit: number;
    getSlpUtxos(handle: any, tokenId: any, rawTotalSendAmount: any, baton?: boolean, burn?: boolean): Promise<{
        cumulativeAmount: BigNumber;
        convertedSendAmount: BigNumber;
        utxos: any[];
        tokenDecimals?: undefined;
    } | {
        cumulativeAmount: BigNumber;
        convertedSendAmount: BigNumber;
        tokenDecimals: number;
        utxos: {
            decimals: any;
            tokenId: any;
            tx_hash: any;
            tx_pos: any;
            type: string;
            amount: BigNumber;
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
    send({ sender, feeFunder, tokenId, recipients, changeAddresses, broadcast, burn }: {
        sender: any;
        feeFunder: any;
        tokenId: any;
        recipients: any;
        changeAddresses: any;
        broadcast: any;
        burn?: boolean;
    }): Promise<any>;
    create({ creator, feeFunder, initialMintRecipient, mintBatonRecipient, changeAddress, broadcast, name, ticker, decimals, initialQty, docUrl, docHash, fixedSupply, isNftParent }: {
        creator: any;
        feeFunder: any;
        initialMintRecipient: any;
        mintBatonRecipient: any;
        changeAddress: any;
        broadcast: any;
        name: any;
        ticker: any;
        decimals: any;
        initialQty: any;
        docUrl?: string;
        docHash?: string;
        fixedSupply?: boolean;
        isNftParent?: boolean;
    }): Promise<any>;
    mint({ minter, feeFunder, tokenId, quantity, additionalMintRecipient, mintBatonRecipient, changeAddress, broadcast, passMintingBaton }: {
        minter: any;
        feeFunder: any;
        tokenId: any;
        quantity: any;
        additionalMintRecipient: any;
        mintBatonRecipient: any;
        changeAddress: any;
        broadcast: any;
        passMintingBaton?: boolean;
    }): Promise<any>;
}
import BigNumber from 'bignumber.js';
//# sourceMappingURL=index.d.ts.map