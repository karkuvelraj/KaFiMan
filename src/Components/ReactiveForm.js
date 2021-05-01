import React ,{Component}from "react"
import PropTypes from "prop-types"
import {patterns} from "../utils/patterns"
import {  Modal } from "@material-ui/core"
import {default as SeatMap } from "./SeatMap"
import AddBoxIcon from '@material-ui/icons/AddBox';
import { toast } from 'react-toastify';
class ReactiveForm extends Component{

    constructor(props){
        super(props)
        this.state={
             data:this.props.fields.reduce((r,obj)=>{r[obj.id]=obj.value;return r},{}),
             error:{}
                 }
    }
     errDesc={
        mandatory:' is Mandatory',
        email: ' is not a valid email',
        name: ' should not have numbers or special chatacters',
        number: ' is numeric'
    }
   
    handleChange=(event)=>{
        let {type,name,value,required}=event.target
        let err=[]
        const field =this.props.fields.find(x=>x.id==name)
        if(required && !value)err.push(field.name+this.errDesc['mandatory'])
        if(type=='text'&&field.format&&!patterns[field.format].test(value)){
           err.push(field.name+this.errDesc[field.format])
        //    console.log(field.name+this.errDesc[field.format])
        }
        // console.log(err)
        this.setState((prev)=>{
            return {
                data:{
                ...prev.data,
                [name]:value
            },   error:{
                ...prev.error,
                [name]:err
            }
        }
        })
        
    }
    selectModalVal=(value,name)=>{
        this.setState((prev)=>{
            return {
                ...prev,
                data:{
                ...prev.data,
                [name]:value
            }
        }
        })
        this.modalOpenClose('')
    }
    componentDidUpdate(prevProps){

        if(this.props.fields!=prevProps.fields){
            this.setState({
                data:this.props.fields.reduce((r,obj)=>{r[obj.id]=obj.value;return r},{}),
                error:{}
                })
        }
    }
    modalOpenClose=(name)=>{
        this.setState((p)=>{
        return {...p,open:name}
    })}
    checkFields=(event)=>{
        event.preventDefault()
        let flag='';
        this.props.fields.forEach(f => {
         if((this.state.error[f.id]&&this.state.error[f.id].length>0)||
             (!this.state.data[f.id]&&f.required))
         flag=f.placeholder
        });
        if(!flag)
        this.props.callback(this.state)
        else
         toast(`${flag} is a Mandatory Field`)
     }
    render(){
        let Modbody=null
        let {fields,action,formId}=this.props
        let result=fields.map((f,fi)=>{
        
        if(f.icon=='map')
            Modbody=<Modal style={{width:'50%',height:'50%',top:'10%',left:'30%'}}  onClose={()=>this.modalOpenClose('')} open={this.state.open=='map'}>
                <div className="F-map"style={{width:'100%'}} ><SeatMap admin select={(v)=>this.selectModalVal(v,f.name)}/></div></Modal>

        if(f.type=='text' || f.type=='checkbox' || f.type=='password' || f.type=='date'){
            return (<li key={'f'+fi}>
                    <label htmlFor={f.id}> {f.name}</label>
                    <input {...f} name={f.id} value={this.state.data[f.id]}  onChange={this.handleChange}/>
                    {f.icon?<AddBoxIcon style={{cursor:'pointer'}} onClick={()=>this.modalOpenClose(f.icon)}></AddBoxIcon>:null}
                </li>)
        }
        else if(f.type=='radio')
            {
            return (<li key={'f'+fi}><p>{f.name}</p><ul className="flex-inner">{
                f.radios.map((r,i)=>{
                    return ( <li key={'f'+fi+'-'+i}>
                        <input type="radio"  name={f.id} id={r.id} value={r.value}
                         checked={this.state.data[f.id]==r.value} onChange={this.handleChange} /> 
                         <label htmlFor={r.id} >{r.name}</label>
                         </li>)
                })
            }</ul></li>)
            }
        
    });

    return (
        <form id={formId} onSubmit={this.checkFields} autoComplete="off">
            <ul className="flex-outer">
            {result}
            {this.props.fields.map(x=>{
                if(this.state.error[x.id]){
                   return this.state.error[x.id].map((e,i)=>{
                        return <div className="error" key={i}>{e}</div>
                    })
                }
                return null;
            })}
            <li>  <button type="submit">{action}</button></li>
            </ul>
            {Modbody}
        </form>
        )
    }
    
}
ReactiveForm.propTypes={
    fields:PropTypes.array.isRequired,callback:PropTypes.func.isRequired,action:PropTypes.string.isRequired,
    formId:PropTypes.any
}

export default ReactiveForm