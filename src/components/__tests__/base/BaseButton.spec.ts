import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseButton from '@/components/base/BaseButton.vue'

describe('BaseButton', () => {
  it('Cuando se pinta el boton', () => {
    const disabled = true
    const wrapper = mount(BaseButton, {
      props: { disabled },
    })

    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('Cuando se clicka el boton', async () => {
    const wrapper = mount(BaseButton)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
