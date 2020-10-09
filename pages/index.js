import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";
import Layout from '../components/Layout';
import { Card, Button } from 'semantic-ui-react';
import Link from 'next/link'

function Root({ campaigns }) {

  const items = campaigns.map((address) => {
    return {
      header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
    };
  });

  return (
    <Layout>
        <div>
        <Link href="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          <h3>Open Campaigns</h3>
          <Card.Group items={items} />
        </div>
      </Layout>
  );
}

Root.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Root;
