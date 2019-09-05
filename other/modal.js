var urlet_modal = window.parent.document.getElementById('urlet_modal');\n
var urlet_span_close = document.getElementsByClassName('urlet-close')[0];\n

urlet_span_close.onclick = function() {\n
    urlet_modal.style.display = 'none';\n
    window.parent.location.reload(false);\n
}\n
window.parent.onclick = function(event) {\n
    if(event.target == urlet_modal) {\n
        urlet_modal.style.display = 'none';\n
        window.parent.location.reload(false);\n
    }\n
}\n
function u_select_all(source) {\n
    const u_checkboxes = document.getElementsByName('urlet_checkbox');\n
    for(var i = 0, n = u_checkboxes.length; i < n; i++) {\n
        u_checkboxes[i].checked = source.checked;\n
    }\n
}
