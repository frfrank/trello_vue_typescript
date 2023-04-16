import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import SimpleSelect from '@/components/common/SimpleSelect.vue'

describe('SimpleSelect', () => {
  let wrapper: any
  const options = [
    { key: 1, value: 'One' },
    { key: 2, value: 'Two' },
    { key: 3, value: 'Three' },
  ]
  const name = 'test-select-name'

  it('Cuando se pinta el select', () => {
    wrapper = mount(SimpleSelect, {
      props: { name, options },
    })

    const input = wrapper.find('input')
    const optionsList = wrapper.find('ul')

    expect(input.exists()).toBe(true)
    expect(optionsList.exists()).toBe(false)
  })

  it('Cuando se carga con un valor seleccionado', async () => {
    wrapper = mount(SimpleSelect, {
      props: { name, options, value: options[0].key },
    })

    await wrapper.vm.$nextTick()
    const input = wrapper.find('input')
    expect(input.element.value).toBe(options[0].value)
  })

  it('Cuando se escribe un valor que muestre solo las coincidencias', async () => {
    wrapper = mount(SimpleSelect, {
      props: { name, options },
    })

    const input = wrapper.find('input')
    await input.setValue('on')

    const optionsList = wrapper.find('ul')
    expect(optionsList.exists()).toBe(true)
    expect(optionsList.findAll('li').length).toBe(1)
    const valueHtml = '<strong>On</strong>e'
    const coincidence = optionsList.find('li')
    expect(coincidence.element.innerHTML).toBe(valueHtml)
  })

  it('Cuando se escribe un valor y se pincha la primera opción', async () => {
    wrapper = mount(SimpleSelect, {
      props: { name, options },
    })

    const input = wrapper.find('input')
    await input.setValue('on')
    const optionsList = wrapper.find('ul')
    optionsList.find('li').trigger('click')

    expect(optionsList.exists()).toBe(true)
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toBe(1)
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe(options[0].value)
  })

  it('Cuando se escribe un valor, se baja con flechas hasta la segunda opción y se selecciona', async () => {
    wrapper = mount(SimpleSelect, {
      props: { name, options },
    })

    Element.prototype.scrollIntoView = vi.fn()

    const input = wrapper.find('input')
    await input.setValue('o')
    input.trigger('keydown', { code: 'ArrowDown' })
    input.trigger('keydown', { code: 'ArrowDown' })
    input.trigger('keydown', { code: 'Enter' })

    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toBe(2)
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe(options[1].value)
  })
})
