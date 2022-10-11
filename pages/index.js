import React, {Component} from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/layout';
import web3 from '../ethereum/web3';
import { Link } from '../routes'

class CampaignIndex extends Component{

    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        return { campaigns };
    }

    async componentDidMount(){
        
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: 
                (
                    <Link href="" route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    render(){
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                content="Create Campaign"
                                icon="add"
                                primary
                                floated="right"
                            />
                        </a>
                    </Link>
                    
                    { this.renderCampaigns() }
                   
                </div>    
            </Layout>

        )
    }
}

export default CampaignIndex;

