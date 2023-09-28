import { AxiosInstance } from "axios";
export default class Wallet {
    _api: AxiosInstance;
    constructor(apiBaseUrl: any);
    getTokens({ walletHash, tokenType }: {
        walletHash: string;
        tokenType: string;
    }): Promise<any>;
    scanUtxo(walletHash: string): Promise<{
        success: boolean;
    }>;
    getBalance({ walletHash, tokenId, txid, index }: {
        walletHash: string;
        tokenId: string;
        txid: string;
        index: number;
    }): Promise<{
        valid: boolean;
        wallet: string;
        spendable: Number;
        balance: Number;
    }>;
    getHistory({ walletHash, tokenId, page, recordType }: {
        walletHash: string;
        tokenId: string;
        page: number;
        recordType: string;
    }): Promise<{
        history: {
            record_type: 'outgoing' | 'incoming';
            txid: string;
            amount: Number;
            tx_fee: 800;
            senders: Array<any[]>;
            recipients: Array<any[]>;
            date_created: string;
            tx_timestamp: string;
            usd_price: number;
            market_prices: {
                [currencyTicker: string]: number;
            };
            attributes: any;
        }[];
        page: string;
        num_pages: number;
        has_next: boolean;
    }>;
}
//# sourceMappingURL=index.d.ts.map