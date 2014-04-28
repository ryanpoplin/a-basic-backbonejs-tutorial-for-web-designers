'use strict';

(function($) { 
    
	// Full Access Vars...

    var app,
    	AppRouter,
		appRouter,
		HomeView,
		homeView,
		QuestsView,
		questsView,
		QuestView,
		questView,
		// Replace with a DB...
		questData,
		Quest,
		quest,
		Quests,
		quests,
		questModel,
		questHtml,
		// ...
		// Check...
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
			$(this.el).html(this.template({}));
		},
		initialize: function() {
			console.log('HomeView init...');
		}
	});

	$(function() {
		appRouter = new AppRouter;
		Backbone.history.start();
	});

	// AppRouter Router...

	AppRouter = Backbone.Router.extend({
		routes: {
			'': 'homeRoute',
			'load-quests': 'loadQuests',
			'quest/:questName': 'loadQuest'
		},
		initialize: function() {
			console.log('AppRouter init...');
			quests = new Quests();
			quests.reset(questData);
			questsView = new QuestsView({
				collection: quests
			});
			questView = new QuestView({
				collection: quests
			});
		},
		homeRoute: function() {
			homeView = new HomeView;
			homeView.render();
		},
		loadQuests: function() {
			questsView.render();
		},
		loadQuest: function() {
			questView.render();
		}
	});

	/* TESTING... */

	// Quests Model...

	Quest = Backbone.Model.extend({
		defaults: {
			name: 'Park Hop'
		},
		initialize: function() {
			console.log('Quest init...');
		}
	});

	// Quests Collection...

	Quests = Backbone.Collection.extend({
		model: Quest 
	});

	// Quests View...

	QuestsView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#quests-view-template').html()),
		render: function() {
			this.$el.html(this.template({}));
		}
		// Need Sub Views?
	});

	// Quest View...

	QuestView = Backbone.View.extend({
		el: '#spa',
		template: _.template($('#quest-view-template').html()),
		render: function() {
			$(this.el).html(this.template({}));
		}
	});

}(jQuery));