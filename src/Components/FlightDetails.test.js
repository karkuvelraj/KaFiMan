import React from 'react'
import {mount, shallow} from 'enzyme'
import FlightDetails from './FlightDetails'
import data from '../../tools/db.json'

global.fetch = jest.fn(() =>
  Promise.resolve({json: () => Promise.resolve({ })}),
  Promise.reject({json: () => Promise.reject({ }),})
);
let props={
    flight:data.flights[0],
    save:jest.fn()
}

it('should match flight details ui in admin',()=>{
    let wrapper=shallow(<FlightDetails {...props} admin/>)
    expect(wrapper).toMatchSnapshot()
})

it('should call save callback on save button click',()=>{
    let wrapper=shallow(<FlightDetails {...props} admin/>)
    wrapper.find('#saveBtn').simulate('click')
    expect(props.save).toBeCalled()
})

it('should be able to delete services',()=>{
    let wrapper=mount(<FlightDetails {...props} admin/>)
    wrapper.find('svg').at(0)
        .simulate('click')
        wrapper.update()
    let services=wrapper.find('.innertable').at(0).find('tbody').find('tr')
    let initial=services.length
    // console.log(initial+"--"+wrapper.find('.innertable').at(0).find('tbody').html())
    expect(services.first().find('button').text()).toBe('Delete')
    services.first().find('button').simulate('click')
    wrapper.update()
    let afterDelete=wrapper.find('.innertable').at(0).find('tbody').find('tr').length
    // console.log(afterDelete+"=="+.html())
    expect(initial-1).toBe(afterDelete)
})