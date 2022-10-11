import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign'

class RequestIndex extends Component {
    static formatRequestStringArray(requestStringArray){
        const requestFormat = {
            description: '',
            value: 0,
            recipient: '',
            complete: false,
            approvalCount: 0
        }

        requestFormat.description = requestStringArray[0];
        requestFormat.value = requestStringArray[1];
        requestFormat.recipient = requestStringArray[2];
        requestFormat.complete = requestStringArray[3] == 'complete' ? true : false;
        requestFormat.description = requestStringArray[4];

        return requestFormat;
    }

    static async getInitialProps(props){
        const { address } = props.query;
        const campaign = Campaign(address);
        
        const requestCount = await campaign.methods.getRequestsCount().call();

        const approversCount = await campaign.methods.approversCount().call();
        console.log(campaign)
        const requests = Array(parseInt(requestCount)).fill().map(async (element, index) => {
            let requestString = await campaign.methods.getRequest(index).call()
            console.log('Request String',RequestIndex.formatRequestStringArray(requestString))
            return RequestIndex.formatRequestStringArray(requestString)
        })
        // const requests = await Promise.all(
        //     Array(parseInt(requestCount)).fill().map((element, index) => {
        //         let requestString = campaign.methods.getRequest(index).call()
        //         console.log(RequestIndex.formatRequestStringArray(requestString))
        //         return RequestIndex.formatRequestStringArray(requestString)
        //     })
        // );
        console.log(requests[0])

        return {address, requests, requestCount, approversCount};
    }


    render(){
        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>
                            Add Request
                        </Button>
                    </a>
                </Link>
            </Layout>
        )
    }
}

(()=>{
    RequestIndex.formatRequestStringArray(["awd","awdawdw","awdawdawdd"])
})

export default RequestIndex;