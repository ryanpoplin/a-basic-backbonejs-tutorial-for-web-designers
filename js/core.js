'use strict';

(function($) { 

	var questData = [
		{
			hash: 'parkhop',
			name: 'Park Hop',
			info: 'Information: Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor.',
			img: 'http://www.naportals.com/wp-content/uploads/2014/02/orange-thighed-frog-tree-green-nature-animals-wallpaper-1920x1080-857671.jpg',
			link: 'https://www.google.com/parkhop',
			rules: 'Rules: Lorem ipsum dolor...',
			prizes: 'Prizes: Lorem ipsum dolor...'
		},
		
	];

	var app;

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
			$('#spa').css('margin-bottom', '0');
		},
		loadQuestsRoute: function() {
			this.questsListView.coreRender();
			$('#spa').css('margin-bottom', '120px');
		},
		loadQuestRoute: function(questHash) {
			this.questDisplayView.loadQuest(questHash);
		}
	});

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
		footerAnimation: function() {
			var homeViewFooterHeight = $('#home-view-footer').height();
			if (homeViewFooterHeight === 80) {
				// $('hgroup h1, h2, #quest-button').fadeOut(50);
				$('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
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
				// $('hgroup h1, h2, #quest-button').fadeIn(500);
				$('#footer-button').css('transform', 'rotate(360deg) scaleX(-1)');
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

	var QuestsListView = Backbone.View.extend({
		el: '#spa',
		listEl: '.quests-list',
		libraryEl: '.library-box',
		template: _.template($('#quests-list-view-template').html()),
		events: {
			'click #footer-button': 'footerAnimation',
			'click #facebook-sign-up-btn': 'facebookModalShow',
			'click #email-sign-up-btn': 'emailModalShow',
			'click #bi-log-in-modal': 'biLogInModalShow',
			'click .modal-btn': 'closeModal'
		},
		footerAnimation: function() {
			var homeViewFooterHeight = $('#home-view-footer').height();
			if (homeViewFooterHeight === 80) {
				// $('hgroup h1, h2, #quest-button').fadeOut(50);
				$('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
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
				// $('hgroup h1, h2, #quest-button').fadeIn(500);
				$('#footer-button').css('transform', 'rotate(360deg) scaleX(-1)');
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
		initialize: function() {
			console.log('QuestsListView init...');
			this.$el.html(this.template);
			this.collection.on('addToLibrary', this.showLibrary, this);
		},
		showLibrary: function(questModel) {
			$(this.libraryEl).append(questModel.attributes.name + '<br>');
		},
		coreRender: function() {
			this.$el.html(this.template({}));
			var view = this;
			this.collection.each(function(quest) {
				var questSubView = new QuestItemView({
					model: quest
				});	
				questSubView.render();
				$(view.listEl).append(questSubView.$el);
			});
		}
	});

	var Quests = Backbone.Collection.extend({});

	var QuestItemView = Backbone.View.extend({
		template: _.template($('#quest-item-view-template').html()),
		events: {
			'click .add-to-library': 'addToLibrary' 
		},
		render: function() {
			this.$el.html(this.template(this.model.attributes));
		},
		addToLibrary: function() {
			this.model.collection.trigger('addToLibrary', this.model);
		}
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
			setTimeout(function() {
				view.model.set(view.collection.where({
					hash: questHash
				})[0].attributes);
			}, 1000);
		},
		render: function(questName) {
			var questTemplate = this.template(this.model);
			$('#spa').html(questTemplate);
		},
		showSpinner: function() {
			$('#spa').html(this.templateSpinner);
		}
	});

	$(function() {
		app = new Router;
		Backbone.history.start();
	});

}(jQuery));