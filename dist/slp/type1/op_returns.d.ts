export default class OpReturnGenerator {
    generateSendOpReturn({ tokenId, sendAmounts }: {
        tokenId: any;
        sendAmounts: any;
    }): Buffer;
    generateGenesisOpReturn(fixedSupply: any, name: any, ticker: any, decimals: any, initialQty: any, documentUrl: any, documentHash: any): Promise<any>;
    generateMintOpReturn(tokenUtxos: any, tokenQty: any): any;
    generateBurnOpReturn(tokenUtxos: any, tokenQty: any): any;
}
//# sourceMappingURL=op_returns.d.ts.map