import { Button, Card, Checkbox, Form, FormLayout, Frame, Heading, Icon, Loading, Modal, Page, Select, TextContainer, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import {EditMajor} from '@shopify/polaris-icons';
import axios from "axios";
import { useAppBridge } from "@shopify/app-bridge-react";
import  { Redirect } from '@shopify/app-bridge/actions';
import { createApp } from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge-utils";

export default function AddFormPage(props) {
  
  const [pageLoad,setPageLoad] = useState(true);

  const showSingleForm = () => {
    
    if(props.match.params.id){
      setFormId(props.match.params.id);

      let config = localStorage.getItem("config");
      config = config?JSON.parse(config):'';
      if(config){
        const app = createApp(config);
        getSessionToken(app).then((res)=>{
            let token = res;
            axios.get('/api/view-event-form/'+props.match.params.id,
            { 
              headers: {"Authorization" : `Bearer ${token}`}
            }).then((res)=>{
              setFormStatus(res.data.data.form_status==1?true:false);
              setFormTitle(res.data.data.form_title);
              setFormFields(res.data.data.form_code);
            }).catch((err)=>{
              console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        });
        
      }
    }
  }

  useEffect(()=>{
    showSingleForm();        
    setPageLoad(false);
  },[])

  const [formId,setFormId] = useState(0); 

  const [formFields, setFormFields] = useState([]);
  
  const app= useAppBridge();

  const deleteField = (value) => {
    let array = [...formFields];
    array.splice(value,1);
    setFormFields(array);
  };

  const [active, setActive] = useState(false);

  const [formTitle, setFormTitle] = useState("");

  const [formStatus, setFormStatus] = useState(0);

  const [fieldIndex,setFieldIndex] = useState(-1);

  const editField = (index) => {
    setActive(true);
    let object = formFields[index];
    if(object.type == 'text'){
      setFieldIndex(index);
      setSelectedField('input-text');
      setTextField(object);
    }

    if(object.type == 'email'){
      setFieldIndex(index);
      setSelectedField('input-email');
      setEmailField(object);
    }
    if(object.type == 'radio'){
      setFieldIndex(index);
      setSelectedField('input-radio');
      setRadioField(object);
    }
    if(object.type == 'checkbox'){
      setFieldIndex(index);
      setSelectedField('input-checkbox');
      setCheckboxField(object);
    }
    if(object.type == 'select'){
      setFieldIndex(index);
      setSelectedField('select');
      setSelectField(object);
    }
    if(object.type == 'textarea'){
      setFieldIndex(index);
      setSelectedField('textarea');
      setTextareaField(object);
    }
  }

  const handleChange = () => {setActive(!active);setFieldIndex(-1)};

  const activator = <Button onClick={handleChange}>Add Fields 123</Button>;

  const fieldsOptions = [
      {label: 'Input (text)', value: 'input-text'},
      {label: 'Input (email)', value: 'input-email'},
      {label: 'Input (radio)', value: 'input-radio'},
      {label: 'Input (checkbox)', value: 'input-checkbox'},
      {label: 'select', value: 'select'},
      {label: 'textarea', value: 'textarea'}
  ];

  const handleSelectChangeFields = useCallback((value) => {
      setSelectedField(value);console.log(value);
  }, []);

  const [selectedField, setSelectedField] = useState('input-text');
  const [textField,setTextField] = useState({label:'Name',name:'name',placeholder:'Enter name',type:'text'})
  const [emailField,setEmailField] = useState({label:'Email',name:'Email',placeholder:'Enter email',type:'email'})
  const [radioField,setRadioField] = useState({label:'Gender',name:'gender',option:['male','female'],type:'radio'})
  const [checkboxField,setCheckboxField] = useState({label:'Hobbies',name:'hobbies',option:['read','sing'],type:'checkbox'})
  const [selectField,setSelectField] = useState({label:'Gender',name:'gender',option:['male','female'],type:'select'})
  const [textareaField,setTextareaField] = useState({label:'Message',name:'message',placeholder:'Enter message',type:'textarea'})
  
  const updateLabel = (value,type) => {
    switch (type) {
      case 'text':
        setTextField({...textField,label:value});
        break;
      case 'email':
        setEmailField({...emailField,label:value});
        break;
      case 'radio':
        setRadioField({...radioField,label:value});
        break;
      case 'checkbox':
        setCheckboxField({...checkboxField,label:value});
        break;
      case 'select':
        setSelectField({...selectField,label:value});
        break;
      case 'textarea':
        setTextareaField({...textareaField,label:value});
        break;
      default:
        break;
    }
  }
  
  const updateName = (value,type) => {
    switch (type) {
      case 'text':
        setTextField({...textField,name:value});
        break;
        
      case 'email':
        setEmailField({...emailField,name:value});
        break;
      case 'radio':
        setRadioField({...radioField,name:value});
        break;
      case 'checkbox':
        setCheckboxField({...checkboxField,name:value});
        break;
      case 'select':
        setSelectField({...selectField,name:value});
        break;
      case 'textarea':
        setTextareaField({...textareaField,name:value});
        break;
    
      default:
        break;
    }
  }
  
  const updatePlaceholder = (value,type) => {
    switch (type) {
      case 'text':
        setTextField({...textField,placeholder:value});
        break;
      case 'email':
        setEmailField({...emailField,placeholder:value});
        break;
      case 'textarea':
        setTextareaField({...textareaField,placeholder:value});
        break;
      default:
        break;
    }
  }
  
  const updateOptions = (value,type) => {
    switch (type) {
      case 'radio':
        value = value.split(",");
        setRadioField({...radioField,option:value});
        break;
      case 'checkbox':
        value = value.split(",");
        setCheckboxField({...checkboxField,option:value});
        break;
      case 'select':
        value = value.split(",");
        setSelectField({...selectField,option:value});
        break;
      default:
        break;
    }
  }

  const submitAddField = () => {
    let array = [...formFields];
    switch (selectedField) {
      case 'input-text':
        if(fieldIndex == -1){
          array.push(textField);
          setFormFields(array);
        }else{
          array[fieldIndex] = textField;
          setFormFields(array);
        }
        break;
      case 'input-email':
        
        if(fieldIndex == -1){
          array.push(emailField);
          setFormFields(array);
        }else{
          array[fieldIndex] = emailField;
          setFormFields(array);
        }
        break;
      case 'input-radio':
        if(fieldIndex == -1){
          array.push(radioField);
          setFormFields(array);
        }else{
          array[fieldIndex] = radioField;
          setFormFields(array);
        }
        break;
      case 'input-checkbox':
        if(fieldIndex == -1){
          array.push(checkboxField);
          setFormFields(array);
        }else{
          array[fieldIndex] = checkboxField;
          setFormFields(array);
        }
        break;
      case 'select':
        if(fieldIndex == -1){
          array.push(selectField);
          setFormFields(array);
        }else{
          array[fieldIndex] = selectField;
          setFormFields(array);
        }
        break;
      case 'textarea':
        if(fieldIndex == -1){
          array.push(textareaField);
          setFormFields(array);
        }else{
          array[fieldIndex] = textareaField;
          setFormFields(array);
        }
        break;
      default:
        break;
    }
    setActive(false)
  }

  const submitFormComplete = () => {
          
    let config = localStorage.getItem("config");
    config = config?JSON.parse(config):'';
    if(config){
        const app = createApp(config);
        getSessionToken(app).then((res)=>{
            // console.log(res);
            let token = res;
            console.log(formId);
            axios.post(formId?"/api/edit-event-form/"+formId:"/api/add-event-form",{
              "form_title":formTitle,
              "form_code":formFields,
              "form_status":formStatus
            },{ 
              headers: {"Authorization" : `Bearer ${token}`}
            }).then((res)=>{
                console.log(res.data.data);
                // setFormAll(res.data.data);
                app.dispatch(Redirect.toApp({
                  path: '/form'
                }));
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        });
    }
    console.log(formFields);
    console.log(formTitle);
    console.log(formStatus);
  }

  if(pageLoad){
    return <div style={{height: '100px'}}>
      <Frame>
        <Loading />
      </Frame>
    </div>;
  }else{
    return (
      <div>
          <Card title="Add Form">
              <div style={{padding: "2%"}}>
                <div style={{paddingBottom:"2%"}}>    
                  <Modal activator={activator} open={active} onClose={handleChange} title="Add Form Fields"
                    primaryAction={{
                      content: (fieldIndex == -1?'Add Field':'Edit Field'),
                      onAction: submitAddField,
                    }}
                    secondaryActions={[
                      {
                        content: 'Cancel',
                        onAction: handleChange,
                      },
                    ]}
                  >
                    <Modal.Section>
                      <TextContainer> 
                        <div style={{width:"100%"}}>
                          <Select label="Form Fields" options={fieldsOptions} onChange={handleSelectChangeFields} value={selectedField}/>
                        </div>
                        {/* Text field */}
                        {selectedField=='input-text' &&
                        <div>
                          <TextField label="Field Label" value={textField.label} onChange={(e)=>{updateLabel(e,'text');}}/>
                          <TextField label="Field Name" value={textField.name} onChange={(e)=>{updateName(e,'text');}}/>
                          <TextField label="Field Placeholder" value={textField.placeholder} onChange={(e)=>{updatePlaceholder(e,'text');}}/>
                        </div>
                        }
                        {/* Email field */}
                        {selectedField=='input-email' &&
                        <div>
                          <TextField label="Field Label" value={emailField.label} onChange={(e)=>{updateLabel(e,'email');}}/>
                          <TextField label="Field Name" value={emailField.name} onChange={(e)=>{updateName(e,'email');}}/>
                          <TextField label="Field Placeholder" value={emailField.placeholder} onChange={(e)=>{updatePlaceholder(e,'email');}}/>
                        </div>
                        }
                        {/* Radio field */}
                        {selectedField == 'input-radio' &&
                        <div>
                          <TextField label="Field Label" value={radioField.label} onChange={(e)=>{updateLabel(e,'radio');}}/>
                          <TextField label="Field Name" value={radioField.name} onChange={(e)=>{updateName(e,'radio');}}/>
                          <TextField label="Field Radio Option (add option comma separate)" multiline={4} value={radioField.option.toString()} onChange={(e)=>{updateOptions(e,'radio');}}/>
                        </div>
                        }
                        {/* Checkbox field */}
                        {selectedField == 'input-checkbox' &&
                        <div>
                          <TextField label="Field Label" value={checkboxField.label} onChange={(e)=>{updateLabel(e,'checkbox');}}/>
                          <TextField label="Field Name" value={checkboxField.name} onChange={(e)=>{updateName(e,'checkbox');}}/>
                          <TextField label="Field Checkbox Option (add option comma separate)" multiline={4} value={checkboxField.option.toString()} onChange={(e)=>{updateOptions(e,'checkbox');}}/>
                        </div>
                        }
                        {/* Select field */}
                        {selectedField == 'select' &&
                        <div>
                          <TextField label="Field Label" value={selectField.label} onChange={(e)=>{updateLabel(e,'select');}}/>
                          <TextField label="Field Name" value={selectField.name} onChange={(e)=>{updateName(e,'select');}}/>
                          <TextField label="Field Select Option (add option comma separate)" multiline={4} value={selectField.option.toString()} onChange={(e)=>{updateOptions(e,'select');}}/>
                        </div>
                        }
                        {/* textarea field */}
                        {selectedField=='textarea' &&
                        <div>
                          <TextField label="Field Label" value={textareaField.label} onChange={(e)=>{updateLabel(e,'textarea');}}/>
                          <TextField label="Field Name" value={textareaField.name} onChange={(e)=>{updateName(e,'textarea');}}/>
                          <TextField label="Field Placeholder" value={textareaField.placeholder} onChange={(e)=>{updatePlaceholder(e,'textarea');}}/>
                        </div>
                        }
                      </TextContainer>
                    </Modal.Section>
                  </Modal>              
                </div>
                {/* Form fields */}
                <Form>
                  <FormLayout>
                    <div>
                    <div style={{padding:"2%"}}>
                      <TextField label="Form Title" value={formTitle} onChange={(e)=>{setFormTitle(e);}}/>
                    </div>
                    {formFields.map((item,index)=>{
                      return <Card key={index}>
                        {item.type == 'text' && 
                        <div style={{padding:"2%"}}>
                          <label>{item.label}</label>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <input type={item.type} disabled placeholder={item.placeholder} style={{width:"80%"}}/>
                            <div>
                              <Button primary={true} onClick={()=>{editField(index)}}>Edit</Button>&nbsp;
                              <Button onClick={()=>{deleteField(index)}} destructive={true}>Delete</Button>
                            </div>
                        </div>
                        </div>}

                        {item.type == 'email' && 
                        <div style={{padding:"2%"}}>
                          <label>{item.label}</label>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <input type={item.type} disabled placeholder={item.placeholder} style={{width:"80%"}}/>
                            <div>
                              <Button primary={true} onClick={()=>{editField(index)}}>Edit</Button>&nbsp;
                              <Button onClick={()=>{deleteField(index)}} destructive={true}>Delete</Button>
                            </div>
                        </div>
                        </div>}

                        
                        {item.type == 'radio' && 
                        <div style={{padding:"2%"}}>
                          <label>{item.label}</label>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            {item.option.map((optionItem,optionIndex)=>{
                              return <label style={{display:'flex',alignItems:'center',width:"25%"}}>{optionItem}
                                      <input type={item.type} title={optionItem} checked name={item.name} value={optionItem} style={{width:"10%"}}/>
                                    </label>
                            })}
                            <div>
                              <Button primary={true} onClick={()=>{editField(index)}}>Edit</Button>&nbsp;
                              <Button onClick={()=>{deleteField(index)}} destructive={true}>Delete</Button>
                            </div>
                        </div>
                        </div>}

                        {item.type == 'checkbox' && 
                        <div style={{padding:"2%"}}>
                          <label>{item.label}</label>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            {item.option.map((optionItem,optionIndex)=>{
                              return <label style={{display:'flex',alignItems:'center',width:"25%"}}>{optionItem}
                                      <input type={item.type} title={optionItem} name={item.name} value={optionItem} style={{width:"10%"}}/>
                                    </label>
                            })}
                            <div>
                              <Button primary={true} onClick={()=>{editField(index)}}>Edit</Button>&nbsp;
                              <Button onClick={()=>{deleteField(index)}} destructive={true}>Delete</Button>
                            </div>
                        </div>
                        </div>}

                        
                        {item.type == 'select' && 
                        <div style={{padding:"2%"}}>
                          <label>{item.label}</label>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <select name={item.name} style={{width:300}}>
                            {item.option.map((optionItem,optionIndex)=>{
                              return <option title={optionItem} value={optionItem} >{optionItem}</option>
                            })}
                            </select>
                            <div>
                              <Button primary={true} onClick={()=>{editField(index)}}>Edit</Button>&nbsp;
                              <Button onClick={()=>{deleteField(index)}} destructive={true}>Delete</Button>
                            </div>
                        </div>
                        </div>}
                        
                        {item.type == 'textarea' && 
                        <div style={{padding:"2%"}}>
                          <label>{item.label}</label>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <textarea disabled placeholder={item.placeholder} style={{width:"80%"}}></textarea>
                            <div>
                              <Button primary={true} onClick={()=>{editField(index)}}>Edit</Button>&nbsp;
                              <Button onClick={()=>{deleteField(index)}} destructive={true}>Delete</Button>
                            </div>
                        </div>
                        </div>}
                      </Card>
                    })}
                    </div>
                    <div style={{padding:20}}>
                      <Checkbox label="Status" checked={formStatus==1?true:false} onChange={()=>{setFormStatus(!formStatus)}}/>
                    </div>
                    <div style={{padding:20}}>
                      <Button primary={true} onClick={submitFormComplete}>Save Form</Button>
                    </div>
                  </FormLayout>
                </Form>
              </div>
          </Card>
      </div>
    );
  }
}
