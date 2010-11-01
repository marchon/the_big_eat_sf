Ext.ns('BigEats', 'BigEats.views', 'BigEats.stores', 'BigEats.constants', 'BigEats.events');

Ext.setup({
    phoneStartupScreen: 'resources/images/phone_startup.png',
    icon: 'resources/images/icon.png',
    glossOnIcon: true,
    
    onReady: function(){
        var app = new BigEats.App();
    }
});
