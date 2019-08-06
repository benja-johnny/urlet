// Urlet URL
const urlet_url = 'https://benja-johnny.github.io/urlet/';

// Menu choices, needs to be global
var urlet_menu_choices = {"style":false, "script":false, "template":false, "comment":false};

// Adds the modal menu to the page
function urlet_menu() {
    // Add style
    var modal_style = document.createElement("style");
    modal_style.innerHTML = ".urlet-modal { all: initial; display: none; position: fixed; z-index: 1; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4); } .urlet-modal-content { background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%; } .urlet-close { color: #aaaaaa; float: right; font-size: 28px; font-weight: bold; padding-left: 20px; } .urlet-close:hover, .urlet-close:focus { color: #000; text-decoration: none; cursor: pointer; }";
    modal_style.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(modal_style);
    // Add menu items
    var urlet_modal = document.createElement("div");
    urlet_modal.setAttribute("id", "urlet_modal");
    urlet_modal.setAttribute("class", "urlet-modal");
    document.getElementsByTagName("body")[0].appendChild(urlet_modal);
    var modal_content = document.createElement("div");
    modal_content.setAttribute("class", "urlet-modal-content");
    // Create form
    modal_content.innerHTML = "<span class='urlet-close'>&times;</span><form name='urlet_popup_form' onsubmit='return urlet_main();'><fieldset><legend>Would you like to include these?</legend><p><input type='checkbox' name='style' value='true' id='c_b_style'> Style</p><p><input type='checkbox' name='script' value='true' id='c_b_script'> Script</p><p><input type='checkbox' name='template' value='true' id='c_b_template'> Template</p><p><input type='checkbox' name='comment' value='true' id='c_b_comment'> Comment</p><p><input type='submit' /></p></fieldset></form>";
    urlet_modal.appendChild(modal_content);
    // Add menu script
    var modal_script = document.createElement("script");
    modal_script.innerHTML = "var urlet_modal = document.getElementById('urlet_modal');\nvar urlet_span_close = document.getElementsByClassName('urlet-close')[0];\nurlet_modal.style.display = 'block';\nurlet_span_close.onclick = function() {\nurlet_modal.style.display = 'none';\nlocation.reload(false);\n}\nwindow.onclick = function(event) {\nif (event.target == urlet_modal) {\nurlet_modal.style.display = 'none';\nlocation.reload(false);\n}\n}\nc_b_style.onclick = function() {\nif(urlet_menu_choices.style) urlet_menu_choices.style = false;\nelse urlet_menu_choices.style = true;\n}\nc_b_script.onclick = function() {\nif(urlet_menu_choices.script) urlet_menu_choices.script = false;\nelse urlet_menu_choices.script = true;\n}\nc_b_template.onclick = function() {\nif(urlet_menu_choices.template) urlet_menu_choices.template = false;\nelse urlet_menu_choices.template = true;\n}\nc_b_comment.onclick = function() {\nif(urlet_menu_choices.comment) urlet_menu_choices.comment = false;\nelse urlet_menu_choices.comment = true;\n}\n";
    modal_script.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(modal_script);
    // Add lz-string-1.4.4.js
    var lz_script = document.createElement("script");
    lz_script.setAttribute("type", "text/javascript");
    lz_script.setAttribute("src", urlet_url + "scripts/lz-string-1.4.4.js");
    lz_script.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(lz_script);
    // Add himalaya.js
    var himalaya = document.createElement("script");
    himalaya.setAttribute("type", "text/javascript");
    himalaya.setAttribute("src", urlet_url + "scripts/himalaya.js");
    himalaya.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(himalaya);
}

// Main function, triggered by submit button
function urlet_main() {
    // Remove unneeded elements from parsed HTML (JSON)
    function cleanHTML(data) {
        var cleaned_html = data;
        var clear_next = false;
        var clear_children = false;
        // Iterate through (nested) data
        function it(d) {
            for(var i in d) {
                // If the next element's an Urlet item
                if((d[i].value == "urlet-item") || (d[i].value == "urlet_modal")) {
                    clear_next = true;
                    clear_children = true;
                }
                
                // Menu switches
                if(!urlet_menu_choices.style && (d[i].tagName == "style")) clear_next = true;
                if(!urlet_menu_choices.script && (d[i].tagName == "script")) clear_next = true;
                if(!urlet_menu_choices.template && (d[i].tagName == "template")) clear_children = true;
                if(!urlet_menu_choices.comment && (d[i].type == "comment")) d[i].content = "";
                
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
    // Convert page
    var encoded_page =
        LZString144.compressToBase64(
        window.himalaya.stringify(
        cleanHTML(
        window.himalaya.parse(
        document.documentElement.outerHTML))));
    // Load the encoded page in new window
    window.open(urlet_url + "#" + encoded_page);
    // Reload page from cache
    location.reload(false);
    // Submit button doesn't need to do anything
    return false;
}

