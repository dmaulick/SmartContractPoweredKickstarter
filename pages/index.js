import React, { Component, useCallback, useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { useRouter } from 'next/router'

const New = () => {
    const [minimumContribution, setMinimumContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    
    console.log('a-bud');

    console.log('minimumContribution:', minimumContribution, ":");
    
    const onSubmit = () => {
            console.log('a -dick');
            event.preventDefault();
        
            // setLoading(true);
            // setErrorMessage('');
        
            // try {
            //   const accounts = await web3.eth.getAccounts();
            //   console.log('b', accounts[0]);
            // //   await factory.methods
            // //     .createCampaign(minimumContribution)
            // //     .send({
            // //       from: accounts[0]
            // //     });
        
            //     router.push('/');
            // } catch (err) {
            //     console.log('c', err);
            //     setErrorMessage(err.message);
            // }
        
            // setLoading(false);
        };

    return (
        // <Layout>
        <>
        <h3>Create a Campaign</h3>
        {console.log('in jsx')}

          {/* <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="wei"
                labelPosition="right"
                value={minimumContribution}
                onChange={event => {
                    console.log('event:', event, ':')
                    console.log('value:', event.target.value, ':')
                    setMinimumContribution(event.target.value)
                }}
              />
            </Form.Field>
  
            <Message error header="Oops!" content={errorMessage} />
            <Button type="submit" loading={loading} primary>
              Create!
            </Button>

          </Form> */}
          <button className="square" onClick={() => console.log("HEELO")} >HELLO</button>
 
        </>
                 // </Layout>
      );

}

export default New;

// import React, { useEffect, useState } from "react";
// import factory from "../ethereum/factory";
// import Layout from '../components/Layout';
// import { Card, Button } from 'semantic-ui-react';
// import Link from 'next/link'

// function Root({ campaigns }) {

//   const items = campaigns.map((address) => {
//     return {
//       header: address,
//         description: (
//           <Link href={`/campaigns/${address}`}>
//             <a>View Campaign</a>
//           </Link>
//         ),
//         fluid: true
//     };
//   });

//   return (
//     <Layout>
//         <div>
//         <Link href="/campaigns/new">
//             <a>
//               <Button
//                 floated="right"
//                 content="Create Campaign"
//                 icon="add circle"
//                 primary
//               />
//             </a>
//           </Link>
//           <h3>Open Campaigns</h3>
//           <Card.Group items={items} />
//         </div>
//       </Layout>
//   );
// }

// Root.getInitialProps = async (ctx) => {
//   const campaigns = await factory.methods.getDeployedCampaigns().call();
//   return { campaigns };
// };

// export default Root;
