import {Avatar, ResourceItem, ResourceList, TextStyle} from "@shopify/polaris";
import React from "react";

export function ProductsList({data, getId}) {

    const products = data.products.edges.map((edge) => {
        return {
            id: edge.node.id,
            title: edge.node.title
        };
    });
    return <ResourceList
        resourceName={{singular: 'product', plural: 'products'}}
        items={products}
        renderItem={({id, title}) => {
            return (
                <ResourceItem onClick={(id)=>{
                        getId(id);
                    }}
                    id={id}
                    accessibilityLabel={`View details for ${title}`}
                >
                    <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                </ResourceItem>
            );
        }}
    >
    </ResourceList>
}
