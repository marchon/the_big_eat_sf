/**
 * Big eats map view
 *
 * @author mattt
 */
BigEats.mapPanel;
BigEats.mapInfoBubble;

// centered at nopa :)
BigEats.DEFAULT_MAP_CENTER = new google.maps.LatLng(37.7748432, -122.4377040);

BigEats.views.BigEatsMap = Ext.extend(Ext.Panel, {

    layout: 'card',
    initComponent: function(){
    
        this.mapMarkers = [];
        BigEats.mapInfoBubble = new google.maps.InfoWindow({});
        
        BigEats.mapPanel = new Ext.Map({
            title: 'Big Eats Map',
            // getLocation: true,
            
            mapOptions: {
            
                center: BigEats.DEFAULT_MAP_CENTER,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            
            listeners: {
                maprender: function(extMap, gMap){
                }
            }
        });
        
        this.items = [BigEats.mapPanel];
        BigEats.views.BigEatsMap.superclass.initComponent.call(this);
        
        // BigEats.mapPanel.geo.on('locationerror', function(geo,
        // bTimeout, bPermissionDenied, bLocationUnavailable, message){
        // console.log('location update error');
        // });
        // BigEats.mapPanel.geo.on('locationupdate', function(geo){
        // this.addCurrentPositionMarker(geo);
        // });
    },
    
    /**
     * Add a map marker for the user's current location
     *
     * @param {Object}
     *            geoLocation is the GeoLocation object for the user's
     *            current position
     */
    addCurrentPositionMarker: function(geoLocation){
    
        if (geoLocation) {
            if (currentPosMarker) {
                // reset the marker
                currentPosMarker.setMap(null);
            }
            var marker = this.addMarker('This is you!', 'You are here', null, geoLocation.latitude, geoLocation.longitude);
            currentPosMarker = marker;
        }
    },
    
    /**
     * Return true if the given coordinates are valid, false otherwise
     *
     * @param {Object}
     *            geoLat is the latitude coordinate
     * @param {Object}
     *            geoLng is the longitude coordinate
     */
    hasCoordinates: function(geoLat, geoLng){
        return (!geoLat || !geoLng) ? false : true;
    },
    
    /**
     * Deletes all markers on the current map
     */
    deleteMarkers: function(){
        for (var i = 0; i < this.mapMarkers.length; i++) {
            this.mapMarkers[i].setMap(null);
        }
        this.mapMarkers.length = 0;
    },
    
    /**
     * Loads markers using the items in the given items store
     */
    loadMarkers: function(){
        // clear any existing markers before loading
        // TODO read from a cache in the future
        this.deleteMarkers();
        
        var store = BigEats.stores.LocalStorageItems;
        store.each(function(item){
        
            var geoLat = item.get('venue_geolat');
            var geoLng = item.get('venue_geolng');
            
            var venue = item.get('venue_name');
            var infoContents = this.buildInfoContents(item);
            
            var visited = item.get('visited');
            var image = visited ? BigEats.constants.VISITED_IMAGE : BigEats.constants.NOT_VISITED_IMAGE;
            
            if (this.hasCoordinates(geoLat, geoLng)) {
                var marker = this.addMarker(venue, infoContents, image, geoLat, geoLng);
                this.mapMarkers.push(marker);
            }
        }, this);
    },
    
    /**
     * Builds the contents of a map marker info bubble
     *
     * @param {Object}
     *            item is big eat item to use when populating the
     *            bubble.
     */
    buildInfoContents: function(item){
        var venue = item.get('venue_name');
        var address = item.get('venue_address');
        var name = item.get('item_name');
        var visited = item.get('visited');
        
        var header = name + ' @ ' + venue;
        var visitedString = 'Visited? ' +
        (visited ? ' Yep' : 'Not yet...');
        
        return '<h2>' + header + '</h2>' + '<p>' + address + '<br/>' +
        visitedString +
        '</p>';
    },
    
    /**
     * Adds a marker to the item map
     *
     * @param {Object}
     *            title the title of the info bubble
     * @param {Object}
     *            infoContents the contents of the info bubble
     * @param {Object}
     *            image the image to use for the map marker
     * @param {Object}
     *            geoLat the latitude coordinate
     * @param {Object}
     *            geoLng the longitude coordinate
     */
    addMarker: function(title, infoContents, image, geoLat, geoLng){
        var position = new google.maps.LatLng(geoLat, geoLng);
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            icon: image,
            shadow: BigEats.constants.SHADOW_IMAGE,
            map: BigEats.mapPanel.map
        });
        
        google.maps.event.addListener(marker, 'click', function(){
            BigEats.mapInfoBubble.setContent(infoContents);
            BigEats.mapInfoBubble.open(BigEats.mapPanel.map, marker);
        });
        return marker;
    },
});
