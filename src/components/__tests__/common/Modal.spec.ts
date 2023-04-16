import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import Modal from '@/components/common/Modal.vue'

describe('Modal', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Modal, {
      global: {
        stubs: ['Icon'],
      },
    })
  })

  it('Cuando se pinta el modal', () => {
    const modal = wrapper.find('.Modal')

    expect(modal.exists()).toBe(true)
  })

  it('Cuando se pincha dentro del modal', async () => {
    const content = wrapper.find('[data-test-id="content"]')

    await content.trigger('click')

    expect(wrapper.emitted('close')).toBeFalsy()
  })

  it('Cuando se cierra el modal pinchando en la X', async () => {
    const closeButton = wrapper.find('[data-test-id="close"]')

    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('Cuando se cierra el modal pinchando fuera', async () => {
    await wrapper.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('Cuando se cierra el modal presionando la tecla ESC', async () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
