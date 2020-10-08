import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";

function Root({ campaigns }) {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    };
  });

  return <h1>This is root.. {campaigns}</h1>;
}

Root.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Root;
