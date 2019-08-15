// Urlet URL
const URLET_URL = 'https://benja-johnny.github.io/urlet/';

// Menu choices
var URLET_MENU_CHOICES = {"style":false, "script":false, "link":false, "meta":false, "template":false, "comment":false};

// Adds the modal menu and scripts to the page
function urlet_menu() {

    // Add modal style
    var modal_style = document.createElement("style");
    modal_style.innerHTML = ".urlet-modal { display: none; position: fixed; z-index: 2147483647; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4); }";
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
    modal_content.innerHTML = "<span class='urlet-close'>&times;</span><form name='urlet_popup_form' onsubmit='return window.parent.urlet_main();'><fieldset><legend>Including these will make the link longer</legend><p><input type='checkbox' name='style' value='true' id='c_b_style'> Style </p><p><input type='checkbox' name='script' value='true' id='c_b_script'> Script </p><p><input type='checkbox' name='link' value='true' id='c_b_link'> Link </p><p><input type='checkbox' name='meta' value='true' id='c_b_meta'> Meta </p><p><input type='checkbox' name='template' value='true' id='c_b_template'> Template </p><p><input type='checkbox' name='comment' value='true' id='c_b_comment'> Comment </p><p><input type='submit' /></p></fieldset></form>";
    urlet_modal.contentDocument.getElementsByTagName("body")[0].appendChild(modal_content);
    
    // Add menu script to iframe
    var modal_script = document.createElement("script");
    modal_script.innerHTML = "var urlet_modal=window.parent.document.getElementById('urlet_modal');\nvar urlet_span_close=document.getElementsByClassName('urlet-close')[0];\nurlet_span_close.onclick=function(){\nurlet_modal.style.display='none';\nwindow.parent.location.reload(false);\n}\nwindow.parent.onclick=function(event){\nif(event.target==urlet_modal){\nurlet_modal.style.display='none';\nwindow.parent.location.reload(false);\n}\n}\nc_b_style.onclick=function(){\nif(window.parent.URLET_MENU_CHOICES.style)window.parent.URLET_MENU_CHOICES.style=false;\nelse window.parent.URLET_MENU_CHOICES.style=true;\n}\nc_b_script.onclick=function(){\nif(window.parent.URLET_MENU_CHOICES.script)window.parent.URLET_MENU_CHOICES.script=false;\nelse window.parent.URLET_MENU_CHOICES.script=true;\n}\nc_b_link.onclick=function(){\nif(window.parent.URLET_MENU_CHOICES.link)window.parent.URLET_MENU_CHOICES.link=false;\nelse window.parent.URLET_MENU_CHOICES.link=true;\n}\nc_b_meta.onclick=function(){\nif(window.parent.URLET_MENU_CHOICES.meta)window.parent.URLET_MENU_CHOICES.meta=false;\nelse window.parent.URLET_MENU_CHOICES.meta=true;\n}\nc_b_template.onclick=function(){\nif(window.parent.URLET_MENU_CHOICES.template)window.parent.URLET_MENU_CHOICES.template=false;\nelse window.parent.URLET_MENU_CHOICES.template=true;\n}\nc_b_comment.onclick=function(){\nif(window.parent.URLET_MENU_CHOICES.comment)window.parent.URLET_MENU_CHOICES.comment=false;\nelse window.parent.URLET_MENU_CHOICES.comment=true;\n}\n";
    modal_script.setAttribute("id", "urlet-item");
    urlet_modal.contentDocument.getElementsByTagName("head")[0].appendChild(modal_script);
    
    // Add elements to iframe after it has loaded (needed for Firefox)
    // Might cause trouble later
    urlet_modal.onload = function() {
        urlet_modal.contentDocument.getElementsByTagName("head")[0].appendChild(iframe_style);
        urlet_modal.contentDocument.getElementsByTagName("body")[0].appendChild(modal_content);
        urlet_modal.contentDocument.getElementsByTagName("head")[0].appendChild(modal_script);
    }
    
    // Add jQuery
    var jquery = document.createElement("script");
    jquery.setAttribute("src", "https://code.jquery.com/jquery-3.4.1.min.js");
    jquery.setAttribute("integrity", "sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=");
    jquery.setAttribute("crossorigin", "anonymous");
    jquery.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(jquery);
    
    // Add lz-string-1.4.4
    var lz_script = document.createElement("script");
    lz_script.setAttribute("src", URLET_URL + "scripts/lz-string-1.4.4.js");
    lz_script.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(lz_script);
}

// Main function, triggered by submit button
function urlet_main() {

    // Execute after page has loaded
    $(function() {
    
        // Display message
        var form_inner = "<form name='urlet_popup_form' onsubmit=''><fieldset><legend>Please wait...</legend><p><textarea id='t_area' rows='10' cols='50'>Link will appear here</textarea></p></fieldset></form>";
        $("#urlet_modal").contents().find("form").html(form_inner);
    
        // Remove metadata
        if(!URLET_MENU_CHOICES.meta)
            $("meta").remove();
      
        // Remove comments
        if(!URLET_MENU_CHOICES.comment)
            $('*').contents().each(function() {
                if(this.nodeType === Node.COMMENT_NODE) {
                    $(this).remove();
                }
            });
      
        // Remove templates
        if(!URLET_MENU_CHOICES.template)
            $("template").remove();
    
        // If the user wants to preserve style/script
        if(URLET_MENU_CHOICES.style || URLET_MENU_CHOICES.script) {
      
            // Put links of .css and .js files into an array
            var style_hrefs = [];
            var script_hrefs = [];
      
            var s_hrefs = $.grep(
                $("link").map((i, el) => $(el).attr("href")),
                (n, i) => n.match(/\.(css|js)(?=[?#])|(\.)(css|js)$/gmi));
      
            s_hrefs.forEach(
                i => i.match(/\.(js)(?=[?#])|(\.)(js)$/gmi) ?
                script_hrefs.push(i) : style_hrefs.push(i));
      
            // Fetch files
            function fetchFiles(s) {
                style_hrefs.forEach(link =>
                    $(document.createElement(s))
                    .appendTo("head").load(link));
            }
      
            if(URLET_MENU_CHOICES.style)
                fetchFiles("style");
            if(URLET_MENU_CHOICES.script)
                fetchFiles("script");
        }
      
        // Remove links
        if(!URLET_MENU_CHOICES.link)
            $("link").remove();
      
        // Wait for fetched content
        setTimeout(function() {
        
            // Remove scripts
            if(!URLET_MENU_CHOICES.script)
                $("script").remove();
          
            // Remove style
            if(!URLET_MENU_CHOICES.style)
                $("style").remove();
        
            // Remove urlet code
            $("#urlet_modal, #urlet-item").remove();
            
            // Convert page
            var encoded_page =
                LZString144.compressToBase64(
                document.documentElement.outerHTML);
                
            // Add menu back to display message
            urlet_menu();
        
            // Show encoded page link in textarea
            var $form_contents = $("#urlet_modal").contents();
            
            $form_contents.find("form").html(form_inner);
            $form_contents.find("legend").text("Link ready");
            $form_contents.find("#t_area").val(URLET_URL + "#" + encoded_page);
            
        }, 900);
    });
    
    // Submit button doesn't need to submit anything
    return false;
}

