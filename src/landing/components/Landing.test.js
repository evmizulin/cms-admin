import React from 'react'
import { App } from 'src/App'
import { mount } from 'enzyme'
// import pretty from 'pretty'

describe('Langing page', () => {
  it('Renders without crashing', () => {
    const wrapper = mount(<App url="/" />)
    const page = wrapper.find('*[data-test="page-landing"]')
    expect(page.length).toBe(1)
  })

  it('Click on signin button', () => {
    const wrapper = mount(<App url="/" />)
    const signinButton = wrapper.find('*[data-test="page-landing__button-signin"]')
    signinButton.simulate('click', { button: 0 })
    expect(wrapper.find('*[data-test="page-signin"]').length).toBe(1)
    expect(wrapper.find('*[data-test="page-landing"]').length).toBe(0)
  })

  it('Click on signup button', () => {
    const wrapper = mount(<App url="/" />)
    const signupButton = wrapper.find('*[data-test="page-landing__button-signup"]')
    signupButton.simulate('click', { button: 0 })
    expect(wrapper.find('*[data-test="page-signup"]').length).toBe(1)
    expect(wrapper.find('*[data-test="page-landing"]').length).toBe(0)
  })
})
