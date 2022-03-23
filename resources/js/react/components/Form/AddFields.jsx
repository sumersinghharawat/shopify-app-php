import { useCallback, useState } from "react";
import { Button, Modal, Select, TextContainer, TextField } from "@shopify/polaris";

export const AddFields = (props) => {
    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const submitAddField = () => {
      switch (selectedField) {
        case 'input-text':
          props.getNewField(textField);
          break;
      
        default:
          break;
      }

      setActive(false)
    }

    const activator = <Button onClick={handleChange}>Add Fields</Button>;
    const [selectedField, setSelectedField] = useState('input-text');

    const handleSelectChangeFields = useCallback((value) => {
        setSelectedField(value);console.log(value);
    }, []);

    const fieldsOptions = [
        {label: 'Input (text)', value: 'input-text'},
        {label: 'Input (email)', value: 'input-email'},
        {label: 'Input (radio)', value: 'input-radio'},
        {label: 'Input (checkbox)', value: 'input-checkbox'},
        {label: 'select', value: 'select'},
        {label: 'textarea', value: 'textarea'}
    ];

    const [textField,setTextField] = useState({label:'Name',name:'name',placeholder:'Enter name',type:'text'})

    const updateLabel = (value,type) => {
      switch (type) {
        case 'text':
          let array = textField;
          array.label = value;
          setTextField({...textField,array});
          break;
      
        default:
          break;
      }
    }
    
    const updateName = (value,type) => {
      switch (type) {
        case 'text':
          let array = textField;
          array.name = value;
          setTextField({...textField,array});
          break;
      
        default:
          break;
      }
    }
    
    const updatePlaceholder = (value,type) => {
      switch (type) {
        case 'text':
          let array = textField;
          array.placeholder = value;
          setTextField({...textField,array});
          break;
      
        default:
          break;
      }
    }

    
    return (
        <div>
            <Modal
              activator={activator}
              open={active}
              onClose={handleChange}
              title="Add Form Fields"
              primaryAction={{
                content: 'Add Field',
                onAction: submitAddField
              }}
              secondaryActions={[
                {
                  content: 'Cancel',
                  onAction: handleChange,
                }
              ]}
            >
              <Modal.Section>
                <TextContainer> 
                  <div style={{width:"100%"}}>
                    <Select label="Form Fields" options={fieldsOptions} onChange={handleSelectChangeFields} value={selectedField}/>
                  </div>
                  {selectedField=='input-text' &&
                  <div>
                    <TextField label="Field Label" value={textField.label} onChange={(e)=>{updateLabel(e,'text');}}/>
                    <TextField label="Field Name" value={textField.name} onChange={(e)=>{updateName(e,'text');}}/>
                    <TextField label="Field Placeholder" value={textField.placeholder} onChange={(e)=>{updatePlaceholder(e,'text');}}/>
                  </div>
                  }
                </TextContainer>
              </Modal.Section>
            </Modal>
        </div>
    );

    
}