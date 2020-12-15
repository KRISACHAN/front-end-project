# Middleware中间件      
Mongoose4有两种类型的中间件：document文档中间件 和 query查询中间件
Document文档中间件支持一下函数:

+ init
+ validate
+ save
+ remove


Query查询中间件支持一下函数:

+ count
+ find
+ findOne
+ findOneAndRemove
+ findOneAndUpdate
+ insertMany
+ update

Document中间件 和 query中间件都支持 pre 和 post 钩子。


未完..
