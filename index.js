/**
 * Created by chris on 10/22/14.
 */
var fs = require('fs'),
    p = require('path'),
    readdir = require('fs-readdir-recursive'),
    _ = require('underscore');

function setRenderRoot(viewRoot){
    return function(req, res, next){
        var _render = res.render;
        res.render = function(view, options, callback) {
            _render.call(res, viewRoot + view, options, callback);
        };
        next();
    }
}

function addModels(models){
    return function(req, res, next){
//        this.models = exports.models;
        _.extend(this, models);
        next();
    }
}

/**
 * Load express routes and include model middleware unless otherwise specified in options
 * @param app express app
 * @param options
 */
exports.load = function(app, options){
    var rootUrl = options.root || '';
    var appDir = 'app';
    if(typeof options == 'string'){
        appDir = options;
    }else if(options != null){
        appDir = options.appDir || appDir;
    }
    app.models = {};
    var modelsDir = p.join(appDir, '/models/');
    var controllersDir = p.join(appDir, '/controllers/');
    console.log('models dir:', modelsDir);
    console.log('controllers dir:', controllersDir);
    var modelFiles;
    var controllerFiles;
    if(fs.existsSync(modelsDir))
        modelFiles = readdir(modelsDir);
    if(fs.existsSync(controllersDir))
        controllerFiles = readdir(controllersDir);
    if(modelFiles != null){
        for(var i in modelFiles){
            var modelFile = modelFiles[i];
            var model = require(p.join(modelsDir, modelFile));
            var modelName = model.name || modelFile.split(".")[0];
            app.models[modelName] = model;
        }
    }
    if(controllerFiles != null){
        controllerFiles.forEach(function(controllerFile){
            var controller = require(p.join(controllersDir, controllerFile));
            var controllerName = controller.name || controllerFile.split('.')[0];
            var root = controller.root || '/'+controllerName;
            var routes = controller.routes;
            //controller.models = exports.models;
            for(var route in routes){
                var method = route.split(' ')[0];
                var path = rootUrl + root + (route.split(' ')[1] || '');
                console.log(method + " " + path + ': ' + (routes[route].name || 'function'));
                if(typeof(routes[route]) == 'function'){
                    app[method](path, setRenderRoot(controllerName + '/'), addModels(app.models), routes[route]);
                }else{
                    var localMiddleware = [];
                    for(var i in routes[route]){
                        localMiddleware.push(routes[route][i]);
                    }
                    app[method].apply(app, [path].concat(setRenderRoot(controllerName + '/'), addModels(app.models), localMiddleware));
                }
            }
        });
    }
};