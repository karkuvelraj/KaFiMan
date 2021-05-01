import React, { useEffect, useState }  from "react"
import {default as Filter } from "../Components/Filter"
import {default as PassengersList} from "../Components/PassengersList"
import ReactiveForm from "../Components/ReactiveForm"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import * as actions from "../redux/actions/passengerActions"
import { toast } from "react-toastify"
import Navigator from '../Components/Navigator'
import { bindActionCreators } from "redux";
function PassengerDetails (props){

    
    let formFields=[
        {
            name:"name" , type:"text",minLength:5,maxLength:30 ,value:"",placeholder:"Name" ,id:"name", required:true
        },{
            name:"address" , type:"text",minLength:5,maxLength:40 ,value:"",placeholder:"Address details" ,id:"address"
        },{
            name:"dob" , type:"date",value:"",placeholder:"Date of birth" ,id:"dob"
        },{
            name:"passportNo" , type:"text",maxLength:10 ,value:"",placeholder:"Passport No" ,id:"passportNo", 
        },{
            name:"seatNo" , type:"text",maxLength:30 ,value:"",placeholder:"Seat No" ,id:"seatNo", required:true ,readOnly:true,
            icon:'map'
        },{
            name:"flightNo" , type:"text",maxLength:30 ,value:"",placeholder:"Flight No" ,id:"flightNo", readOnly:true
        }]
    
    // const [isFilter,setFilter]=useState(false)
    const [flight,setFlight]=useState({})
    const [fPassengers,setFPassengers]=useState([])
    const [passenger,setPassenger]=useState(null)
    const [isAdd,setAdd]=useState(false)
    const [fields,setForm]=useState(JSON.parse(JSON.stringify(formFields)))
    const getFlight=(data)=>{
        setFlight(data)
        setPassenger(null)
    }
    useEffect(()=>{
        return ()=> {
            props.clearState()
        }
    },[])
    const createFormData=(p,isExist)=>{
        if(p){
            setAdd(!isExist)
        let fields=JSON.parse(JSON.stringify(formFields))
        let newFields=fields.map(x=>{return {...x}})
        for(let f of newFields ){
            f.value=p[f.name]?p[f.name]:''
            if(isExist)f.icon=''
            if(f.name=='flightNo')
                f.value=flight.flightName
        }
        setForm(newFields)
        setPassenger({...p})
    }
    }
    const savePassenger=(p)=>{
        if(isAdd){
            props.addPassenger({...p})
            setAdd(!isAdd)
            toast("New passenger added successfully")
        }else{
            props.updatePassenger({...p})
            toast("passenger saved successfully")
        }
        
        setPassenger(null)
    }
    const addNew=()=>{
        setAdd(!isAdd)
        setPassenger({})
        createFormData({},false)
    }
        return (

			// <div className="m-right">
            <div className="F-parent">
                <Navigator/>
                <div className="F-filter">
                    <span className="heading">Flight : {flight.flightName?flight.flightName:'( Select Flight )'}</span>
                <Filter type="F" callBack={getFlight}/>
                </div>
                <div className="F-content">
                  <div className="F-passengers" style={{width:'50%',margin:'0px'}}>
                  
                    {flight&&flight.flightName?<>
                        <span className="heading">Passenger Details :</span>
                        <Filter type="P" admin flightName={flight?flight.flightName:""} callBack={setFPassengers}/>
                        <PassengersList flight={flight} admin list={fPassengers} selected={(p)=>createFormData(p,true)} />
                        </>:null}
                    </div> 
                  <div className="a-passengers" >
                        
                      {flight&&flight.flightName?<>      
                      <span className="heading">Modify / Add Passenger :</span>
                      <button className="p-btn" onClick={()=>addNew()}>Add New</button>
                      <button className="r-btn" onClick={()=>setPassenger(null)}>Cancel</button>
                      </>:null}
                      
                      <div style={{padding:'10px'}}>
                      {passenger?<ReactiveForm fields={fields} callback={(p)=>savePassenger({...passenger,...p.data})} action={isAdd?"Add":"Save"}/>:null}
                      </div>
                  </div>
                </div>
                
            </div>
            // </div>

        )
    }
    PassengerDetails.propTypes={
        clearState:PropTypes.func.isRequired,
        addPassenger:PropTypes.func.isRequired,
        updatePassenger:PropTypes.func.isRequired
    }
    const mapActions=(dispatch)=>{
        return {
            ...bindActionCreators(actions,dispatch),
        }
    }
export default connect(()=>{return {}},mapActions)(PassengerDetails)