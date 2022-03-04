import { gql, useQuery } from "@apollo/client";
import { Banner, Card, DataTable } from "@shopify/polaris";
import {Loading} from '@shopify/app-bridge-react';
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";



export const ViewEvent = () => {

    const [allEvents,setAllEvents] = useState('');

    useEffect(()=>{


        axios.get('/api/view-event').then((res)=>{
            console.log(res.data.data);
            setAllEvents(res);
        }).catch((err)=>{
            console.log(err);
        });

    },[]);


    const rows = [
        ['Dummy Product', <img style={{width:"100px"}} src='https://cdn.shopify.com/s/files/1/0627/0143/7175/products/icon_bookings-6e5806e6.png?v=1645045463'/>, "12$"],
    ];

    return (<Card>
        <DataTable
            columnContentTypes={[
                'text',
                'text',
                'text'
            ]}
            headings={[
                'Product',
                'Image',
                'Price'
            ]}
            rows={rows}
        />

        {/* totals={['', '', '']} */}
    </Card>);
}
