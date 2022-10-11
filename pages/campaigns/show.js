import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address)
        const summary = await campaign.methods.getSummary().call()

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address:props.query.address
        }
    }

    renderCards(){
        const { 
            balance, 
            manager, 
            minimumContribution, 
            requestsCount, 
            approversCount } = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution amount (wei)',
                description: 'Minimum amount to be able to contribute to this campaign and become an approver',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: 'Number of requests made',
                description: 'Shows the number of withdrawal requests made by the manager so far',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'The approvers vote whether or not the manager may withdraw money from the campaign based on the request',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign funds (ether)',
                description: 'Show the amount of money this campaign has generated',
                style: { overflowWrap: 'break-word' }
            }
        ]
        
        return <Card.Group items={items} />
    }

    render(){
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={11}>
                            {this.renderCards()}
                            
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <ContributeForm address={this.props.address}></ContributeForm>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>
                                        View Requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                   
                </Grid>
                
                
            </Layout>
        );
    }
}

export default CampaignShow;