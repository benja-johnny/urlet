// JSLint directives
/*global
    $ Node LZString144
*/
/*jslint
    browser devel long this
*/
function fetchFiles(style_hrefs, s) { // Fetches files
    style_hrefs.forEach((link) => $(document.createElement(s)).appendTo("head").load(link));
}
function gotoSharedURL(urlet_url, loc) { // Opens link inside a page element
    $(function () {
        const paste = $(loc).val();
        if (paste.includes(urlet_url)) {
            window.location.href = paste;
        } else {
            alert("Link not found.");
        }
        window.location.reload(false);
    });
}
function addjQuery() { // Removes jQuery if the page already has it and adds this one
    const s = document.getElementsByTagName("script");
    const x = Array.from(s).findIndex((e) => e.src.includes("jquery"));
    if (x !== -1) {
        s.item(x).remove();
    }
    const j = document.createElement("script");
    j.setAttribute("src", "https://code.jquery.com/jquery-3.4.1.min.js");
    j.setAttribute("integrity", "sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=");
    j.setAttribute("crossorigin", "anonymous");
    j.setAttribute("id", "urlet-item");
    document.getElementsByTagName("body").item(0).appendChild(j);
    return j; // Return jQuery Element
}
function urlet_menu(script_url, keys, defaults) { // Adds the modal menu and scripts to the page
    function parseURL() { // Did we get the script URL?
        const i_scripts = script_url.indexOf("scripts");
        return (
            i_scripts !== -1
            ? script_url.slice(0, i_scripts)
            : script_url
        );
    }
    const urlet_url = parseURL();
    const loc_h = location.href;
    if (loc_h.slice(0, urlet_url.length) === urlet_url) { // If we are on urlet_url, remove script generated items
        $("#urlet_modal, #urlet-item").remove();
        return;
    }
    const jq = addjQuery();
    if (loc_h.includes("pastebin.com/")) { // If we are on pastebin.com, find and go to URL
        jq.onload = function () {
            gotoSharedURL(urlet_url, "#paste_code");
        };
        return;
    }
    const modal_style = document.createElement("style");
    modal_style.innerHTML = `
        .urlet-modal {
            display: none;
            position: fixed;
            z-index: 2147483647;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        }
    `;
    modal_style.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head").item(0).appendChild(modal_style); // Add modal style
    const urlet_modal = document.createElement("iframe");
    urlet_modal.setAttribute("id", "urlet_modal");
    urlet_modal.setAttribute("class", "urlet-modal");
    document.getElementsByTagName("body").item(0).appendChild(urlet_modal); // Add iframe
    urlet_modal.style.display = "block";
    const iframe_style = document.createElement("style");
    iframe_style.innerHTML = `
        .urlet-modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 30px;
            padding-left: 20px;
            padding-top: 20px;
            border: 3px solid #888;
            max-width: 300px;
            height: 300px;
            overflow-y: auto;
        }
        .urlet-close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            padding-left: 10px;
        }
        .urlet-close:hover, .urlet-close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
    `;
    iframe_style.setAttribute("id", "urlet-item");
    urlet_modal.contentDocument.getElementsByTagName("head").item(0).appendChild(iframe_style); // Add style to iframe contents
    const modal_content = document.createElement("div");
    modal_content.setAttribute("class", "urlet-modal-content");
    modal_content.innerHTML = `
        <span class="urlet-close">&times;</span>
        <form name="urlet_popup_form" onsubmit="return window.parent.urlet_main(&#39;${urlet_url}&#39;, &#39;${keys[0]}&#39;, &#39;${keys[1]}&#39;);">
            <fieldset>
                <legend>Urlet - Options</legend>
                <table style="width: 100%; padding: 5px; text-align: left;">
                    <tr>
                        <th style="padding-bottom: 10px;">Include</th>
                        <th style="padding-bottom: 10px;">Compression</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" value="true" id="c_b_style" checked="checked"> Style
                        </td>
                        <td>
                            <input type="radio" name="compression" value="lz_string" id="c_b_lz_script"  checked="checked"> lz-string
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" value="true" id="c_b_script"> Script
                        </td>
                        <td>
                            <input type="radio" name="compression" value="base_64" id="c_b_base_64"> base-64
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" value="true" id="c_b_link"> Link
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" value="true" id="c_b_meta"> Meta
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" value="true" id="c_b_template"> Template
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" value="true" id="c_b_comment"> Comment
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 10px;">
                            <input type="checkbox" onclick="u_select_all(this)"> Select all
                        </td>
                    </tr>
                </table>
                <p style="padding-left: 10px;">
                    <input type="submit" value="Submit">
                </p>
            </fieldset>
        </form>
    `;
    urlet_modal.contentDocument.getElementsByTagName("body").item(0).appendChild(modal_content); // Create form in iframe
    const modal_script = document.createElement("script");
    modal_script.innerHTML = `
        const urlet_modal = window.parent.document.getElementById("urlet_modal");
        const urlet_span_close = document.getElementsByClassName("urlet-close").item(0);
        urlet_span_close.onclick = function () {
            urlet_modal.style.display = "none";
            window.parent.location.reload(false);
        };
        function u_select_all(source) {
            const u_checkboxes = document.getElementsByName("urlet_checkbox");
            u_checkboxes.forEach(function (ignore, i) {
                u_checkboxes[i].checked = source.checked;
            });
        }
    `;
    modal_script.setAttribute("id", "urlet-item");
    urlet_modal.contentDocument.getElementsByTagName("head").item(0).appendChild(modal_script); // Add menu script to iframe
    urlet_modal.onload = function () { // Add elements to iframe after it has loaded (needed for Firefox); Might cause trouble later
        urlet_modal.contentDocument.getElementsByTagName("head").item(0).appendChild(iframe_style);
        urlet_modal.contentDocument.getElementsByTagName("body").item(0).appendChild(modal_content);
        urlet_modal.contentDocument.getElementsByTagName("head").item(0).appendChild(modal_script);
    };
    const lz_string = document.createElement("script");
    lz_string.setAttribute("src", urlet_url + "scripts/lz-string-1.4.4.js");
    lz_string.setAttribute("id", "urlet-item");
    document.getElementsByTagName("head").item(0).appendChild(lz_string); // Add lz-string-1.4.4
    jq.onload = function () {
        $(function () {
            if (!$.isEmptyObject(defaults)) { // If there were defaults set (defaults != {}), use those settings
                const m_contents = $("#urlet_modal").contents();
                m_contents.find("#c_b_style").prop("checked", false); // Remove the check from Style
                $.each(defaults, function (k, v) { // Check boxes of default options
                    if (v) {
                        m_contents.find("#c_b_" + k).prop("checked", "checked");
                    }
                });
                m_contents.find("input[type=submit]").click(); // Click Submit
            }
        });
    };
}
function urlet_main(urlet_url, gist_token, pastebin_key) { // Triggered by submit button
    $(function () { // Execute after page has loaded
        const $modal_contents = $("#urlet_modal").contents();
        function getChoices() { // Get menu choices
            let choice_menu = {
                "style": "c_b_style",
                "script": "c_b_script",
                "link": "c_b_link",
                "meta": "c_b_meta",
                "template": "c_b_template",
                "comment": "c_b_comment"
            };
            $.each(choice_menu, function (key, value) {
                choice_menu[key] = $modal_contents.find("input[id=" + value + "]").prop("checked");
            });
            return choice_menu;
        }
        const urlet_menu_choices = getChoices();
        const compr = $modal_contents.find("input[name=compression]:checked").val(); // Get selected compression
        const form_inner = `
            <form name="urlet_popup_form" onsubmit="">
                <fieldset>
                    <legend id="top_legend">Please wait</legend>
                    <p>
                        <textarea style="resize: none; width: 100%;" id="t_area" rows="5">Link will appear here.</textarea>
                    </p>
                    <p id="len">Length: Loading...</p>
                    <p>
                        <button type="button" id="u_open_button">Open</button>&ensp;
                    </p>
                    <fieldset>
                        <legend>Gist options</legend>
                        <p>
                            Token:<br>
                            <input type="text" id="ufg_token_input" style="width: 100%;" placeholder="Loading...">
                        </p>
                        <p>
                            Description:<br>
                            <input type="text" id="ufg_desc_input" style="width: 100%;" placeholder="Loading...">
                        </p>
                        <p>
                            Exposure:<br>
                            <select id="ufg_public_select" style="width: 100%;">
                                <option value="true">Public</option>
                                <option value="false">Private</option>
                            </select>
                        </p>
                        <p>
                            <button type="button" id="u_gist_button">Publish</button>
                        </p>
                        <p style="margin-top: 30px;">
                            Link:<br>
                            <input type="text" id="ufg_link_input" style="width: 100%;" placeholder="Link will appear here.">
                        </p>
                        <p>
                            <button type="button" id="u_gist_link_button">Open</button>
                        </p>
                    </fieldset>
                    <br>
                    <fieldset>
                        <legend>Pastebin options</legend>
                        <p>
                            Developer API Key:<br>
                            <input type="text" id="ufp_key_input" style="width: 100%;" placeholder="Loading...">
                        </p>
                        <p>
                            Name:<br>
                            <input type="text" id="ufp_name_input" style="width: 100%;" placeholder="Loading...">
                        </p>
                        <p>
                            Expiration:<br>
                            <select id="ufp_exp_select" style="width: 100%;">
                                <option value="N">Never</option>
                                <option value="10M">10 Minutes</option>
                                <option value="1H">1 Hour</option>
                                <option value="1D">1 Day</option>
                                <option value="1W">1 Week</option>
                                <option value="2W">2 Weeks</option>
                                <option value="1M">1 Month</option>
                                <option value="6M">6 Months</option>
                                <option value="1Y">1 Year</option>
                            </select>
                        </p>
                        <p>
                            Exposure:<br>
                            <select id="ufp_public_select" style="width: 100%;">
                                <option value="0">Public</option>
                                <option value="1">Unlisted</option>
                                <option value="2">Private</option>
                            </select>
                        </p>
                        <p>
                            <button type="button" id="u_paste_button">Publish</button>&ensp;
                        </p>
                        <p style="margin-top: 30px;">
                            Link:<br>
                            <input type="text" id="ufp_link_input" style="width: 100%;" placeholder="Link will appear here.">
                        </p>
                        <p>
                            <button type="button" id="u_paste_link_button">Open</button>
                        </p>
                    </fieldset>
                </fieldset>
            </form>
        `;
        $modal_contents.find("form").html(form_inner); // Display message
        if (!urlet_menu_choices.meta) { // Remove metadata if they were not selected
            $("meta").remove();
        }
        if (!urlet_menu_choices.comment) { // Remove comments if they were not selected
            $("*").contents().each(function () {
                if (this.nodeType === Node.COMMENT_NODE) {
                    $(this).remove();
                }
            });
        }
        if (!urlet_menu_choices.template) { // Remove templates if they were not selected
            $("template").remove();
        }
        if (urlet_menu_choices.style || urlet_menu_choices.script) { // If the user wants to preserve style or script
            let style_hrefs = [];
            let script_hrefs = [];
            const s_hrefs = $.grep($("link").map((ignore, el) => $(el).attr("href")), (n, ignore) => n.match(/\.(css|js)(?=[?#])|(\.)(css|js)$/gmi)); // Find .css and .js file sources and put them in a list
            s_hrefs.forEach((i) => ( // Put them in separate lists
                i.match(/\.(js)(?=[?#])|(\.)(js)$/gmi)
                ? script_hrefs.push(i)
                : style_hrefs.push(i)
            ));
            if (urlet_menu_choices.style) { // Fetch .css files if they were selected
                fetchFiles(style_hrefs, "style");
            }
            if (urlet_menu_choices.script) { // Fetch .js files if they were selected
                fetchFiles(style_hrefs, "script");
            }
        }
        if (!urlet_menu_choices.link) { // Remove links if they were not selected
            $("link").remove();
        }
        setTimeout(function () { // Wait for fetched content
            if (!urlet_menu_choices.script) { // Remove scripts if they were not selected
                $("script").remove();
            }
            if (!urlet_menu_choices.style) { // Remove style if they were not selected
                $("style").remove();
            }
            $("#urlet_modal, #urlet-item").remove(); // Remove urlet code
            let encoded_page = "";
            if (compr === "base_64") {
                encoded_page = "0" + window.btoa(encodeURIComponent/*Needed due to invalid character errors*/(document.documentElement.outerHTML));
            }
            if (compr === "lz_string") {
                encoded_page = "1" + LZString144.compressToBase64(document.documentElement.outerHTML);
            }
            urlet_menu(urlet_url, [gist_token, pastebin_key], {}); // Add menu back to display message
            const $form_contents = $("#urlet_modal").contents();
            const u_link = urlet_url + "#" + encoded_page;
            const u_len = u_link.length;
            $form_contents.find("form").html(form_inner);
            $form_contents.find("#top_legend").text("Link ready");
            $form_contents.find("#t_area").val(u_link); // Show encoded page link in textarea
            let u_col = "green";
            if (u_len >= 2047) {
                u_col = "orange";
            }
            if (u_len >= 8192) {
                u_col = "darkorange";
            }
            if (u_len >= 32779) {
                u_col = "orangered";
            }
            if (u_len >= 64000) {
                u_col = "red";
            }
            $form_contents.find("#len").html(`Length: <font color=${u_col}>${u_len}</font>`); // Show link length with colors
            $form_contents.find("#u_open_button").on("click", () => window.open(u_link)); // Open button opens link in new window
            $form_contents.find("#ufg_desc_input, #ufp_name_input").val(document.title); // Have page title as default names
            if (gist_token) { // If there is a saved token or key, show stars
                $form_contents.find("#ufg_token_input").attr("readonly", "true");
                $form_contents.find("#ufg_token_input").val("****************************************");
            } else {
                $form_contents.find("#ufg_token_input").attr("placeholder", "Please input.");
            }
            if (pastebin_key) {
                $form_contents.find("#ufp_key_input").attr("readonly", "true");
                $form_contents.find("#ufp_key_input").val("********************************");
            } else {
                $form_contents.find("#ufp_key_input").attr("placeholder", "Please input.");
            }
            $form_contents.find("#u_gist_button").on("click", function () { // Gist button
                const $um_contents_g = $("#urlet_modal").contents();
                function postGist(t) {
                    const token = "Bearer " + t;
                    $um_contents_g.find("#ufg_link_input").attr("placeholder", "Please wait.");
                    $.ajax({ // Post data
                        method: "POST",
                        url: "https://api.github.com/gists?scope=gist",
                        headers: {
                            "Authorization": token
                        },
                        data: JSON.stringify({
                            "description": $um_contents_g.find("#ufg_desc_input").val(),
                            "public": $um_contents_g.find("#ufg_public_select").val(),
                            "files": {
                                "urlet.txt": {
                                    "content": u_link
                                }
                            }
                        })
                    }).done((data) => $um_contents_g.find("#ufg_link_input").val(data.html_url)).fail((data) => alert(JSON.stringify(data)));
                }
                if (gist_token !== "") { // Check for token
                    postGist(gist_token);
                } else {
                    const t = $um_contents_g.find("#ufg_token_input").val();
                    if (t.length !== 40) {
                        alert("Please input valid token.");
                    } else {
                        postGist(t);
                    }
                }
            });
            $form_contents.find("#u_gist_link_button").on("click", function () { // Open button, opens link in new window
                const l = $("#urlet_modal").contents().find("#ufg_link_input").val();
                if (l) {
                    window.open(l);
                }
            });
            $form_contents.find("#u_paste_button").on("click", function () { // Pastebin button
                const $um_contents_p = $("#urlet_modal").contents();
                function postPaste(p_key) {
                    $um_contents_p.find("#ufp_link_input").attr("placeholder", "Please wait.");
                    $.ajaxPrefilter(function (options) { // Needed due to CORS error
                        if (options.crossDomain && $.support.cors) {
                            options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
                        }
                    });
                    $.post("https://pastebin.com/api/api_post.php", { // Post data
                        "api_dev_key": p_key,
                        "api_option": "paste",
                        "api_paste_code": u_link,
                        "api_paste_name": $um_contents_p.find("#ufp_name_input").val(),
                        "api_paste_private": $um_contents_p.find("#ufp_public_select").val(),
                        "api_paste_expire_date": $um_contents_p.find("#ufp_exp_select").val()
                    }).done(function (data) {
                        if (data.includes("pastebin.com")) {
                            $um_contents_p.find("#ufp_link_input").val(data);
                        } else { // If post limit was reached
                            alert(data);
                        }
                    }).fail((data) => alert(JSON.stringify(data)));
                }
                if (pastebin_key !== "") { // Check for key
                    postPaste(pastebin_key);
                } else {
                    const t = $um_contents_p.find("#ufp_key_input").val();
                    if (t.length !== 32) {
                        alert("Please input valid key.");
                    } else {
                        postPaste(t);
                    }
                }
            });
            $form_contents.find("#u_paste_link_button").on("click", function () { // Open button; Opens link in new window
                const l = $("#urlet_modal").contents().find("#ufp_link_input").val();
                if (l) {
                    window.open(l);
                }
            });
        }, 900);
    });
    return false; // Submit button does not need to submit anything
}
