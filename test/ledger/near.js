const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid").default;
const { KMS, COIN } = require("../../lib");
const { getAccount } = require("./_getAccount");

const TYPE = COIN.NEAR;
const INDEX = 1;

async function signTx(transport, type, index) {
  const kms = new KMS({
    keyStore: null,
    transport,
  });
  try {
    const isStake = false;
    const response = await kms.signTx(
      {
        type,
        account: 0,
        index,
      },
      {
        sender: "kms.testnet",
        receiver: "kms.testnet",
        networkId: "testnet",
        amount: "1.4",
        isStake,
        validator: "ed25519:DiogP36wBXKFpFeqirrxN8G2Mq9vnakgBvgnHdL9CcN3",
      }
    );
    console.log("response - ", response);

  } catch (error) {
    console.log(error);
  }
}

async function run() {
  const transport = await TransportNodeHid.create(1000);
  await getAccount(transport, TYPE, INDEX);
  await signTx(transport, TYPE, INDEX);
  transport.close();
}

run();