import { Banner, Button, FormLayout, Modal, TextContainer, TextField, } from "@shopify/polaris";
import {gql, useQuery} from '@apollo/client';
import React, { useCallback, useState } from "react";
import {Loading} from '@shopify/app-bridge-react';
import { AllProductsList } from "../../shared-components/AllProductList";
import { AddEventForm } from "./AddEventForm";

export const AddEvent = () => {

    const [getId, setGetId] = useState("");

    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => {setActive(!active), [active]; });

    const [stepOne, setStepOne] = useState(true);

    const [stepTwo, setStepTwo] = useState(false);

    const activator = <Button primary={true} onClick={handleChange}>Add Event</Button>;

    const PRODUCTS_QUERY = gql`{
        products(first: 10) {
            edges {
                cursor
                node {
                    id
                    title
                    onlineStoreUrl
                    onlineStorePreviewUrl
                    onlineStoreUrl
                    totalInventory
                    featuredImage {
                        id
                        altText
                        url
                    }
                }
            }
        }
    }`;

    const {loading, error, data} = useQuery(PRODUCTS_QUERY);

    if (loading) return (
            <Loading />
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
        >
          <Modal.Section>

            <TextContainer>
                {
                    stepOne && !stepTwo && <div>
                        <AllProductsList data={data} getId={(id)=>{
                            setGetId(id);
                            setStepTwo(true);
                        }}/>
                    </div>
                }
                {
                    stepOne && stepTwo &&
                    <div>
                        <AddEventForm id={getId}/>
                    </div>
                }

            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
};
