"use strict";

define(['jquery',
        'underscore',
        'backbone',
        'jquery.tagsinput'
], function ($, _, Backbone, TagsInput) {
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
            this.$el.find('.search-input').tagsInput({
                'defaultText': 'Search',
                'width': '99%',
                'height': '100%',
                'delimiter': [',',';'],
                'onAddTag': this.tagAdded,
                'onRemoveTag': this.tagRemoved
            });
        },

        tagAdded: function (tag) {
        },

        tagRemoved: function (tag) {
        },
        
        render: function () {
            console.log('bar');
        }
    });

    return App;
});
