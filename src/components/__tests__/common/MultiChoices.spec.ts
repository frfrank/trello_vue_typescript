import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import MultiChoice from '@/components/common/MultiChoices.vue'

describe('MultiChoice', () => {
  it('Cuando se pinta el multi choice', () => {
    const name = 'test-multi'
    const label = 'Test label'
    const options = [
      { key: 1, value: 'Test label' },
      { key: 2, value: 'Test label 2' },
      { key: 3, value: 'Test label 3' },
    ]

    const wrapper = mount(MultiChoice, {
      props: { name, label, options },
    })

    const checkboxInput = wrapper.findAll('input[type="checkbox"]')
    expect(checkboxInput.length).toBe(options.length)
  })

  it('Cuando se pinta el multi choice con una opcion seleccionada', () => {
    const name = 'test-multi'
    const label = 'Test label'
    const options = [
      { key: 1, value: 'Test label' },
      { key: 2, value: 'Test label 2' },
      { key: 3, value: 'Test label 3' },
    ]
    const value = [options[0].key]

    const wrapper = mount(MultiChoice, {
      props: { name, label, value, options },
    })

    const checkboxInput = wrapper.findAll('input[type="checkbox"]')
    expect(checkboxInput.length).toBe(options.length)
    expect((checkboxInput[0].element as HTMLInputElement).checked).toBeTruthy()
  })

  it('Cuando se selecciona el multi choice', async () => {
    const name = 'test-multi'
    const label = 'Test label'
    const options = [
      { key: 1, value: 'Test label' },
      { key: 2, value: 'Test label 2' },
      { key: 3, value: 'Test label 3' },
    ]
    const wrapper = mount(MultiChoice, {
      props: { name, label, options },
    })

    const newValue = options[0].key
    const checkboxInput = wrapper.find('input[type="checkbox"]')
    await checkboxInput.setValue(newValue)

    expect((checkboxInput.element as HTMLInputElement).checked).toBeTruthy()
  })
})
