import * as jquery from '../jquery/jquery-3.7.1.min.js';
import * as theme from '../db/theme.js';

theme.updateColorScheme();

$(function(){
    $("#footer").load("/pages/footer/footer.html");
});