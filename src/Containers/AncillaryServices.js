import React, { useEffect, useState }  from "react"
import  {default as Filter} from "../Components/Filter"
import FlightDetails from "../Components/FlightDetails"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import { toast } from 'react-toastify';
import Navigator from '../Components/Navigator'
import { bindActionCreators } from "redux";
import * as flightActions  from "../redux/actions/flightActions";
import * as passengerActions from "../redux/actions/passengerActions";
function FlightPage (props){

    const [flight,setFlight]=useState({})

    const getFlight=(data)=>{
        setFlight({...data})
    }
    useEffect(()=>{
        return ()=> {
            props.clearState()
        }
    },[])
    const saveFlight=(data)=>{
        props.updateFlight(data)
        toast("Flight services changed successfully")
    }
        return (
			// <div className="m-right">
            <div className="F-parent">
                <Navigator/>
                {<>
                <div className="F-filter">
                <span className="heading">Flight : {flight.flightName?flight.flightName:' ( Select Flight )'}</span>
                <Filter type="F" callBack={getFlight}/>
                </div>
                <div className="F-content">
                     <div className="F-detail">
                    {flight.flightName?<span className="heading" style={{boxShadow: '-1px 5px 10px 1px black'}}>Flight Details</span>:null} 
                        <FlightDetails admin flight={flight} save={saveFlight}/>
                    </div> 
                </div>
                </>
                }
            </div>
            // </div>

        )
    }
    FlightPage.propTypes={
        updateFlight:PropTypes.func,
        clearState:PropTypes.func,
    }
const mapActions=(dispatch)=>{
        return {
            ...bindActionCreators(passengerActions,dispatch),
            ...bindActionCreators(flightActions,dispatch)
        }
    }
export default connect(()=>{return {}},mapActions)(FlightPage)