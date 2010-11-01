/**
 * Items model. Represents a scavenger hunt item
 * @author mattt
 */
Ext.regModel('Items', {
    idProperty: 'item_id',
    fields: [
			'item_id', 
			'item_name', 
			'venue_name', 
			'venue_website', 
			'venue_address', 
			'venue_geolat', 
			'venue_geolng', 
			'visited'
		]
});

/**
 * Items store.
 * @author mattt
 */
BigEats.stores.LocalStorageItems = new Ext.data.Store({
    model: 'Items',
    autoLoad: false,
    sorters: 'item_name',
    
    getGroupString: function(record){
        return record.get('item_name')[0];
    },
});
