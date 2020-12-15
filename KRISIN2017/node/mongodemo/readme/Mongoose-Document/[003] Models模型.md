#Models模型
models是由Schema(模式)定义的构造器。通过models可以实现数据库的文档操作。    

###编译第一个models
```
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);
```
models的第一个参数“tank”是你的模型集合的单数名称。Mongoose会自动寻找你的模型名称的复数形式。
因此，在数据库中,模型“Tank“”对应数据库中"tanks"的集合。
.model()函数实际上为Schema创建的一个副本，所以在调用.model()之前，要先定义好Schema的结构。

##

###构建document文档
document是models的实例,document可以很方便的保存到数据库中

```
var Tank = mongoose.model('Tank', yourSchema);

var small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
})

// or

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
})
```
在构建document时，请先确保mongodb数据库在连接状态    

##

###查询
Mongoose支持丰富的文档查询方法。可以使用find，findById，findOne，或者where等静态方法来查找文档

```
Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
```

##

###删除
Mongoose提供删除文档的静态方法, 用于删除符合条件的文档
```
Tank.remove({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // removed!
});
```
##

###更新
每个模型都有自己的更新方法，用于修改数据库中的文档，不将它们返回到您的应用程序。
详细看[API](http://mongoosejs.com/docs/api.html#model_Model.update)文档。

如果你想要更新一个文档数据库，并将结果返回给你的应用程序，使用[findOneAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)代替。
