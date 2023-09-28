export default class OpReturnGenerator {
    generateChildMintOpReturn(label: any, ticker: any, docUrl: any): Promise<any>;
    generateGroupSendOpReturn(utxos: any, ...sendAmounts: any[]): any;
    generateGroupCreateOpReturn(fixedSupply: any, name: any, ticker: any, documentUrl: any, initialQty: any): Promise<any>;
    generateGroupMintOpReturn(utxos: any, qty: any): any;
}
//# sourceMappingURL=op_returns.d.ts.map