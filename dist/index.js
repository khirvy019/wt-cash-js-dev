import BCH from './bch/index.js';
import SLP from './slp/index.js';
import Wallet from './wallet/index.js';
import Address from './address/index.js';
import axios from 'axios';
export { BCH, SLP, Wallet, Address };
export default class Watchtower {
    _baseUrl;
    BCH;
    SLP;
    Wallet;
    constructor(isChipnet = false) {
        if (isChipnet) {
            this._baseUrl = 'https://chipnet.watchtower.cash/api/';
        }
        else {
            this._baseUrl = 'https://watchtower.cash/api/';
        }
        this.BCH = new BCH(this._baseUrl, isChipnet);
        this.SLP = new SLP(this._baseUrl, isChipnet);
        this.Wallet = new Wallet(this._baseUrl);
    }
    _isUUID(uuid) {
        const s = "" + uuid;
        const match = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
        if (match === null) {
            return false;
        }
        return true;
    }
    async subscribe({ address, addresses, projectId, walletHash, walletIndex, addressIndex, webhookUrl, chatIdentity }) {
        if (projectId === undefined) {
            return {
                success: false,
                error: 'Project ID is required, create a project first at watchtower.cash'
            };
        }
        if (projectId) {
            if (!this._isUUID(projectId)) {
                return {
                    success: false,
                    error: 'invalid_project_id'
                };
            }
        }
        let payload = {
            address: address,
            project_id: projectId
        };
        if (walletHash) {
            payload['wallet_hash'] = walletHash;
            if (addresses) {
                payload['addresses'] = addresses;
            }
            if (walletIndex !== undefined) {
                payload['wallet_index'] = walletIndex;
            }
            if (addressIndex !== undefined) {
                payload['address_index'] = addressIndex;
            }
        }
        if (webhookUrl) {
            payload['webhook_url'] = webhookUrl;
        }
        if (chatIdentity) {
            payload['chat_identity'] = chatIdentity;
        }
        const url = this._baseUrl + 'subscription/';
        try {
            const resp = await axios.post(url, payload);
            return resp.data;
        }
        catch (error) {
            return error.response.data;
        }
    }
}
