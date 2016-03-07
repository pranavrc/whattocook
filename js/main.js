require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/underscore/underscore'
    }
});

require(['app'], function (App) {
    var app = new App;
    app.initialize();
});
