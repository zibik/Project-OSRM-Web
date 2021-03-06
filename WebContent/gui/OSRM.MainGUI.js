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

// OSRM MainGUI
// [handles all GUI events that interact with appearance of main window]


OSRM.GUI.extend( {
		
// defaults
visible: null,
width: null,

// init GUI
init: function() {
	OSRM.GUI.visible = true;
	OSRM.GUI.width = document.getElementById("main-wrapper").clientWidth;
	
	// init starting source/target
	document.getElementById('gui-input-source').value = OSRM.DEFAULTS.ONLOAD_SOURCE;
	document.getElementById('gui-input-target').value = OSRM.DEFAULTS.ONLOAD_TARGET;
	
	// init events
	document.getElementById("gui-toggle-in").onclick = OSRM.GUI.toggleMain;
	document.getElementById("gui-toggle-out").onclick = OSRM.GUI.toggleMain;

	// gui after transition events
	if( OSRM.Browser.FF3==-1 && OSRM.Browser.IE6_9==-1 ) {
		document.getElementById('main-wrapper').addEventListener("transitionend", OSRM.GUI._onMainTransitionEnd, false);
		document.getElementById('main-wrapper').addEventListener("webkitTransitionEnd", OSRM.GUI._onMainTransitionEnd, false);
		document.getElementById('main-wrapper').addEventListener("oTransitionEnd", OSRM.GUI._onMainTransitionEnd, false);
		document.getElementById('main-wrapper').addEventListener("MSTransitionEnd", OSRM.GUI._onMainTransitionEnd, false);
	}
	
	// set default language
	OSRM.Localization.setLanguage( OSRM.DEFAULTS.LANGUAGE );
},

// set language dependent labels
setLabels: function() {
	document.getElementById("open-josm").innerHTML = OSRM.loc("OPEN_JOSM");
	document.getElementById("open-osmbugs").innerHTML = OSRM.loc("OPEN_OSMBUGS");	
	document.getElementById("gui-reset").innerHTML = OSRM.loc("GUI_RESET");
	document.getElementById("gui-reverse").innerHTML = OSRM.loc("GUI_REVERSE");
	document.getElementById("gui-option-highlight-nonames-label").innerHTML = OSRM.loc("GUI_HIGHLIGHT_UNNAMED_ROADS");
	document.getElementById("gui-options-toggle").innerHTML = OSRM.loc("GUI_OPTIONS");
	document.getElementById("gui-search-source").innerHTML = OSRM.loc("GUI_SEARCH");
	document.getElementById("gui-search-target").innerHTML = OSRM.loc("GUI_SEARCH");
	document.getElementById("gui-search-source-label").innerHTML = OSRM.loc("GUI_START")+":";
	document.getElementById("gui-search-target-label").innerHTML = OSRM.loc("GUI_END")+":";
	document.getElementById("gui-input-source").title = OSRM.loc("GUI_START_TOOLTIP");
	document.getElementById("gui-input-target").title = OSRM.loc("GUI_END_TOOLTIP");
	document.getElementById("legal-notice").innerHTML = OSRM.loc("GUI_LEGAL_NOTICE");
},

//clear output area
clearResults: function() {
	document.getElementById('information-box').innerHTML = "";
	document.getElementById('information-box-header').innerHTML = "";	
},

//show/hide small options bubble
toggleOptions: function() {
	if(document.getElementById('options-box').style.visibility=="visible") {
		document.getElementById('options-box').style.visibility="hidden";
	} else {
		document.getElementById('options-box').style.visibility="visible";
	}
},
	
// show/hide main-gui
toggleMain: function() {
	// show main-gui
	if( OSRM.GUI.visible == false ) {
		OSRM.Browser.getElementsByClassName(document,'leaflet-control-zoom')[0].style.visibility="hidden";
		OSRM.Browser.getElementsByClassName(document,'leaflet-control-zoom')[0].style.left=(OSRM.GUI.width+10)+"px";;
		
		document.getElementById('blob-wrapper').style.visibility="hidden";
		document.getElementById('main-wrapper').style.left="5px";
	// hide main-gui
	} else {
		OSRM.Browser.getElementsByClassName(document,'leaflet-control-zoom')[0].style.visibility="hidden";
		OSRM.Browser.getElementsByClassName(document,'leaflet-control-zoom')[0].style.left="30px";
			
		document.getElementById('main-wrapper').style.left=-OSRM.GUI.width+"px";
	}

	// execute after animation (old browser support)
	if( OSRM.Browser.FF3!=-1 || OSRM.Browser.IE6_9!=-1 )
		OSRM.GUI._onMainTransitionEnd();		
},

// do stuff after main-gui animation finished
_onMainTransitionEnd: function() {
	// after hiding main-gui
	if( OSRM.GUI.visible == true ) {
		document.getElementById('blob-wrapper').style.visibility="visible";
		OSRM.Browser.getElementsByClassName(document,'leaflet-control-zoom')[0].style.visibility="visible";
		OSRM.GUI.visible = false;		
	// after showing main-gui
	} else {
		OSRM.Browser.getElementsByClassName(document,'leaflet-control-zoom')[0].style.visibility="visible";
 		OSRM.GUI.visible = true;		
	}
}

});
