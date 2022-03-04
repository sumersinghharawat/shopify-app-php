import { useState } from "react";
import { Button, Icon, Select } from "@shopify/polaris";
import {CirclePlusMinor, CircleCancelMajor} from '@shopify/polaris-icons';
import { useEffect } from "react";

        export default function WeeklyAvailability(props) {

            const handleSelectChange = (e,index,valued,label) =>{
                var array = [...weeklySchedule];
                array[index][label] = e;
                setWeeklySchedule(array);
                props.getValue(weeklySchedule);
            }

            useEffect(()=>{
                props.getValue(weeklySchedule);
            },[]);


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

            const [weeklySchedule,setWeeklySchedule] = useState([{index:1,day:'everyday',start:'00:00',end:'00:30'}]);

            // setTimeout(()=>{

            // },2000);

            const startDay = weekDayTime;
            const endDay = weekDayTime;

            const addNewWeekDay = (newIndex) => {


                if(newIndex == -1){
                    let array = [];
                    let length = weeklySchedule.length + newIndex;
                    array.push(...weeklySchedule,{index:length,day:'everyday',start:'00:00',end:'00:30'});
                    setWeeklySchedule(array);
                }else{
                    var array = [...weeklySchedule];
                    if (newIndex !== -1) {
                        array.splice(newIndex, 1);
                    }
                    setWeeklySchedule(array);
                }

                props.getValue(weeklySchedule);

            }

            return (
                <div>
                {
                    weeklySchedule.map((item,index)=>{

                    return (<div style={{display:"flex",flexDirection:"row"}} key={index}>
                        <div style={{width:"50%",marginRight:10}} >
                            <Select
                                label=""
                                options={weekly}
                                onChange={(e)=>{handleSelectChange(e,index,item.day,"day")}}
                                value={item.day}
                            />
                        </div>
                        <div style={{width:"50%",marginRight:10}} >
                            <Select
                                label=""
                                options={startDay}
                                onChange={(e)=>{handleSelectChange(e,index,item.start,"start")}}
                                value={item.start}
                            />
                        </div>
                        <div style={{width:"50%",marginRight:10}} >
                            <Select
                                label=""
                                options={endDay}
                                onChange={(e)=>{handleSelectChange(e,index,item.end,"end")}}
                                value={item.end}
                            />
                        </div>
                        <div style={{width:"50%",marginRight:10}} >
                            <Button onClick={()=>{addNewWeekDay(index)}}>
                                <div style={{display:"flex",alignItems:"center"}}>
                                    <Icon source={CircleCancelMajor} />
                                    <span style={{marginLeft:"5px"}}>Remove</span>
                                </div>
                            </Button>
                        </div>
                </div>);
                })}
                <div style={{marginTop:"5px",display:"flex",alignContent:"center",alignItems:"center"}}>
                    <Button label="Add More" onClick={()=>{addNewWeekDay(-1)}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <Icon source={CirclePlusMinor} />
                            <span style={{marginLeft:"5px"}}>Add</span>
                        </div>
                    </Button>
                </div>
            </div>
            );
        }
