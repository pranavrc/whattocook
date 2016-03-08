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
        }
    });

    var App = Backbone.View.extend({
        el: '#container',
        
        initialize: function () {
            _.bindAll(this, 'tagAdded', 'tagRemoved');

            var self = this;
            this.recipeCollection = new Recipes;
            this.searchTags = new SearchTags;

            this.$el.find('.search-input').tagsInput({
                'defaultText': 'Search',
                'width': '99%',
                'height': '100%',
                'delimiter': [',',';'],
                'onAddTag': self.tagAdded,
                'onRemoveTag': self.tagRemoved
            });
        },

        tagAdded: function (tag) {
            this.searchTags.attributes.tags.push(tag);
        },

        tagRemoved: function (tag) {
            this.searchTags.attributes.tags.pop();
        },
        
        render: function () {
            console.log('bar');
        }
    });

    return App;
});
