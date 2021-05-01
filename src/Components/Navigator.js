import React from 'react'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
// import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import {withRouter} from "react-router-dom"

import PropTypes from 'prop-types'
function Navigator({history}){
   

    return <div className="navigator">
        <span>
            <ArrowBackOutlinedIcon onClick={()=>history.goBack()}></ArrowBackOutlinedIcon>
        </span>
        {/* <span>
             <ArrowForwardOutlinedIcon onClick={()=>history.goForward()}></ArrowForwardOutlinedIcon>
        </span> */}
    </div>
}
Navigator.propTypes={
    history:PropTypes.any,
    cookies:PropTypes.any
}
export default withRouter(Navigator);