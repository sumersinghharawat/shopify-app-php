import {ApolloProvider, gql, useQuery} from '@apollo/client';
import {Banner, Button, Card, Frame, Heading, Layout, Modal, Page, Spinner, TextContainer, Toast} from '@shopify/polaris';
import React, { useCallback } from 'react';
import {ProductsList} from "./ProductsList";
import {Loading, useAppBridge} from '@shopify/app-bridge-react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ServiceRequest from '../service/ServiceRequest';
import { createApp } from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

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

    const [activeToastr, setActiveToastr] = useState(false);

    const toggleActiveToastr = useCallback(() => setActiveToastr((active) => !active), []);

    const [buttonLoading, setButtonLoading] = useState(false);
    const [themeIntegration, setThemeIntegration] = useState('Enabled');
    const [themeIntegrationLabel, setThemeIntegrationLabel] = useState(true);
    const [themeIntegrationApp, setThemeIntegrationApp] = useState('Enable App integration with theme.');

    const {loading, error, data} = useQuery(PRODUCTS_QUERY);

    useEffect(()=>{
      let config = localStorage.getItem("config");
      config = config?JSON.parse(config):'';
      if(config){
        const app = createApp(config);
        getSessionToken(app).then((res)=>{
            setButtonLoading(true);
            // console.log(res);
            let token = res;
              axios.get('/api/check-install-app',{ 
                headers: {"Authorization" : `Bearer ${token}`}
              }).then((res)=>{
                // console.log(res);
                if(res.data.data){
                  setThemeIntegrationLabel(false);
                  setThemeIntegration("Disabled");
                }else{
                  setThemeIntegrationLabel(true);
                  setThemeIntegration("Enabled");
                }
                setButtonLoading(false);
              }).catch((err)=>{
                console.log(err);
              });
            }).catch((err)=>{
              console.log(err);
            });
      }
        setButtonLoading(false);
        // console.log(useAppBridge);
    },[])

    if (loading) return (
        <Loading/>
    );

    if (error) return (
        <Banner status="critical">
            There was an issue loading products.
        </Banner>
    );

    const IntegrationTheme = () => {
      const [active, setActive] = useState(false);

      const handleChange = useCallback(() => setActive(!active), [active]);

      const activator = <Button onClick={handleChange} primary={themeIntegrationLabel} destructive={!themeIntegrationLabel}>{themeIntegration}</Button>;
      let title = "Do you want to " +themeIntegration+ "?"
      return (
        <div>
          {buttonLoading && <Spinner accessibilityLabel="Spinner example" size="large" />}
          {!buttonLoading &&
          <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title={title.toString()}
            primaryAction={{
              content: 'Change',
              onAction: configureTheme,
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: handleChange,
              },
            ]}
          >
            {/* <Modal.Section>
              <TextContainer>
                <p>
                  
                </p>
              </TextContainer>
            </Modal.Section> */}
          </Modal>}
        </div>
      );
    }

    const toastMarkup = activeToastr ? (
      <Toast content="Theme updated" onDismiss={toggleActiveToastr} />
    ) : null;

    const configureTheme = () => {
      
      let config = localStorage.getItem("config");
      config = config?JSON.parse(config):'';
      if(config){
        const app = createApp(config);
        getSessionToken(app).then((res)=>{
            setButtonLoading(true);
            // console.log(res);
            let token = res;
            
            axios.post('/api/install-app',
            {'status':themeIntegration},
            { 
              headers: {"Authorization" : `Bearer ${token}`}
            }).then((res)=>{
              // console.log(res.data.data.message);
              setActiveToastr(true);
              setButtonLoading(false);
              setThemeIntegrationLabel(!themeIntegrationLabel);
              setThemeIntegration(themeIntegration=='Enabled'?'Disabled':'Enabled');
            }).catch((err)=>{
              console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        });
        
      }


      console.log("submit");
    };

    return (
      <Frame>
    <Page title="Dashboard">
      <div>
          <div style={{display:"flex",justifyContent: "flex-end",alignItems: "center",background: "#f6f6f7",padding: "1%",borderRadius: "5px"}}>
              <p style={{paddingRight:"2%"}}>{themeIntegrationApp}</p>
              <IntegrationTheme />
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
        {toastMarkup}
        </Page></Frame>);
}
