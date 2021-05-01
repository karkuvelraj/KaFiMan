import React from 'react'
import {mount} from 'enzyme'
import data from '../../tools/db.json'
import {Filter} from './Filter'
let defaultProps={
    type:'F',
    loadPassengersByFlightId:jest.fn(),
    callBack:jest.fn(),
    loadFlights:jest.fn(),
    flights:data.flights,
    passengers:data.passengers,
    flightName:'',
    inFlight:false,
    admin:false
}

it('should display all flight ',()=>{

    const filter=mount(<Filter {...defaultProps}/>)

    const flights=filter.find('.outertable').find('tbody').find('tr')
    
    expect(flights.length).toBe(2)
})

it('should be able to filter flights by name',()=>{

    const filter=mount(<Filter {...defaultProps}/>)
    const filterBtn=filter.find('.type').find('button')
    
    
    expect(filterBtn.text()).toBe('Filter')
    filterBtn.simulate('click')
    filter.update()
    filter.find('.type').find('[name="flightName"]')
    .simulate('change',{target:{checked:true,name:'flightName'}})
    filter.update()
    filter.find('.value').find('[name="flightNameVal"]')
        .simulate('change',{target:{value:'M10F30',name:'flightNameVal'}})
    filter.update()

    const flights=filter.find('.outertable').find('tbody').find('tr')
    expect(flights.length).toBe(1)
    const name=filter.find('.outertable').find('tbody').find('tr').find('td').at(0).text()
    expect(' M10F30 ').toBe(name)
})

it('should be able to filter flights by Schedule Date',()=>{

    let flight=data.flights[0]

    const filter=mount(<Filter {...defaultProps}/>)
    const filterBtn=filter.find('.type').find('button')
    expect(filterBtn.text()).toBe('Filter')
    filterBtn.simulate('click')
    filter.update()
    filter.find('.type').find('[name="date"]')
    .simulate('change',{target:{checked:true,name:'date'}})
    filter.update()
    filter.find('.value').find('[name="dateVal"]')
        .simulate('change',{target:{value:flight.date,name:'dateVal'}})
    filter.update()

    const flights=filter.find('.outertable').find('tbody').find('tr')
    expect(flights.length).toBe(1)
    const name=filter.find('.outertable').find('tbody').find('tr').find('td').at(0).text()
    expect(` ${flight.flightName} `).toBe(name)
})

it('should be able to filter Passengers by Checked in',()=>{

    let flight=data.flights[0]
    let fPass=data.passengers.filter(x=>(x.isCheckedIn)&&x.flightNo==flight.flightName)
    const filter=mount(<Filter  {...defaultProps} type="P" flightName={flight.flightName}/>)

    filter.find('.type').find('[name="checkedIn"]')
        .simulate('change',{target:{checked:true,name:'checkedIn'}})
    filter.update()

    expect(defaultProps.callBack).toHaveBeenNthCalledWith(2,fPass)
    expect(defaultProps.callBack).toHaveBeenCalledTimes(2)
   
})