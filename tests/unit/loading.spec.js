import { shallowMount } from '@vue/test-utils'
import LoadingScreen from '@/components/LoadingScreen.vue'

describe('LoadingScreen.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Loading'
    const wrapper = shallowMount(LoadingScreen, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
