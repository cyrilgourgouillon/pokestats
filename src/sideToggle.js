import * as $ from "jquery";
import {EventEmitter} from "events";

export const event = new EventEmitter();

/**
 * Handle the side bar toggle
 */
$("#menu-toggle").click(e => {
    e.preventDefault();

    $("#wrapper").toggleClass("toggled").promise().done(function(){
        //Wait anime over, then event 
        setTimeout(function () {
            event.emit("toggled");
        },300);
    });
});

