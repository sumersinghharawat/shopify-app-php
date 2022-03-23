import {gql, useQuery} from '@apollo/client';
import { Loading } from '@shopify/app-bridge-react';
import * as React from "react";
import { Button } from "@shopify/app-bridge/actions";
import { Icon, Select } from "@shopify/polaris";
import {CirclePlusMinor, CircleCancelMajor} from '@shopify/polaris-icons';

export const WeeklyAvailability = () => {
    
    const [weeklySchedule,setWeeklySchedule] = React.useState([{index:1,day:'everyday',start:'00:00',end:'00:30'}]);

    const handleSelectChange = () =>{
        // var array = [...weeklySchedule];
        // array[index][label] = e;
        // setWeeklySchedule(array);
    }

    const weekly = [
        {label: 'Every Day', value: 'everyday'},
        {label: 'Mon-Fri', value: 'mon-fri'},
        {label: 'Sat-Sun', value: 'sat-sun'},
        {label: 'Monday', value: 'monday'},
        {label: 'Tuesday', value: 'tuesday'},
        {label: 'Wednesday', value: 'wednesday'},
        {label: 'Thursday', value: 'thursday'},
        {label: 'Friday', value: 'friday'},
        {label: 'Saturday', value: 'saturday'},
        {label: 'Sunday', value: 'sunday'}
    ];

    let weekDayTime = []; 
    for(let n=0;n<=23;n++){
        for(let p=1;p<=2;p++){
            let timee = ("0" + n).slice(-2);
            if(p%2==0){
                let times = timee.toString()+":"+"30";
                weekDayTime.push({label:times,value:times});
            }else{
                let times = timee.toString()+":"+"00";
                weekDayTime.push({label:times,value:times});
            }
        }
    }

    const startDay = weekDayTime;
    const endDay = weekDayTime;

    return (
        <div>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"50%",marginRight:10}} >
                    <Select
                        label=""
                        options={weekly}
                        onChange={(e)=>{handleSelectChange()}}
                        value={item.day}
                    />
                </div>
                <div style={{width:"50%",marginRight:10}} >
                    <Select
                        label=""
                        options={startDay}
                        onChange={(e)=>{handleSelectChange()}}
                        value={item.start}
                    />
                </div>
                <div style={{width:"50%",marginRight:10}} >
                    <Select
                        label=""
                        options={endDay}
                        onChange={(e)=>{handleSelectChange()}}
                        value={item.end}
                    />
                </div>
                <div style={{width:"50%",marginRight:10}} >
                    <Button>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <Icon source={CircleCancelMajor} />
                            <span style={{marginLeft:"5px"}}>Remove</span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
        );
}