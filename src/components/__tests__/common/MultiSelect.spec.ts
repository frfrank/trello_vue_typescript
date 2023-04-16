import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import MultiSelect from '@/components/common/MultiSelect.vue'

describe('MultiSelect', () => {
  let wrapper: any
  const options = [
    { key: 1, value: 'One' },
    { key: 2, value: 'Two' },
    { key: 3, value: 'Three' },
  ]
  const name = 'test-select-name'

  it('Cuando se pinta el select', () => {
    wrapper = mount(MultiSelect, {
      props: { name, options },
      global: {
        stubs: ['Icon'],
      },
    })

    const input = wrapper.find('input')
    const optionsList = wrapper.find('ul')

    expect(input.exists()).toBe(true)
    expect(optionsList.exists()).toBe(false)
  })

  it('Cuando se carga con un valor seleccionado', async () => {
    wrapper = mount(MultiSelect, {
      props: { name, options, value: [options[0].key, options[1].key] },
      global: {
        stubs: ['Icon'],
      },
    })

    await wrapper.vm.$nextTick()
    const selections = wrapper.findAll('[data-test-id="selections"] > *')
    expect(selections.length).toBe(2)
  })

  it('Cuando se escribe un valor que muestre solo las coincidencias', async () => {
    wrapper = mount(MultiSelect, {
      props: { name, options },
      global: {
        stubs: ['Icon'],
      },
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
    wrapper = mount(MultiSelect, {
      props: { name, options },
      global: {
        stubs: ['Icon'],
      },
    })

    const input = wrapper.find('input')
    await input.setValue('on')
    const optionsList = wrapper.find('ul')
    optionsList.find('li').trigger('click')

    expect(optionsList.exists()).toBe(true)
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toStrictEqual([options[0].key])
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe('')
  })

  it('Cuando se escribe un valor, se baja con flechas hasta la segunda opción y se selecciona', async () => {
    wrapper = mount(MultiSelect, {
      props: { name, options },
      global: {
        stubs: ['Icon'],
      },
    })

    Element.prototype.scrollIntoView = vi.fn()

    const input = wrapper.find('input')
    await input.setValue('o')
    input.trigger('keydown', { code: 'ArrowDown' })
    input.trigger('keydown', { code: 'ArrowDown' })
    input.trigger('keydown', { code: 'Enter' })

    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toStrictEqual([options[1].key])
    await wrapper.vm.$nextTick()
    expect(input.element.value).toStrictEqual('')
  })
})
