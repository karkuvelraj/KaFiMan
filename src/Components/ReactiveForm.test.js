import React from "react"
import {shallow} from "enzyme"
import ReactiveForm from './ReactiveForm'
import AddBoxIcon from '@material-ui/icons/AddBox';
let formFields=[
   {
        name:"dob" , type:"date",value:"",placeholder:"Date of birth" ,id:"dob"
    },{
        name:"passportNo" , type:"text",maxLength:10 ,value:"",placeholder:"Passport No" ,id:"passportNo", 
    },{
        name:"seatNo" , type:"text",maxLength:30 ,value:"",placeholder:"Seat No" ,id:"seatNo",readOnly:true,
        icon:'map'
    },{
        name:"flightNo" , type:"text",maxLength:30 ,value:"",placeholder:"Flight No" ,id:"flightNo", readOnly:true
    },{
        name:"Email Id" , type:"text",minLength:5,maxLength:40 ,value:"",placeholder:"Enter Email Id" ,id:"email",format:'email'
    }]

describe('check snapshot of form',()=>{
    it('four fields , one field with icon and one fields disabled',()=>{
        let callback=jest.fn();
        let label="save"
        let form=shallow(<ReactiveForm callback={callback} fields={formFields} action={label}/>)
        expect(form).toMatchSnapshot()
    })
})

describe('check form data changes',()=>{
  
    it('check button label from props',()=>{
        let callback=jest.fn();
        let label="save"
        let form=shallow(<ReactiveForm callback={callback} fields={formFields} action={label}/>)

        expect(form.find('button').text()).toBe(label)
    })
    it('should display icon end of input field ',()=>{
        let callback=jest.fn();
        let label="save"
        let form=shallow(<ReactiveForm callback={callback} fields={formFields} action={label}/>)

        expect(form.find(AddBoxIcon).exists()).toBeTruthy()
    })

    it('should display date field as first ',()=>{
        let callback=jest.fn();
        let label="save"
        let form=shallow(<ReactiveForm callback={callback} fields={formFields} action={label}/>)
        // console.log(form.html())
        expect(form.find('[type="date"]').length).toBe(1)
    })
        
    it('should call callback  on submit if no error',()=>{
        let callback=jest.fn();
        let label="save"
       
        let form=shallow(<ReactiveForm callback={callback} fields={formFields} action={label}/>)

        form.simulate('submit',{ target: {},preventDefault:jest.fn() })
        expect(callback).toBeCalled()
    })

    it('should display error on in valid email ',()=>{
        let callback=jest.fn();
        let label="save"

        let form=shallow(<ReactiveForm callback={callback} fields={formFields} action={label}/>)
 
        form.find('[id="email"]').simulate('change',{ target: {type:'text',name:'email',value:'fghfghj'} })
        
        expect(form.state().error['email'][0]).toBe('Email Id is not a valid email')
    })
})