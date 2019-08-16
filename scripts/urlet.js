// Urlet URL
const URLET_URL = 'https://benja-johnny.github.io/urlet/';

// Adds the modal menu and scripts to the page
function urlet_menu() {

    // Add modal style
    const modal_style = document.createElement("style");
    modal_style.innerHTML = ".urlet-modal { display: none; position: fixed; z-index: 2147483647; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4); }";
    modal_style.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(modal_style);
    
    // Add iframe
    const urlet_modal = document.createElement("iframe");
    urlet_modal.setAttribute("id", "urlet_modal");
    urlet_modal.setAttribute("class", "urlet-modal");
    document.getElementsByTagName("body")[0].appendChild(urlet_modal);
    urlet_modal.style.display = "block";
    
    // Add style to iframe contents
    const iframe_style = document.createElement("style");
    iframe_style.innerHTML = ".urlet-modal-content { background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%; } .urlet-close { color: #aaaaaa; float: right; font-size: 28px; font-weight: bold; padding-left: 20px; } .urlet-close:hover, .urlet-close:focus { color: #000; text-decoration: none; cursor: pointer; }";
    iframe_style.setAttribute("id", "urlet-item");
    urlet_modal.contentDocument.getElementsByTagName("head")[0].appendChild(iframe_style);
    
    // Create form in iframe
    const modal_content = document.createElement("div");
    modal_content.setAttribute("class", "urlet-modal-content");
    modal_content.innerHTML = "<span class='urlet-close'>&times;</span><form name='urlet_popup_form' onsubmit='return window.parent.urlet_main();'><fieldset><legend>Urlet - Options</legend><table style='width:100%;padding:5px;text-align:left'><tr><th>Include</th><th>Compression</th></tr><tr><td><input type='checkbox' name='urlet_checkbox' value='true' id='c_b_style'> Style</td><td><input type='radio' name='compression' value='lz_string' id='c_b_lz_script'  checked='checked'> lz-string</td></tr><tr><td><input type='checkbox' name='urlet_checkbox' value='true' id='c_b_script'> Script</td><td><input type='radio' name='compression' value='base_64' id='c_b_base_64'> base-64</td></tr><tr><td><input type='checkbox' name='urlet_checkbox' value='true' id='c_b_link'> Link</td></tr><tr><td><input type='checkbox' name='urlet_checkbox' value='true' id='c_b_meta'> Meta</td></tr><tr><td><input type='checkbox' name='urlet_checkbox' value='true' id='c_b_template'> Template</td></tr><tr><td><input type='checkbox' name='urlet_checkbox' value='true' id='c_b_comment'> Comment</td></tr><tr><td style='padding-top:10px'><input type='checkbox' onClick='u_select_all(this)' /> Select all</td></tr></table><p style='padding-left:5px'><input type='submit' /></p></fieldset></form>";
    urlet_modal.contentDocument.getElementsByTagName("body")[0].appendChild(modal_content);
    
    // Add menu script to iframe
    const modal_script = document.createElement("script");
    modal_script.innerHTML = "var urlet_modal=window.parent.document.getElementById('urlet_modal');\nvar urlet_span_close=document.getElementsByClassName('urlet-close')[0];\nurlet_span_close.onclick=function(){\nurlet_modal.style.display='none';\nwindow.parent.location.reload(false);\n}\nwindow.parent.onclick=function(event){\nif(event.target==urlet_modal){\nurlet_modal.style.display='none';\nwindow.parent.location.reload(false);\n}\n}\nfunction u_select_all(source){\nu_checkboxes=document.getElementsByName('urlet_checkbox');\nfor(var i=0,n=u_checkboxes.length;i<n;i++){\nu_checkboxes[i].checked=source.checked;\n}\n}";
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
    const jquery = document.createElement("script");
    jquery.setAttribute("src", "https://code.jquery.com/jquery-3.4.1.min.js");
    jquery.setAttribute("integrity", "sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=");
    jquery.setAttribute("crossorigin", "anonymous");
    jquery.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(jquery);
    
    // Add lz-string-1.4.4
    const lz_script = document.createElement("script");
    lz_script.setAttribute("src", URLET_URL + "scripts/lz-string-1.4.4.js");
    lz_script.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head")[0].appendChild(lz_script);
}

// Main function, triggered by submit button
function urlet_main() {

    // Execute after page has loaded
    $(function() {
    
        const $modal_contents = $("#urlet_modal").contents();
      
        // Get menu choices
        var urlet_menu_choices = {
            "style":    $modal_contents.find("input[id=c_b_style]").prop("checked"),
            "script":   $modal_contents.find("input[id=c_b_script]").prop("checked"),
            "link":     $modal_contents.find("input[id=c_b_link]").prop("checked"),
            "meta":     $modal_contents.find("input[id=c_b_meta]").prop("checked"),
            "template": $modal_contents.find("input[id=c_b_template]").prop("checked"),
            "comment":  $modal_contents.find("input[id=c_b_comment]").prop("checked")
        };
    
        // Get selected compression
        const compr = $modal_contents.find("input[type=radio][name=compression]:checked").val();
    
        // Display message
        const form_inner = "<form name='urlet_popup_form' onsubmit=''><fieldset><legend>Please wait...</legend><p><textarea style='width:100%;padding:5px' id='t_area' rows='10'>Link will appear here</textarea></p><p style='padding-left:5px' id='len'>Length: Loading...</p></fieldset></form>";
      
        $modal_contents.find("form").html(form_inner);
    
        // Remove metadata
        if(!urlet_menu_choices.meta)
            $("meta").remove();
      
        // Remove comments
        if(!urlet_menu_choices.comment)
            $('*').contents().each(function() {
                if(this.nodeType === Node.COMMENT_NODE) {
                    $(this).remove();
                }
            });
      
        // Remove templates
        if(!urlet_menu_choices.template)
            $("template").remove();
    
        // If the user wants to preserve style/script
        if(urlet_menu_choices.style || urlet_menu_choices.script) {
      
            // Put links of .css and .js files into an array
            var style_hrefs = [];
            var script_hrefs = [];
      
            const s_hrefs = $.grep(
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
      
            if(urlet_menu_choices.style)
                fetchFiles("style");
            if(urlet_menu_choices.script)
                fetchFiles("script");
        }
      
        // Remove links
        if(!urlet_menu_choices.link)
            $("link").remove();
      
        // Wait for fetched content
        setTimeout(function() {
        
            // Remove scripts
            if(!urlet_menu_choices.script)
                $("script").remove();
          
            // Remove style
            if(!urlet_menu_choices.style)
                $("style").remove();
        
            // Remove urlet code
            $("#urlet_modal, #urlet-item").remove();
            
            // Convert page
            var encoded_page = "";
            
            if(compr === "base_64")
                encoded_page =
                    "0" +
                    window.btoa(
                    document.documentElement.outerHTML);
            
            if(compr === "lz_string")
                encoded_page =
                    "1" +
                    LZString144.compressToBase64(
                    document.documentElement.outerHTML);
                
            // Add menu back to display message
            urlet_menu();
        
            // Show encoded page link in textarea
            const $form_contents = $("#urlet_modal").contents();
            const u_link = URLET_URL + "#" + encoded_page;
            const u_len = u_link.length;
            
            $form_contents.find("form").html(form_inner);
            $form_contents.find("legend").text("Link ready");
            $form_contents.find("#t_area").val(u_link);
            
            // Show link length with colors
            var u_col = "green";
            
            if(u_len >= 2047) u_col = "orange";
            if(u_len >= 8192) u_col = "darkorange";
            if(u_len >= 32779) u_col = "orangered";
            if(u_len >= 64000) u_col = "red";
                
            $form_contents.find("#len")
                .html(`Length: <font color=${u_col}>${u_len}</font>`);
            
        }, 900);
    });
    
    // Submit button doesn't need to submit anything
    return false;
}

