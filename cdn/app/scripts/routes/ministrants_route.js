App.MinistrantsRoute = Ember.Route.extend({
  model: function() {
		return this.get('store').findAll('ministrant');
  }
});

