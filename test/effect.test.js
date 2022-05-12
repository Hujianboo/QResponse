import {reactive,effect} from '../index'

describe('测试effect的观测是否成功',() => {
  it('should observe',() => {
    let data = {foo: true,bar: true}
    let obj = reactive(data)
    let a = 0
    effect(() => {
      a++;
      console.log(obj.foo)
    })
    expect(obj.foo).toBe(true)
    obj.foo = false
    expect(a).toBe(2)
  })
})
