import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseSelect from '@/components/base/BaseSelect.vue'

describe('BaseSelect', () => {
  let wrapper: any
  const placeholder = 'Select an option'
  const options = [
    { key: 1, value: 'One' },
    { key: 2, value: 'Two' },
    { key: 3, value: 'Three' },
  ]
  const name = 'test-select-name'

  it('Cuando se pinta el select', () => {
    wrapper = mount(BaseSelect, {
      props: { name, options, placeholder },
      global: {
        stubs: ['Icon'],
      },
    })

    const input = wrapper.find('input')
    const optionsList = wrapper.find('ul')

    expect(input.exists()).toBeTruthy()
    expect(optionsList.exists()).toBeFalsy()
  })

  it('Cuando se carga con un valor seleccionado', async () => {
    wrapper = mount(BaseSelect, {
      props: { name, options, value: options[0].key, placeholder },
      global: {
        stubs: ['Icon'],
      },
    })

    await wrapper.vm.$nextTick()
    const input = wrapper.find('input')
    expect(input.element.value).toBe(options[0].value)
  })

  it('Cuando se pincha para ver las opciones', async () => {
    wrapper = mount(BaseSelect, {
      props: { name, options, placeholder },
      global: {
        stubs: ['Icon'],
      },
    })

    const selected = wrapper.find('[data-test-id="option-selected"]')
    await selected.trigger('click')

    const optionsList = wrapper.find('ul')
    expect(optionsList.exists()).toBeTruthy()
  })

  it('Cuando se pincha en una opcion', async () => {
    wrapper = mount(BaseSelect, {
      props: { name, options },
      global: {
        stubs: ['Icon'],
      },
    })

    const selected = wrapper.find('[data-test-id="option-selected"]')
    const input = wrapper.find('input')
    await selected.trigger('click')
    const optionsList = wrapper.find('ul')
    const option = optionsList.find('li')
    await option.trigger('click')
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toBe(options[0].key)
    expect(input.element.value).toBe(options[0].value)
  })
})
