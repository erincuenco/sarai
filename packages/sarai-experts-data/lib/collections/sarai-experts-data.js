Expert = new Mongo.Collection('expert')


Expert.deny({
	insert: function() {
		return true
	},
	update: function() {
		return true
	},
	remove: function() {
		return true
	}
})

