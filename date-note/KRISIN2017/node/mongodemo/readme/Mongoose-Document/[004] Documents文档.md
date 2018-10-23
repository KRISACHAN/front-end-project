#Documents文档
Mongoose文档

###Retrieving检索
Mongoose检索方法有很多种, 详情可以阅读Querying章节

##

###Updating更新

Mongoose更新文档的方法有很多种, findById是一个比较传统的方法
```
Tank.findById(id, function (err, tank) {
  if (err) return handleError(err);
  
  tank.size = 'large';
  tank.save(function (err, updatedTank) {
    if (err) return handleError(err);
    res.send(updatedTank);
  });
});
```
findById先从MongoDB检索数据,再用save方法保存修改后的数据。不过，有时候我们不需要将数据返回到应用，仅仅是想在数据库中更新,这时候就可以用
```
Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);
```
如果想把文档返回到应用中，还有一个更好的方法
```
Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function (err, tank) {
  if (err) return handleError(err);
  res.send(tank);
});
```
##

###Validating验证
文档在保存之前往往会先经过验证，详情可以阅读 Validating 章节



#Sub Docs子文档

Sub-documents嵌套在父文档里，而且有自己的Schema模式
```
var childSchema = new Schema({ name: 'string' });

var parentSchema = new Schema({
  children: [childSchema]
})
```

Sub-documents继承普通文档的所有特性，唯一不同的是，Sub-documents的保存要依赖于父文档。
```
var Parent = mongoose.model('Parent', parentSchema);
var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] })
parent.children[0].name = 'Matthew';
parent.save(callback);
```
如果子文档的中间件出错，报错会发生在父文档的 save() 函数中
```
childSchema.pre('save', function (next) {
  if ('invalid' == this.name) return next(new Error('#sadpanda'));
  next();
});

var parent = new Parent({ children: [{ name: 'invalid' }] });
parent.save(function (err) {
  console.log(err.message) // #sadpanda
})
```

##

###查找子文档
每一个文档都有一个唯一 _id，通过唯一的 _id 可以找到子文档
```
var doc = parent.children.id(_id);
```

未完待续...
