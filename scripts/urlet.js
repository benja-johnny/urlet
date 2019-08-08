// Urlet URL
const URLET_URL = 'https://benja-johnny.github.io/urlet/';

// Menu choices, needs to be global
var URLET_MENU_CHOICES = {"style":false, "script":false, "template":false, "comment":false};

// Adds the modal menu to the page
function urlet_menu() {

    // Add modal style
    var modal_style = document.createElement("style");
    modal_style.innerHTML = ".urlet-modal { display: none; position: fixed; z-index: 1; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4); }";
    modal_style.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(modal_style);
    
    // Add iframe
    var urlet_modal = document.createElement("iframe");
    urlet_modal.setAttribute("id", "urlet_modal");
    urlet_modal.setAttribute("class", "urlet-modal");
    document.getElementsByTagName("body")[0].appendChild(urlet_modal);
    urlet_modal.style.display = "block";
    
    // Add style to iframe contents
    var iframe_style = document.createElement("style");
    iframe_style.innerHTML = ".urlet-modal-content { background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%; } .urlet-close { color: #aaaaaa; float: right; font-size: 28px; font-weight: bold; padding-left: 20px; } .urlet-close:hover, .urlet-close:focus { color: #000; text-decoration: none; cursor: pointer; }";
    iframe_style.setAttribute("id", "urlet-item");
    urlet_modal.contentDocument.getElementsByTagName("head")[0].appendChild(iframe_style);
    
    // Create form in iframe
    var modal_content = document.createElement("div");
    modal_content.setAttribute("class", "urlet-modal-content");
    modal_content.innerHTML = "<span class='urlet-close'>&times;</span><form name='urlet_popup_form' onsubmit='return window.parent.urlet_main();'><fieldset><legend>Including these will make the link longer</legend><p><input type='checkbox' name='style' value='true' id='c_b_style'> Style</p><p><input type='checkbox' name='script' value='true' id='c_b_script'> Script</p><p><input type='checkbox' name='template' value='true' id='c_b_template'> Template</p><p><input type='checkbox' name='comment' value='true' id='c_b_comment'> Comment</p><p><input type='submit' /></p></fieldset></form>";
    urlet_modal.contentDocument.getElementsByTagName("body")[0].appendChild(modal_content);
    
    // Add menu script to iframe
    var modal_script = document.createElement("script");
    modal_script.innerHTML = "var urlet_modal = window.parent.document.getElementById('urlet_modal');\nvar urlet_span_close = document.getElementsByClassName('urlet-close')[0];\nurlet_span_close.onclick = function() {\nurlet_modal.style.display = 'none';\nwindow.parent.location.reload(false);\n}\nwindow.parent.onclick = function(event) {\nif (event.target == urlet_modal) {\nurlet_modal.style.display = 'none';\nwindow.parent.location.reload(false);\n}\n}\nc_b_style.onclick = function() {\nif(window.parent.URLET_MENU_CHOICES.style) window.parent.URLET_MENU_CHOICES.style = false;\nelse window.parent.URLET_MENU_CHOICES.style = true;\n}\nc_b_script.onclick = function() {\nif(window.parent.URLET_MENU_CHOICES.script) window.parent.URLET_MENU_CHOICES.script = false;\nelse window.parent.URLET_MENU_CHOICES.script = true;\n}\nc_b_template.onclick = function() {\nif(window.parent.URLET_MENU_CHOICES.template) window.parent.URLET_MENU_CHOICES.template = false;\nelse window.parent.URLET_MENU_CHOICES.template = true;\n}\nc_b_comment.onclick = function() {\nif(window.parent.URLET_MENU_CHOICES.comment) window.parent.URLET_MENU_CHOICES.comment = false;\nelse window.parent.URLET_MENU_CHOICES.comment = true;\n}\n";
    modal_script.setAttribute("id", "urlet-item");
    urlet_modal.contentDocument.getElementsByTagName("head")[0].appendChild(modal_script);
    
    // Add lz-string-1.4.4.js
    var lz_script = document.createElement("script");
    lz_script.setAttribute("type", "text/javascript");
    lz_script.setAttribute("src", URLET_URL + "scripts/lz-string-1.4.4.js");
    lz_script.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(lz_script);
    
    // Add himalaya.js
    var himalaya = document.createElement("script");
    himalaya.setAttribute("type", "text/javascript");
    himalaya.setAttribute("src", URLET_URL + "scripts/himalaya.js");
    himalaya.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(himalaya);
}

// Main function, triggered by submit button
function urlet_main() {
    var stylesheet_link = "";
    
    // Hide modal
    var urlet_modal = document.getElementById("urlet_modal");
    urlet_modal.style.display = "none";

    // Remove unneeded elements from parsed HTML (JSON)
    function cleanHTML(data) {
        var cleaned_html = data;
        var clear_next = false;
        var clear_children = false;
        var stylesheet_next = false;
        
        // Iterate through (nested) data
        function it(d) {
            for(var i in d) {
                // Can't be null, or else we get a type error
                if(d[i] == null) d[i] = [];
                    
                // If the next element's an Urlet item
                if((d[i].value == "urlet-item") || (d[i].value == "urlet_modal")) {
                    clear_next = true;
                    clear_children = true;
                }
                // Save stylesheet
                if(URLET_MENU_CHOICES.style && (d[i].value == "stylesheet")) stylesheet_next = true;
                if(stylesheet_next && (d[i].key == "href")) {
                    stylesheet_next = false;
                    stylesheet_link = d[i].value;
                }
                // Menu switches
                if(!URLET_MENU_CHOICES.style && (d[i].tagName == "style")) clear_next = true;
                if(!URLET_MENU_CHOICES.script && (d[i].tagName == "script")) clear_next = true;
                if(!URLET_MENU_CHOICES.template && (d[i].tagName == "template")) clear_children = true;
                if(!URLET_MENU_CHOICES.comment && (d[i].type == "comment")) d[i].content = "";
                
                // If the next text element's getting cleared
                if(clear_next && (d[i].type == "text")) {
                    clear_next = false;
                    d[i].content = "";
                }
                // If the child element's getting cleared
                if(clear_children && (i == "children")) {
                    clear_children = false;
                    d[i] = [];
                }
                // If it's an object, iterate through it
                if(typeof d[i] === "object") it(d[i]);
            }
        }
        it(data);
        return cleaned_html;
    }
    // Fetch function for stylesheet
    function fetchStylesheet(url, callback) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
                callback(xmlhttp.responseText);
        }
        xmlhttp.send();
    }
    // Add linked stylesheet to <head>
    function insertStylesheet(d) {
        var r = "";
        if(!URLET_MENU_CHOICES.style) r = d;
        else {
            var i = d.indexOf("<head>") + 6;
            var s = "";
            fetchStylesheet(stylesheet_link, function(response) {
                s = response;
            });
            r = d.slice(0, i) + "\n<style>\n" + s + "\n</style>\n" + d.slice(i);
        }
        return r;
    }
    // Convert page
    var encoded_page =
        LZString144.compressToBase64(
        insertStylesheet(
        window.himalaya.stringify(
        cleanHTML(
        window.himalaya.parse(
        document.documentElement.outerHTML)))));
    
    // Load the encoded page in new window
    window.open(URLET_URL + "#" + encoded_page);
    
    // Reload page from cache
    location.reload(false);
    
    // Submit button doesn't need to do anything
    return false;
}

