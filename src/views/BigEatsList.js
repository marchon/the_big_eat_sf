/**
 * Big eat item list.
 * @author mattt
 */
BigEats.views.BigEatsList = Ext.extend(Ext.List, {
    itemSelector: '.bigeatsitem-list-item',
    singleSelect: true,
    grouped: true,
    indexBar: true,
    initComponent: function(){
    
        this.store = BigEats.stores.LocalStorageItems;
        this.tpl = Ext.XTemplate.from('bigeatsitem-list');
        
        this.initSearchToolbar();
        dockedItems: [this.searchToolbar]
        
        BigEats.views.BigEatsList.superclass.initComponent.call(this);
    },
    
    initSearchToolbar: function(){
    
        var searchTextField = this.initSearchTextField();
        this.searchToolbar = new Ext.Toolbar({
            dock: 'top',
            
            items: [{
                xtype: 'spacer'
            }, searchTextField, {
                xtype: 'spacer'
            }]
        });
    },
    
    initSearchTextField: function(){
        var searchTextField = {
            xtype: 'textfield',
            placeHolder: 'Lookup...',
            listeners: {
                scope: this,
                
                keyup: function(field){
                    var value = field.getValue();
                    
                    if (!value) {
                        store.filterBy(function(){
                            return true;
                        });
                    }
                    else {
                        var searches = value.split(' '), regexps = [], i;
                        
                        for (i = 0; i < searches.length; i++) {
                            if (!searches[i]) 
                                return;
                            regexps.push(new RegExp(searches[i], 'i'));
                        };
                        
                        store.filterBy(function(record){
                            var matched = [];
                            
                            for (i = 0; i < regexps.length; i++) {
                                var search = regexps[i];
                                
                                if (record.get('item_name').match(search) || record.get('venue_name').match(search)) 
                                    matched.push(true);
                                else 
                                    matched.push(false);
                            };
                            
                            if (regexps.length > 1 && matched.indexOf(false) != -1) {
                                return false;
                            }
                            else {
                                return matched[0];
                            }
                        });
                    }
                }
            }
        };
        return searchTextField;
    },
});
