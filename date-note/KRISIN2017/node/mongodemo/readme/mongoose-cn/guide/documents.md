## Documents
Mongoose [documents](#)和存储在MongoDB中的文档是一对一映射的.每个文档是它自己[Model]的实例.

#### 检索
有许多方式从MongoDB数据库中检索文档.我们不会在这一章节中介绍它们.查看[querying]章节了解更多信息.
#### 更新
有许多方式更新文档,我们首先看看使用`findById`的传统方法:
```js
	Tank.findById(id, function (err, tank) {
  		if (err) return handleError(err);
  
 		tank.size = 'large';
  		tank.save(function (err, updatedTank) {
    		if (err) return handleError(err);
			res.send(updatedTank);
  		});
	});
```