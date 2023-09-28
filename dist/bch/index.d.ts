import { AxiosInstance } from "axios";
export interface BchUtxo {
    tx_hash: string;
    tx_pos: number;
    block?: number;
    value: bigint;
    wallet_index: string | null;
    address_path: string;
}
export interface CashtokenUtxo extends BchUtxo {
    amount: bigint;
    decimals: number;
    tokenId: string;
    capability: 'none' | 'minting' | 'mutable';
    commitment: string;
    type: 'baton' | 'token';
}
export interface GetBchUtxosResponse {
    cumulativeValue: bigint;
    utxos: BchUtxo[];
}
export interface GetBchUtxosOptions {
    confirmed?: boolean;
}
export interface GetCashtokensUtxosResponse {
    cumulativeValue: bigint;
    cumulativeTokenAmount: bigint;
    tokenDecimals: number;
    utxos: CashtokenUtxo[];
}
export interface GetCashtokensUtxosOptions extends GetBchUtxosOptions {
}
export interface WatchTowerUtxoResponse {
    valid: boolean;
    address: string;
    wallet: string;
    minting_baton?: boolean;
    utxos: Array<{
        txid: string;
        amount: number;
        value: number;
        vout: number;
        capability: 'none' | 'minting' | 'mutable' | null;
        commitment: string | null;
        cashtoken_nft_details: Object | null;
        token_type: number | null;
        block: number;
        tokenid: string;
        token_name: string;
        decimals: number;
        token_ticker: string;
        is_cashtoken: boolean;
        wallet_index: null;
        address_path: string;
    }>;
}
export interface Token {
    tokenId: string;
    commitment?: string;
    capability?: string;
    amount?: bigint;
}
export interface Sender {
    walletHash?: string;
    mnemonic?: string;
    derivationPath?: string;
    address?: string;
    wif?: string;
}
export interface Recipient {
    address: string;
    amount?: number;
    tokenAmount?: bigint;
}
export interface SendRequest {
    sender: Sender;
    recipients: Array<Recipient>;
    feeFunder?: Sender;
    changeAddress?: string;
    broadcast?: boolean;
    data?: string;
    token?: Token;
}
export interface SendResponse {
    success: boolean;
    transaction?: string;
    fee?: bigint;
    error?: string;
}
export default class BCH {
    isChipnet: boolean;
    _api: AxiosInstance;
    dustLimit: number;
    constructor(apiBaseUrl: any, isChipnet: any);
    getBchUtxos(handle: string, value: number, opts?: GetBchUtxosOptions): Promise<GetBchUtxosResponse>;
    getCashtokensUtxos(handle: string, token: Token, opts?: GetCashtokensUtxosOptions): Promise<GetCashtokensUtxosResponse>;
    broadcastTransaction(txHex: string): Promise<{
        txid: string;
        success: boolean;
    } | {
        error: string;
    }>;
    retrievePrivateKey(mnemonic: string, derivationPath: string, addressPath: string): Uint8Array;
    send({ sender, recipients, feeFunder, changeAddress, broadcast, data, token }: SendRequest): Promise<SendResponse>;
}
//# sourceMappingURL=index.d.ts.map