import * as $ from "jquery";

/**
 * Handle the side bar toggle
 */
$("#menu-toggle").click(e => {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

