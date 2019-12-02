import * as $ from "jquery";
require("bootstrap");


$("#menu-toggle").click(e => {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});