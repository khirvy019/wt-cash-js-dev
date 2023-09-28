export declare enum SLPNetworkPrefix {
    mainnet = "simpleledger",
    testnet = "slptest",
    regtest = "slpreg"
}
export default class Address {
    address: any;
    constructor(address: any);
    isSep20Address(): boolean;
    isLegacyAddress(): any;
    isP2SH(): boolean;
    toLegacyAddress(): any;
    toCashAddress(): string;
    isCashAddress(): boolean;
    isTokenAddress(): boolean;
    toTokenAddress(): string;
    isMainnetCashAddress(): boolean;
    isTestnetCashAddress(): boolean;
    isSLPAddress(): boolean;
    toSLPAddress(): string;
    isMainnetSLPAddress(): boolean;
    isTestnetSLPAddress(): boolean;
    isValidBCHAddress(isChipnet?: boolean): boolean;
    isValidSLPAddress(isChipnet?: boolean): boolean;
    private _decodeCashaddr;
}
//# sourceMappingURL=index.d.ts.map