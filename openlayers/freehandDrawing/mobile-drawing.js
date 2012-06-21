function init() {
    for (var i = 1; i < 3; i++) {
        // create a vector layer for drawing
        var vector = new OpenLayers.Layer.Vector('Vector Layer', {
            styleMap: new OpenLayers.StyleMap({
                temporary: OpenLayers.Util.applyDefaults({
                    pointRadius: 16
                }, OpenLayers.Feature.Vector.style.temporary)
            })
        });
    
        // OpenLayers' EditingToolbar internally creates a Navigation control, we
        // want a TouchNavigation control here so we create our own editing toolbar
        var toolbar = new OpenLayers.Control.Panel({
            displayClass: 'olControlEditingToolbar'
        });
        toolbar.addControls([
            // this control is just there to be able to deactivate the drawing
            // tools
            new OpenLayers.Control({
                displayClass: 'olControlNavigation'
            }),
            new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Polygon, {
                displayClass: 'olControlDrawFeaturePolygon',
                handlerOptions: {
                  freehand: true
                },
            })
        ]);
    
        var osm = new OpenLayers.Layer.OSM();
        osm.wrapDateLine = false;
    
        map = new OpenLayers.Map({
            div: 'map' + i,
            projection: 'EPSG:900913',
            numZoomLevels: 18,
            controls: [
                new OpenLayers.Control.TouchNavigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }
                }),
                new OpenLayers.Control.Zoom(),
                toolbar
            ],
            layers: [osm, vector],
            center: new OpenLayers.LonLat(0, 0),
            zoom: 1,
            theme: null
        });
    
        // activate the first control to render the "navigation icon"
        // as active
        toolbar.controls[0].activate();
    }
}
