import React from "react"
import {withRouter} from "react-router-dom"
import {withCookies} from "react-cookie"
import logo from "../logo.png"
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip';
function Header({history,cookies}){

    const logout=()=>{
        cookies.remove('user',{path:'/'})
        cookies.remove('isLogged',{path:'/'})
        cookies.remove("isFb",{path:'/'})
        history.push("/")
        toast('Logged out successfully')
    }
    let isLogged=cookies.get('isLogged')=='true'
    let goHome=()=>{
        if(cookies.get('isLogged')=='true'){
            let role=cookies.get('role')
            if(role)
            if(role=='admin')
                history.push('/dashboard')
            else
                history.push('/home')
        }
    }
    return (
     <header className="top">
       <Tooltip title='Home'>
        <img src={logo} alt="Company logo" onClick={goHome}/>
        </Tooltip>
       {isLogged?<button className="s-btn" onClick={logout}>Logout</button>:null} 

    </header>
    )
}
Header.propTypes={
    history:PropTypes.any,
    cookies:PropTypes.any
}
export default withRouter(withCookies(Header))