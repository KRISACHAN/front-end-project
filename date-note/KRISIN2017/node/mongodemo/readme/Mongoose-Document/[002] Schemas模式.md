#Schemas模式

###定义Schema
Mongoose里的一切都始于Schema。每一个schemas映射到对应的MongoDB数据库的集合collection，并定义对应集合的文档形式

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var blogSchema = new Schema({
      title:  String,
      author: String,
      body:   String,
      comments: [{ body: String, date: Date }],
      date: { type: Date, default: Date.now },
      hidden: Boolean,
      meta: {
        votes: Number,
        favs:  Number
      }
    });

在blogSchemad定义的每个键key将被转换为相关SchemaType定义一个属性。例如，标题(title)将被转换为字符串(String)的 SchemaType 并将日期(date)转换为日期的 SchemaType 。键（keys）也可以被指定嵌套的对象，包含进一步的键/类型定义（例如，上面的 meta属性）

##

###允许使用的SchemaTypes：

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

Schema不仅定义了文档和属性的结构，还定义了文档的*实例方法*、*静态模型方法*、*复合索引*等

##

###实例方法methods
模型的实例是文档（document）。文档本身有自己的内置方法。我们也可以自定义文档的实例方法
```
// define a schema
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};
```
现在用文档调用我们定义的实例方法
```
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs); // woof
});
```
##

###静态方法statics
给模式添加静态方法
```
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
  console.log(animals);
});
```
>实例方法methods提供给文档使用，静态方法statics提供给模型使用
