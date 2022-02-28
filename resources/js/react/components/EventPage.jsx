import { Page } from "@shopify/polaris";
import React from "react";
import { AddEvent } from "./Event/AddEvent";
import { ViewEvent } from "./Event/ViewEvent";




export function EventPage() {
    return (
      <Page title="Events">
        <div style={{margin:"2% 0%"}}>
            <AddEvent />
        </div>
        <ViewEvent />
      </Page>
    );
}
