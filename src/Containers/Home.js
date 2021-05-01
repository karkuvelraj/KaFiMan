import React ,{Component}from "react"
import {connect } from "react-redux"
import {Route, Switch,withRouter } from "react-router-dom"
import PropTypes from "prop-types"

const Flight = React.lazy(()=>import( "./FlightPage"))
const InFlightPage =React.lazy(()=>import( "./InFlightPage"))
import * as flightApi from "../api/flightApi"
import * as passengerApi from "../api/passengerApi"
import guard from "../HOC/routeGuard"
import inflight from "../in-flight.jpg"
import checkin from "../checkin.jpg"
class Home  extends Component{
    
    state={
        flights:0,
        passengers:0
    }

    componentDidMount(){
        let counts={}
        Promise.all([
            flightApi.getAll().then(res=>{
                if(res)
                counts.flights=res.length
            }),
            passengerApi.getAll().then(res=>{
                if(res)
                counts.passengers=res.length
            }),
        ]).then(()=>{
            this.setState(counts)
        })
       
    }
    navigate=(path)=>{
        this.props.history.push(path)
    }
    render(){
        return (
        <>

                <Switch>

                <Route path="/home" exact>
                <div className="m-right">
                    <div className="homepage">
                        <div className="welcome">Welcome {this.props.user.name}</div>
                        <div className="counts">
                            <div onClick={()=>this.navigate("/home/in-flight/flight-map")}>
                                <img src={inflight} />
                                In-Flight </div>
                            <div onClick={()=>this.navigate("/home/check-in/flight-map")}>
                                 <img src={checkin} />  
                                Flight Checkin</div>
                        </div>
                    </div>
                    </div>
                </Route>
                <Route path="/home/check-in/flight-map"><Flight/></Route>
                <Route path="/home/in-flight/flight-map"><InFlightPage /></Route>
                
                </Switch>
				
			

     </>   )
    }
}
Home.propTypes={
    user:PropTypes.object.isRequired,
    history:PropTypes.any
}

export default connect((state)=>{return {user:state.user}})(withRouter(guard(Home)));