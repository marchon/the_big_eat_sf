/**
 * Application entry point/controller
 *
 * @author mattt
 */
BigEats.App = Ext.extend(Ext.Panel, {
    cls: 'app',
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
    
    initComponent: function(){
        this.selectionScreen = new BigEats.views.SelectionView({
            flex: 1
        });
        
        this.mainView = new BigEats.views.MainView({});
        
        this.detailView = new BigEats.views.BigEatsDetailsView({});
        
        // the splash screen
        this.splash = new Ext.Container({
            cls: 'splash',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'end'
            },
            listeners: {
                deactivate: this.onSplashDeactivate,
                scope: this
            },
            items: [this.selectionScreen]
        });
        
        this.items = [this.splash, this.mainView, this.detailView];
        
        BigEats.App.superclass.initComponent.call(this);
        
        this.selectionScreen.on(BigEats.events.BIGEAT_ITEM_SELECT, 
		  this.onBigEatsItemSelect, this);
        this.mainView.on(BigEats.events.BIGEAT_ITEM_DETAILS_SELECT, 
		  this.onBigEatsItemDetailsSelect, this);
    },
    
    onSplashDeactivate: function(){
        this.selectionScreen.bigeatsList.clearSelections();
    },
    
    onBigEatsItemSelect: function(bigEat){
        this.setCard(this.mainView, 'slide');
        this.mainView.topToolBar.setTitle("Items: " +
        bigEat.get('year'));
        this.mainView.loadItemsForBigEat(bigEat);
    },
    
    onBigEatsItemDetailsSelect: function(bigEatItem){
        this.setCard(this.detailView, 'slide');
        this.detailView.topToolBar.setTitle(bigEatItem.get('item_name') +
        ' @ ' +
        bigEatItem.get('venue_name'));
        this.detailView.updateItemDetails(bigEatItem);
    },

});
