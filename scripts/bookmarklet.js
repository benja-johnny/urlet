// JSLint directives
/*global
    $
*/
/*jslint
    browser devel long
*/
function updateScriptUrl() { // Updates s.src in the bookmarklet script (link)
    const bookmark_url = window.location.href;
    const script_url = bookmark_url.slice(0, bookmark_url.indexOf("/bookmarklet")) + "/scripts/urlet.js";
    const bookmark = document.getElementById("favlet");
    const bookmark_href = bookmark.getAttribute("href");
    bookmark.setAttribute("href", bookmark_href.slice(0, bookmark_href.indexOf("s.src = '") + 9) + script_url + bookmark_href.slice(bookmark_href.lastIndexOf("';"), bookmark_href.length));
}
function initLink() { // Set link default script and title
    const favlet = document.getElementById("favlet");
    favlet.innerHTML = document.title;
    favlet.href = "javascript:(function (){const s = document.createElement('script'), k = ['', ''], d = {}; s.id = 'urlet-item'; s.src = ''; document.getElementsByTagName('head')[0].appendChild(s); s.onload = function () {urlet_menu(s.src, k, d);}})(); void(0);";
    updateScriptUrl();
}
window.onload = function () {
    initLink();
    $(function () {
        const $the_modal = $("#MainModal");
        $("#buttons").attr("class", "visible"); // Show setup button
        $the_modal.on("hide.bs.modal", function () { // Show link if modal gets hidden
            const $u_link = $("#urlet-link");
            $u_link.fadeIn(500);
        });
        $the_modal.on("show.bs.modal", function () { // If the modal is shown, hide link
            const $u_link = $("#urlet-link");
            $u_link.fadeOut(500);
        });
    });
};
function scrolltoTop() { // Scrolls to the top of the page
    $("#MainModal").animate({scrollTop: 0}, "fast");
}
function gotoPage(page_num) { // Function for switching menu pages
    $(function () {
        const bookmark_href = document.getElementById("favlet").getAttribute("href");
        const $b_1 = $("#button_1");
        const $b_2 = $("#button_2");
        if (page_num === 0) {
            $("#MainModalTitle").html("Urlet setup");
            $(".modal-body").html(`
                <p class="lead pb-3">Welcome!</p>
                <div class="text-justify pb-3">
                    <p>This setup process will hard code settings into your bookmark for a better user experience.</p>
                    <p><b>Hard coding</b> means embedding data directly into the source code of a program.</p>
                    <p>Click <b>Next</b> to configure your bookmarklet.</p>
                    <p>Click <b>Skip</b> if you want the bookmarklet link without hard coded settings.</p>
                </div>
            `);
            $b_1.attr("data-dismiss", "modal");
            $b_1.removeAttr("onclick");
            $b_1.html("Skip");
            $b_2.removeAttr("data-dismiss");
            $b_2.html("Next");
            $b_2.attr("onclick", "gotoPage(1)");
        }
        if (page_num === 1) {
            scrolltoTop();
            const keys_str = bookmark_href.slice(bookmark_href.indexOf("k = [") + 5, bookmark_href.lastIndexOf("], d = {")); // Get keys from bookmarklet link
            let keys = ["", ""];
            if (keys_str !== "") {
                keys = keys_str.split(", ");
            }
            $(".modal-body").html(`
                <div class="text-justify pb-3">
                    <p>You will need <b>API keys</b> to enable instant sharing to Pastebin and GitHub.</p>
                    <p>An <b>a</b>pplication <b>p</b>rogramming <b>i</b>nterface <b>key</b> is a unique identifier used for authentication. It enables the bookmarklet to post to your pastebin.com and github.com accounts on your behalf.</p>
                    <p>You can have them <b>hard coded</b> if you fill the fields below, or you can provide them right before sharing a link.</p>
                    <p>Using Pastebin is recommended if you post less than 12 links per 24 hours.</p>
                    <p>The keys will not be stored online.</p>
                </div>
                <div class="pb-3" onkeyup="return updateKeys()">
                <p>Gist token:<br>
                <input type="text" style="width: 100%;" placeholder="Must be 40 characters long." onfocus="$('#button_1, #button_2').prop('disabled', 'true')" onblur="checkLength(0)" value=${keys[0]}></p>
                <p>Pastebin key:<br>
                <input type="text" style="width: 100%;" placeholder="Must be 32 characters long." onfocus="$('#button_1, #button_2').prop('disabled', 'true')" onblur="checkLength(1)" value=${keys[1]}></p>
                </div>
                <p>To get a Gist token, go here:<br>
                <a href="https://github.com/settings/tokens">https://github.com/settings/tokens</a></p>
                <p>To get your Pastebin Developer API Key, go here:<br>
                <a href="https://pastebin.com/api">https://pastebin.com/api</a></p>
            `);
            $b_1.attr("onclick", "gotoPage(0)");
            $b_1.html("Back");
            $b_1.removeAttr("data-dismiss");
            $b_2.attr("onclick", "gotoPage(2)");
        }
        if (page_num === 2) {
            scrolltoTop();
            const settings_json = JSON.parse(bookmark_href.slice(bookmark_href.indexOf("d = {") + 4, bookmark_href.lastIndexOf("; s.id"))); // Get settings from bookmarklet link
            $(".modal-body").html(`
                <div class="text-justify pb-3">
                    <p>You can have <b>hard coded settings</b> in your bookmarklet.</p>
                    <p>If you tick the box <i>&quot;I want these settings hard coded&quot;</i>, your bookmarklet will not ask for settings when you click it, and it will always use these settings.</p>
                </div>
                <table style="width: 100%; padding: 5px; text-align: left;">
                    <tr>
                        <th style="padding-bottom: 10px;">Include</th>
                        <th style="padding-bottom: 10px;">Compression</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" id="cb_style" onclick="updateDefaults()"> Style
                        </td>
                        <td>
                            <input type="radio" name="compression" id="cb_lz_string"  checked="checked" onclick="updateDefaults()"> lz-string
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" id="cb_script" onclick="updateDefaults()"> Script
                        </td>
                        <td>
                            <input type="radio" name="compression" id="cb_base_64" onclick="updateDefaults()"> base-64
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" id="cb_link" onclick="updateDefaults()"> Link
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" id="cb_meta" onclick="updateDefaults()"> Meta
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" id="cb_template" onclick="updateDefaults()"> Template
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" name="urlet_checkbox" id="cb_comment" onclick="updateDefaults()"> Comment
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 10px;">
                            <input type="checkbox" onclick="u_select_all(this)"> Select all
                        </td>
                    </tr>
                </table>
                <p style="margin-top: 20px;">
                    <input type="checkbox" id="cb_default_settings" onclick="updateDefaults()"> I want these settings hard coded
                </p>
            `);
            if (!$.isEmptyObject(settings_json)) {
                $.each(settings_json, function (k, v) {
                    if (v) {
                        $("#cb_" + k).prop("checked", "checked"); // Tick the things that were set; We do this here, because of the "checked" property's issues in different browsers
                    }
                });
                $("#cb_default_settings").prop("checked", "checked");
            }
            $b_1.attr("onclick", "gotoPage(1)");
            $b_2.html("Next");
            $b_2.removeAttr("data-dismiss");
            $b_2.attr("onclick", "gotoPage(3)");
        }
        if (page_num === 3) {
            $(".modal-body").html(`
                <div class="text-justify pb-3">
                    <p>To easily distinguish between different Urlet bookmarks, you can include the <b>hostname</b> in the bookmark title.</p>
                    <p>The current hostname is <i>&quot;${window.location.hostname}&quot;</i>.</p>
                </div>
                <p><input type="checkbox" id="cb_include_host" onclick="includeHost()"> Include hostname</p>
            `);
            if ($("#favlet").html().includes(window.location.hostname)) { // Tick if it was ticked already
                $("#cb_include_host").prop("checked", "checked");
            }
            $b_1.attr("onclick", "gotoPage(2)");
            $b_2.html("Get Bookmarklet");
            $b_2.attr("data-dismiss", "modal");
        }
    });
}
function resetModal() { // Resets modal and link to its default state
    $(function () {
        gotoPage(0);
        $("#MainModal").modal("show");
        setTimeout(function () { // Wait for fadeOut
            initLink();
        }, 500);
    });
}
function changeButton() { // Changes the buttons that bring up the menu
    $(function () {
        gotoPage(0);
        $("#MainModal").modal("show");
        setTimeout(function () { // Wait for fadeOut
            $("#buttons").html(`
                <p class="lead">Click one of the buttons below to configure your bookmark!</p>
                <p>
                    <button type="button" class="btn btn-secondary" onclick="resetModal()">Redo setup</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#MainModal">Back to setup</button>
                </p>
            `);
        }, 500);
    });
}
function modifyBookmarkTitle(ar, txt) { // Add/remove (text) from the bookmark title; ar = add/remove, txt = text to insert/remove
    let favlet_title = document.getElementById("favlet").innerHTML;
    if ((ar === "add") && !favlet_title.includes(txt)) { // If we want to add text
        const bracket_end = favlet_title.indexOf(")");
        if (bracket_end !== -1) { // If it is not the only text
            document.getElementById("favlet").innerHTML = favlet_title.slice(0, bracket_end) + ", " + txt + ")";
        } else {
            document.getElementById("favlet").innerHTML = favlet_title + " (" + txt + ")";
        }
    }
    if ((ar === "remove") && favlet_title.includes(txt)) { // If we want to remove text
        if (favlet_title.slice(favlet_title.indexOf("(") + 1, favlet_title.lastIndexOf(")")) === txt) { // If it is the only text
            document.getElementById("favlet").innerHTML = document.title;
        } else { // Remove text, clean up unnecessary commas
            const txt_i = favlet_title.indexOf(txt);
            const ft_length = favlet_title.length;
            document.getElementById("favlet").innerHTML = favlet_title.slice(0, txt_i) + favlet_title.slice(txt_i + txt.length, ft_length);
            favlet_title = document.getElementById("favlet").innerHTML;
            const i_1 = favlet_title.indexOf(", , ");
            const i_2 = favlet_title.indexOf("(,");
            const i_3 = favlet_title.indexOf(", )");
            if (i_1 !== -1) {
                document.getElementById("favlet").innerHTML = favlet_title.slice(0, i_1) + ", " + favlet_title.slice(i_1 + 4, ft_length);
            }
            if (i_2 !== -1) {
                document.getElementById("favlet").innerHTML = favlet_title.slice(0, i_2 + 1) + favlet_title.slice(i_2 + 3, ft_length);
            }
            if (i_3 !== -1) {
                document.getElementById("favlet").innerHTML = favlet_title.slice(0, i_3) + ")";
            }
        }
    }
}
function updateDefaults() { // Updates defaults JSON (d) in the bookmarklet script (link)
    function replaceDefaults(o) {
        const bookmark = document.getElementById("favlet");
        const bookmark_href = bookmark.getAttribute("href");
        bookmark.setAttribute("href", bookmark_href.slice(0, bookmark_href.indexOf("d = {") + 4) + JSON.stringify(o) + bookmark_href.slice(bookmark_href.lastIndexOf("}; s.id") + 1, bookmark_href.length));
    }
    if (document.getElementById("cb_default_settings").checked) { // Only update if the checkbox is checked
        replaceDefaults({
            "lz_string": document.getElementById("cb_lz_string").checked,
            "base_64": document.getElementById("cb_base_64").checked,
            "style": document.getElementById("cb_style").checked,
            "script": document.getElementById("cb_script").checked,
            "link": document.getElementById("cb_link").checked,
            "meta": document.getElementById("cb_meta").checked,
            "template": document.getElementById("cb_template").checked,
            "comment": document.getElementById("cb_comment").checked
        });
        modifyBookmarkTitle("add", "options");
    } else {
        replaceDefaults({});
        modifyBookmarkTitle("remove", "options");
    }
}
function updateKeys() { // Updates the keys array (k) in the bookmarklet script (link)
    const bookmark = document.getElementById("favlet");
    const bookmark_href = bookmark.getAttribute("href");
    bookmark.setAttribute("href", bookmark_href.slice(0, bookmark_href.indexOf("k = [") + 5) + "'" + document.getElementsByTagName("input")[0].value + "', '" + document.getElementsByTagName("input")[1].value + "'" + bookmark_href.slice(bookmark_href.lastIndexOf("], d = {"), bookmark_href.length));
}
function u_select_all(source) { // Selects all checkboxes
    const u_checkboxes = document.getElementsByName("urlet_checkbox");
    u_checkboxes.forEach(function (ignore, i) {
        u_checkboxes[i].checked = source.checked;
    });
    updateDefaults();
}
function checkLength(i) { // Triggered by defocusing Gist token and Pastebin key input
    const a = document.getElementsByTagName("input")[i];
    if (((i === 0) && ((a.value.length !== 40) && (a.value.length !== 0))) || ((i === 1) && ((a.value.length !== 32) && (a.value.length !== 0)))) { // Value can only be 40/32 characters long or empty
        alert("Please input a valid token.");
        a.value = "";
        updateKeys();
    } else {
        modifyBookmarkTitle("add", "keys");
    }
    if ((document.getElementsByTagName("input")[0].value === "") && (document.getElementsByTagName("input")[1].value === "")) { // If there is no accepted key, remove (keys)
        modifyBookmarkTitle("remove", "keys");
    }
    setTimeout(function () { // Wait for key validation
        $("#button_1, #button_2").removeAttr("disabled"); // Enable buttons
    }, 100);
}
function includeHost() { // Puts the hostname in the bookmark title
    const h_name = window.location.hostname;
    if (document.getElementById("cb_include_host").checked) {
        modifyBookmarkTitle("add", h_name);
    } else {
        modifyBookmarkTitle("remove", h_name);
    }
}
