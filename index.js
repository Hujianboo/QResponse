//用来存储effect
let Bucket = new WeakMap();
let activeEffect = () => {
  console.log('activeEffect')
}

const track = (target,key) => {
  let depsMap = Bucket.get(target);
  if(!depsMap){
    Bucket.set(target,depsMap = new Map())
  }
  let deps = depsMap.get(key);
  if(!deps){
    depsMap.set(key,deps =new Set());
  }
  deps.add(activeEffect)
}
const trigger = (target,key) => {
  let depsMap = Bucket.get(target);
  if(!depsMap) return
  let effects = depsMap.get(key)
  effects.forEach(fn => {
    fn()
  });
}
const data = {foo: true,bar: false}

export function reactive(obj) {
  return new Proxy(obj,{
    get(target,key) {
      track(target,key)
      return target[key]
    },
    set(target,key,value) {
      target[key] = value;
      trigger(target,key)
      return true
    }
  })
}

export function effect(fn){
  const effectFn = () => {
    activeEffect = effectFn
    fn()
  }
  effectFn();
}