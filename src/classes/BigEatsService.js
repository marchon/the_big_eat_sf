/**
 * Big Eats service
 *
 * @author mattt
 */
BigEats.BigEatsServiceImpl = Ext.extend(Object, {

    /**
     * Obtains the list of items for the big eat with the given id.
     * @param {String} bigEatId is the big eat id to obtain the items for
     * @param {Function} callback is the callback to execute upon a successful request.
     * @param {Object} scope is the scope
     */
    getItemsForBigEat: function(bigEatId, callback, scope){
        this.onItemsForBigEat = 
			Ext.createDelegate(BigEats.BigEatsServiceImpl.prototype.onItemsForBigEat, 
			scope || window, [bigEatId, callback, scope], true);
        
        Ext.Ajax.request({
            url: this.buildBigEatUrl(bigEatId),
            scope: scope,
            callback: this.onItemsForBigEat,
        });
    },
    
    /**
     * Callback for a successful request
     *
     * @param {Array} options is the set of options associated with this request
     * @param {Boolean} success true if the request was successful, false otherwise
     * @param {Object} response is the response object for this request
     * @param {String} bigEatId is the big eat id associated with this request
     * @param {Function} callback is the callback to call
     * @param {Object} scope is the scope
     */
    onItemsForBigEat: function(options, success, response, bigEatId, callback, scope){
        //TODO right now we return null to indicate that the items should not be loaded
        var jsonResponse = !success ? null : Ext.decode(response.responseText);
        callback.call(scope || window, bigEatId, jsonResponse);
    },
    
    /**
     * Builds the url for a given ajax request
     * @param {String} bigEatId
     */
    buildBigEatUrl: function(bigEatId){
        return bigEatId + '.json';
    }
});

BigEats.BigEatsService = new BigEats.BigEatsServiceImpl();