'use strict';

(function($) { 

	// Connect this data to Parse.com with the help of Parsebone...

	// Share data structure with Jake Smith...
	
	var questData = [
		{
			hash: 'parkhop',
			name: 'Park Hop',
			info: 'Information: Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor.',
			sliderImgOne: '../park-hop.png',
			img: 'http://www.naportals.com/wp-content/uploads/2014/02/orange-thighed-frog-tree-green-nature-animals-wallpaper-1920x1080-857671.jpg',
			link: 'https://www.google.com/parkhop',
			rules: 'Rules: Lorem ipsum dolor... Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor.',
			prizes: 'Prizes: Lorem ipsum dolor... Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor.'
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
	
			$('#quest-button').fadeIn(1500).css('display', 'block');
	
		},
	
		loadQuestsRoute: function() {
	
			this.questsListView.loadQuests();
	
		},
	
		loadQuestRoute: function(questHash) {
	
			this.questDisplayView.loadQuest(questHash);
	
		}
	
	});

	var FooterDrawerModel = Backbone.Model.extend({
	
		defaults: {
	
			footerArrowImg: 'arrow-footer.png',
	
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
		
			'click .modal-btn': 'closeModal',
		
			'click .overlay': 'closeModal'
		
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
		
					bottom: 20
		
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
	
			socialTwitterLink: 'https://www.twitter.com',
	
			socialTwitterImg: 'social-media-icons/twit-icon.png',
	
			socialFacebookLink: 'https://www.facebook.com',
	
			socialFacebookImg: 'social-media-icons/fbook-icon.png',
	
			logoImg: 'default-logo.png',
	
			primaryHeading: 'Explore More',
	
			primarySubHeading: ' Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor. Lorem ipsum dolor, lorem ipsum dolor.',
	
			questBtnLink: '/#load-quests',
	
			questBtnText: 'START A QUEST'
	
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
			......
			});*/
	
		},
	
		initialize: function() {
		}
	
	});

	// QUESTS LIST MODEL...

	var QuestsListModel = Backbone.Model.extend({
	
		defaults: {
	
			miniLogo: 'mini-logo.png',
	
			questListingsHeading: 'Register for a Quest!'
	
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
		
		initialize: function() {
		
			console.log('QuestsListView init...');
		
			this.$el.html(this.template);

			this.on('spinner', this.showSpinner, this);
		
			// this.collection.on('addToLibrary', this.showLibrary, this);
		
		},
		
		showLibrary: function(questModel) {
		
			$(this.libraryEl).append(questModel.attributes.name + '<br>');
		
		},

		loadQuests: function() {

			this.trigger('spinner');

			var view = this;

			setTimeout(function() {

				(function() {

					view.coreRender();
					
				}());

			}, 1000);

		},
		
		coreRender: function() {
			
			this.$el.html(this.template({

				miniLogo: 'mini-logo.png',

			}));

			var view = this;

			this.collection.each(function(quest) {

				var questSubView = new QuestItemView({

					model: quest

				});	

				questSubView.render();

				$(view.listEl).append(questSubView.$el);

			});

			var footerDrawerView = new FooterDrawerView({});	

			footerDrawerView.render();

			$(this.footerSubView).append(footerDrawerView.$el);
						
		},

		showSpinner: function() {
		
			$('#spa').html(this.templateSpinner);
		
		}
	
	});

	// QUESTS COLLECTION...

	var Quests = Backbone.Collection.extend({});

	// QUEST ITEM VIEW...

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

	// QUESTS DISPLAY VIEW...

	var QuestDisplayView = Backbone.View.extend({
		
		initialize: function() {
			
			this.model = new (Backbone.Model.extend({}));
			
			// this.model.on('change', this.render, this);
			
			this.on('spinner', this.showSpinner, this);
		
		},
			
		template: _.template($('#quest-display-view-template').html()),
		
		templateSpinner: _.template($('#template-spinner').html()),
		
		loadQuest: function(questHash) {
		
			this.trigger('spinner');
		
			var view = this;
		
			setTimeout(function() {
		
				(function() {

					view.model.set(view.collection.where({
		
						hash: questHash
		
					})[0].attributes);
				
					var questTemplate = view.template(view.model);
		
					$('#spa').html(questTemplate);

				}());
		
			}, 1000);
		
		},
		
		showSpinner: function() {
		
			$('#spa').html(this.templateSpinner);
		
		}
	
	});

	// READY...

	$(function() {

		app = new Router;
		
		Backbone.history.start();

		// $('.slider-container').slick({
	  	
	  		// setting-name: setting-value
		
		// });
	
	});

}(jQuery));