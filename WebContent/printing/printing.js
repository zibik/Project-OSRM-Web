/*
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU AFFERO General Public License as published by
the Free Software Foundation; either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
or see http://www.gnu.org/licenses/agpl.txt.
*/

// OSRM initialization
// [for printing window]

OSRM = {};
OSRM.GLOBALS = {};
OSRM.GUI = { visible:false };
OSRM.G = OSRM.GLOBALS;


//print the window
function printWindow() {
	window.print();
}


//prefetch icons
OSRM.GLOBALS.icons = {};
prefetchIcons = function(images_list) {
	var icon_list = [	{id:'marker-source',					image_id:'marker-source'},
						{id:'marker-target',					image_id:'marker-target'},
						{id:'marker-via',						image_id:'marker-via'},
						{id:'marker-highlight',					image_id:'marker-highlight'}
		              ];

	for(var i=0; i<icon_list.length; i++) {
		var icon = {
				iconUrl: "../"+images_list[icon_list[i].image_id].getAttribute("src"), iconSize: new L.Point(25, 41), iconAnchor: new L.Point(13, 41),
				shadowUrl: "../"+images_list["marker-shadow"].getAttribute("src"), shadowSize: new L.Point(41, 41),
				popupAnchor: new L.Point(0, -33)
			};
		OSRM.G.icons[icon_list[i].id] = new L.SwitchableIcon(icon);
	}
};


// function to initialize a map in the new window
function drawMap(tile_server, bounds) {
 	// setup map
	var tile_layer = new L.TileLayer(tile_server.url, tile_server.options);
	OSRM.G.map = new OSRM.MapView("overview-map", {
    	center: new L.LatLng(48.84, 10.10),
	    zoom: 13,
	    zoomAnimation: false,
	    fadeAnimation: false,
	    layers: [tile_layer],
	    attributionControl: false,
	    zoomControl: false,
	    dragging:false,
	    scrollWheelZoom:false,
	    touchZoom:false,
	    doubleClickZoom:false
	});
	
	OSRM.G.map.fitBoundsUI(bounds);
	return OSRM.G.map.getBoundsZoom(bounds);
}


// manage makers
function drawMarkers( markers ) {
	OSRM.G.map.addLayer( new L.MouseMarker( markers[0].getPosition(), {draggable:false,clickable:false,icon:OSRM.G.icons['marker-source']} ) );
	for(var i=1, size=markers.length-1; i<size; i++)
		OSRM.G.map.addLayer( new L.MouseMarker( markers[i].getPosition(), {draggable:false,clickable:false,icon:OSRM.G.icons['marker-via']} ) );
	OSRM.G.map.addLayer( new L.MouseMarker( markers[markers.length-1].getPosition(), {draggable:false,clickable:false,icon:OSRM.G.icons['marker-target']} ) );
}


// manage route
function drawRoute( positions ) {
	OSRM.G.route = new L.DashedPolyline();
	OSRM.G.route.setLatLngs( positions );
	OSRM.G.route.setStyle( {dashed:false,clickable:false,color:'#0033FF', weight:5} );
	OSRM.G.map.addLayer( OSRM.G.route );	
}
function updateRoute( positions ) {
	OSRM.G.route.setLatLngs( positions );
}


// start populating the window when it is fully loaded
window.opener.OSRM.Browser.onLoadHandler( window.opener.OSRM.Printing.printWindowLoaded, window );