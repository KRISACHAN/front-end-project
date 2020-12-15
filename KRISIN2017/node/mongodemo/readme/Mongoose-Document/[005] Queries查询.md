#Queries查询
Mongoose可以通过models的一些静态方法来检索文档
当执行一个模型函数时，通常有两种结果：

+ passed通过：这样回调函数会返回查询结果
+ not passed未通过:这样查询会被驳回

> 在Mongoose 4版本中，为查询提供了 .then() 函数，这样就可以像 promise 一样执行函数

当执行一个带回调函数的查询时, 你需要提供JSON格式的查询条

```
var Person = mongoose.model('Person', yourSchema);

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  if (err) return handleError(err);
  console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
})
```

在上面的例子中，查询结果 person 通过回调函数返回。在Mongoose中，所有的回调函数使用固定的格式: callback(error, result)。当在执行查询时发生了错误，将只返回错误参数不返回查询结果，,同样的，如果查询成功执行，就不会有错误信息。

> 当查询成功时，回调函数按固定格式：callback（error, result）返回结果。 具体返回什么样的数据，取决于查询的方式。
> + findOne(): 返回单个文档数据
> + find(): 返回一个文档数组
> + count(): 返回文档数量
> + update(): 返回更新的文档

现在，来看看没有回调函数的情况:

```
// find each person with a last name matching 'Ghost'
var query = Person.findOne({ 'name.last': 'Ghost' });

// selecting the `name` and `occupation` fields
query.select('name occupation');

// execute the query at a later time
query.exec(function (err, person) {
  if (err) return handleError(err);
  console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
})
```

在上面的在代码中,使用一个查询变量query。Mongoose中，除了用JSON格式的条件语句，还可以使用链式函数来查询文档，比如下面2个例子：

```
// With a JSON doc
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);
  
// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
```

详情可以阅读详细的[API文档](http://mongoosejs.com/docs/api.html#query-js)
  
###文档引用
MongoDB本身没有联表，但是有时会需要引用其他的文档。这时候就可以用 population 来事项类似联表的功能
  
### Streaming
You can stream query results from MongoDB. You need to call the Query#cursor() function instead of Query#exec to return an instance of QueryCursor.

```
  var cursor = Person.find({ occupation: /host/ }).cursor();
cursor.on('data', function(doc) {
  // Called once for every document
});
cursor.on('close', function() {
  // Called when done
});
```
