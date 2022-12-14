const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "040575d797bacb9abab5a69b8d7cef811cafbf3bba88353b35533a2ea5461ea9d1a1c6120f07f70e7607b6e561383ff34a1ab4154bbc5e2fc967e4773265e00609": 1000,
  "040803f8bd0dd333cc0b55a92ba155da16a21639d0ef9cf9700c9edda3f8b6242a006f2e629ddd1fbd7baed5f56cdd5b40833dca1c5ffb0d2c2f53120c33cac7b7": 100,
  "0435d1d5da46eb773062a4a596cd424d0e48dcb202d6d3ee2028232e1941b82b95ba20ed4c08c90bd36b0a353a5d95ef3932f70a74ac6ce731a25e396354721d27": 50,
  "047e31469e845f2d25aef12e474c736c9309039188efd65e577bb28f85a975e0b025b99d039afef2367d178901ab68e0f2a2a99a3d751da15182ba68426b52b9cb": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
