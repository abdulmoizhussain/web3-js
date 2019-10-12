const web3 = require("./web3");
const test = require("./build/Test.json");
const fs = require("fs-extra");
const path = require("path");
const addressPath = path.resolve(__dirname, "address");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const limit = (await web3.eth.getBlock("latest"))["gasLimit"];

  
  await web3.eth.personal.unlockAccount(accounts[1], "accountPassword", 120);
  // or can unlock from attached geth as well.
  // be carefull with keeping the password inside code.

  console.log("Attempting to deploy from account", accounts[1]);

  const result = await new web3.eth.Contract(JSON.parse(test.interface))
    .deploy({ data: "0x" + test.bytecode })
    .send({ gas: limit, from: accounts[1] })
    .catch(console.log);

  console.log("Test deployed to", result.options.address);

  fs.removeSync(addressPath); // deletes the old folder.
  fs.ensureDirSync(addressPath); // creates the folder, if its not present.
  fs.outputJsonSync(addressPath + "/address.json", {
    address: result.options.address
  });
};
deploy();
