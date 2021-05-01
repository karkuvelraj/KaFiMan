import React ,{useEffect, useState} from "react"
import {connect }from "react-redux"
import * as passengerActions from "../redux/actions/passengerActions"
import PropTypes from "prop-types"
import { toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import {bindActionCreators} from 'redux'

export function SeatMap(props){


    const seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    let passengerMap={}
    if(props.passengers!=null)
    props.passengers.forEach((p)=>{
        passengerMap[p.seatNo]=p
    })
    const updateCheckin=(passenger)=>{
             if(passenger.isCheckedIn)
             toast(`${passenger.name} Marked as not Checked In`)
            else
            toast(`${passenger.name} Checked In`)
        props.updatePassenger({...passenger,isCheckedIn:!passenger.isCheckedIn})
    }
    const [opts,setOpts] =useState("checkedIn")
    
    useEffect(()=>{
        if(props.mealPrefer)
        setOpts("meals")
    },[])

    const radioHandle=({target})=>{
        setOpts(target.value)
     }
     const colorCheck=(passenger)=>{
        if(opts=="checkedIn")return passenger.isCheckedIn
        if(opts=="wheel")return passenger.isWheelChair
        if(opts=="infant")return passenger.isInfant
        if(opts=="meals")return passenger.mealPrefer
     }
    //  let label={"checkedIn":"Checked In","wheel": "Wheel Chair","infant":"Infant","meals":"Special Meals"}
     let selectSeat=(x)=>{
         if(props.admin)
         if(!passengerMap[x]){
             
        toast(`Seat Number ${x} selected.`)
         props.select(x)
         }else
         toast(`Seat Number ${x} Already Booked. Select Empty Seat`)
     }
    return (<>
    <div className="head">
        <span className="heading">Seat Map</span>
        <div style={{paddingLeft:'20px'}}>
        {props.mealPrefer?null:props.admin?<span id="maptype">Select Unbooked Seat </span>: <>
                 <label htmlFor="checkedInS">CheckedIn</label>
                 <input type="radio" name="checkedInS" id="type" value="checkedIn" checked={opts=="checkedIn"} onChange={radioHandle} />
                 <label htmlFor="wheelS">Wheel Chair</label>
                 <input type="radio" name="wheelS" id="type" value="wheel" checked={opts=="wheel"} onChange={radioHandle} />
                 <label htmlFor="infantS">Infant</label>
                 <input type="radio" name="infantS" id="type" value="infant"checked={opts=="infant"} onChange={radioHandle} />
                 </>}
                 {opts=='meals'?<span id="maptype">Passengers with Special meals preference</span>:null}
                 </div>
    </div>
    <div className="first" >
       {seats.map((x,i)=>{
                return !passengerMap[x]?<Tooltip key={i} title='Empty Seat'> 
                            <div className="seat empty"  onClick={()=>selectSeat(x)} >
                                 <p>Seat No: <span className="seatNo">{x}</span></p>
                                 </div>
                                 </Tooltip>
                                 :
                                <Tooltip key={i} title={
                                    <span className="tooltip">
                                    <p>Name : {passengerMap[x].name}</p>
                                    {passengerMap[x].isCheckedIn?<p>Checked In</p>:null}
                                    {passengerMap[x].isWheelChair?<p>Wheelchair Assistance</p>:null}
                                    {passengerMap[x].isInfant?<p>Infant</p>:null}
                                </span>
                                }>
                            <div className={colorCheck(passengerMap[x])?"checkedin seat":"seat"} 
                                onClick={()=>selectSeat(x)}
                            key={i} >
                              
                                <p>Seat No: <span className="seatNo">{x}</span></p>
                                <p>{passengerMap[x].name}</p>
                                {/* <p>{passengerMap[x].isCheckedIn?"Checked In":""}</p> */}
                               {props.mealPrefer||props.admin?null: <button className="s-btn" style={{height:'30px'}}
                                onClick={()=>updateCheckin(passengerMap[x])}>
                                    {passengerMap[x].isCheckedIn?"Undo":"CheckIn"}</button>}
                                </div>
                                </Tooltip>
                        })
                        }
                    </div>
    </>)
}
SeatMap.propTypes={
    passengers:PropTypes.array.isRequired,
    updatePassenger:PropTypes.func.isRequired,
    mealPrefer:PropTypes.any,
    admin:PropTypes.any,
    select:PropTypes.func
}
const mapToProps =({passengers})=>{
    return {passengers}
}
const mapActions=(dispatch)=>{
    return {...bindActionCreators(passengerActions,dispatch)}
}
export default connect(mapToProps,mapActions)(SeatMap)