## 开始

首先确保你已经安装了[Mongodb](http://www.mongodb.org/downloads)和[Node.js](http://nodejs.org/).
下一步在命令行中使用npm安装mongoose：

```sh
    $ npm install mongoose
```

比如说我们喜欢毛绒绒的kitten(猫)并且想记录我们遇见的每一只kitten(猫)到MongoDB中.

第一件事我们需要在我们的项目中导入mongoose然后连接到我们在本地运行的MongoDB实例中的test数据库.
```js
    //getting-started.js 
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test')
```
现在我们已经有了一个挂起到test数据库的本地连接.并且我们需要在连接成功或连接失败的时候得到通知:
```js
    const db = mongoose.connection;
    db.on('err',console.error.bind(console,'connection error:'));
    db.once('open',function(){
        //我们已经连接成功了
    });
```
一旦我们连接成功,我们的回调函数将会被调用.为了简洁,我们将会把下面的代码写在这个回调函数中.

使用Mongoose,一切都是从Schema开始的.所以首先让定义我们遇见的kitten(猫)的结构:
```js
    var kittySchema = mongoose.Schema({
		name: String
    )};
```
到现在为止.我们得到一个拥有一个name属性的schema,并且name属性的类型为String.下一步将我们的schema编译成一个Model.

```js
	var kitten = mongoose.model('Kitten',kittySchema);
```
一个model是我们构造文档的类.在这个例子中,每一个文档将会是属性和行为定义在我们schema中的一只kitten(猫).让我们创建一只kitten(猫)文档,代表我们刚刚在人行道上遇到的小家伙:
```js
	const silence = new Kitten({ name: 'Silence' });
	console.log(silence.name);
```
因为kitten(猫)会叫,因此让我们看看如何给kitten(猫)添加会叫的方法:

```js
	// 注意: 方法必须在使用mongoose.model()编译schema之前添加
	KittySchema.methods.speak = function(){
		let greeting = this.name
			? 'Meow name is ' + this.name
			: `I don't hava a name`;
		console.log(greeting);
	}

	let Kitten = mongoose.model('Kitten', KittySchema);
```
在一个schema的methods属性上添加的函数会被编译进Model属性中,并在每个文档实例上暴露:
```js
	const fluffy = new Kitten({ name: 'fluffy' });
	fluffy.speak(); // 'Meow name is fluffy'
```

我们拥有一个会叫的猫了!但我们依然没有保存任何东西到MongoDB中.每个文档可以调用它们的save方法保存数据到数据库中.如果有错误发生，这个错误将会作为第一个参数传入回调函数中:
```js
	fluffy.save(function(err,fluffy){
		if(err) return console.error(err);
		fluffy.speak();
	});
```
时间流逝,我们希望显示我们看见的所有kitten(猫).我们可以通过我们的Kitten model访问所有的kitten(猫)文档:
```js
	Kitten.find(function(err,kittens){
		if(err) return console.error(err);
		console.log(kittens);
	})
```
我们刚刚仅仅打印了在我们数据库中所有的kittens(猫)到控制台.如果我们希望通过名字过滤我们的kittens(猫),Mongoose支持MongoDB丰富的[查询](#)语法:
```js
	Kitten.find({ name: /^fluff/ }, callback);
```
会执行查找我们保存在MongoDB中的所有以'Fluff'开头的`name`属性的文档,并且将查找到的kittens(猫)以数组的形式传递到callback中.

#### 恭喜

快速开始已经结束,我们创建了一个schema,添加了一个自定义的文档方法,使用Mongoose在MongoDB中保存和查找我们遇见的kittens(猫).去[入门](https://github.com/zhiyingzzhou/mongoose-cn/blob/master/guide.md)或者[API docs](#)查看更多.









