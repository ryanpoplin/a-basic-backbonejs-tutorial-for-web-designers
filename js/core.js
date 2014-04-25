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
		messageModal,
		homeViewFooterHeight;
	HomeView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#home-view-template').html()),
		events: {
			'click #footer-button': 'footerAnimation',
			'click .home-view-facebook-button': 'facebookModalShow',
			'click .close-x': 'closeFacebookSignUpModal'
		},
		footerAnimation: function() {
			homeViewFooterHeight = $('#home-view-footer').height();
			if (homeViewFooterHeight === 60) {
				$('#quest-button').fadeOut(50);
				$('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
				$('#home-view-footer')
				.stop()
				.animate({
					height: 195
				})
				.end();
				$('#footer-button')
				.stop()
				.animate({
					bottom: 155
				})
				.end();
				/*$('#log-sign-container button').css('display', 'inline-block');
				$('#log-sign-container button, .log-sign-span').fadeIn(100);
				$('p.extra-span, p#facebook-hell').css('display', 'block');
				$('span.extra-color').css('display', 'inline');*/
				return true; 
			} else if (homeViewFooterHeight >= 195) {
				$('#quest-button').fadeIn(500);
				$('#footer-button').css('transform', 'rotate(360deg) scaleX(-1)');
				$('#home-view-footer')
				.stop()
				.animate({
					height: 60
				})
				.end();
				$('#footer-button')
				.stop()
				.animate({
					bottom: 15
				})
				.end();
				/*$('#log-sign-container button').fadeOut();
				$('#log-sign-container button, span.log-sign-span').css('display', 'none');
				$('p.extra-span, p#facebook-hell, span.extra-color').css('display', 'none');*/
				return true;
			}
			return false; 
		},
		facebookModalShow: function() {
			$(function() {
				$('.facebook-sign-up-modal').show();
			});
		},
		closeFacebookSignUpModal: function() {
			$(function() {
				$('.facebook-sign-up-modal').hide();
			});
		},
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