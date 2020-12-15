## Models 

[Models](#) 是从我们`Schema`定义编译的构造函数.这些models的实例代表了文档,实例可以从我们的数据库保存和检索数据.所有文档通过这些models从数据库被创建和检索.

#### 编译你的第一个model

```js
	const schema = new mongoose.Schema({ name: 'string', size: 'string' });
	const Tank = mongoose.model('Tank',schema);
```
第一个参数是你的model集合的单数名称.Mongoose自动查找你model名称的复数形式(ps:单数形式是你编译schema提供的名称,复数形式是MongoDB中集合的名称,比如你在文件中定义mongoose.model()中第一个参数是Tank,那么mongoose将会自动查找MongoDB中名为tanks的集合).因此,在上面的例子中,model Tank用于数据库中tanks集合. `.model`函数制作schema的拷贝.请确保在调用.model()之前你已经添加了一切.

#### 构造文档

文档是我们model的实例.创建和保存它们到数据库非常简单:
```js
	let Tank = mongoose.model('Tank',yourSchema);
	let small = new Tank({ size: 'small' });
	small.save(function(err){
		if(err) return handleError(err);
		// 保存成功!
	});

	//或者
	Tank.create({ size: 'small' }, function(err){
		if(err) return handleError(err);
		//保存成功!
	});
```
注意除非你的models连接是打开的,否则没有任何tanks被创建和删除,.每一个model有一个相对应的连接.当你使用`mongoose.model()`,你的model将使用默认的mongoose连接:
```js
	mongoose.connect('localhost','gettingstarted');
```
如果你希望创建一个自定义的连接,请使用连接的model()函数替代:
```js
	let connection = mongoose.createConnection('mongodb://localhost:27017/test');
	let Tank = connection.model('Tank',yourSchema);
```
#### 查询

使用mongoose查找文档非常简单,mongoose支持MongoDB丰富的查询语法.文档可以使用每个models的`find`,`findById`,`findOne`,或者`where`静态方法来检索.
```js
	Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
```
#### 删除
Models有一个静态`remove`方法可用于删除所有匹配条件的文档:
```js
	Tank.remove({ size: 'large' }, function (err) {
	  if (err) return handleError(err);
	  // 删除成功!
	});
```
####更新
每一个model都有自己的更新方法,用于修改数据库中的文档而不会将它们返回到你的应用程序中.查看[API](#)文档了解更多的详细信息.

*如果你希望更新在数据库中的一个单一文档并将它返回到你的应用程序中,请使用`findOneAndUpdate`.*
####更多
[API](#)文档包含更多额外的方法，例如`count`,`mapReduce`,'aggregate`,`more`等等
####下一步
现在我们学习了`models`,让我们下一步学习[Documents](#)
