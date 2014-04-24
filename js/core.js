/***
I will refactor this later for modularity... 
*/

'use strict';

(function($) { 
        
    var AppRouter,
		appRouter,
		HomeView,
		homeView,
		ItemListView,
		itemListView,
		ItemDisplayView,
		itemDisplayView,
		facebookSignUpModal,
		emailSignUpModal,
		biLoginModal,
		messageModal;

	// Backbone Views...

	HomeView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#home-view-template').html()),
		render: function() {
			$(this.el).html(this.template());
		},
		initialize: function() {
			console.log('HomeView init...');
		}
	});

	ItemListView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#item-list-view-template').html()),
		render: function() {
			$(this.el).html(this.template());
		},
		initialize: function() {
			console.log('ItemListView init...');
		}
	});

	ItemDisplayView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#item-display-view-template').html()),
		render: function() {
			$(this.el).html(this.template());
		},
		initialize: function() {
			console.log('ItemDisplayView init...');
		}
	});

	// Backbone Router...

	AppRouter = Backbone.Router.extend({
		routes: {
			'': 'homeRoute',
			'item-list': 'itemListRoute',
			'item-display': 'itemDisplayRoute'
		},
		homeRoute: function() {
			homeView = new HomeView;
			homeView.render();
		},
		itemListRoute: function() {
			itemListView = new ItemListView;
			itemListView.render();
		},
		itemDisplayRoute: function() {
			itemDisplayView = new ItemDisplayView;
			itemDisplayView.render();
		},
		initialize: function() {
			console.log('AppRouter init...');
		}
	});

	$(function() {

		appRouter = new AppRouter;
		Backbone.history.start();

	});

}(jQuery));