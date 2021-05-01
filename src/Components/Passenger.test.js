import React from 'react'
import {mount, shallow} from 'enzyme'
import Passenger from './Passenger'
import data from '../../tools/db.json'
let passenger= {
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
    services: [1,2],
    mealPrefer: "",
    shopItems: [2,1,4]
  }
  let props={
    onClose:jest.fn(),
    save:jest.fn(),
    open:true,
    passenger:passenger,
     state:load()
  }
  function load (){
    return {
        shopItemsMap:data.shopItems.reduce((a,b)=>{ a[b.id]=b;return a},{}),
        specialMealsMap:data.specialMeals.reduce((a,b)=>{ a[b.id]=b;return a},{}),
        servicesMap:data.services.reduce((a,b)=>{ a[b.id]=b;return a},{})
    }
    
  }

it('should be opening modal and display passenger',()=>{
    const passengerModal=shallow(<Passenger {...props}/>)
    expect(passengerModal).toMatchSnapshot()
})

it('should display all enabled services of passenger ',()=>{
    const passengerModal=shallow(<Passenger {...props}/>)
    let tbody=passengerModal.find('.innertable').at(0).find('tbody')
    expect(tbody.find('tr').length).toBe(2)
})
it('should display all enabled Shop Items of passenger ',()=>{
    const passengerModal=shallow(<Passenger {...props}/>)
    let tbody=passengerModal.find('.innertable').at(2).find('tbody')
    expect(tbody.find('tr').length).toBe(3)
})

it('should display no meals if no special meals prefered ',()=>{
    const passengerModal=shallow(<Passenger {...props}/>)
    let tbody=passengerModal.find('.innertable').at(1).find('tbody')
    expect(tbody.find('tr').first().find('td').text()).toBe('No Meals Preference')
})

it('should display Meal name of meal prefered by passenger',()=>{
    props.passenger.mealPrefer='BBML'
    const name="INFANT/BABY FOOD"
    const passengerModal=shallow(<Passenger {...props}/>)
    let tbody=passengerModal.find('.innertable').at(1).find('tbody')
    expect(tbody.find('tr').first().find('td').text()).toBe(name)
})

it('should close modal on clicking close button',()=>{
  
    const passengerModal=shallow(<Passenger {...props}/>)
 
    const close=passengerModal.find('#modalClose')
    expect(close.text()).toBe('Close')
    close.simulate('click')
    expect(props.onClose).toBeCalledWith(false)
})


it('should be able to add service ',()=>{

    const passengerModal=mount(<Passenger {...props}/>)
    const table=passengerModal.find('.innertable').at(0);
    let thead=table.find('thead')
    const button=thead.find('tr').first().find('th').at(1).find('button')
    expect(button.text()).toBe('Add')
    button.simulate('click')
    passengerModal.update()
    
    passengerModal.find('select').simulate('change',{target:{value:"3"}})
    passengerModal.update()
    console.log(table.find('tbody').html())
    expect(passengerModal.find('.innertable').at(0)
        .find('tbody').find('tr').getElements().length).toBe(3)
})