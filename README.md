# watchtower-cash-js

Library for building Javascript applications that integrate with Watchtower.cash

### Install
```bash
npm install watchtower-cash-js
```

### Subscribe an Address
For Watchtower to keep watch of the transactions of an address, it needs to be subscribed. A convenient function is included here to subscribe an address.
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

// Subscribe function accepts either BCH or SLP address
const data = {
  projectId: '0000-0000-0000',  // <-- Generate this ID by creating a project at Watchtower.cash
  addresses: {
    receiving: 'simpleledger:qqz95enwd6qdcy5wnf05hp590sjjknwfuq8sjhpv6x',
    change: '' // <-- (Optional) If you want to subscribe a change address along with the receiving one
  },
  walletHash: 'abcd0123456', // <-- (Optional) You generate this to track which HD wallet the address belongs to
  addressIndex: 0, // <-- (Optional) The index used to generate this address from HD wallet
  webhookUrl: 'https://xxx.com/webhook-call-receiver'  // <-- (Optional) Your webhook receiver URL
}

watchtower.subscribe(data).then(function (result) {
  if (result.success) {
    // Your logic here when subscription is successful
    console.log(result)
  } else {
    // Your logic here when subscription fails
    console.log(result)
  }
})
```

### Send BCH
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

const data = {
  sender: {
    address: 'bitcoincash:qqz95enwd6qdcy5wnf05hp590sjjknwfuqttev5vyc',
    wif: 'XXX'  // <-- private key of the sender address
  },
  recipients: [
    {
      address: 'bitcoincash:qpq82xgmau3acnuvypkyj0khks4a6ak7zq7pzjmnfe',
      amount: 0.5
    }
    // <-- You can add more recipients into this array
  ],
  //Fee funder (Optional) <-- if feeFunder is set, fees will be paid by this address
  feeFunder: {
    address: 'bitcoincash:qr5ntfv5j7308fsuh08sqxkgp9m87cqqtq3rvgnma9',
    wif: 'YYY'  // <-- private key of the feeFunder address
  },
  // Change address (Optional) <-- set a custom change address
  changeAddress: 'bitcoincash:qzrhqu0jqslzt9kppw8gtwlkhqwnfrn2dc63yv2saj'
  // Data (Optional) <-- embed some string data in OP_RETURN
  data: 'Hello world!',
  // Broadcast (Optional) <-- Broadcast or just return raw transaction hex
  broadcast: true  // true by default
}

watchtower.BCH.send(data).then(function (result) {
  if (result.success) {
    // Your logic here when send transaction is successful
    console.log(result.txid)

    // or if broadcast is set to false, you can just get the raw transaction hex
    console.log(result.transaction)
  } else {
    // Your logic here when send transaction fails
    console.log(result.error)
  }
})
```

### Create SLP Type1 Token
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

const data = {
  creator: {
    address: 'simpleledger:qqz95enwd6qdcy5wnf05hp590sjjknwfuq8sjhpv6x',
    wif: 'XXX'  // <-- private key of the sender address
  },
  initialMintRecipient: 'simpleledger:qr86pte8hwcljn5cyq3mj7v8s7lvs2p4muddzescf6', // <-- SLP address recipient for initial minted tokens (if initialQty !== 0)
  mintBatonRecipient: 'simpleledger:qr86pte8hwcljn5cyq3mj7v8s7lvs2p4muddzescf6', // <-- (optional) SLP address recipient for minting baton used to mint tokens in the future, supply this parameter if fixedSupply = false
  name: 'Jet Token',
  ticker: 'JET',
  decimals: 8,
  initialQty: 10,
  broadcast: false,
  fixedSupply: false // <-- set true if you dont want any minting in the future (defaults to false)
}

watchtower.SLP.Type1.create(data).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

### Mint SLP Type1 Token
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

const data = {
  minter: {
    address: 'simpleledger:qqz95enwd6qdcy5wnf05hp590sjjknwfuq8sjhpv6x',
    wif: 'XXX'  // <-- private key of the sender address
  },
  feeFunder: {
    address: 'bitcoincash:qq46tffgznfew8e78dkyt56k9xcmetnelcma256km7',
    wif: 'YYY' // <-- private key of the feeFunder address
  },
  tokenId: '7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1', // <-- token ID of SLP token you want to mint
  additionalMintRecipient: 'simpleledger:qr86pte8hwcljn5cyq3mj7v8s7lvs2p4muddzescf6', // <-- SLP address recipient of minted tokens
  mintBatonRecipient: 'simpleledger:qrx30gydrlpt2nqc7zrnh74n3ft4dkd8duq9xy6tyk', // <-- (optional) SLP address recipient of minting baton. supply this parameter if passMintingBaton = true
  quantity: 20, // <-- amount of token you want to mint
  broadcast: false,
  passMintingBaton: false // <-- set this to true if you want to mint more tokens in the future (true by default)
}

watchtower.SLP.Type1.mint(data).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

### Send SLP Type1 Token
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

const data = {
  sender: {
    address: 'simpleledger:qqz95enwd6qdcy5wnf05hp590sjjknwfuq8sjhpv6x',
    wif: 'XXX'  // <-- private key of the sender address
  },
  tokenId: '7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1',
  recipients: [
    {
      address: 'simpleledger:qpq82xgmau3acnuvypkyj0khks4a6ak7zqj6ffwnh8',
      amount: 101
    } // <-- You can add more recipients into this array
  ],
  // Fee funder (Optional) <-- if feeFunder is set, fees will be paid by this address
  feeFunder: {
    address: 'bitcoincash:qq46tffgznfew8e78dkyt56k9xcmetnelcma256km7',
    wif: 'YYY' // <-- private key of the feeFunder address
  },
  // Change addresses (Optional) <-- set a custom change addresses
  changeAddresses: {
    slp: 'simpleledger:qzn4k4lm22rlzlyjccz4r29mz0wpuf9gz5zj2l9w6y',
    bch: 'bitcoincash:qp46gzcw0ycxtnngrhp0xddp2qxnyjnepg2qc02eeh'
  }
  // Broadcast (Optional) <-- Broadcast or just return raw transaction hex
  broadcast: true  // true by default
}

watchtower.SLP.Type1.send(data).then(function (result) {
  if (result.success) {
    // Your logic here when send transaction is successful
    console.log(result.txid)

    // or if broadcast is set to false, you can just get the raw transaction hex
    console.log(result.transaction)
  } else {
    // Your logic here when send transaction fails
    console.log(result.error)
  }
})
```

### Burn SLP Type1 Token
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

const data = {
  sender: {
    address: 'simpleledger:qqz95enwd6qdcy5wnf05hp590sjjknwfuq8sjhpv6x',
    wif: 'XXX' // <-- private key of the sender address
  },
  recipients: [
    {
      address: "simpleledger:qr86pte8hwcljn5cyq3mj7v8s7lvs2p4muddzescf6",
      amount: 10
    }
  ],
  tokenId: "d3e5fbd9e4a6f76e6f91dc5ce878a87e315da409964db21e77dd42f2d2eb2ef6",
  feeFunder: {
    address: 'bitcoincash:qq46tffgznfew8e78dkyt56k9xcmetnelcma256km7',
    wif: 'YYY' // <-- private key of the feeFunder address
  },
  changeAddresses: {
    bch: 'bitcoincash:qq46tffgznfew8e78dkyt56k9xcmetnelcma256km7',
    slp: "simpleledger:qr86pte8hwcljn5cyq3mj7v8s7lvs2p4muddzescf6"
  },
  broadcast: false,
  burn: true // <-- true = burn, false = normal send (this param defaults to false)
}

watchtower.SLP.Type1.send(data).then(function (result) {
  console.log(result)
})
```

### Create NFT1 Child Token
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

const groupTokenBalData = {
  groupTokenId: 'f019cfa73559836c13e00d70e7105d4d43377bb6a9861595a7b2373a66aa0bc7', // <-- NFT parent token ID
  wallet: 'simpleledger:qpq82xgmau3acnuvypkyj0khks4a6ak7zqj6ffwnh8' // <-- address or wallet hash
}

const mintBatonData = {
  sender: {
    address: 'simpleledger:qp3et5cla7jju6z2lfc5v9nr0r4q54edqqdl5mxfjc',
    wif: 'XXX'  // <-- private key of the sender address
  },
  feeFunder: {
    address: 'bitcoincash:qp0wsj9va2srz6vhr6555e2jglm2y3q97vy4eks3gt',
    wif: 'YYY' // <-- private key of the feeFunder address
  },
  groupTokenId: 'f019cfa73559836c13e00d70e7105d4d43377bb6a9861595a7b2373a66aa0bc7', // <-- NFT parent token ID
  recipient: 'simpleledger:qp3et5cla7jju6z2lfc5v9nr0r4q54edqqdl5mxfjc', // <-- only 1 since every NFT is unique and amount is always 1
  // Change address (Optional) <-- set a custom change BCH address (fee funder address by default)
  changeAddress: 'bitcoincash:qp46gzcw0ycxtnngrhp0xddp2qxnyjnepg2qc02eeh',
  // Broadcast (Optional) <-- Broadcast or just return raw transaction hex
  broadcast: true  // true by default
}

const createChildNftData = {
  sender: {
    address: 'simpleledger:qqz95enwd6qdcy5wnf05hp590sjjknwfuq8sjhpv6x',
    wif: 'XXX'  // <-- private key of the sender address
  },
  feeFunder: {
    address: 'bitcoincash:qq46tffgznfew8e78dkyt56k9xcmetnelcma256km7',
    wif: 'YYY' // <-- private key of the feeFunder address
  },
  groupTokenId: 'f019cfa73559836c13e00d70e7105d4d43377bb6a9861595a7b2373a66aa0bc7', // <-- NFT parent token ID
  recipient: 'simpleledger:qpq82xgmau3acnuvypkyj0khks4a6ak7zqj6ffwnh8', // <-- only 1 since every NFT is unique and amount is always 1
  label: 'My Unique NFT Token',
  ticker: 'UNI-NFT', // <-- NFT symbol / abbreviation
  docUrl: 'https://uninft.com', // (Optional) <-- Document URL of token
  // Change address (Optional) <-- set a custom change BCH address (fee funder address by default)
  changeAddress: 'bitcoincash:qp46gzcw0ycxtnngrhp0xddp2qxnyjnepg2qc02eeh',
  // Broadcast (Optional) <-- Broadcast or just return raw transaction hex
  broadcast: true  // true by default
}


// check Parent Group token balance
watchtower.SLP.NFT1.Parent.getGroupTokenBalance(groupTokenBalData).then(result => {
  if (result.success) {
    console.log(result.balance)
  } else {
    console.log(result.error)
  }
})

watchtower.SLP.NFT1.Parent.generateMintingBatonUtxo(mintBatonData).then(result => {
  console.log('MINT baton UTXO result:')
  if (result.success) {
    console.log(result)
    
    watchtower.SLP.NFT1.Parent.createChildNft(createChildNftData).then(result => {
      console.log('Create Child NFT result')
      console.log(result)

      if (result.success) {
          // Your logic here when send transaction is successful
          console.log(result.txid)

          // or if broadcast is set to false, you can just get the raw transaction hex
          console.log(result.transaction)
      } else {
          // logic when it fails
          console.log(result.error)
      }
    })
  } else {
    console.log(result)
  }
})
```

### Send NFT1 Child Token
```javascript
const Watchtower = require('watchtower-cash-js')
const watchtower = new Watchtower()

const data = {
  sender: {
    address: 'simpleledger:qzwu2vrwcaf9mjhe4p4wl50s0x5cx46nxc02qg92a9',
    wif: 'XXX' // <-- sender wif
  },
  feeFunder: {
    address: 'bitcoincash:qp0wsj9va2srz6vhr6555e2jglm2y3q97vy4eks3gt',
    wif: 'YYY' // <--- fee funder wif
  },
  childTokenId: '5c9aec029dcdea655622fcccfd279b2bc5e300c959f7009dc3c8c20a6905b8fd', // <-- child NFT token id to be sent
  recipient: 'simpleledger:qzstfxd0s849y0gym65mqutvtkdurn77tvgjk27537',
  // Change address (Optional) <-- set a custom change BCH address (fee funder address by default)
  changeAddress: 'bitcoincash:qp46gzcw0ycxtnngrhp0xddp2qxnyjnepg2qc02eeh',
  // Broadcast (Optional) <-- Broadcast or just return raw transaction hex
  broadcast: true  // true by default
}

watchtower.SLP.NFT1.Child.send(data).then(result => {
  if (result.success) {
    // Your logic here when send transaction is successful
    console.log(result.txid)

    // or if broadcast is set to false, you can just get the raw transaction hex
    console.log(result.transaction)
  } else {
    // logic when it fails
    console.log(result.error)
  }
})
```
