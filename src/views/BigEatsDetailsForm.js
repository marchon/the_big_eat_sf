/**
 * Big eats item details form
 *
 * @author mattt
 */
BigEats.views.BigEatsDetailsForm = Ext.extend(Ext.form.FormPanel, {
    id: 'detailform',
    scroll: 'vertical',
    
    initComponent: function(){
    
        this.visited = new Ext.form.Toggle({
            name: 'visited',
        });
        
        this.visited.addListener('dragend', function(slider, thumb, value){
            var hasVisited = value == 1 ? true : false;
            var record = this.getRecord();
            
            var itemId = record.get('item_id');
            
            var localStorageRecord = BigEats.stores.LocalStorageItems.getById(itemId);
            localStorageRecord.set('visited', hasVisited);
            BigEats.stores.LocalStorageItems.sync();
            
            console.log('set visited for ' + itemId + ' to ' +
            hasVisited);
            
        }, this);
        
        this.visitedFieldSet = new Ext.form.FieldSet({
            title: 'Visited?',
            defaults: {
                labelAlign: 'left',
            },
            items: [this.visited],
        });
        
        this.itemNumber = new Ext.form.TextField({
            name: 'item_id',
            label: 'Item #',
            disabled: true
        });
        
        this.venue = new Ext.form.TextField({
            name: 'venue_name',
            label: 'Location',
            disabled: true
        });
        
        this.address = new Ext.form.TextField({
            name: 'venue_address',
            label: 'Address',
            disabled: true
        });
        
        this.website = new Ext.form.TextField({
            name: 'venue_website',
            label: 'Website',
            disabled: true
        });
        
        this.detailsFieldSet = new Ext.form.FieldSet({
            title: 'Details',
            defaults: {
                labelAlign: 'left',
            },
            items: [this.itemNumber, this.venue, this.address, this.website]
        });
        this.items = [this.visitedFieldSet, this.detailsFieldSet];
        
        BigEats.views.BigEatsDetailsForm.superclass.initComponent.call(this);
    },
    
    /**
     * Update the form, using information from the given big eat item.
     *
     * @param {Object}
     *            bigEatItem is the item to update the form for.
     */
    updateItemDetails: function(bigEatItem){
        this.load(bigEatItem);
    }
});
