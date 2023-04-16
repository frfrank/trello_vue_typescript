import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Input from '@/components/base/BaseInput.vue'

describe('BaseInput', () => {
  let wrapper: any
  const name = 'test-input-name'
  const label = 'Test Input'
  const type = 'text'
  const value = 'test value'
  const placeholder = 'test placeholder'

  beforeEach(() => {
    wrapper = mount(Input, {
      props: { name, label, type, value, placeholder },
    })
  })

  it('Cuando se pinta el input', () => {
    const input = wrapper.find('input')
    const labelEl = wrapper.find('label')

    expect(input.exists()).toBe(true)
    expect(input.attributes('name')).toBe(name)
    expect(input.attributes('type')).toBe(type)
    expect(input.element.value).toBe(value)
    expect(input.attributes('placeholder')).toBe(placeholder)
    expect(labelEl.exists()).toBe(true)
    expect(labelEl.attributes('for')).toBe(name)
    expect(labelEl.text()).toBe(label)
  })

  it('Cuando se cambia el texto', async () => {
    const input = wrapper.find('input')

    await input.setValue('test value')

    expect(wrapper.emitted()['update:value']).toBeTruthy()
    expect(wrapper.emitted('update:value')![0][0]).toBe('test value')
  })
})
