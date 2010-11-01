/**
 * The Big Eat item view
 */
BigEats.views.MainView = Ext.extend(Ext.Panel, {
    layout: 'card',
    activeItem: 0,
    
    initComponent: function(){
    
        this.initToolBar();
        this.dockedItems = [this.topToolBar];
        
        this.initContainerPanels();
        this.items = [this.list, this.map];
        
        BigEats.views.MainView.superclass.initComponent.call(this);
        
        this.list.on('itemtap', this.onBigEatsListItemDetailsTap, this);
    },
    
    initToolBar: function(){
        this.backButton = new Ext.Button({
            text: 'Back',
            ui: 'back',
            handler: this.onBackTap,
        });
        
        this.statsBox = new Ext.Panel({
            title: 'Stats',
            floating: true,
            modal: true,
            centered: false,
            width: Ext.is.Phone ? 260 : 400,
            height: Ext.is.Phone ? 220 : 400,
            styleHtmlContent: true,
            scroll: 'vertical',
            cls: 'htmlcontent'
        });
        
        this.statsButton = new Ext.Button({
            iconCls: 'more',
            handler: this.onStatsTap,
        });
        
        this.viewTypeButton = new Ext.Button({
            iconCls: 'globe1',
            handler: this.onViewTap,
        });
        
        this.topToolBar = new Ext.Toolbar({
            title: 'Items',
            dock: 'top',
            
            scroll: {
                direction: 'horizontal',
                scrollbars: false
            },
            
            defaults: {
                scope: this,
                iconMask: true,
            },
            
            items: [this.backButton, {
                flex: 1,
                xtype: 'spacer'
            }, this.viewTypeButton]
        });
    },
    
    initContainerPanels: function(){
        // list view contents
        this.list = new BigEats.views.BigEatsList({});
        
        // map view
        this.map = new BigEats.views.BigEatsMap({});
    },
    
    onStatsTap: function(button, event){
        this.statsBox.showBy(this.statsButton);
    },
    
    onViewTap: function(button, event){
        var item = this.getActiveItem();
        if (item === this.list) {
            button.setIconClass('list');
            this.setCard(this.map, this.getViewTransitionAnimation());
            this.map.loadMarkers();
        }
        else 
            if (item === this.map) {
                button.setIconClass('globe1');
                this.setCard(this.list, this.getViewTransitionAnimation());
            }
        // else
    },
    
    /**
     * Obtains the view transition animation to use
     */
    getViewTransitionAnimation: function(){
        return Ext.is.Android ? false : {
            type: 'flip',
            direction: 'right',
            duration: 1200,
        };
    },
    
    onBackTap: function(button, event){
        var activeItem = this.layout.activeItem, idx = this.items.items.indexOf(activeItem), ownerCt = idx === 0 ? this.ownerCt : this, animCfg = Ext.is.Android ? false : {
            type: 'slide',
            direction: 'right'
        };
        ownerCt.layout.prev(animCfg);
    },
    
    onBigEatsListItemDetailsTap: function(dv, index, item, e){
        var ds = dv.getStore(), r = ds.getAt(index);
        this.fireEvent(BigEats.events.BIGEAT_ITEM_DETAILS_SELECT, r);
    },
    
    /**
     * Populates the view using the given scavenger hunt
     *
     * @param {Object}
     *            bigEat is the scavenger hunt to populate the view with
     */
    loadItemsForBigEat: function(bigEat){
        var localStorageId = this.buildLocalStorageId(bigEat);
        if (localStorageId == null) {
            Ext.Msg.Alert('No id for big eat', 'Looks like this big eat does not have an id');
            return;
        }
        
        var store = BigEats.stores.LocalStorageItems;
        
        store.setProxy({
            type: 'localstorage',
            id: localStorageId
        });
        store.load({
            scope: this,
            callback: function(operation){
            
                // if the big eat list doesn't exist in local storage,
                // read them from the json resource
                if (store.getCount() == 0) {
                    Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
                    BigEats.BigEatsService.getItemsForBigEat(bigEat.get('bigeat_id'), this.onLoadEats, this);
                }
            }
        });
    },
    
    onLoadEats: function(bigEatId, items){
        var store = BigEats.stores.LocalStorageItems;
        if (items == null) {
            Ext.Msg.alert('Items not loaded', 'Could not load items for Big Eat \'' + bigEatId +
            '\' :( ');
        }
        else {
            store.getProxy().clear();
            store.loadData(items, false);
            store.sync();
        }
        Ext.getBody().unmask();
    },
    
    /**
     * Builds the local storage id (key) to use off of the given big eat.
     *
     * @param {Object}
     *            bigEat is the big eat to build the key from.
     */
    buildLocalStorageId: function(bigEat){
        var bigEatId = bigEat.get('bigeat_id');
        return bigEatId == null ? null : 'bigEatItems-' + bigEatId;
    }
});
