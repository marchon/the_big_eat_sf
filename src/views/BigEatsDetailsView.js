/**
 * Big eats details view
 *
 * @author mattt
 */
BigEats.views.BigEatsDetailsView = Ext.extend(Ext.Panel, {
    layout: 'card',
    cls: 'card',
    
    initComponent: function(){
    
        this.topToolBar = new Ext.Toolbar({
            title: 'Details',
            dock: 'top',
            items: [{
                text: 'Back',
                ui: 'back',
                handler: this.backBtn,
                scope: this
            }]
        });
        this.dockedItems = [this.topToolBar];
        
        this.detailsForm = new BigEats.views.BigEatsDetailsForm();
        this.items = [this.detailsForm];
        
        BigEats.views.BigEatsDetailsView.superclass.initComponent.call(this);
        
    },
    
    /**
     * Update the view using the information from the given big eat item
     *
     * @param {Object}
     *            bigEatItem is the item to update the view for
     */
    updateItemDetails: function(bigEatItem){
        this.detailsForm.updateItemDetails(bigEatItem);
    },
    
    /**
     * Back button onTab event handler
     */
    backBtn: function(){
        var activeItem = this.layout.activeItem, 
		  idx = this.items.indexOf(activeItem), 
		  ownerCt = idx === 0 ? this.ownerCt : this, 
		  animCfg = Ext.is.Android ? false : 
		{
            type: 'slide',
            direction: 'right'
        };
        
        ownerCt.layout.prev(animCfg);
    },

});
