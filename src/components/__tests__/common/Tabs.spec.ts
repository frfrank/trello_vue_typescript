import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Tabs from '@/components/common/Tabs.vue'
import type { Option } from '@/types'

describe('Tabs', () => {
  let wrapper: any
  const options: Option[] = [
    { key: 'tab1', value: 'Tab 1' },
    { key: 'tab2', value: 'Tab 2' },
    { key: 'tab3', value: 'Tab 3' },
  ]

  it('Cuando se pinta el componente', () => {
    wrapper = mount(Tabs, {
      props: { options },
    })

    const tabs = wrapper.findAll('button')

    expect(tabs.length).toBe(options.length)
  })

  it('Cuando se pinta el componente con una opcion seleccionada', () => {
    wrapper = mount(Tabs, {
      props: { options, value: options[0].key },
    })

    const tabs = wrapper.findAll('button')

    expect(tabs.length).toBe(options.length)
  })

  it('Cuando se pincha en una pestaña', async () => {
    wrapper = mount(Tabs, {
      props: { options },
    })

    const tab = wrapper.find('button')
    await tab.trigger('click')

    expect(wrapper.emitted('tab-clicked')).toBeTruthy()
    expect(wrapper.emitted('tab-clicked')[0][0]).toBe(options[0].key)
  })
})
