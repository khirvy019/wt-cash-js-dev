import BCH from './bch/index.js';
import SLP from './slp/index.js';
import Wallet from './wallet/index.js';
import Address from './address/index.js';
export { BCH, SLP, Wallet, Address };
export default class Watchtower {
    _baseUrl: string;
    BCH: any;
    SLP: any;
    Wallet: any;
    constructor(isChipnet?: boolean);
    _isUUID(uuid: string): boolean;
    subscribe({ address, addresses, projectId, walletHash, walletIndex, addressIndex, webhookUrl, chatIdentity }: {
        address: any;
        addresses: any;
        projectId: any;
        walletHash: any;
        walletIndex: any;
        addressIndex: any;
        webhookUrl: any;
        chatIdentity: any;
    }): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map