import { Button, Card, DataTable, Modal, Page, TextContainer } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

export function FormPage() {
    const rows = [
        ['Form Name',<div style={{display:"flex"}}>
            <div style={{marginRight:"2%"}}>
                <Button primary={true}>Edit</Button>
            </div>
            <div>
                <Button destructive>Delete</Button>
            </div>
        </div>],
      ];

    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => {setActive(!active), [active]; });

    const activator = <Button primary={true} onClick={handleChange}>Add Event</Button>;

    return (
        <div>
        <Page title="Event Forms">
        <div style={{margin:"2% 0%"}}>
            <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title="Add Event"
            >
            <Modal.Section>

                <TextContainer>


                </TextContainer>
            </Modal.Section>
            </Modal>
        </div>
        <Card>
            <DataTable
            columnContentTypes={[
                'text',
                'text'
            ]}
            headings={[
                'Form Name',
                'Action'
            ]}
            rows={rows}
            // totals={['', '', '', 255, '$155,830.00']}
            />
        </Card>
      </Page>
      </div>
    );
}
