/**
 * @class Items
 * @extends Ext.data.Model
 * 
 * Items model. Represents a scavenger hunt item
 *
 * @author mattt
 */
Ext.regModel('Items', {
    idProperty: 'item_id',
    fields: [
		{ name: 'item_id',       type: 'int'},
		{ name: 'item_name',     type: 'string'},
		{ name: 'venue_name',    type: 'string'},
		{ name: 'venue_website', type: 'string'},
		{ name: 'venue_address', type: 'string'},
		{ name: 'venue_geolat',  type: 'float'},
		{ name: 'venue_geolng',  type: 'float'},
		{ name: 'visited',       type: 'boolean'},
	]
});

/**
 * @class BigEats.stores.LocalStorageItems
 * @extends Ext.data.Store
 * 
 * Items store.
 *
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
