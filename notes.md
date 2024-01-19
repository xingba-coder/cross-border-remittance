### reactive 定义的对象不能直接用 js 对象赋值，会失去响应性

```js
let currencyList = reactive([])
console.log(currencyList)  // Proxy(Array) {}

currencyList = [1] 
console.log(currencyList) // [1] ，失去了响应性 ，只能作为普通对象使用
```

正确用法：

```js
let currencyList = ref([]) 

currencyList.value = [1]
```

或者：

```js
let data = reactive({
    currencyList:[]
}) 

data.currencyList = [1]
```