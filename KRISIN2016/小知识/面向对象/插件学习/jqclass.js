/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
	// initializing 开关很巧妙的来实现调用原型而不构造，还有回调
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	// 全局，this 指向 window，最大的父类
	this.Class = function(){};

	// Create a new Class that inherits from this class
	// 继承的入口
	Class.extend = function(prop) {
		//保留当前类，一般是父类的原型
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		//开关 用来使原型赋值时不调用真正的构成流程
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			//对函数判断，将属性套到子类上
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					//用闭包来存储
					return function() {
						var tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						//实现同名调用
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// 要返回的子类
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
		// 继承
		Class.prototype = prototype;

		Class.prototype.constructor = Class;

		Class.extend = arguments.callee;

		return Class;
	};
})();
