/**
 * The scavenger hunt selection view
 *
 * @author mattt
 */
BigEats.clearedVisited = false;
BigEats.views.SelectionView = Ext.extend(Ext.Panel, {
    layout: 'fit',
    cls: 'start-screen',
    
    initComponent: function(){
    
        this.initToolBar();
        this.dockedItems = [this.topToolBar];
        
        this.bigeatsList = new Ext.List({
            itemSelector: '.bigeats-list-item',
            singleSelect: true,
            scroll: true,
            store: BigEats.stores.BigEats,
            tpl: Ext.XTemplate.from('bigeats-list'),
        });
        
        this.items = [this.bigeatsList];
        
        BigEats.views.SelectionView.superclass.initComponent.call(this);
        
        this.bigeatsList.on('itemtap', this.onBigEatsListItemTap, this);
    },
    
    initToolBar: function(){
    
        this.clearButton = new Ext.Button({
            text: 'Clear',
            ui: 'confirm',
            handler: this.onClear,
        });
        
        this.aboutBox = new Ext.Panel({
            title: 'About',
            floating: true,
            modal: true,
            centered: false,
            width: Ext.is.Phone ? 260 : 400,
            height: Ext.is.Phone ? 220 : 400,
            styleHtmlContent: true,
            scroll: 'vertical',
            contentEl: 'about',
            cls: 'htmlcontent'
        });
        
        this.confirmClearDialog = new Ext.MessageBox({});
        this.confirmClearDialog.on('hide', this.onConfirmClearDialogHide, this);
        
        this.infoButton = new Ext.Button({
            iconCls: 'info',
            handler: this.onInfo,
        });
        
        this.topToolBar = new Ext.Toolbar({
            title: BigEats.constants.APP_TITLE,
            dock: 'top',
            
            scroll: {
                direction: 'horizontal',
                scrollbars: false
            },
            
            defaults: {
                scope: this,
                iconMask: true,
            },
            
            items: [{
                flex: 1,
                xtype: 'spacer'
            }, this.clearButton]
        });
    },
    
    onInfo: function(button, event){
        this.aboutBox.showBy(button);
    },
    
    onClear: function(button, event){
       //TODO no global flag
        BigEats.clearedVisited = false;
        this.confirmClearDialog.confirm('Clear Items', 'Are you sure that you want to clear the items that you have tried?', function(){
            localStorage.clear();
            BigEats.clearedVisited = true;
        }, this);
    },
    
    onConfirmClearDialogHide: function(dialog){
        if (BigEats.clearedVisited) {
            Ext.Msg.alert('Cleared Items', 'Items have been cleared');
        }
    },
    
    onBigEatsListItemTap: function(dv, index, item, e){
        var ds = dv.getStore(), r = ds.getAt(index);
        this.fireEvent(BigEats.events.BIGEAT_ITEM_SELECT, r);
    },
});
