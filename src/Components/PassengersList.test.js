import React from 'react'
import {mount, shallow} from 'enzyme'
import {PassengersList} from './PassengersList'

let passengers=[
    {
        id:"ASD1000",
        name: "Vimal raja",
        dob: "1996-04-05",
        passportNo: "ASD1000",
        seatNo: "4",
        flightNo:"F10W10",
        address: "",
        isCheckedIn: true,
        isWheelChair: false,
        isInfant: false,
        services: [1,2,4],
        mealPrefer: "",
        shopItems: [2,1,4]
      },
      {
        id:"FDD1888",
        name: "Arun raja",
        dob: "",
        passportNo: "FDD1888",
        seatNo: "3",
        flightNo:"F10W10",
        address: "51,1st street,chennai",
        isCheckedIn: true,
        isWheelChair: false,
        isInfant: false,
        services: [1,2,4],
        mealPrefer: "BLML",
        shopItems: [2,1,4]
      }
]
let flight= {
    "id": "F10W10",
    "flightName": "F10W10",
    "time": "02:04",
    "date": "2021-04-05",
    "services": [
      3,
      4,
      5
    ],
    "specialMeals": [
      "DBML",
      "FPML",
      "GFML",
      "HNML",
      "JPML",
      "KSML",
      "LCML",
      "LFML"
    ],
    "shopItems": [
      2,
      3,
      4
    ],
    "from": "Chennai",
    "to": "California"
  }

it('should display passenger list with name ancillary services',()=>{
    const wrapper=shallow(<PassengersList flight={flight} list={passengers} passengers={passengers} updatePassenger={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})

it('should display change seat button for checkin',()=>{

    const wrapper=shallow(<PassengersList flight={flight} list={passengers} passengers={passengers} updatePassenger={()=>{}}/>)
    
    let button=wrapper.find('.outertable').first().find('tbody').first().find('button')
    expect(button.exists()).toBeTruthy()
})
it('should not display change seat button for Inflight',()=>{

    const wrapper=shallow(<PassengersList inFlight flight={flight} list={passengers} passengers={passengers} updatePassenger={()=>{}}/>)
    
    let button=wrapper.find('.outertable').first().find('tbody').first().find('button')
    expect(button.exists()).toBe(false)
})

it('should not display available seats on clicking change button',()=>{

    const wrapper=mount(<PassengersList  flight={flight} list={passengers} passengers={passengers} updatePassenger={()=>{}}/>)
    let tbody=wrapper.find('.outertable').first().find('tbody').first()
    let button=tbody.find('button')
    button.simulate('click')
    wrapper.update()
    
    expect(wrapper.find('select').exists()).toBeTruthy()
})

it('should be able to change seat by selecting seat no',()=>{

    const updatePassenger=jest.fn()
    const wrapper=mount(<PassengersList  flight={flight} list={passengers} passengers={passengers} updatePassenger={updatePassenger}/>)
    let tbody=wrapper.find('.outertable').first().find('tbody').first()
    let button=tbody.find('button')
    button.simulate('click')
    wrapper.update()
    wrapper.find('select').simulate('change',{target:{value:'5'}})
    expect(updatePassenger).toBeCalledWith({...passengers[0],seatNo:'5'})
})

it('should return selected passenger in admin page',()=>{

    const selected=jest.fn()
    const wrapper=shallow(<PassengersList admin selected={selected} flight={flight} list={passengers} passengers={passengers} updatePassenger={()=>{}}/>)
    let thead=wrapper.find('.outertable').first().find('thead').first()
    let edit=thead.find('button')
    edit.simulate('click')
    
    expect(selected).toBeCalledWith(passengers[0])
})
