import {Avatar, Card, Layout, ResourceItem, ResourceList, TextStyle, Thumbnail} from "@shopify/polaris";
import {gql, useQuery} from '@apollo/client';
import React from "react";

export function AllProductsList({data,getId}) {

    const products = data.products.edges.map((edge) => {
        return {
            id: edge.node.id,
            name: edge.node.title,
            quantity:edge.node.totalInventory,
            media: <Thumbnail source={edge.node.featuredImage.url} alt={edge.node.featuredImage.altText} />
        };
    });

    return (<div>
                <Layout>
                    <Layout.Section oneHalf>
                        <Card title="Store Product List">
                            <Card.Section>
                                <ResourceList
                                    resourceName={{singular: 'product', plural: 'products'}}
                                    items={products}
                                    renderItem={(item) => {
                                    const {id, name, media, quantity} = item;

                                    return (
                                        <ResourceList.Item
                                        id={id}
                                        media={media}
                                        onClick={(id)=>{
                                            getId(id);
                                        }}
                                        >
                                        <h3>
                                            <TextStyle variation="strong">{name}</TextStyle>
                                        </h3>
                                        <div>{quantity} available</div>
                                        </ResourceList.Item>
                                    );
                                    }}
                                />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </div>);
}
