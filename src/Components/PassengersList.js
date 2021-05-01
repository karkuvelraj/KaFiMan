import React, { useState,useEffect } from "react"
import * as passengerActions from "../redux/actions/passengerActions"
import {connect }from "react-redux"
import * as servicesApi from "../api/servicesApi"
import * as shopItemsApi from "../api/shopItemsApi"
import * as specialMealsApi from "../api/specialMealsApi"
import PropTypes from "prop-types"
import Passenger from "./Passenger"
import { toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import {bindActionCreators} from 'redux'

export function PassengersList({list,updatePassenger,passengers,inFlight,selected,admin}){
    
    const [passenger,setPassenger]=useState({})
    const [open,setOpen]=useState(false)

    const seats=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const changeSeat=({target})=>{
        let seatNo=target.value
        let oldSeatNo=passenger.seatNo
        let bookedPass=passengers.filter(x=>x.seatNo==seatNo)[0]
        
        updatePassenger({...passenger,seatNo})
        toast(passenger.name+` seat changed  to `+seatNo)
        if(bookedPass){
              updatePassenger({...bookedPass,seatNo:oldSeatNo})
              toast(bookedPass.name+` seat switched to `+oldSeatNo)
        }
        
        setPassenger({})
    }
    const savePassenger=(p)=>{
        setPassenger({})
        setOpen(false)
        updatePassenger(p)
        toast("Passenger saved successfully")
        
    }
    const arrayToMap=(array)=>{
        return array.reduce((a,b)=>{ a[b.id]=b;return a},{})
    }

    const getDropDowns=async ()=>{
      
       let servicesMap=arrayToMap(await servicesApi.getAll()) 
       let shopItemsMap= arrayToMap(await shopItemsApi.getAll())
       let specialMealsMap= arrayToMap(await specialMealsApi.getAll())
        setState({servicesMap,shopItemsMap,specialMealsMap})
  
    }
    const [state,setState]=useState({
        servicesMap:{},shopItemsMap:{},specialMealsMap:{}
    })

        useEffect(()=>{
              getDropDowns()
           
        },[])

        const iterateAndAppend=(array,dataMap)=>{
            if(dataMap)
            return array?array.map((id,i)=>{
                return  <tr key={i}><td key={i}>{dataMap[id]?dataMap[id].name:""}</td></tr>
            }):[]
        }
        const choosePassenger=(p)=>{
            if(admin){
                selected(p)
            }else{
                setPassenger(p);
                setOpen(true)
            }
        }
    return (
        <div className="passengerList">
            
            {list?list.map((p,i)=>{
                return <table  key={i} id={'o'+i} className="outertable" >
                        <thead><tr>
                        <th colSpan={inFlight?"1":"2"}>{p.name} 
                        {admin?
                            <button className="p-btn" onClick={()=>{choosePassenger(p)}}>Edit</button>
                        :null}
                        </th>
                        
                        {inFlight?<th>
                            <button className="p-btn" onClick={()=>{choosePassenger(p)}}>Edit</button>
                        </th>:null}
                        </tr></thead>

                        <tbody>
                    
                         <tr><td>Passport No: </td><td>{p.passportNo} </td></tr> 
                        <tr><td colSpan="2">Ancillary Services</td></tr>
                        <tr><td colSpan="2">
                            <table className="innertable">
                             <tbody>
                            {iterateAndAppend(p.services,state.servicesMap)}
                            </tbody>
                         </table>
                         </td></tr> 
                            <tr><td> Seat No </td><td>  <span className="seatNo" style={{marginRight:'10px'}}>{p.seatNo}</span>
                            {!admin?<>
                            {passenger.id ||inFlight?null: <Tooltip title='Change or Switch passenger seat'>
                                <button className="s-btn" onClick={()=>setPassenger(p)}>Change Seat</button>
                                </Tooltip>}
                            {passenger.id&&passenger.id==p.id?
                                <select id="seats" value={p.seatNo} onChange={changeSeat}>
                                    {seats.map((x,o)=>{
                                       return <option key={o} value={x}>Seat No: {x}</option>
                                    })}
                                    
                                </select>:null
                            }
                            </>:null}
                            </td></tr> 
                         </tbody>
                    </table> 
                    
            }):null}
            <Passenger save={savePassenger} passenger={passenger} state={state} open={open} onClose={(flag)=>{setOpen(flag),setPassenger({})}}/>
        </div>
    )
}
PassengersList.propTypes={
    list:PropTypes.array.isRequired,
    updatePassenger:PropTypes.func.isRequired,
    passengers:PropTypes.array.isRequired,
    inFlight:PropTypes.any,
    selected:PropTypes.any,
    admin:PropTypes.any,
    flight:PropTypes.any
}
const mapActions=(dispatch)=>{
    return {...bindActionCreators(passengerActions,dispatch)}
}
export default connect(({passengers})=>{return {passengers}},mapActions)(PassengersList)