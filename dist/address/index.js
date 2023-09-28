import { CashAddressNetworkPrefix, encodeCashAddress, CashAddressType, decodeCashAddressFormat, decodeCashAddressFormatWithoutPrefix, decodeCashAddressVersionByte, cashAddressTypeBitsToType } from "@bitauth/libauth";
import BCHJS from "@psf/bch-js";
const bchjs = new BCHJS();
export var SLPNetworkPrefix;
(function (SLPNetworkPrefix) {
    SLPNetworkPrefix["mainnet"] = "simpleledger";
    SLPNetworkPrefix["testnet"] = "slptest";
    SLPNetworkPrefix["regtest"] = "slpreg";
})(SLPNetworkPrefix || (SLPNetworkPrefix = {}));
export default class Address {
    address;
    constructor(address) {
        this.address = address;
        this.address = address;
    }
    isSep20Address() {
        if (typeof (this.address) !== "string") {
            return false;
        }
        if (this.address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
            return true;
        }
        return false;
    }
    isLegacyAddress() {
        try {
            return bchjs.Address.isLegacyAddress(this.address);
        }
        catch {
            return false;
        }
    }
    isP2SH() {
        const decoded = this._decodeCashaddr(this.address);
        return [CashAddressType.p2sh, CashAddressType.p2shWithTokens].includes(decoded.type);
    }
    toLegacyAddress() {
        return bchjs.Address.toLegacyAddress(this.toCashAddress());
    }
    toCashAddress() {
        const decoded = this._decodeCashaddr(this.address);
        const network = Object.keys(CashAddressNetworkPrefix)[Object.values(CashAddressNetworkPrefix).findIndex(val => val === decoded.prefix)] ?? Object.keys(SLPNetworkPrefix)[Object.values(SLPNetworkPrefix).findIndex(val => val === decoded.prefix)];
        const type = decoded.type === CashAddressType.p2pkhWithTokens ? CashAddressType.p2pkh : (decoded.type === CashAddressType.p2shWithTokens ? CashAddressType.p2sh : decoded.type);
        return encodeCashAddress(CashAddressNetworkPrefix[network], type, decoded.payload);
    }
    isCashAddress() {
        try {
            const decoded = this._decodeCashaddr(this.address);
            return Object.values(CashAddressNetworkPrefix).includes(decoded.prefix) || Object.values(SLPNetworkPrefix).includes(decoded.prefix);
        }
        catch {
            return false;
        }
    }
    isTokenAddress() {
        try {
            const decoded = this._decodeCashaddr(this.address);
            return [CashAddressType.p2pkhWithTokens, CashAddressType.p2shWithTokens].includes(decoded.type);
        }
        catch {
            return false;
        }
    }
    toTokenAddress() {
        const decoded = this._decodeCashaddr(this.address);
        const network = Object.keys(CashAddressNetworkPrefix)[Object.values(CashAddressNetworkPrefix).findIndex(val => val === decoded.prefix)] ?? Object.keys(SLPNetworkPrefix)[Object.values(SLPNetworkPrefix).findIndex(val => val === decoded.prefix)];
        const type = decoded.type === CashAddressType.p2pkh ? CashAddressType.p2pkhWithTokens : (decoded.type === CashAddressType.p2sh ? CashAddressType.p2shWithTokens : decoded.type);
        return encodeCashAddress(CashAddressNetworkPrefix[network], type, decoded.payload);
    }
    isMainnetCashAddress() {
        try {
            const decoded = this._decodeCashaddr(this.address);
            return decoded.prefix === CashAddressNetworkPrefix.mainnet;
        }
        catch {
            return false;
        }
    }
    isTestnetCashAddress() {
        try {
            const decoded = this._decodeCashaddr(this.address);
            return decoded.prefix === CashAddressNetworkPrefix.testnet;
        }
        catch {
            return false;
        }
    }
    isSLPAddress() {
        try {
            const decoded = this._decodeCashaddr(this.address);
            return Object.values(SLPNetworkPrefix).includes(decoded.prefix);
        }
        catch {
            return false;
        }
    }
    toSLPAddress() {
        const decoded = this._decodeCashaddr(this.toCashAddress());
        const network = Object.keys(CashAddressNetworkPrefix)[Object.values(CashAddressNetworkPrefix).findIndex(val => val === decoded.prefix)] ?? Object.keys(SLPNetworkPrefix)[Object.values(SLPNetworkPrefix).findIndex(val => val === decoded.prefix)];
        return encodeCashAddress(SLPNetworkPrefix[network], decoded.type, decoded.payload);
    }
    isMainnetSLPAddress() {
        try {
            const decoded = this._decodeCashaddr(this.address);
            const network = Object.keys(SLPNetworkPrefix)[Object.values(SLPNetworkPrefix).findIndex(val => val === decoded.prefix)];
            return Object.values(SLPNetworkPrefix).includes(decoded.prefix) && network === "mainnet";
        }
        catch {
            return false;
        }
    }
    isTestnetSLPAddress() {
        try {
            const decoded = this._decodeCashaddr(this.address);
            const network = Object.keys(SLPNetworkPrefix)[Object.values(SLPNetworkPrefix).findIndex(val => val === decoded.prefix)];
            return Object.values(SLPNetworkPrefix).includes(decoded.prefix) && network === "testnet";
        }
        catch {
            return false;
        }
    }
    isValidBCHAddress(isChipnet = false) {
        return this.isCashAddress() || this.isTokenAddress();
        // const isBCHAddr = this.isCashAddress()
        // if (isChipnet)
        //   return isBCHAddr && this.isTestnetCashAddress()
        // return isBCHAddr && this.isMainnetCashAddress()
    }
    isValidSLPAddress(isChipnet = false) {
        return this.isSLPAddress();
        // const isSLPAddr = this.isSLPAddress()
        // if (isChipnet)
        //   return isSLPAddr && this.isTestnetSLPAddress()
        // return isSLPAddr && this.isMainnetSLPAddress()
    }
    _decodeCashaddr(address) {
        let result;
        // If the address has a prefix decode it as is
        if (address.includes(":")) {
            result = decodeCashAddressFormat(address);
        }
        else {
            // otherwise, derive the network from the address without prefix
            result = decodeCashAddressFormatWithoutPrefix(address);
        }
        if (typeof result === "string")
            throw new Error(result);
        const info = decodeCashAddressVersionByte(result.version);
        if (typeof info === "string")
            throw new Error(info);
        const type = cashAddressTypeBitsToType[info.typeBits];
        if (type === undefined) {
            throw Error("Wrong cashaddress type");
        }
        return { ...result, type: type };
    }
}
