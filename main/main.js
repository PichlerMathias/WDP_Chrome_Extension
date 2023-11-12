import * as jquery from '../jquery/jquery-3.7.1.min.js';

$('head').prepend('<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">');


$(function(){
    $("#footer").load("/pages/footer/footer.html");
});