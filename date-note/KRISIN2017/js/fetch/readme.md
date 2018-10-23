# fetch知识整理
## Header

```
const headers = Headers();
```

1. Headers.append() : 给现有的header添加一个值, 或者添加一个未存在的header并赋值.
2. Headers.delete() : 从Headers对象中删除指定header.
3. Headers.entries() : 以 迭代器 的形式返回Headers对象中所有的键值对.
4. Headers.get() : 从Headers对象中返回指定header的第一个值.
5. Headers.getAll() : 以数组的形式从Headers对象中返回指定header的全部值.
6. Headers.has() : 以布尔值的形式从Headers对象中返回是否存在指定的header.
7. Headers.keys() : 以迭代器的形式返回Headers对象中所有存在的header名.
8. Headers.set() : 替换现有的header的值, 或者添加一个未存在的header并赋值.
9. Headers.values() : 以迭代器的形式返回Headers对象中所有存在的header的值.

## Body

```
fetch(url).then((response)=>{console.log(response.json())});
```

1. Body.arrayBuffer() : 使用一个buffer数组来读取 Response流中的数据，并将bodyUsed状态改为已使用。
2. Body.blob() : 使用一个Blob对象来读取 Response流中的数据，并将bodyUsed状态改为已使用。
3. Body.formData() : 使用一个 FormData 对象来读取 Response流中的数据，并将bodyUsed状态改为已使用。
4. Body.json() : 使用一个 JSON 对象来读取 Response流中的数据，并将bodyUsed状态改为已使用。
5. Body.text() : 使用一个USVString (文本) 对象来读取 Response流中的数据，并将bodyUsed状态改为已使用。

## Content-Type

```
 headers.append("Content-Type", "application/json;charset=UTF-8");
```

1. application/x-www-form-urlencoded
2. multipart/form-data
3. application/json
4. text/xml
5. text/html

## response type

```
fetch(url).then((response)=>{console.log(response.type)});
```

1. basic : 同域下
2. cors :  可见`Cache-Control` , `Content-Language` , `Content-Type` , `Expores` , `Last-Modified` 和`Progma`
3. opaque : 服务器没有返回CORS响应头 , 不能查看任何有价值的信息

## take cookie
```
fetch(url,{
  credentials: 'include'
});
```

## post
```
 const headers = new Headers();
 const body = JSON.stringify({
   data: 'hello world'
 });
 headers.append("Content-Type", "application/json;charset=UTF-8");
 fetch(url, {
  method: 'post',
  headers,
  body
 });
```


## mode ( 常用 )

```
fetch(url, {mode: 'cors'});
```

1. same-origin: 表示同域下可请求成功; 反之, 浏览器将拒绝发送本次fetch, 同时抛出错误 “TypeError: Failed to fetch(…)”.
2. cors: 表示同域和带有CORS响应头的跨域下可请求成功. 其他请求将被拒绝.
3. cors-with-forced-preflight: 表示在发出请求前, 将执行preflight检查.
4. no-cors: 常用于跨域请求不带CORS响应头场景, 此时响应类型为 “opaque”.

## catch
同XMLHttpRequest一样，通常只在网络出现问题时或者ERR_CONNECTION_RESET时, 它们才会进入到相应的错误捕获里. 

## cache
1. default: 表示fetch请求之前将检查下http的缓存.
2. no-store: 表示fetch请求将完全忽略http缓存的存在. 这意味着请求之前将不再检查下http的缓存, 拿到响应后, 它也不会更新http缓存.
3. no-cache: 如果存在缓存, 那么fetch将发送一个条件查询request和一个正常的request, 拿到响应后, 它会更新http缓存.
4. reload: 表示fetch请求之前将忽略http缓存的存在, 但是请求拿到响应后, 它将主动更新http缓存.
5. force-cache: 表示fetch请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 除非没有任何缓存, 那么它将发送一个正常的request.
6. only-if-cached: 表示fetch请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 如果没有缓存, 它将抛出网络错误(该设置只在mode为”same-origin”时有效).
7. 如果fetch请求的header里包含 If-Modified-Since, If-None-Match, If-Unmodified-Since, If-Match, 或者 If-Range 之一, 且cache的值为 default , 那么fetch将自动把 cache的值设置为 "no-store" .
