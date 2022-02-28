
import { Card, DataTable } from "@shopify/polaris";
import axios from "axios";
import React, { useCallback, useState } from "react";



export const ViewEvent = () =>{

    const {allEvent,setAllEvent} = useState({});

    axios.get('/api/view-event').then((res)=>{
        // console.log(res);
        setAllEvent(res);
    }).catch((err)=>{
        console.log(err);
    });

    const rows = [
        ['Emerald Silk Gown', '$875.00', 124689],
    ];

    return (<Card>
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
    </Card>);
}
