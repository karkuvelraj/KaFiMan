import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import * as flightActions from "../redux/actions/flightActions"
import * as passengerActions from "../redux/actions/passengerActions"
import PropTypes from "prop-types" 
import Tooltip from '@material-ui/core/Tooltip';
import {bindActionCreators} from 'redux'

export function Filter(props){
    
    useEffect(()=>{
        if(props.type=='F')
            props.loadFlights()
        else if(props.type=='P')
            props.loadPassengersByFlightId(props.flightName)
       
    },[])

    useEffect(()=>{
        if(props.type=='F')
        setShow(true)
        props.loadPassengersByFlightId(props.flightName)
    },[props.flightName])

    const [opts,setOpts] =useState({flightName:false,date:false,time:false,checkedIn:true,infant:false,wheel:false})
    const [show,setShow] =useState(false)
  
    const [serval,setServal] =useState({flightNameVal:"",dateVal:"",timeVal:""})

    const checkBoxHandle=({target})=>{
        
        setOpts({...opts,[target.name]:target.checked})
        
        if(!target.checked)
        setServal({...serval,[target.name+'Val']:''})
     }

   const inputHandle=({target})=>{
       setServal({...serval,[target.name]:target.value})
       
    }
        
   
     const flightCallback=(f)=>{
        props.callBack(f)
        clearFilter()

     }

   let filteredFlights=[]
   let filteredPassengers=[]
   
   if(props.flights&&props.type=='F'){
       if(show){
          filteredFlights=  props.flights.map(f=>f)
          
       }
       else {    
          filteredFlights=  props.flights.filter(f=>{
           return ((opts.flightName&&serval.flightNameVal?f.flightName.startsWith(serval.flightNameVal.toUpperCase()):false)
                    ||
                    (opts.date&&serval.dateVal?serval.dateVal==f.date:false)
                    ||
                    (opts.time&&serval.timeVal?serval.timeVal==f.time:false))
       })
       
    }
   }else if(props.type=='P'&&!props.admin){
       if(show)
       filteredPassengers= props.passengers.map(p=>p)
       else
        filteredPassengers= props.passengers.filter(p=>{
        return ((((opts.checkedIn?p.isCheckedIn:false)
                 ||
                 (opts.infant?p.isInfant:false)
                 ||
                 (opts.wheel?p.isWheelChair:false))||props.inFlight)
                 &&
                 (props.flightName==p.flightNo))
    })
    props.callBack(filteredPassengers)
   }else {
       if(show)
           filteredPassengers= props.passengers.map(p=>p)
        else
        filteredPassengers= props.passengers.filter(p=>{
            return ((((opts.passport&&!p.passportNo)
                 ||
                 (opts.address&&!p.address)
                 ||
                 (opts.dob&&!p.dob))||props.inFlight)
                 &&
                 (props.flightName==p.flightNo))
    })
    props.callBack(filteredPassengers)
   }
   const clearFilter=()=>{
       let optsTemp={}
       for(let key in opts){
        optsTemp[key]=false
       }
       setOpts(optsTemp)
    setShow(!show)
    
   }
   let typeDesc=props.type=='F'?'Flights':'Passengers'
    return (
        <>
        <div className="filter">
            <div className="type">
            {!show?<>
                {props.type=='F'?
                <>
                <label htmlFor="flightName">Name</label>
                <input type="checkbox" name="flightName" id="flightName" defaultChecked={opts.flightName} onChange={checkBoxHandle} />
                <label htmlFor="date">Date</label>
                <input type="checkbox" name="date" id="date"defaultChecked={opts.date} onChange={checkBoxHandle} />
                <label htmlFor="time">Time</label>
                <input type="checkbox" name="time" id="time"defaultChecked={opts.time} onChange={checkBoxHandle} />
                </>:props.inFlight?null:
                (props.admin?
                <>
                 <label htmlFor="passport">Passport</label>
                 <input type="checkbox" name="passport" id="passport" defaultChecked={opts.passport} onChange={checkBoxHandle} />
                 <label htmlFor="address">Address</label>
                 <input type="checkbox" name="address" id="address"defaultChecked={opts.address} onChange={checkBoxHandle} />
                 <label htmlFor="dob">Date of Birth</label>
                 <input type="checkbox" name="dob" id="dob"defaultChecked={opts.dob} onChange={checkBoxHandle} />
                
                </>:
                 <>
                 <label htmlFor="checkedIn">CheckedIn</label>
                 <input type="checkbox" name="checkedIn" id="checkedIn" defaultChecked={opts.checkedIn} onChange={checkBoxHandle} />
                 <label htmlFor="wheel">Wheel Chair</label>
                 <input type="checkbox" name="wheel" id="wheel"defaultChecked={opts.wheel} onChange={checkBoxHandle} />
                 <label htmlFor="infant">Infant</label>
                 <input type="checkbox" name="infant" id="infant"defaultChecked={opts.infant} onChange={checkBoxHandle} />
                 </>)
                
                }</>:null}
                {props.inFlight&&props.type=='P'?null: <Tooltip title={show?`Filter for ${typeDesc}`:`Show All available ${typeDesc}`}><button className="p-btn" onClick={()=>clearFilter()}>{show?"Filter":"Show All"}</button></Tooltip>}
            </div>
            <div className="value">
                {props.type=='F'?<>
                {!opts.flightName?null:<>
                <label htmlFor="flightNameVal">Name value</label>
                <input type="text" name="flightNameVal" value={serval.flightNameVal} onChange={inputHandle}/>
                </>}
                {!opts.date?null:<>
                <label htmlFor="dateVal">Date value</label>
                <input type="date" name="dateVal" value={serval.dateVal} onChange={inputHandle}/>
                </>}
                {!opts.time?null:<>
                <label htmlFor="timeVal">Time value</label>
                <input type="time" name="timeVal" value={serval.timeVal} onChange={inputHandle}/>
                </>}
                </>:null
                }
            </div>
        </div>
        {filteredFlights.length!=0?
        <div className="searchResults">{
            props.type=='F'?<table className="outertable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Scheduled</th>
                    </tr>
                </thead>
                <tbody>
                {
            filteredFlights.map(
                (f)=><tr key={f.flightName} onClick={()=>flightCallback(f)}>
               <td> {f.flightName} </td> 
               <td> {f.from} </td> 
               <td>  {f.to}  </td>
               <td> {f.time}</td></tr>)}
               </tbody></table>
                :
            null
            }</div>:null}
        </>
    )
}

Filter.propTypes={
    type:PropTypes.string,
    loadPassengersByFlightId:PropTypes.func.isRequired,
    callBack:PropTypes.func.isRequired,
    loadFlights:PropTypes.func.isRequired,
    flights:PropTypes.array.isRequired,
    passengers:PropTypes.array.isRequired,
    flightName:PropTypes.string,
    inFlight:PropTypes.any,
    admin:PropTypes.any
}
const mapActToProp=(dispatch)=>{
    return {
        ...bindActionCreators(flightActions,dispatch),
        ...bindActionCreators(passengerActions,dispatch)
    }
}
export default connect(({flights,passengers})=>{return {flights,passengers}},mapActToProp)(Filter)