import React from "react"
import {shallow,mount} from "enzyme"
import {SeatMap} from "./SeatMap"
global.fetch = jest.fn(() =>
  Promise.resolve({json: () => Promise.resolve({ })}),
  Promise.reject({json: () => Promise.reject({ }),})
);   
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
it('rendering SearMap in InFlight',()=>{
    const wrapper=shallow(<SeatMap passengers={passengers} updatePassenger={()=>{}} mealPrefer/>)
    expect(wrapper).toMatchSnapshot()
})

it('rendering SearMap in checkIn',()=>{
    const wrapper=shallow(<SeatMap passengers={passengers} updatePassenger={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})

it('rendering SearMap For Admin',()=>{
    const wrapper=shallow(<SeatMap passengers={passengers} admin updatePassenger={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})

it('should distinguish checkedIn from UnChecked',()=>{
    
    const wrapper=shallow(<SeatMap passengers={passengers} updatePassenger={()=>{}} />)
    let checkedInpassengers=wrapper.find('.checkedin')
    expect(checkedInpassengers.length).toBe(2)

})

it('should display undo checkin button ',()=>{
    
    const wrapper=shallow(<SeatMap passengers={passengers} updatePassenger={()=>{}} />)
    let button=wrapper.find('.checkedin').first().find("button")
  
    expect(button.exists()).toEqual(true)
})

it('should not display checkin button Inflight',()=>{
    
    const wrapper=shallow(<SeatMap passengers={passengers} updatePassenger={()=>{}} mealPrefer/>)
    let button=wrapper.find('.checkedin').first().find("button")
  
    expect(button.exists()).toEqual(false)
})
it('click undo passenger check in',()=>{
    let updateAction=jest.fn()
    const wrapper=mount(<SeatMap passengers={passengers} updatePassenger={updateAction} />)
    wrapper.find('.checkedin').first().find("button").simulate('click')
    
    expect(updateAction).toBeCalled()
    expect(updateAction).toBeCalledWith({...passengers[1],isCheckedIn:!passengers[1].isCheckedIn})
})

it('Admin select first empty seat for new passengers',()=>{
    let select=jest.fn()
    let updateAction=jest.fn()
    const wrapper=mount(<SeatMap passengers={passengers} admin select={select} updatePassenger={updateAction} />)
    wrapper.find('.empty').first().simulate('click')
    
    expect(select).toBeCalled()
    expect(select).toBeCalledWith(1)
})

it('should  add heading in Inflight Seat Map',()=>{
    
    const wrapper=mount(<SeatMap passengers={passengers} updatePassenger={()=>{}} mealPrefer/>)
    
  
    expect(wrapper.find(".head").find('div').last()
        .find('#maptype').text()).toEqual('Passengers with Special meals preference')
})