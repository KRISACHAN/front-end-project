## Schemas

如果你还没有这样做,请花一些时间去阅读[快速开始](https://github.com/zhiyingzzhou/mongoose-cn/blob/master/quickstart.md)了解Mongoose是如何工作的.如果你正在从3.x升级到4.x请阅读[迁移指南](#)


#### 定义你的schema
在mongoose中一切都是从一个Schma开始的.每一个schema映射到一个mongodb集合并且定义了集合中文档的结构.

```js
    const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const blogSchema = new Schema({
        title: String,
        author: String,
        body: String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
            votes: Number,
            favs: Number
        }
    });
```
如果你想在稍后添加额外的键,可以使用*[Schema#add](#)*方法.

在我们的schema中每一个键被转化为相关的SchemaType并且各自定义文档中的一个属性.
比如,我们定义的`title`属性,将被转化为String SchemaType,`date`将被转化为Date SchemaType.
键可以指定为嵌套的包含更多的key/type的对象(比如上面的`meta`属性).

被允许的SchemaType有:

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array

[这里](#)阅读更多关于它们的信息

Schemas 不仅仅定义了你文档的结构和属性,而且它们也可以定义文档的实例化方法([instance methods](#)), 静态模型方法(static [Model methods](*)),复合索引([compound indexed](*)) 和被称之为中间件([middleware](*))的文档生命周期.

#### 创建一个模型

要使用我们的schema定义,我们需要将我们的blogSchema转化成一个我们可以工作的模型(Model),所以,我们将它传递进mongoose.model(modelName,schema);

```js
    const blog = mongoose.model('Blog',blogSchema);
```

#### 实例化方法

模型的实例是文档.文档有许多它们自己内置的实例化方法.我们也可以定义我们自己的自定义文档实例方法.

```js
    //定义一个schema
    const animalSchema = new Schema({name: String,type: String});

    //指定一个函数到我们的animalSchema上的"methods"对象上
    animalSchema.methods.findSimilarTypes = function(cb){
        return this.model('Animal').find({ type: this.type },cb);
    }
```

现在我们的所有animal实例都会有一个findSimilarTypes方法:
```js
    const Animal = mongoose.model('Animal', animalSchema),
    dog = new Animal({type: 'dog' });

    dog.findSimilarTypes(function(err, dogs){
        console.log(dogs);
    });
```
###### 重写默认的mongoose文档方法可能会导致不可预测的结果.查看[这里](#)获得更多的详细信息.

#### 静态方法

添加一个模型的静态方法是非常简单的.继续使用我们的animalSchema:

```js
    //指定一个函数到我们animalSchema的"statics"对象中
    animalSchema.statics.findByName = function(name,cb){
        return this.find({ name: new RegExp(name,'i') }, cb );
    }

    const Animal = mongoose.model('Animal', animalSchema);
    Animal.findByName('fido',function(err,animals){
        console.log(animals);    
    });
```