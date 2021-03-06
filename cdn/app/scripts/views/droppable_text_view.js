
"use strict";

App.DroppableTextView = Ember.View.extend({
	tagName : "input",

	classNameBindings : ['isDraggedOver:drag-over'],
	attributeBindings : ['readonly',  'type', 'value'],

	readonly: true,
	type: 'text',
	valueBinding : 'model.shortenedName',

	model : null,

	isDraggedOver : false,

	loadAndSetAsValue : function (id) {
		var self = this;
		self.get('controller.store').find('acolyte', id).then(function (o) {
			self.set('model', o);
			//self.get('controller.model').save();
		});

	},

	dragEnter: function (event) {
		this.set('isDraggedOver', true);
	},

	dragLeave: function (event) {
		this.set('isDraggedOver', false);
	},

	dragOver: function (event) {
		if (event.preventDefault) {
			event.preventDefault(); // Necessary. Allows us to drop.
		}

		return false;
	},

	drop: function (event) {
		var self = this;

		self.set('isDraggedOver', false);
		self.loadAndSetAsValue(event.dataTransfer.getData('application/x-acolyte'));
	},

	click: function (event) {
		var self = this;
		if ($('html').hasClass('touch')) {
			var selectBox = $('#acolyteselectbox');
			selectBox.offset({top: $(event.target).offset().top});
			selectBox.val(self.get('model').get('id'));
			selectBox.off('change'); // remove previous listeners
			selectBox.one('change', function (evt) {
				self.loadAndSetAsValue.call(self, selectBox.val());
			});
			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('mousedown', true, true, window);
			selectBox.get(0).dispatchEvent(evt);
		}
	}
});
