import React, { useEffect, useState }  from "react"
import {default as Filter} from "../Components/Filter"
import FlightDetails from "../Components/FlightDetails"
import  {default as PassengersList }from "../Components/PassengersList"
import {default as SeatMap} from "../Components/SeatMap"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Navigator from '../Components/Navigator'
import * as passengerActions from "../redux/actions/passengerActions";
import { bindActionCreators } from "redux";
function FlightPage (props){

    // const [isFilter,setFilter]=useState(false)
    const [flight,setFlight]=useState({})
    const [fPassengers,setFPassengers]=useState([])

    const getFlight=(data)=>{
        setFlight(data)
        // setFilter(false)
    }
    useEffect(()=>{
        return ()=> {
            props.clearState()
        }
    },[])
    
        return (
            <div className="F-parent">
               <Navigator/>
                <div className="F-filter">
                <span className="heading">Flight CheckIn: {flight.flightName?flight.flightName:'( Select Flight )'}</span>
                  <Filter type="F" callBack={getFlight}/>
                </div>
                <div className="F-content">
                     {/* <div className="F-detail"> */}
                        <FlightDetails flight={flight} />
                    {/* </div>  */}
                    <div className="F-passengers" style={{width:'47%'}}>
                    
                    {flight&&flight.flightName?<>
                        <div className="passengerHead">
                        <span className="heading">Passenger Details:</span>
                        <Filter type="P" flightName={flight?flight.flightName:""} callBack={setFPassengers}/>
                        </div>
                        <PassengersList flight={flight} list={fPassengers} />
                        </>:null}
                    </div> 
                    <div className="F-map" >
                    {flight&&flight.flightName? <SeatMap />:null}
                    </div>
                </div>
             
            </div>
        )
    }
    FlightPage.propTypes={
        clearState:PropTypes.func.isRequired
    }

    const mapActions=(dispatch)=>{
        return {
            ...bindActionCreators(passengerActions,dispatch),
        }
    }
export default connect(()=>{return {}},mapActions)(FlightPage)