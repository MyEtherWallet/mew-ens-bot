const web3 = require("web3");
import configs from "./configs";
import { subdomainRegistrar } from "./abi";
const web3Instance = new web3(configs.Node.host);
const registrar = new web3Instance.eth.Contract(
  subdomainRegistrar,
  configs.Registrar.address
);
registrar.web3 = web3Instance;
export default registrar;
