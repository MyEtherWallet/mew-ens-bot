const web3 = require("web3");
import configs from "./configs";
import { subdomainRegistrar } from "./abi";
const web3Instance = new web3(configs.Node);
const registrar = new web3Instance.eth.Contract(
  subdomainRegistrar,
  configs.Registrar.address
);
export default registrar;
