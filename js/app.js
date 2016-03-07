"use strict";

define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {
    var Recipe = Backbone.Model.extend({
        urlRoot: '/',
        defaults: {
            ingredients: [],
            method: ''
        }
    });

    var Recipes = Backbone.Collection.extend({
        model: Recipe,
        urlRoot: '/'
    });

    var SearchTags = Backbone.Model.extend({
        defaults: {
            tags: []
        },
    });

    var App = Backbone.View.extend({
        el: '#container',
        
        initialize: function () {
            console.log('foobar');
        },
        
        render: function () {
            console.log('bar');
        }
    });

    return App;
});
