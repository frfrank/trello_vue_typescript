import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import RadioChoice from '@/components/common/RadioChoices.vue'

describe('RadioChoice', () => {
  it('Cuando se pinta el radio button', () => {
    const name = 'test-radio'
    const label = 'Test label'
    const options = [
      { key: 1, value: 'Test label' },
      { key: 2, value: 'Test label 2' },
      { key: 3, value: 'Test label 3' },
    ]

    const wrapper = mount(RadioChoice, {
      props: { name, label, options },
    })

    const radioInput = wrapper.findAll('input[type="radio"]')
    expect(radioInput.length).toBe(options.length)
  })

  it('Cuando se pinta el radio button con una opcion seleccionada', () => {
    const name = 'test-radio'
    const value = 1
    const label = 'Test label'
    const options = [
      { key: 1, value: 'Test label' },
      { key: 2, value: 'Test label 2' },
      { key: 3, value: 'Test label 3' },
    ]

    const wrapper = mount(RadioChoice, {
      props: { name, label, value, options },
    })

    const radioInput = wrapper.findAll('input[type="radio"]')
    expect(radioInput.length).toBe(options.length)
    expect((radioInput[0].element as HTMLInputElement).checked).toBeTruthy()
  })

  it('Cuando se selecciona el radio button', async () => {
    const name = 'test-radio'
    const label = 'Test label'
    const options = [
      { key: 1, value: 'Test label' },
      { key: 2, value: 'Test label 2' },
      { key: 3, value: 'Test label 3' },
    ]
    const wrapper = mount(RadioChoice, {
      props: { name, label, options },
    })

    const newValue = options[0].key
    const radioInput = wrapper.find('input[type="radio"]')
    await radioInput.setValue(newValue)

    expect((radioInput.element as HTMLInputElement).checked).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toStrictEqual(newValue)
  })
})
