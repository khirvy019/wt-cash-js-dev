export default class SlpNft1Parent {
    constructor(apiBaseUrl: any, isChipnet: any);
    isChipnet: any;
    _api: import("axios").AxiosInstance;
    baseUrl: any;
    dustLimit: number;
    tokenType: number;
    getNftUtxos(handle: any, tokenId: any, rawTotalSendAmount: any, isCreatingChildNft: any, groupBaton?: boolean): Promise<{
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
            type: string;
            wallet_index: any;
            address_path: any;
        }[];
    }>;
    getGroupTokenBalance({ groupTokenId, wallet }: {
        groupTokenId: any;
        wallet: any;
    }): Promise<{
        success: boolean;
        balance: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        balance?: undefined;
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
    generateMintingBatonUtxo({ sender, feeFunder, groupTokenId, recipient, changeAddress, broadcast }: {
        sender: any;
        feeFunder: any;
        groupTokenId: any;
        recipient: any;
        changeAddress: any;
        broadcast: any;
    }): Promise<any>;
    createChildNft({ sender, feeFunder, groupTokenId, recipient, changeAddress, broadcast, label, ticker, docUrl }: {
        sender: any;
        feeFunder: any;
        groupTokenId: any;
        recipient: any;
        changeAddress: any;
        broadcast: any;
        label: any;
        ticker: any;
        docUrl?: string;
    }): Promise<any>;
    findChildNftMintingBaton({ groupTokenId, walletHash, address, }: {
        groupTokenId: any;
        walletHash: any;
        address: any;
    }): Promise<any>;
    createChildNftOrMintingBatonUtxo({ sender, feeFunder, groupTokenId, recipient, changeAddress, broadcast, label, ticker, docUrl, isChildNft }: {
        sender: any;
        feeFunder: any;
        groupTokenId: any;
        recipient: any;
        changeAddress: any;
        broadcast: any;
        label: any;
        ticker: any;
        docUrl: any;
        isChildNft?: boolean;
    }): Promise<any>;
    create({ creator, feeFunder, initialMintRecipient, mintBatonRecipient, changeAddress, broadcast, name, ticker, initialQty, docUrl, fixedSupply }: {
        creator: any;
        feeFunder: any;
        initialMintRecipient: any;
        mintBatonRecipient: any;
        changeAddress: any;
        broadcast: any;
        name: any;
        ticker: any;
        initialQty: any;
        docUrl?: string;
        fixedSupply?: boolean;
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
    send({ sender, feeFunder, tokenId, recipients, changeAddresses, broadcast }: {
        sender: any;
        feeFunder: any;
        tokenId: any;
        recipients: any;
        changeAddresses: any;
        broadcast: any;
    }): Promise<any>;
}
import BigNumber from 'bignumber.js';
//# sourceMappingURL=index.d.ts.map