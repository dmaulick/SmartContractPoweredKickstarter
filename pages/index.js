import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";
import Layout from '../components/Layout';
import { Card, Button } from 'semantic-ui-react';

function Root({ campaigns }) {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    };
  });

  return (
    <Layout>
        <div>
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
