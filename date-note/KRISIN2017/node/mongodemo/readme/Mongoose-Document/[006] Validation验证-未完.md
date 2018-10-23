# Validation验证

在开始学习Validation之前，请先记住以下规则:

+ Validation是在 SchamaType 中定义的
+ Validation是中间件。Mongoose默认将 Validation 作为 pre('save') 注册。
+ 可以手动使用 doc.validate(callback) 或 doc.validateSync() 运行 Validation
+ Validator（验证器）不会运行在未定义的值上面。除非是用 require 引用 验证器
+ Validation是异步的；当调用 Model 的 save（）时，子文档的 Validation 也会一起执行，同时，子文档的报错也会被父文档捕获到
+ Validation 可以自定义

```
 var schema = new Schema({
      name: {
        type: String,
        required: true
      }
    });
    var Cat = db.model('Cat', schema);

    // This cat has no name :(
    var cat = new Cat();
    cat.save(function(error) {
      assert.equal(error.errors['name'].message,
        'Path `name` is required.');

      error = cat.validateSync();
      assert.equal(error.errors['name'].message,
        'Path `name` is required.');
    });
  
```

###Buid-in Validators内置验证器
Mongoose有几个内置验证器
+ 所有的 SchemaType 都内置 require 验证器。require 验证器使用 checkRequired() 函数判断参数的值是否正确
+ Number数值 有 min 和 max 验证器
+ String字符串 有 enum，match，maxlength 和 minlength 验证器

Each of the validator links above provide more information about how to enable them and customize their error messages.

```

    var breakfastSchema = new Schema({
      eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
      },
      bacon: {
        type: Number,
        required: [true, 'Why no bacon?']
      },
      drink: {
        type: String,
        enum: ['Coffee', 'Tea']
      }
    });
    var Breakfast = db.model('Breakfast', breakfastSchema);

    var badBreakfast = new Breakfast({
      eggs: 2,
      bacon: 0,
      drink: 'Milk'
    });
    var error = badBreakfast.validateSync();
    assert.equal(error.errors['eggs'].message,
      'Too few eggs');
    assert.ok(!error.errors['bacon']);
    assert.equal(error.errors['drink'].message,
      '`Milk` is not a valid enum value for path `drink`.');

    badBreakfast.bacon = null;
    error = badBreakfast.validateSync();
    assert.equal(error.errors['bacon'].message, 'Why no bacon?');
```

###Custom Validators自定义验证器
如果内置验证器不能满足需求，你也可以定制个性化的验证器。
自定义验证使用函数式声明。详细和可参考官方[API文档](mongoosejs.com/docs/api.html#schematype_SchemaType-validate)

```
  var userSchema = new Schema({
      phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      }
    });

    var User = db.model('user', userSchema);
    var user = new User();
    var error;

    user.phone = '555.0123';
    error = user.validateSync();
    assert.equal(error.errors['phone'].message,
      '555.0123 is not a valid phone number!');

    user.phone = '';
    error = user.validateSync();
    assert.equal(error.errors['phone'].message,
      'User phone number required');

    user.phone = '201-555-0123';
    // Validation succeeds! Phone number is defined
    // and fits `DDD-DDD-DDDD`
    error = user.validateSync();
    assert.equal(error, null);
```

# Async Custom Validators异步自定义验证器

自定义验证器也可以是异步的。如果验证器带2个参数，Mongoose会假定第二个参数是回调函数。即使你不想用异步回调函数，也要谨慎， 因为Mongoose 4会假定所有带2个参数的的回调函数都是异步的。

```
 var userSchema = new Schema({
      phone: {
        type: String,
        validate: {
          validator: function(v, cb) {
            setTimeout(function() {
              cb(/\d{3}-\d{3}-\d{4}/.test(v));
            }, 5);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      }
    });

    var User = db.model('User', userSchema);
    var user = new User();
    var error;

    user.phone = '555.0123';
    user.validate(function(error) {
      assert.ok(error);
      assert.equal(error.errors['phone'].message,
        '555.0123 is not a valid phone number!');
    });
```

#Validation Errors验证器错误信息
当验证器执行失败时就会产生错误信息。每个 Validation Error有 kind, path, value 和 message 属性

```
var toySchema = new Schema({
      color: String,
      name: String
    });

    var Toy = db.model('Toy', toySchema);

    var validator = function (value) {
      return /blue|green|white|red|orange|periwinkle/i.test(value);
    };
    Toy.schema.path('color').validate(validator,
      'Color `{VALUE}` not valid', 'Invalid color');

    var toy = new Toy({ color: 'grease'});

    toy.save(function (err) {
      // err is our ValidationError object
      // err.errors.color is a ValidatorError object
      assert.equal(err.errors.color.message, 'Color `grease` not valid');
      assert.equal(err.errors.color.kind, 'Invalid color');
      assert.equal(err.errors.color.path, 'color');
      assert.equal(err.errors.color.value, 'grease');
      assert.equal(err.name, 'ValidationError');
    });
```
###Required Validators On Nested Objects嵌套对象require啊验证器

Mongoose嵌套对象定义 验证器 有点棘手,因为嵌套对象没有完整的路径

 ```
  var personSchema = new Schema({
      name: {
        first: String,
        last: String
      }
    });

    assert.throws(function() {
      // This throws an error, because 'name' isn't a full fledged path
      personSchema.path('name').required(true);
    }, /Cannot.*'required'/);

    // To make a nested object required, use a single nested schema
    var nameSchema = new Schema({
      first: String,
      last: String
    });

    personSchema = new Schema({
      name: {
        type: nameSchema,
        required: true
      }
    });

    var Person = db.model('Person', personSchema);

    var person = new Person();
    var error = person.validateSync();
    assert.ok(error.errors['name']);
 ```
 
 ###Update Validators更新验证器
 
 
 
 
