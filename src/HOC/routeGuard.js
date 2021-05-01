import React from "react"
import {withCookies} from "react-cookie"
import { Redirect } from "react-router"
import PropTypes from 'prop-types'
function guard(WrappedComponent){

     class RouteGuard extends React.Component{

        render(){
            let isLogged=this.props.cookies.get('isLogged')
            let comp=<Redirect to="/" />
            if(isLogged=='true'){
                comp=<WrappedComponent {...this.props}/>
            }
            return comp
        }
    }
    RouteGuard.propTypes={
        cookies:PropTypes.any
    }
    return withCookies(RouteGuard)
}

export default guard;