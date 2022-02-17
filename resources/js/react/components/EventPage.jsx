import { Avatar, Button, Card, DataTable, Modal, Page, ResourceItem, ResourceList, TextContainer, TextStyle } from "@shopify/polaris";
import {gql, useQuery} from '@apollo/client';
import React, { useCallback, useState } from "react";
import { ProductsList } from "./ProductsList";


function Event() {
    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => {setActive(!active), [active]; });

    const activator = <Button primary={true} onClick={handleChange}>Add Event</Button>;

    const [stepOne, setStepOne] = useState(true);

    const [stepTwo, setStepTwo] = useState(false);

    const [buttonName, setButtonName] = useState("Next");

    const rows = [
        ['<h2>Hello</h2>'],
      ];

      const checkStep = () =>{
            setStepTwo(true);

            setButtonName("Submit");

            if(stepOne && stepTwo){
                setButtonName("Next");
                setStepTwo(false);
                setActive(false);
                console.log("Submit");
            }

    };


    const PRODUCTS_QUERY = gql`{
        products(first: 10) {
        edges {
            cursor
            node {
            id,
            featuredImage,
            title,
            onlineStoreUrl
            }
        }
        }
    }`;


    const {loading, error, data} = useQuery(PRODUCTS_QUERY);

    if (loading) return (
        <Loading/>
    );

    if (error) return (
        <Banner status="critical">
            There was an issue loading products.
        </Banner>
    );

    return (
      <div>
        <Modal
          activator={activator}
          open={active}
          onClose={handleChange}
          title="Add Event"
        //   primaryAction={{
        //     content: 'Add Instagram',
        //     onAction: handleChange,
        //   }}
        //   secondaryActions={[
        //     {
        //       content: 'Learn more',
        //       onAction: handleChange,
        //     },
        //   ]}
        >
          <Modal.Section>
            <TextContainer>
                {
                    stepOne && !stepTwo && <div>
                        <ProductsList data={data}/>
                    </div>
                }
                {
                    stepOne && stepTwo && <div>Step 2</div>
                }
                <Button primary={true} onClick={checkStep} disabled={true}>{buttonName}</Button>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
}


export function EventPage() {
    const rows = [
      ['Emerald Silk Gown', '$875.00', 124689],
    ];

    return (
      <Page title="Events">
        <div style={{margin:"2% 0%"}}>
            <Event />
        </div>
        <Card>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'numeric'
            ]}
            headings={[
              'Product',
              'Image',
              'Price'
            ]}
            rows={rows}
          />

            {/* totals={['', '', '']} */}
        </Card>
      </Page>
    );
  }
