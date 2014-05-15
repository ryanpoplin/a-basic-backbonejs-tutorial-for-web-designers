'use strict';

(function($) {

	Parse.initialize("dOXsblWB78isb7UdD3k6xdZ1b1imElPvD5WltH6U", "jMVD9CDx1B4hTvGjsGz2dQeSW3TxCu21gPiqkw6T"); 

	var app;

  var applicationController = new Backbone.Model;

	var Router = Backbone.Router.extend({
	
		routes: {
	
			'': 'defaultRoute',
	
			'load-quests': 'loadQuestsRoute',
	
			'load-quest/:questHash': 'loadQuestRoute'
	
		},
	
		initialize: function() {

			this.quests = new Quests;

		},
	
		defaultRoute: function() {
	
			var defaultView = new DefaultView;
	
			defaultView.render();
	
			$('#quest-button').fadeIn(1500).css('display', 'block');
	
		},
	
		loadQuestsRoute: function() {

			var questsListView = new QuestsListView({
	
				collection: this.quests
	
			});

			this.quests.fetch();	

      // TODO: this is a hack
      Parse.Cloud.run("getAdventures").then(function(adventures){
        if(adventures && adventures.length){
          applicationController.set('registered', true);
        }
      });
		},
	
		loadQuestRoute: function(questHash) {
      console.log(questHash);

			var questDisplayView = new QuestDisplayView;

			this.quests.fetch().then(function(collection){
				
				var model = collection.find(function(model){
          return model.get('hash') == questHash;
				});

				questDisplayView.model = model;
				
				questDisplayView.render();
			
			});
	
		}
	
	});

	var FooterDrawerModel = Backbone.Model.extend({
	
		defaults: {
	
			// Need arrow image...

			footerArrowImg: 'img/footer-arrow.png',
	
			logSignText: 'LOGIN / SIGN UP',
	
			facebookBtnText: 'CONNECT WITH FACEBOOK',
	
			orText: 'OR',
	
			emailBtnText: 'CREATE A NEW ACCOUNT',
	
			noticeText: 'We will not post on your profile without your permission.',
	
			signedInText: 'Already have an account?',
	
			logInText: 'LOGIN HERE'
	
		},
	
		initialize: function() {
		}
	
	});

	var footerDrawerModel = new FooterDrawerModel({});

	var FooterDrawerView = Backbone.View.extend({
		
		model: footerDrawerModel,
		
		template: _.template($('#footer-drawer-template').html()),
		
		events: {
		
			'click #footer-button': 'footerAnimation',
		
			'click #facebook-sign-up-btn': 'facebookModalShow',
		
			'click #email-sign-up-btn': 'emailModalShow',
		
			'click #bi-log-in-modal': 'biLogInModalShow',
		
			'click .out': 'closeModal',
		
			'click .overlay': 'closeModal',

			'click #parse-sign-up': 'parseSignUp',

			'click #parse-login': 'parseLogin'
		
		},

		parseSignUp: function() {

			var fullName, firstName, lastName, email, password, user;

			fullName = $('#sign-up-username').val() || "";
			firstName = fullName.split(" ")[0];
			lastName = fullName.split(" ").slice(1).join(" ");
			
			email = $('#sign-up-email').val();
			
			password = $('#sign-up-password').val();
			
			user = new Parse.User();
			
			user.set("firstName", firstName);
			user.set("lastName", firstName);
			
			user.set("username", email);
			user.set("email", email);
			
			user.set("password", password);
			
			user.signUp(null, {
			
				success: function(user) {

					$('.sign-up-msg').text('Your account has been created!');
						
					setTimeout(function() {

						app.navigate('#/load-quests', {trigger: true});

					}, 2500);
						
				},
			
				error: function(user, error) {
			
					$('.sign-up-msg').text(error.message);
						
				}
			
			});

		},

		parseLogin: function() {

			var username, password;
			
			username = $('#login-username').val();
			
			password = $('#login-password').val();
			
			Parse.User.logIn(username, password, {
			
				success: function(user) {
			
					app.navigate('#/load-quests', {trigger: true});
						
				},
			
				error: function(user, error) {
			
					$('.login-msg').text('Incorrect username or password...');
						
				}
			
			});

		},
		
		footerAnimation: function() {
			
			var footerSubviewHeight = $('.footer-subview').outerHeight();
			
			if (footerSubviewHeight === 80) {
			
				$('#footer-button img').removeClass('box-rotate-two').addClass('box-rotate box-transition');
			
				$('.footer-subview').stop().animate({
			
					height: 180
			
				}).end();
			
				$('#footer-button').stop().animate({
			
					bottom: 134
			
				}).end();
			
				$('.footer-subview h4').hide();
			
				$('#footer-subview-container-one, #footer-subview-container-two').show();
						
			} else if (footerSubviewHeight === 180) {
			
				$('#footer-button img').addClass('box-rotate-two box-transition');
			
				$('.footer-subview').stop().animate({
			
					height: 80
			
				}).end();
			
				$('#footer-button').stop().animate({
			
					bottom: 30
			
				}).end();
			
				$('.footer-subview h4').fadeIn(1000);
			
				$('#footer-subview-container-one, #footer-subview-container-two').hide();
					
			} else if (footerSubviewHeight === 55) {
		
				$('#footer-button img').removeClass('box-rotate-two').addClass('box-rotate box-transition');
		
				$('.footer-subview').stop().animate({
		
					height: 140
		
				}).end();
		
				$('#footer-button').stop().animate({
		
					bottom: 100
		
				}).end();
		
				$('.footer-subview h4').hide();
		
				$('#footer-subview-container-one, #footer-subview-container-two').show();
				
			} else if (footerSubviewHeight === 140) {
		
				$('#footer-button img').addClass('box-rotate-two box-transition');
		
				$('.footer-subview').stop().animate({
		
					height: 55
		
				}).end();
		
				$('#footer-button').stop().animate({
		
					bottom: 15
		
				}).end();
		
				$('.footer-subview h4').fadeIn(500);
		
				$('#footer-subview-container-one, #footer-subview-container-two').hide();
		
			}
				
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
			
			this.$el.html(this.template({
				
				footerArrowImg: this.model.get('footerArrowImg'),
				
				logSignText: this.model.get('logSignText'),
				
				facebookBtnText: this.model.get('facebookBtnText'),
				
				orText: this.model.get('orText'),

				emailBtnText: this.model.get('emailBtnText'),
	
				noticeText: this.model.get('noticeText'),
	
				signedInText: this.model.get('signedInText'),
	
				logInText: this.model.get('logInText')
	
			}));
	
		},
	
		initialize: function() {

		}
	
	});
	
	var DefaultModel = Backbone.Model.extend({
	
		defaults: {
	
			socialTwitterLink: 'https://twitter.com/QuestalotApp/followers',
	
			socialTwitterImg: 'social-media-icons/twit-icon.png',
	
			socialFacebookLink: ' https://www.facebook.com/pages/Questalot/143594135827033',
	
			socialFacebookImg: 'social-media-icons/fbook-icon.png',
				
			logoImg: 'default-logo.png',
	
			primaryHeading: 'Explore More',
	
			primarySubHeading: 'Questalot is a fun way to explore your world! Using your mobile device you can compete in real-world scavenger hunts that we call “quests.”Connect in a way that is new, refreshing and engaging!',
	
			questBtnLink: '/#load-quests',
	
			questBtnText: 'START A QUEST'
	
		},
	
		initialize: function() {
		
		}
	
	});
	
	// DEFAULT VIEW...

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
			
			var footerDrawerView = new FooterDrawerView({});	

			footerDrawerView.render();
	
			$(this.footerSubEl).append(footerDrawerView.$el);
	
		},
	
		initialize: function() {
		}
	
	});

	// QUESTS LIST MODEL...

	var QuestsListModel = Backbone.Model.extend({
	
		defaults: {
	
		},
	
		initialize: function() {

		}
	
	});

	var questsListModel = new QuestsListModel({});

	// QUESTS LIST VIEW...

	var QuestsListView = Backbone.View.extend({
		
		el: '#spa',
		
		listEl: '.quests-list',
		
		footerSubView: '.footer-subview',
		
		template: _.template($('#quests-list-view-template').html()),

		templateSpinner: _.template($('#template-spinner').html()),

		events: {

			'click #logout': 'logout',

			'click .quest-register-btn-two': 'signUpPrompt'

		},

		logout: function() {

			Parse.User.logOut();
			
			app.navigate('', {trigger: true});

		},

		initialize: function() {
		
			console.log('QuestsListView init...');
		
			this.$el.html(this.template);

			this.showSpinner();

			var self = this;
			this.listenTo(this.collection, 'sync', function(){
				self.coreRender();
			});

      this.listenTo(applicationController, 'change:registered', function(controller, registered){
        if(registered){
          self.coreRender();
        }
      });
	
		},

		signUpPrompt: function() {

			$('.overlay, #email-modal').fadeIn(300);

		},
		
		coreRender: function() {
			
			this.$el.html(this.template({}));

			var view = this;

			view.collection.each(function(quest) {

				var questSubView = new QuestItemView({

					model: quest

				});	

				questSubView.render();

				$(view.listEl).append(questSubView.$el);

			});

			var footerDrawerView = new FooterDrawerView({});	

			footerDrawerView.render();

			$(view.footerSubView).append(footerDrawerView.$el);
					
			$('.quest-register-btn').css('display', 'none');

			var currentUser = Parse.User.current();

			var registered = this.isRegistered();
			
			if (currentUser === null) {
    			
    			$('#logout').css('display', 'none');

    			$('.quest-register-btn-two').show();

			} else if (currentUser && registered) {

				$('#logout').css('display', 'inline-block');

				$('.quest-register-btn-three').show();

			} else {
    	
    			$('#logout').css('display', 'inline-block');

    			$('.quest-register-btn-one').show();
			
			}

		},

		showSpinner: function() {
		
			$('#spa').html(this.templateSpinner);
		
		},

    isRegistered: function(){
      return applicationController.get('registered');
    },
	
	});

	// QUESTS COLLECTION...

	var Quest = Parse.Object.extend("Quest");

	var Quests = Parse.Collection.extend({
  		
  		model: Quest
	
	});


	// QUEST ITEM VIEW...

	var QuestItemView = Backbone.View.extend({
	
		template: _.template($('#quest-item-view-template').html()),
	
		events: {
			'click .register-for-quest': 'registerForQuest'
		},
	
		render: function() {
			this.$el.html(this.template(this.model.attributes));
		},
	
		registerForQuest: function() {
      var quest = this.model;
      Parse.Cloud.run("joinAdventure", {quest: quest.id}).then(function(){
				app.navigate('#/load-quest/' + quest.get('hash'), {trigger: true});
      },function(error){
        console.error(error);
      });
      return false;
		}
	
	});

	// QUESTS DISPLAY VIEW...

	var QuestDisplayView = Backbone.View.extend({
		
		initialize: function() {

			this.showSpinner();
					
		},
			
		template: _.template($('#quest-display-view-template').html()),
		
		templateSpinner: _.template($('#template-spinner').html()),
		
		showSpinner: function() {
		
			$('#spa').html(this.templateSpinner);
		
		},

		render: function(){
			var template = this.template(this.model);
			$('#spa').html(template);
		}
	
	});

	// READY...

	$(function() {

		app = new Router;
		
		Backbone.history.start();
	
	});

}(jQuery));
