Ext.ns('BigEats', 'BigEats.views', 'BigEats.stores', 'BigEats.constants', 'BigEats.events');

Ext.setup({
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: true,
    
    onReady: function(){
        var app = new BigEats.App();
    }
});
