import React,{useEffect, useState} from "react"
import * as servicesApi from "../api/servicesApi"
import * as shopItemsApi from "../api/shopItemsApi"
import * as specialMealsApi from "../api/specialMealsApi"
import PropTypes from "prop-types"
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
function FlightDetails({flight,admin,save}){

    const arrayToMap=(array)=>{
        return array.reduce((a,b)=>{ a[b.id]=b;return a},{})
    }
    const [show,setShow]=useState(true)
    const [state,setState]=useState({
    servicesMap:{},
    shopItemsMap:{},
    specialMealsMap:{},
})
const [services,setservices] = useState(false)
const [items,setitems] = useState(false)
const [meals,setmeals] = useState(false)
const [flightTemp,setTemp]=useState({...flight})
const [service,setService] = useState(false)
const [shopItems,setShopItems] = useState(false)
const [special,setSpecial] = useState(false)
    useEffect(()=>{
        let servicesMap={}
        let shopItemsMap={}
        let specialMealsMap={}
        Promise.all([servicesApi.getAll().then((data)=>{
            // console.log(arrayToMap(data))
            servicesMap=arrayToMap(data)   
        }),
        shopItemsApi.getAll().then((data)=>{
            shopItemsMap=arrayToMap(data)
        }),
        specialMealsApi.getAll().then((data)=>{
            specialMealsMap=arrayToMap(data)
        })]).then(()=> {
            setState({servicesMap:servicesMap,shopItemsMap,specialMealsMap})
            // console.log(state)
        })

    },[])
    useEffect(()=>{
        setTemp({...flight})
    },[flight])
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
    setTemp({...flightTemp,[key]:values})
    func(false)
  }
    const iterateAndAppend=(key,array,dataMap)=>{
        return array?array.map((id,i)=>{
            return (
            <tr key={i}><td>{dataMap[id]?dataMap[id].name:""}</td>{admin?<td><button className="r-btn" onClick={()=>deleteItem(key,id)}>Delete</button></td>:null}
                </tr>)
        }):[]
    }
    const deleteItem=(key,id)=>{
        
        setTemp((prev)=>{
           return {...prev,[key]:prev[key].filter(x=>id!=x)}
        })
    }
    return (
        <>   {flightTemp&&flightTemp.flightName?
    <div className="flightDetails" style={{maxHeight:admin?'90%':''}}>
       {!admin? <span className="heading">Flight Details:{!show?<ExpandMoreIcon onClick={()=>setShow(!show)}></ExpandMoreIcon>:<ExpandLessIcon onClick={()=>setShow(!show)}></ExpandLessIcon>}</span>:null}
       
        <table className="outertable" style={{display:show?"table":"none"}}>
        <tbody>
            <tr><td>Name </td><td> {flightTemp.flightName} </td></tr>
            <tr><td>From </td><td> {flightTemp.from} </td></tr>
            <tr><td>To </td><td> {flightTemp.to}  </td></tr>
            <tr><td>Scheduled </td><td>{flightTemp.time}</td></tr>
            <tr><td>Date </td><td>{flightTemp.date}</td></tr>
            <tr><td colSpan="2"><table className="innertable">
            <thead><tr><th style={{width:'70%'}}>Ancillary Services {admin?!services?<ExpandMoreIcon onClick={()=>setservices(!services)}></ExpandMoreIcon>:<ExpandLessIcon onClick={()=>setservices(!services)}></ExpandLessIcon>:null}</th>
                {admin?<th>{
                    service?<>
                    <select defaultValue='' id="serviceId" onChange={(e)=>{changeHandle('services',flightTemp.services,e,setService)}}>
                        {optionsMap(flightTemp.services,state.servicesMap)}
                    </select> 
                    <button className="r-btn" onClick={()=>setService(false)}>cancel</button>
                    </>
                    : <button className="p-btn" onClick={()=>setService(true)}>Add</button>
                }</th>
                :null
                }
           </tr></thead>
                 <tbody>{services?iterateAndAppend('services',flightTemp.services,state.servicesMap):null}</tbody>
                 </table>
            </td></tr>
            
            <tr><td colSpan="2">
            <table className="innertable">    
            <thead><tr>
                <th style={{width:'70%'}}>Special Meals {admin?!meals?<ExpandMoreIcon onClick={()=>setmeals(!meals)}></ExpandMoreIcon>:<ExpandLessIcon onClick={()=>setmeals(!meals)}></ExpandLessIcon>:null} </th>
                {admin?<th>{special?<>
                <select defaultValue='' id="specialId" onChange={(e)=>{changeHandle('specialMeals',flightTemp.specialMeals,e,setSpecial)}}>
                {optionsMap(flightTemp.specialMeals,state.specialMealsMap)}
                </select>
                <button className="r-btn" onClick={()=>setSpecial(false)}>cancel</button></>
                : <button className="p-btn" onClick={()=>setSpecial(true)}>Add</button> 
                }</th>:null}
           </tr></thead>
       <tbody>{meals?iterateAndAppend('specialMeals',flightTemp.specialMeals,state.specialMealsMap):null}</tbody> 
       </table>
       </td></tr>

       <tr><td colSpan="2">
            <table className="innertable">
            <thead><tr><th style={{width:'70%'}}>Shop Items {admin?!items?<ExpandMoreIcon onClick={()=>setitems(!items)}></ExpandMoreIcon>:<ExpandLessIcon onClick={()=>setitems(!items)}></ExpandLessIcon>:null}</th>
                {admin?<th>{shopItems?<>
                <select defaultValue='' id="shopItemId" onChange={(e)=>{changeHandle('shopItems',flightTemp.shopItems,e,setShopItems)}}>
                {optionsMap(flightTemp.shopItems,state.shopItemsMap)}
                </select> <button className="r-btn" onClick={()=>setShopItems(false)}>cancel</button></>:
                <button className="p-btn" onClick={()=>setShopItems(true)}>Add</button> 
                }</th> :null}
          </tr>
          </thead>
            <tbody>{items?iterateAndAppend('shopItems',flightTemp.shopItems,state.shopItemsMap):null}</tbody>
        </table>
       </td></tr>
            
       <tr><td colSpan="2">{admin? <button id="saveBtn" className="s-btn" onClick={()=>save(flightTemp)}>Save</button>:null}</td></tr>
       </tbody>
       </table>
    </div> :null} </>
    )
}
FlightDetails.propTypes={
    flight:PropTypes.any.isRequired,
    save:PropTypes.func,
    admin:PropTypes.any
}
export default FlightDetails;