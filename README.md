swiftjs-2
=========

this is my second attempt at creating an MVC library for expressjs, this is a complete re-write of the original framework removing many of the unnececessary features in favor of simplicity and flexibility. The goel of this new framework is to provide a structure to nodejs apps without sacrificing flexibility in the process.

How to use
-----------
Controllers in swift 2 are simply NodeJS modules that export routes.
```javascript
module.exports = {
    root: '/', //root is optional, if not set, root will be the name of the controller
    routes: {
//        'get': [someMiddlewhere, index], //call some middleware before calling index action.
        'get /<route>': index
    }
}

function someMiddlewhere(req, res, next){
   next() //like any other express application middlewhere is just a function with a third parameter
}

function index(req, res){
    res.json(Test);
}
```

Views
--------
Nothing special has been done with views. Views are the same as express views.
only importent detail about views is that the res.render() function renders views from views/<controller name>/
instead of the root view. 
