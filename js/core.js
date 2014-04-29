// Will refactor DRY and Messy code soon...

'use strict';

(function($) { 

	// Home View...

	var HomeView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#home-view-template').html()),
		events: {
			'click #footer-button': 'footerAnimation',
			'click #facebook-sign-up-btn': 'facebookModalShow',
			'click #email-sign-up-btn': 'emailModalShow',
			'click #bi-log-in-modal': 'biLogInModalShow',
			'click .modal-btn': 'closeModal'
		},
		// TODO: jQuery animations need to be replaced with requestAnimationFrame() functionalities for performance reasons...
		footerAnimation: function() {
			var homeViewFooterHeight = $('#home-view-footer').height();
			if (homeViewFooterHeight === 80) {
				$('hgroup h1, h2').fadeOut(50);
				$('#quest-button').fadeOut(50);
				$('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
				$('#home-view-footer').animate({
					height: 285
				});
				$('#footer-button').animate({
					bottom: 255
				});
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
				$('#home-view-footer').animate({
					height: 80
				})
				$('#footer-button').animate({
					bottom: 45
				})
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
			$(this.el).html(this.template({}));
		},
		initialize: function() {
			console.log('HomeView init...');
		}
	});

	// Temp. DB to be replaced by Parse.com...

	var questData = [
		{
			hash: 'parkhop',
			name: 'Park Hop',
			info: 'A Quest...'
		},
		{
			hash: 'lantern',
			name: 'Lantern Quest',
			info: 'A Quest...'
		}
	];

	var router;

	// Router Router...

	var Router = Backbone.Router.extend({
		routes: {
			'': 'homeRoute',
			'load-quests': 'loadQuestsRoute',
			'load-quest/:questName': 'loadQuestRoute'
		},
		initialize: function() {
			console.log('AppRouter init...');
			var quests = new Quests();
			quests.reset(questData);
			this.questsListView = new QuestsListView({
				collection: quests
			});
			this.questDisplayView = new QuestDisplayView({
				collection: quests
			});
		},
		homeRoute: function() {
			var homeView = new HomeView;
			homeView.render();
		},
		loadQuestsRoute: function() {
			// Refer to the object being created which will be called questsListView...
			this.questsListView.render();
			// Testing...
			console.log(this.questsListView);
		},
		loadQuestRoute: function(questName) {
			this.questDisplayView.render(questName);
		}
	});

	// Quests List View...

	var QuestsListView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#quests-list-view-template').html()),
		render: function() {
			this.$el.html(this.template({
				data: JSON.stringify(this.collection.models)
			}));
		}
		// Add Subviews...
	});

	// Quests Collection...

	var Quests = Backbone.Collection.extend({
		// ...
	});

	var QuestDisplayView = Backbone.View.extend({
		template: _.template($('#quest-display-view-template').html()),
		render: function(questName) {
			var questModel = this.collection.where({
				name: questName
			})[0];
			var questTemplate = this.template(questModel);
			$('#spa').html(questTemplate);
		}
	});

	$(function() {
		router = new Router;
		Backbone.history.start();
	});

}(jQuery));