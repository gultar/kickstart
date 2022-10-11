import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x49B517Cc29450463A3AF5aC0DDc06c4b42bb6c43"
);

export default instance;