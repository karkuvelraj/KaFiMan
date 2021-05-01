import React ,{Component}from "react"
import {withRouter} from "react-router-dom"
import passengerImg from "../passenger.jpg"
import servicesImg from "../services.jpg"
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import guard from '../HOC/routeGuard'
class Dashboard  extends Component{
    navigate=(path)=>{
        this.props.history.push(path)
    }
    render(){
        return (

            <div className="m-right">
                    <div className="homepage">
                        <div className="welcome">Welcome {this.props.user.name}</div>
                        <div className="counts">
                            <div onClick={()=>this.navigate("/dashboard/passengers")}>
                            <img src={passengerImg} alt="passengers"/>
                            Passengers </div>
                            <div onClick={()=>this.navigate("/dashboard/ancillaryservices")}>
                            <img src={servicesImg} alt="services"/>
                            Ancillary services</div>
                        </div>
                    </div>
                    </div>
			// <div className="m-right">
            //         <div className='options'
            //          onClick={()=>this.navigate("/dashboard/passengers")}>
            //            <img src={passengerImg} alt="passengers"/>
            //              </div>
               
            //         <div className='options' 
            //         onClick={()=>this.navigate("/dashboard/ancillaryservices")}>
            //                <img src={servicesImg} alt="services"/>
            //            </div>
             
			// </div>

           )
    }
}

Dashboard.propTypes={
    history:PropTypes.any,
    user:PropTypes.any
}

export default connect((state)=>{return {user:state.user}})(withRouter(guard(Dashboard)));