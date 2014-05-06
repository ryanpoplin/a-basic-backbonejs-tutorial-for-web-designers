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
		}
	];

	var app;

	var Router = Backbone.Router.extend({
		routes: {
			'': 'defaultRoute',
			'load-quests': 'loadQuestsRoute',
			'load-quest/:questHash': 'loadQuestRoute'
		},
		initialize: function() {
			var quests = new Quests();
			quests.reset(questData);
			this.questsListView = new QuestsListView({
				collection: quests
			});
			this.questDisplayView = new QuestDisplayView({
				collection: quests
			});
		},
		defaultRoute: function() {
			var defaultView = new DefaultView;
			defaultView.render();
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

	var FooterDrawerModel = Backbone.Model.extend({
		defaults: {

		},
		initialize: function() {
		}
	});

	var FooterDrawerView = Backbone.View.extend({
		template: _.template($('#footer-drawer-template').html()),
		events: {
			'click #footer-button': 'footerAnimation',
			'click #facebook-sign-up-btn': 'facebookModalShow',
			'click #email-sign-up-btn': 'emailModalShow',
			'click #bi-log-in-modal': 'biLogInModalShow',
			'click .modal-btn': 'closeModal'
		},
		footerAnimation: function() {
			// FIGURE OUT THE MEDIA QUERY ISSUE WITH ANIMATIONS...
			var footerSubviewHeight = $('.footer-subview').outerHeight();
			if (footerSubviewHeight === 80) {
				// $('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
				$('.footer-subview').stop().animate({
					height: 260
				}).end();
				$('#footer-button').stop().animate({
					bottom: 208
				}).end();
				$('.notice-msg').removeClass('display-none');
				$('.footer-subview span, button').show();
				$('.footer-subview button').css('display', 'inline-block');
				$('.footer-subview h4').hide();
				$('.footer-subview').css('padding-top', '2em');
				return true; 
			} else if (footerSubviewHeight === 260) {
				// $('#footer-button').css('transform', 'rotate(360deg) scaleX(-1)');
				$('.footer-subview').stop().animate({
					height: 80
				}).end();
				$('#footer-button').stop().animate({
					bottom: 30
				}).end();
				$('.footer-subview span, button').hide();
				$('.footer-subview h4').fadeIn(300);
				$('.footer-subview').css('padding-top', '0');
				return true;
			} else if (footerSubviewHeight === 55) {
				// $('#footer-button').css('transform', 'rotate(180deg) scaleX(-1)');
				$('.footer-subview').stop().animate({
					height: 200
				}).end();
				$('#footer-button').stop().animate({
					bottom: 160
				}).end();
				$('.notice-msg').removeClass('display-none');
				$('.footer-subview span, button').show();
				$('.footer-subview button').css('display', 'inline-block');
				$('.footer-subview h4').hide();
				return true;
			} else if (footerSubviewHeight === 200) {
				$('.footer-subview').stop().animate({
					height: 55
				}).end();
				$('#footer-button').stop().animate({
					bottom: 15
				}).end();
				$('.notice-msg').removeClass('display-none');
				$('.footer-subview span, button').show();
				$('.footer-subview button').css('display', 'inline-block');
				$('.footer-subview h4').hide();
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
			this.$el.html(this.template({}));
		},
		initialize: function() {
		}
	});

	var DefaultModel = Backbone.Model.extend({
		defaults: {
			socialTwitterLink: 'https://www.twitter.com',
			socialTwitterImg: 'social-media-icons/twit-icon.png',
			socialFacebookLink: 'https://www.facebook.com',
			socialFacebookImg: 'social-media-icons/fbook-icon.png',
			logoImg: 'q-logo.png',
			primaryHeading: 'Explore More',
			primarySubHeading: '..questalot is ... the best ... !',
			questBtnLink: '/#load-quests',
			questBtnText: 'Quest Now!'
		},
		initialize: function() {
		}
	});

	var DefaultView = Backbone.View.extend({
		tagName: 'div',
		el: '#spa',
		footerSubEl: '.footer-subview',
		template: _.template($('#default-template').html()),
		render: function() {
			var defaultModel = new DefaultModel({});
			$(this.el).html(this.template({
				socialTwitterLink: defaultModel.get('socialTwitterLink'),
				socialTwitterImg: defaultModel.get('socialTwitterImg'),
				socialFacebookLink: defaultModel.get('socialFacebookLink'),
				socialFacebookImg: defaultModel.get('socialFacebookImg'),
				logoImg: defaultModel.get('logoImg'),
				primaryHeading: defaultModel.get('primaryHeading'),
				primarySubHeading: defaultModel.get('primarySubHeading'),
				questBtnLink: defaultModel.get('questBtnLink'),
				questBtnText: defaultModel.get('questBtnText')
			}));
			var footerDrawerView = new FooterDrawerView({
				// model: quest
			});	
			footerDrawerView.render();
			$(this.footerSubEl).append(footerDrawerView.$el);
			/*$(window).resize(function() {
		
			});*/
		},
		initialize: function() {
		}
	});

	var QuestsListView = Backbone.View.extend({
		el: '#spa',
		listEl: '.quests-list',
		libraryEl: '.library-box',
		template: _.template($('#quests-list-view-template').html()),
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