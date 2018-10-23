## SchemaTypes
SchemaTypes处理路径的定义和其它一般的特征.查看它们各自的API文档了解更多的细节.
下面列出了所有有效的Schema Types:

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array

例子
```js
	let schema = new Schema({
	  name:    String,
	  binary:  Buffer,
	  living:  Boolean,
	  updated: { type: Date, default: Date.now },
	  age:     { type: Number, min: 18, max: 65 },
	  mixed:   Schema.Types.Mixed,
	  _someId: Schema.Types.ObjectId,
	  array:      [],
	  ofString:   [String],
	  ofNumber:   [Number],
	  ofDates:    [Date],
	  ofBuffer:   [Buffer],
	  ofBoolean:  [Boolean],
	  ofMixed:    [Schema.Types.Mixed],
	  ofObjectId: [Schema.Types.ObjectId],
	  nested: {
	    stuff: { type: String, lowercase: true, trim: true }
	  }
	})


	//简单使用
	let Thing = mongoose.model('Thing', schema);

	let m = new Thing;
	m.name = 'Statue of Liberty';
	m.age = 125;
	m.updated = new Date;
	m.binary = new Buffer(0);
	m.living = false;
	m.mixed = { any: { thing: 'i want' } };
	m.markModified('mixed');
	m._someId = new mongoose.Types.ObjectId;
	m.array.push(1);
	m.ofString.push("strings!");
	m.ofNumber.unshift(1,2,3,4);
	m.ofDates.addToSet(new Date);
	m.ofBuffer.pop();
	m.ofMixed = [1, [], 'three', { four: 5 }];
	m.nested.stuff = 'good';
	m.save(callback);
```