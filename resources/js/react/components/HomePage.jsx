import {gql, useQuery} from '@apollo/client';
import {Banner, Button, Card, Heading, Layout, Page} from '@shopify/polaris';
import React from 'react';
import {ProductsList} from "./ProductsList";
import {Loading} from '@shopify/app-bridge-react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ServiceRequest from '../service/ServiceRequest';



export default function HomePage() {
    const request = new ServiceRequest;
    const PRODUCTS_QUERY = gql`{
        products(first: 10) {
            edges {
                cursor
            node {
                id,
                title,
                onlineStoreUrl
              }
          }
      }
    }`;

    const [buttonLoading, setButtonLoading] = useState(true);
    const [themeIntegration, setThemeIntegration] = useState('Enabled');
    const [themeIntegrationApp, setThemeIntegrationApp] = useState('Enable App integration with theme.');

    const {loading, error, data} = useQuery(PRODUCTS_QUERY);


    useEffect(()=>{
        setButtonLoading(false);

        // console.log(request.getShopifyData('/admin/api/2022-01/products.json'));

    },[])

    if (loading) return (
        <Loading/>
    );

    if (error) return (
        <Banner status="critical">
            There was an issue loading products.
        </Banner>
    );


    console.log(themeIntegration);

    return (
    <Page title="Dashboard">
      <div>
          <div style={{display:"flex",justifyContent: "flex-end",alignItems: "center",background: "#f6f6f7",padding: "1%",borderRadius: "5px"}}>
              <p style={{paddingRight:"2%"}}>{themeIntegrationApp}</p>
              <Button loading={buttonLoading}>{themeIntegration}</Button>
          </div>
      </div>
      <div style={{margin:"2% 0%"}}>
        <Layout>
          <Layout.Section secondary>
            <Card title="" sectioned>
              <div style={{paddingBottom: "15px"}}>
                <h2 style={{fontSize:"18px",fontWeight:"bold"}}>Booked Events: 0</h2 >
              </div>
              <div>
                <p>View a summary of your customer booking.</p>
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card title="" sectioned>
              <div style={{paddingBottom: "15px"}}>
                <h2 style={{fontSize:"18px",fontWeight:"bold"}}>All Events: 0</h2 >
              </div>
              <div>
                <p>View a summary of your customer booking.</p>
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card title="" sectioned>
              <div style={{paddingBottom: "15px"}}>
                <h2 style={{fontSize:"18px",fontWeight:"bold"}}>Pending Events: 0</h2 >
              </div>
              <div>
                <p>View a summary of your customer booking.</p>
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card title="" sectioned>
              <h2 style={{fontWeight:"bold"}}>Coming Soon!</h2>
            </Card>
          </Layout.Section>
        </Layout>
        </div>
        </Page>);
}
