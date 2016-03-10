"use strict";

define(['jquery',
        'underscore',
        'backbone',
        'jquery.tagsinput',
        'backbone.localStorage'
], function ($, _, Backbone, TagsInput, LocalStorage) {
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
        },
        localStorage: new LocalStorage("whattocook-tags")
    });

    var SearchTags = Backbone.Collection.extend({
        model: SearchTag,
        localStorage: new LocalStorage("whattocook-tags")
    });

    var App = Backbone.View.extend({
        el: '#container',

        events: {
            'submit form': 'search'
        },

        initialize: function () {
            _.bindAll(this, 'tagAdded', 'tagRemoved', 'updateSearch');

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

            this.searchTags.fetch({
                success: self.updateSearch
            });
        },

        search: function (e) {
            e.preventDefault();
            debugger;
        },

        tagAdded: function (tag) {
            var searchTag = new SearchTag({value: tag});
            this.searchTags.add(searchTag);
            searchTag.save();
        },

        tagRemoved: function (tag) {
            var tagsToRemove = this.searchTags.where({value: tag});
            for (var tag in tagsToRemove) {
                tagsToRemove[tag].destroy();
            }
        },

        updateSearch: function (collection, response, options) {
            var self = this;

            _.each(_.clone(this.searchTags.models), function (model) {
                self.$el.find('.search-input').addTag(model.get('value'));
                model.destroy();
            });

            this.$el.find('form').submit();
        }
    });

    return App;
});
