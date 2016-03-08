require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'jquery.tagsinput': '../bower_components/jquery.tagsinput/src/jquery.tagsinput',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/underscore/underscore'
    },

    shim: {
        'jquery.tagsinput': ['jquery']
    }
});

require(['app'], function (App) {
    var app = new App;
});
