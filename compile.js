const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const testPath = path.resolve(__dirname, "contract", "Test.sol");

const source = fs.readFileSync(testPath, "utf8");

const output = solc.compile(source, 1).contracts;

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

console.log(output);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
