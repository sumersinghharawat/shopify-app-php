import {gql, selectHttpOptionsAndBody, useQuery} from '@apollo/client';
import { Loading } from '@shopify/app-bridge-react';
import { Banner, Button, DatePicker, FormLayout, Icon, RadioButton, Select, Stack, TextField } from '@shopify/polaris';
import axios from 'axios';
import googleTimezonesJson from 'google-timezones-json';
import React, { useCallback, useState } from "react";
import { useEffect } from 'react';
import validator from 'validator';
import Calendar from './child-event-component/calendar';
import {CirclePlusMinor, CircleCancelMajor} from '@shopify/polaris-icons';
import WeeklyAvailability from './child-event-component/WeeklySchedule';

export const AddEventForm = (productId) => {

    const [eventData,setEventData] = useState({});

    let product_Id = (productId.id.split("/"))[4];

    const [selectedHours, setSelectedHours] = useState('Select Hours');
    const [selectedHoursError, setSelectedHoursError] = useState('');


    const [selectedMinute, setSelectedMinute] = useState('Select Minutes');
    const [selectedMinuteError, setSelectedMinuteError] = useState('');

    const hourOptions = [
    {label: '0 hour', value: '0'},
    {label: '1 hour', value: '1'},
    {label: '2 hours', value: '2'},
    {label: '3 hours', value: '3'},
    {label: '4 hours', value: '4'},
    {label: '5 hours', value: '5'},
    {label: '6 hours', value: '6'},
    {label: '7 hours', value: '7'},
    {label: '8 hours', value: '8'},
    {label: '9 hours', value: '9'},
    {label: '10 hours', value: '10'},
    {label: '11 hours', value: '11'},
    {label: '12 hours', value: '12'},
    {label: '13 hours', value: '13'},
    {label: '14 hours', value: '14'},
    {label: '15 hours', value: '15'},
    {label: '16 hours', value: '16'},
    {label: '17 hours', value: '17'},
    {label: '18 hours', value: '18'},
    {label: '19 hours', value: '19'},
    {label: '20 hours', value: '20'},
    {label: '21 hours', value: '21'},
    {label: '22 hours', value: '22'},
    {label: '23 hours', value: '23'},
    ];

    const minuteOptions = [
        {label: '0 minute', value: '0'},
        {label: '1 minute', value: '1'},
        {label: '2 minutes', value: '2'},
        {label: '3 minutes', value: '3'},
        {label: '4 minutes', value: '4'},
        {label: '5 minutes', value: '5'},
        {label: '6 minutes', value: '6'},
        {label: '7 minutes', value: '7'},
        {label: '8 minutes', value: '8'},
        {label: '9 minutes', value: '9'},
        {label: '10 minutes', value: '10'},
        {label: '11 minutes', value: '11'},
        {label: '12 minutes', value: '12'},
        {label: '13 minutes', value: '13'},
        {label: '14 minutes', value: '14'},
        {label: '15 minutes', value: '15'},
        {label: '16 minutes', value: '16'},
        {label: '17 minutes', value: '17'},
        {label: '18 minutes', value: '18'},
        {label: '19 minutes', value: '19'},
        {label: '20 minutes', value: '20'},
        {label: '21 minutes', value: '21'},
        {label: '22 minutes', value: '22'},
        {label: '23 minutes', value: '23'},
        {label: '24 minutes', value: '24'},
        {label: '25 minutes', value: '25'},
        {label: '26 minutes', value: '26'},
        {label: '27 minutes', value: '27'},
        {label: '28 minutes', value: '28'},
        {label: '29 minutes', value: '29'},
        {label: '30 minutes', value: '30'},
        {label: '31 minutes', value: '31'},
        {label: '32 minutes', value: '32'},
        {label: '33 minutes', value: '33'},
        {label: '34 minutes', value: '34'},
        {label: '35 minutes', value: '35'},
        {label: '36 minutes', value: '36'},
        {label: '37 minutes', value: '37'},
        {label: '38 minutes', value: '38'},
        {label: '39 minutes', value: '39'},
        {label: '40 minutes', value: '40'},
        {label: '41 minutes', value: '41'},
        {label: '42 minutes', value: '42'},
        {label: '43 minutes', value: '43'},
        {label: '44 minutes', value: '44'},
        {label: '45 minutes', value: '45'},
        {label: '46 minutes', value: '46'},
        {label: '47 minutes', value: '47'},
        {label: '48 minutes', value: '48'},
        {label: '49 minutes', value: '49'},
        {label: '50 minutes', value: '50'},
        {label: '51 minutes', value: '51'},
        {label: '52 minutes', value: '52'},
        {label: '53 minutes', value: '53'},
        {label: '54 minutes', value: '54'},
        {label: '55 minutes', value: '55'},
        {label: '56 minutes', value: '56'},
        {label: '57 minutes', value: '57'},
        {label: '58 minutes', value: '58'},
        {label: '59 minutes', value: '59'}
    ];

    const handleSelectChangeHours = (value) => {
        setSelectedHours(value);
    };
    const handleSelectChangeMinute = (value) => {
        setSelectedMinute(value);
    };

        useEffect(()=>{


            axios.get(`/api/view-event/${product_Id}`).then((res)=>{
                if(res.data.length != 0 && res.data.length != undefined){
                    setEventData(res);
                    setSelectedHours(res.data.data.duration_hours);
                    setSelectedMinute(res.data.data.duration_minute);
                }else{
                    setSelectedHours('0');
                    setSelectedMinute('30');
                }
            }).catch((err)=>{
                console.log(err);
            });
        },[]);

// Duration


        const Duration = () => {

                return <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"50%",marginRight:10}} >
                    <Select label="Duration Hours" options={hourOptions} error={selectedHoursError} onChange={handleSelectChangeHours} value={selectedHours}/>
                </div>
                <div style={{width:"50%",marginRight:10}} >
                    <Select label="Duration Minute" options={minuteOptions}  error={selectedMinuteError} onChange={handleSelectChangeMinute} value={selectedMinute}/>
                </div>
            </div>;
        }

        // Invitees can schedule
        const [valueInvitee, setValueInvitee] = useState('a');
        // Date Range
        const [selectedDateRange,setSelectedDateRange] = useState({});
        // TimeZone
        const [selectedTimeZone,setSelectedTimeZone] = useState('');
        // ScheduleEvent
        const [selectedCalendarStart,setSelectedCalendarStart] = useState('');
        // Weekly Schedule
        const [selectedWeeklySchedule,setSelectedWeeklySchedule] = useState({});
        // Location
        const [eventLocation,setEventLocation] = useState('');

        const handleChangeInvitee = useCallback(
        (_checked, newValueInvitee) => {setValueInvitee(newValueInvitee);},
        [],
        );

        const [valueInviteeFutureDay, setValueInviteeFutureDay] = useState('1');

        const handleChangeInviteeFutureDay = useCallback((newValue) => {setValueInviteeFutureDay(newValue);}, []);


        const PRODUCTS_QUERY = gql`{
            product(id: "${productId.id}") {
                id,
                title,
                description,
                onlineStoreUrl
            }
        }`;


        const {loading, error, data} = useQuery(PRODUCTS_QUERY);

        if (loading) return (
            <Loading />
        );

        if (error) return (
            <Banner status="critical">
                There was an issue loading products.
            </Banner>
        );

        function getTimezoneName() {
            const today = new Date();
            const short = today.toLocaleDateString(undefined);
            const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });

            // Trying to remove date from the string in a locale-agnostic way
            const shortIndex = full.indexOf(short);
            if (shortIndex >= 0) {
              const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);

              // by this time `trimmed` should be the timezone's name with some punctuation -
              // trim it from both sides
              return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

            } else {
              // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
              return full;
            }
        }



        const TimeZone = () => {

            var split = new Date().toString().split(" ");

            let currentTimezone = getTimezoneName();
            // for(const item in googleTimezonesJson){
            //     console.log(currentTimezone);
            //     if(item.indexOf(currentTimezone) !== -1){
            //         currentTimezone = item;
            //         console.log(item);
            //         break;
            //     }
            // }

            var i = 0;
            var TimeZones = [];
            for (const [key, value] of Object.entries(googleTimezonesJson)) {
                TimeZones.push({"label":key,"value":value});
                i++;
            }

            TimeZones.sort(function(a, b) {
                var nameA = a.label.toUpperCase();
                var nameB = b.label.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            const options = TimeZones;

            const [selected, setSelected] = useState(currentTimezone);

            const handleSelectChange = useCallback((value) => {
                setSelectedTimeZone(value);
                setSelected(value);
            }, []);

            return (
                <Select
                label="Timezone"
                options={options}
                onChange={handleSelectChange}
                value={selected}
                />
            );
        }

        const CalendarStart = () =>{
            const [value, setValue] = useState('manual_date');

            const handleChange = useCallback(
              (_checked, newValue) => setValue(newValue),
              [],
            );

            const [selected, setSelected] = useState('2022-01');

            const handleSelectChange = useCallback((value) => {
                setSelected(value);
                selectedCalendarStart(value);
            }, []);

            let d = new Date();
            let years = d.getFullYear();
            let month = d.getMonth();

            let list_years = [];
            for(let i=month+1;i<=12;i++){
                let years_item = years.toString()+"-"+i.toString();
                list_years.push({label:years_item,value:years_item});
            }

            const options = list_years;

            return (
              <Stack vertical>
                <RadioButton
                  label="Manual Date"
                  helpText="Use this if you want to show the calendar from specific month/date."
                  checked={value === 'manual_date'}
                  id="manual_date"
                  name="calendar_start"
                  onChange={handleChange}
                />
                {value === 'manual_date'?

                <Select
                    label=""
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                />
                :''}
                <RadioButton
                  label="Current Month"
                  helpText="Use this if you want your customers to see the current month in your calendar."
                  id="current_month"
                  name="calendar_start"
                  checked={value === 'current_month'}
                  onChange={handleChange}
                />
              </Stack>
            );
        }


    const saveEvent = () => {
        // Duration
        setSelectedHoursError("");
        setSelectedMinuteError("");
        console.log("submit");
        if(selectedHours == undefined || validator.isEmpty(selectedHours)){
            setSelectedHoursError("Duration hours is required");
            return
        }

        if(selectedMinute == undefined || validator.isEmpty(selectedMinute)){
            setSelectedMinuteError("Duration minute is required");
            return
        }

        // Duration
        // console.log(selectedHours);
        // console.log(selectedMinute);
        // Invitee
        let inviteeTime = "";
        if(valueInvitee == 'a'){
            inviteeTime = {start: new Date(new Date().getTime()+(parseInt(valueInviteeFutureDay)*24*60*60*1000)),end:''};
        }else if(valueInvitee == 'b'){
            inviteeTime = selectedDateRange;
        }else{
            inviteeTime = {start: new Date(),end:''};
        }
        // TimeZone
        // console.log(selectedTimeZone);
        // ScheduleEvent
        console.log(selectedCalendarStart);
        // WeeklyDays
        console.log(selectedWeeklySchedule);

        axios.post('/api/add-event',{
            "product_id": product_Id,
            "store_domain": "",
            "duration_hours": selectedHours,
            "duration_minute": selectedMinute,
            "start_date": inviteeTime,
            "end_date": "",
            "timezone": selectedTimeZone,
            "event_schedule": selectedCalendarStart,
            "weekly_schedule": selectedWeeklySchedule,
            "location": null,
            "address": null,
            "note": null
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });


    }
    return (<div>
                <FormLayout>
                    <h2 style={{fontSize:"24px",fontWeight:"500"}}>{data.product?data.product.title:''}</h2>
                    <strong>Duration</strong>
                    <Duration />
                    <strong>Invitees can schedule...</strong>
                    <div>
                        <Stack vertical>
                            <RadioButton
                                label="X days into the future"
                                helpText="Customers will only be able to schedule for the next X days into the future"
                                checked={valueInvitee === 'a'}
                                id="a"
                                name="days_in_future"
                                onChange={handleChangeInvitee}
                            />
                            {valueInvitee === 'a' && <TextField
                                label=""
                                type="number"
                                value={valueInviteeFutureDay}
                                onChange={handleChangeInviteeFutureDay}
                                autoComplete="off"
                            />}
                            <RadioButton
                                label="Within a date range"
                                helpText="Customers will be able to see time slots only in these date range"
                                id="b"
                                name="days_in_future"
                                checked={valueInvitee === 'b'}
                                onChange={handleChangeInvitee}
                            />
                            {valueInvitee === 'b' &&
                            <Calendar
                                selectedDateRangeArg={(dateRange)=>{
                                        setSelectedDateRange(dateRange);
                                    }
                                }
                            />}
                            <RadioButton
                                label="Indefinetly into the future"
                                helpText="Customers will be able to see timeslots for any dates in the future"
                                id="c"
                                name="days_in_future"
                                checked={valueInvitee === 'c'}
                                onChange={handleChangeInvitee}
                            />
                        </Stack>
                    </div>
                    <strong>Timezone</strong>
                    <TimeZone />
                    <strong>Calendar Date/Month Start</strong>
                    <CalendarStart />
                    <strong>Set your weekdays availabality</strong>
                    <WeeklyAvailability getValue={(res)=>{
                        setSelectedWeeklySchedule(res);
                    }}/>
                    <strong>Location</strong>
                    <TextField label="" onChange={(e) => { setEventLocation(e.target.value); }} value={eventLocation} />
                    <strong>Address</strong>
                    <TextField label="" onChange={(e) => { setEventLocation(e.target.value); }} value={eventLocation} />
                    <strong>Note</strong>
                    <TextField label="" onChange={(e) => { setEventLocation(e.target.value); }} value={eventLocation} />

                </FormLayout>
                <div style={{margin: "2% 0%"}}>
                    <Button primary={true} onClick={saveEvent} >Submit</Button>
                </div>
            </div>);
};
