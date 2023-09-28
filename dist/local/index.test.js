import BCH from "../bch";
describe('local', () => {
    test('test filter confirmed/unconfirmed utxos', async () => {
        console.log('------------TESTING------------');
        const bch = new BCH("http://localhost:8000/api", false);
        const walletHash = "86f684f477079124f75e385384b42edec8a35ec73f666262528da1e045fc6e85";
        // const bchUtxos = await bch.getBchUtxos(`wallet:${walletHash}`, 1000 ** 8)
        //   .catch(error => error)
        // console.log(bchUtxos)
        const tokenId = "197fa74762555fa55081a9359fb8d121b5bb40ec32bf42c1e02e32438ffb3186";
        const commitment = "bb37f4c7e02ad8fad657d0d8c38d7c5d";
        const ctUtxos = await bch.getCashtokensUtxos(`wallet:${walletHash}`, { tokenId, commitment })
            .catch(error => error);
        console.log(ctUtxos);
    });
});
