'use strict';

(function($) { 
    
	// Full Access Vars...

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
		messageModal,
		homeViewFooterHeight;
	
	// Home View...

	HomeView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#home-view-template').html()),
		events: {
			'click #footer-button': 'footerAnimation',
			'click #facebook-sign-up-btn': 'facebookModalShow',
			'click #email-sign-up-btn': 'emailModalShow',
			'click #bi-log-in-modal': 'biLogInModalShow',
			'click .modal-btn': 'closeModal'
		},
		footerAnimation: function() {
			homeViewFooterHeight = $('#home-view-footer').height();
			if (homeViewFooterHeight === 80) {
				$('hgroup h1, h2').fadeOut(50);
				$('#quest-button').fadeOut(50);
				$('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
				$('#home-view-footer')
				.stop()
				.animate({
					height: 285
				})
				.end();
				$('#footer-button')
				.stop()
				.animate({
					bottom: 255
				})
				.end();
				$('#home-view-footer span, button').show();
				$('#home-view-footer button').addClass('display-block');
				$('#home-view-footer button').css('display', 'block');
				$('#home-view-footer h4').hide();
				$('#home-view-footer').css('padding-top', '2em');
				return true; 
			} else if (homeViewFooterHeight >= 163) {
				$('hgroup h1, h2').fadeIn(50);
				$('#quest-button').fadeIn(500);
				$('#footer-button').css('transform', 'rotate(360deg) scaleX(-1)');
				$('#home-view-footer')
				.stop()
				.animate({
					height: 80
				})
				.end();
				$('#footer-button')
				.stop()
				.animate({
					bottom: 45
				})
				.end();
				$('#home-view-footer span, button').hide();
				$('#home-view-footer h4').show();
				$('#home-view-footer').css('padding-top', '0');
				return true;
			}
			return false; 
		},
		facebookModalShow: function() {
			$('.overlay').fadeIn(300);
			$('#facebook-modal').fadeIn(300);
		},
		emailModalShow: function() {
			$('.overlay').fadeIn(300);
			$('#email-modal').fadeIn(300);
		},
		biLogInModalShow: function() {
			$('.overlay').fadeIn(300);
			$('#bi-modal').fadeIn(300);
		},
		closeModal: function() {
			$('.overlay').fadeOut(300);
			$('.modal').fadeOut(300);
		},
		render: function() {
			$(this.el).html(this.template());
		},
		initialize: function() {
			console.log('HomeView init...');
		}
	});

	// Item List View...

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

	// Item Display View...

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

	// AppRouter Router...

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

	// Are you ready?

	$(function() {
		appRouter = new AppRouter;
		Backbone.history.start();
	});
	
}(jQuery));