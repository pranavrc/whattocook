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

    var SearchTag = Backbone.Model.extend({
        defaults: {
            value: ''
        }
    });

    var SearchTags = Backbone.Collection.extend({
        model: SearchTag
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
            this.searchTags.add({tag: tag});
        },

        tagRemoved: function (tag) {
            this.searchTags.remove(this.searchTags.where({tag: tag}));
        }
    });

    return App;
});
