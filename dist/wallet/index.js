import axios from "axios";
export default class Wallet {
    _api;
    constructor(apiBaseUrl) {
        this._api = axios.create({
            baseURL: apiBaseUrl,
            timeout: 60 * 1000 // 1 minute
        });
    }
    // TODO: define result type
    async getTokens({ walletHash, tokenType }) {
        const assets = await this._api.get(`tokens/wallet/${walletHash}/?token_type=${tokenType}`);
        return assets.data;
    }
    async scanUtxo(walletHash) {
        const response = await this._api.get(`utxo/wallet/${walletHash}/scan`);
        return response.data;
    }
    async getBalance({ walletHash, tokenId = '', txid = '', index = 0 }) {
        let balance;
        if (tokenId) {
            let url = `balance/wallet/${walletHash}/${tokenId}/`;
            if (txid && index)
                url += `${txid}/${index}/`;
            balance = await this._api.get(url);
        }
        else {
            balance = await this._api.get(`balance/wallet/${walletHash}/`);
        }
        return balance.data;
    }
    async getHistory({ walletHash, tokenId, page, recordType }) {
        if (!page) {
            page = 1;
        }
        if (!recordType) {
            recordType = 'all';
        }
        let history;
        if (tokenId) {
            history = await this._api.get(`history/wallet/${walletHash}/${tokenId}/?page=${page}&type=${recordType}`);
        }
        else {
            history = await this._api.get(`history/wallet/${walletHash}/?page=${page}&type=${recordType}`);
        }
        return history.data;
    }
}
