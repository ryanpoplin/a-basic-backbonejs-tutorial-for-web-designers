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
				$('hgroup h1, h2, #quest-button').fadeOut(50);
				// Rotation...
				$('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
				// Animation...
				$('#home-view-footer').stop().animate({
					height: 285
				}).end();
				$('#footer-button').stop().animate({
					bottom: 255
				}).end();
				$('#home-view-footer span, button').show();
				$('#home-view-footer button').addClass('display-block');
				$('#home-view-footer button').css('display', 'block');
				$('#home-view-footer h4').hide();
				$('#home-view-footer').css('padding-top', '2em');
				return true; 
			} else if (homeViewFooterHeight >= 163) {
				$('hgroup h1, h2, #quest-button').fadeIn(500);
				// Rotation...
				$('#footer-button').css('transform', 'rotate(360deg) scaleX(-1)');
				// Animation...
				$('#home-view-footer').stop().animate({
					height: 80
				}).end();
				$('#footer-button').stop().animate({
					bottom: 45
				}).end();
				$('#home-view-footer span, button').hide();
				$('#home-view-footer h4').show();
				$('#home-view-footer').css('padding-top', '0');
				return true;
			}
			return false; 
		},
		facebookModalShow: function() {
			$('.overlay, #facebook-modal').fadeIn(300);
		},
		emailModalShow: function() {
			$('.overlay, #email-modal').fadeIn(300);
		},
		biLogInModalShow: function() {
			$('.overlay, #bi-modal').fadeIn(300);
		},
		closeModal: function() {
			$('.overlay, .modal').fadeOut(300);
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
			info: 'A Quest Where You Park Hop Bitch!...'
		},
		{
			hash: 'lantern',
			name: 'Lantern Quest',
			info: 'A Quest Where You Smash Lanterns!...'
		}
	];

	var router;

	// Router Router...

	var Router = Backbone.Router.extend({
		routes: {
			'': 'homeRoute',
			'load-quests': 'loadQuestsRoute',
			'load-quest/:questHash': 'loadQuestRoute'
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
			// console.log(this.questsListView);
		},
		// Changed up for events...
		loadQuestRoute: function(questHash) {
			this.questDisplayView.loadQuest(questHash);
		}
	});

	// Quests List View...

	var QuestsListView = Backbone.View.extend({
		initialize: function() {
			console.log('QuestsListView init...');
		},
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
		initialize: function() {
			console.log('QuestDisplayView init...');
			this.model = new (Backbone.Model.extend({}));
			this.model.on('change', this.render, this);
			this.on('spinner', this.showSpinner, this);
		},
		template: _.template($('#quest-display-view-template').html()),
		templateSpinner: _.template($('#template-spinner').html()),
		loadQuest: function(questHash) {
			this.trigger('spinner');
			var view = this;
			// Configure real DB wait...
			setTimeout(function() {
				view.model.set(view.collection.where({
					hash: questHash
				})[0].attributes);
			}, 500);
		},
		render: function(questName) {	
			var questTemplate = this.template(this.model);
			$('#spa').html(questTemplate);
		},
		showSpinner: function() {
			$('#spa').html(this.templateSpinner);
		}
	});

	var QuestItemView = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#quest-item-view-template').html()),

	});

	$(function() {
		router = new Router;
		Backbone.history.start();
	});

}(jQuery));