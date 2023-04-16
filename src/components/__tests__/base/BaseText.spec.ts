import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseText from '@/components/base/BaseText.vue'

describe('BaseText', () => {
  const name = 'test-input-name'
  const label = 'Test Input'
  const value = 'test value'
  const placeholder = 'test placeholder'

  it('Cuando se pinta el texto', () => {
    const rows = 5
    const wrapper = mount(BaseText, {
      props: { name, label, value, placeholder, rows },
    })

    const text = wrapper.find('textarea')
    const labelEl = wrapper.find('label')

    expect(text.exists()).toBe(true)
    expect(text.attributes('name')).toBe(name)
    expect(text.attributes('placeholder')).toBe(placeholder)
    expect(text.attributes('rows')).toBe(rows.toString())
    expect(text.element.value).toBe(value)
    expect(labelEl.exists()).toBe(true)
    expect(labelEl.attributes('for')).toBe(name)
    expect(labelEl.text()).toBe(label)
  })

  it('Cuando se cambia el texto', async () => {
    const newValue = 'test value'
    const wrapper = mount(BaseText, {
      props: { name, label, placeholder },
    })

    const text = wrapper.find('textarea')
    await text.setValue(newValue)

    expect(wrapper.emitted()['update:value']).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toBe(newValue)
  })

  it('Cuando escribes más letras del límite', async () => {
    const newValue = 'Texto de pruebas de más de 10 letras'
    const charsLimit = 10
    const wrapper = mount(BaseText, {
      props: { name, label, placeholder, 'chars-limit': charsLimit },
    })

    const text = wrapper.find('textarea')
    await text.setValue(newValue)

    expect(wrapper.emitted()['update:value']).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toBe(newValue.slice(0, charsLimit))
  })

  it('Cuando escribes más palabras del límite', async () => {
    const newValue = 'Texto de pruebas de más de 10 letras'
    const wordsLimit = 3
    const wrapper = mount(BaseText, {
      props: { name, label, placeholder, 'words-limit': wordsLimit },
    })

    const text = wrapper.find('textarea')
    await text.setValue(newValue)

    expect(wrapper.emitted()['update:value']).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toBe('Texto de pruebas')
  })
})
