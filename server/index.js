const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0444335f67596ada44e41c118fb13035a5a053d322f21649ca0a208ef3f0eea7ca002ed2d42efd9f5dfa29fa45e8c1d2fd9e437edf656370f5b1f9f44dba1acfc5": 100,
  "045a378b2d759e17da11a496fc9cec8e2b57c43a272ec02f5d660435e6774791dcb8605effd785e800e4330224ed04c5ff661e0266c6d04f8f2dca53716235017b": 50,
  "046fd8eb1b67509b54762a77b07de56b38a21e4fad0dca196b81ec761d52ac608638f66eca1d4efa7fbbef4b0c5f396583b5b7126bdca65ecf4f724fe38085c795": 75,
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
dab76e01597faa66f098bc94e0d38351736b64c69c9e54bb097c6825c02f4cb2