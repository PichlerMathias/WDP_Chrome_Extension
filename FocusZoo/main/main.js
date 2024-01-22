import * as jquery from '../jquery/jquery-3.7.1.min.js';

// loads the same footer for all pages
$(function(){
    $("#footer").load("/pages/footer/footer.html");
});