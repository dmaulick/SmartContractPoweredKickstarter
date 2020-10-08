import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";

function Root({ campaigns }) {
  return <h1>This is root..{campaigns}</h1>;
}

Root.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Root;
