import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '50%',
    height:'70%',
    overflow:'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Passenger({passenger,onClose,open,state,save}) {

  const classes = useStyles();

  useEffect(()=>{
    if(passenger.id)
    setTemp({...passenger})
  },[open]) 

 
  const [passengerTemp,setTemp]=useState({...passenger})
  const [service,setService] = useState(false)
  const [shopItems,setShopItems] = useState(false)
  const [special,setSpecial] = useState(false)
  const [modalStyle] = useState(getModalStyle);

  const iterateAndAppend=(array,dataMap)=>{
    return array? array.map((id,i)=>{
        return <tr key={i}><td colSpan="2">{dataMap[id]?dataMap[id].name:""}</td></tr>
    }):null
  }

  const optionsMap=(ids,map)=>{
    let options=[]
    options.push(<option key={999} disabled value=''>Select</option>)
    for(let id in map){
      if(!ids.includes(id))
        options.push(<option key={id} value={id}>{map[id].name}</option>)
    }
    return options
  }

  const changeHandle=(key,array,event,func)=>{
    let values=[...array]
    values.push(event.target.value)
    setTemp({...passengerTemp,[key]:values})
    func(false)
  }
  const removedPref=()=>{
    setTemp({...passengerTemp,mealPrefer:''})
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
        <span className="heading">Passenger Details</span>
        <table className="outertable">
        <tbody>
            <tr><td>Name </td><td>  {passengerTemp.name}</td></tr>
            <tr><td>Passport No</td><td> {passengerTemp.passportNo}</td></tr>
            <tr><td>Address</td><td> {passengerTemp.address}</td></tr>
            <tr><td>Date of Birth</td><td> {passengerTemp.dob}</td></tr>
            <tr><td colSpan="2">
        <table className="innertable">
            <thead><tr><th>Ancillary Services</th><th>
            {service?<>
            <select  defaultValue=''  id="serviceId" onChange={(e)=>{changeHandle('services',passengerTemp.services,e,setService)}}>
            {optionsMap(passengerTemp.services,state.servicesMap)}
            </select> <button className="r-btn" onClick={()=>setService(false)}>cancel</button></>
            : <button className="p-btn" onClick={()=>setService(true)}>Add</button> }

            </th></tr></thead> 
            <tbody>{iterateAndAppend(passengerTemp.services,state.servicesMap)}</tbody>
         </table>
        </td></tr>
     <tr><td colSpan="2">
        <table className="innertable">
          <thead><tr><th>Special Meal</th><th>
          {special?<>
          <select  defaultValue=''  id="specialId" onChange={(e)=>{setTemp({...passengerTemp,mealPrefer:e.target.value});setShopItems(false)}}>
           {optionsMap([passengerTemp.mealPrefer],state.specialMealsMap)}
          </select>
            <button className="r-btn" onClick={()=>setSpecial(false)}>cancel</button></>
          : <><button  className="p-btn" onClick={()=>setSpecial(true)}>Add Special Meal</button> 
          <button  className="r-btn" onClick={()=>removedPref()}>Remove Meal Preference</button> </>}
           </th></tr>
           </thead>
       <tbody>
       {passengerTemp.mealPrefer?iterateAndAppend([passengerTemp.mealPrefer],state.specialMealsMap):
       <tr ><td colSpan="2">No Meals Preference</td></tr>}
         </tbody></table>
        </td></tr>
     <tr><td colSpan="2">
            <table className="innertable">
            <thead><tr><th>Shop Items </th><th>
          {shopItems?<>
          <select  defaultValue=''  id="shopItemId" onChange={(e)=>{changeHandle('shopItems',passengerTemp.shopItems,e,setShopItems)}}>
           {optionsMap(passengerTemp.shopItems,state.shopItemsMap)}
          </select> <button className="r-btn" onClick={()=>setShopItems(false)}>cancel</button></>:
           <button className="p-btn" onClick={()=>setShopItems(true)}>Add</button> }
            </th></tr>
            </thead>
        <tbody>
        {iterateAndAppend(passengerTemp.shopItems,state.shopItemsMap)}
          </tbody></table>
        </td></tr>
        <tr><td colSpan="2">
          <button className="s-btn" onClick={()=>save(passengerTemp)}>Save</button>
          <button id="modalClose" className="r-btn"onClick={()=>onClose(false)}>Close</button>
        </td></tr>
        </tbody></table>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={()=>onClose(false)}>
        {body}
      </Modal>
    </div>
  );
}
Passenger.propTypes={
  onClose:PropTypes.func.isRequired,
  save:PropTypes.func.isRequired,
  open:PropTypes.bool.isRequired,
  passenger:PropTypes.object.isRequired,
  state:PropTypes.object.isRequired
}
