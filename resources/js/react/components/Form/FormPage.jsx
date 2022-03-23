import { Button, Card, DataTable, Frame, Loading, Modal, Page, TextContainer } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import  { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { createApp } from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";

export function FormPage(props) {

    const [pageLoad,setPageLoad] = useState(true);

    const app= useAppBridge();

    const [formAll,setFormAll] = useState([]); 


    const editForm = (index) => {
        app.dispatch(Redirect.toApp({
            path: '/add-form/'+index
        }));
    }

    const viewFormsData = () => {

        let config = localStorage.getItem("config");
        config = config?JSON.parse(config):'';
        if(config){
          const app = createApp(config);
          getSessionToken(app).then((res)=>{
              // console.log(res);
              let token = res;
              
              axios.get('/api/view-event-form',
              { 
                headers: {"Authorization" : `Bearer ${token}`}
              }).then((res)=>{
              //   console.log();
                setFormAll(res.data.data);
              }).catch((err)=>{
                console.log(err);
              });
          }).catch((err)=>{
              console.log(err);
          });
          
        }
    };

    useEffect(()=>{
        viewFormsData();
        setPageLoad(false);
    },[]);

    const deleteForm = (index) => {
        console.log(index);
              
        let config = localStorage.getItem("config");
        config = config?JSON.parse(config):'';
        if(config){
            const app = createApp(config);
            getSessionToken(app).then((res)=>{
                // console.log(res);
                let token = res;
                
                axios.delete('/api/delete-event-form/'+index,
                { 
                headers: {"Authorization" : `Bearer ${token}`}
                }).then((res)=>{
                    console.log(res.data.data);
                    // setFormAll(res.data.data);
                    viewFormsData();
                }).catch((err)=>{
                    console.log(err);
                });
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    const rows = 
            formAll.map((item)=> {
                
                    return [item.form_title,<div style={{display:"flex"}}>
                        <div style={{marginRight:"2%"}}>
                            <Button primary={true} onClick={()=>{editForm(item.id);}}>Edit</Button>
                        </div>
                        <div>
                            <Button destructive onClick={()=>{deleteForm(item.id);}}>Delete</Button>
                        </div>
                    </div>]
                
            });

    console.log(rows);
    if(pageLoad){
        return <div style={{height: '100px'}}>
        <Frame>
          <Loading />
        </Frame>
      </div>;
    }else{
    return (<div>
        <Page title="Event Forms">
        <div style={{margin:"2% 0%"}}>
            <Button primary={true} onClick={() => 
            app.dispatch(Redirect.toApp({
                path: '/add-form'
              }))
            }>Add Form</Button>            
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
      </div>);
    }
}
