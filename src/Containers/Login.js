import React , {Component} from "react"
import Form from "../Components/ReactiveForm"
import {withRouter} from "react-router-dom"
import PropTypes from "prop-types"
import { toast } from 'react-toastify';
import FacebookLogin from "react-facebook-login"
import {withCookies} from "react-cookie";
import { connect } from "react-redux"
import {bindActionCreators} from "redux"
import * as userActions from "../redux/actions/userActions"
class Login extends Component {

    constructor(){
        super()
        this.state={
            
            fields:[
                {
                    name:"Email Id" , type:"text",minLength:5,maxLength:40 ,value:"",placeholder:"Enter Email Id" ,id:"email",format:'email', required:true
                },
                {
                    name:"Password" , type:"password" ,value:"",placeholder:"Enter Password" ,id:"password",required:true
                }
            ]
            ,
            user:{}
        }
    }
    componentDidMount(){
        this.checkLoggedIn()

    }
    statusChangeCallback=(data)=>{

        if(data.accessToken){
            this.setState(prev=>{return {...prev,user:data}})
             this.props.cookies.set('user', data, {path: "/"});
             localStorage.setItem('email', data.email);
            this.props.cookies.set("isFb", true, {path: "/"});
            this.props.cookies.set("isLogged", true, {path: "/"});
            this.loadUserCall()
            toast("Logged in successfully")

        }
       
    }
    
    checkLoggedIn(){
        let logged=this.props.cookies.get("isLogged",{path: "/"})
        if(logged=='true'){
            this.loadUserCall()
        }
       
    }
    loadUserCall(){
        let user=this.state.user
        let email=user.email
        email=email?email:localStorage.getItem('email')
        if(user&&email)
        this.props.loadUserCall(email).then((data)=>{
            this.props.cookies.set('user',{...user,...data},{path:'/'})
            this.props.cookies.set('role',data.role),{path:'/'}
            if(data.role=='admin')
                this.props.history.push("/dashboard")
            if(data.role=='staff')
                this.props.history.push("/home")
        })
    }
    
    loginCallback=({data})=>{
        event.preventDefault()
        
        this.props.loadUserCall(data.email).then(res=>{
            if(res&&res.password==data.password){
                this.props.cookies.set("isFb", false, {path: "/"});
                this.props.cookies.set("isLogged", true, {path: "/"});
                this.props.cookies.set("user", data, {path: "/"});
                if(res.role=='admin')
                this.props.history.push("/dashboard")
                 if(res.role=='staff')
                this.props.history.push("/home")
                toast("Logged in successfully")
            }else{
                toast("Invalid Email/Password.")
            }
        })        
    }

    render(){
        
        return (
            <div className="login">
            <Form fields={this.state.fields} callback={this.loginCallback} formId="login" action="Login"/>
            {/* <div id="fb_button" className="flex-inner" style={{padding:"20px"}}> */}
            <FacebookLogin
            appId="134175185319733"
            autoLoad={false}
            fields="name,email,picture"
            cssClass="loginBtn loginBtn--facebook"
            callback={this.statusChangeCallback} />
            {/* </div> */}
            </div>
            )
    }
}
Login.propTypes={
    history:PropTypes.any,
    cookies:PropTypes.any,
    loadUserCall:PropTypes.func.isRequired
}
const mapStatetoProps=(state)=>{
return { user:state.user}
}
const mapDispatchToProps=(dispatch)=>{
    return {...bindActionCreators(userActions,dispatch)}
}
export default connect(mapStatetoProps,mapDispatchToProps)(withRouter(withCookies(Login)));

