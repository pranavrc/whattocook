"use strict";

define(['jquery',
        'underscore',
        'backbone',
        'jquery.tagsinput',
        'backbone.localStorage'
], function ($, _, Backbone, TagsInput, localStorage) {
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
        model: SearchTag,
        localStorage: new Backbone.LocalStorage("whattocook-tags")
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
            var searchTag = new SearchTag({tag: tag});
            this.searchTags.add(searchTag);
            searchTag.save();
        },

        tagRemoved: function (tag) {
            var searchTag = new SearchTag({tag: tag});
            this.searchTags.remove(searchTag);
            searchTag.destroy();
        }
    });

    return App;
});
