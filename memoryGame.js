var row = 2;
var col = 3;
var length_game = row * col;
var img_card = new Array(length_game);
var img_array = new Array(length_game);
var number_moves = 0;
var number_match = 0;
var open_card = 0;
var name_bg_img = "bk";
var image_name_prev_first;
var id_prev_first;
var image_name_prev_secound;
var id_prev_secound;
function loadPage() {


    number_moves = 0;
    number_match = 0;

    if (((row * col) % 2) != 0) {
        alert(" ERROR! the col*row is not even");
        return;
    }
    var width_card;
    var height_card;
    var width_container = $("#table_memory").css("width").replace('px', '');
    var height_container = $("#table_memory").css("height").replace('px', '');
    width_container = parseInt(width_container);
    height_container = parseInt(height_container);

    width_card = width_container / (col) - 10;
    width_card += 'px';

    height_card = height_container / (row) - 10;
    height_card += 'px';

    buildTable();

    $(".image_card").css("width", width_card);
    $(".image_card").css("height", height_card);

    for (var i = 0; i < length_game; i++)
        img_card[i] = i;

    for (var i = 0, j = 1; i < length_game; i++, j++) {
        img_array[i] = j;
        img_array[i + 1] = j;
        i++;
    }

    mixCards();

    $("#number_moves").text(number_moves);
    $("#match_number").text(number_match);


    $("#new_game").click(new_gmae_func);

    for (var i = 0; i < length_game ; i++) {
        $("#" + i).click(change_bk);
    }
    $("#finish_1").css("display", "none");
    $("#finish_2").css("display", "none");

}


function new_gmae_func() {

    loadPage();
}



function change_bk() {

    var card_id = this.id;
    var b_img = $(this).css('background-image').replace(/^.*?([^\/]+)\..+?$/, '$1');

    if (b_img != name_bg_img) {
        return;
    }
    if (open_card == 0) {

        image_name_prev_first = img_array[img_card[card_id]];
        id_prev_first = card_id;

        $("#" + card_id).css("background-image", "url(" + img_array[img_card[card_id]] + ".jfif)");
        $("#" + card_id).css("background-size", "contain");
        $("#" + card_id).css("background-repeat", "no-repeat");

        open_card++;
        return;
    }

    if (open_card == 1) {

        image_name_prev_secound = img_array[img_card[card_id]];
        id_prev_secound = card_id;

        $("#" + card_id).css("background-image", "url(" + img_array[img_card[card_id]] + ".jfif)");
        $("#" + card_id).css("background-size", "contain");
        $("#" + card_id).css("background-repeat", "no-repeat");

        open_card++;

        number_moves++;
        $("#number_moves").text(number_moves);

        if (image_name_prev_secound == image_name_prev_first) {
            number_match++;
            $("#match_number").text(number_match);

            if (number_match == length_game / 2) {
                $("#finish_1").fadeIn(700);
                $("#finish_2").fadeIn(1200);
            }
            open_card = 0;
        }

        return;
    }

    if (open_card == 2) {

        if (image_name_prev_secound != image_name_prev_first) {

            $("#" + id_prev_first).css("background-image", "url(" + name_bg_img + ".jfif)");
            $("#" + id_prev_first).css("background-size", "auto");
            $("#" + id_prev_first).css("background-repeat", "repeat");

            $("#" + id_prev_secound).css("background-image", "url(" + name_bg_img + ".jfif)");
            $("#" + id_prev_secound).css("background-size", "auto");
            $("#" + id_prev_secound).css("background-repeat", "repeat");

        }


        open_card = 0;
        return;
    }

}

function buildTable() {
    var txt = "";
    var id = 0;
    for (var i = 0; i < row; i++) {
        txt += '<tr>';
        for (var j = 0; j < col; j++) {
            txt += '<td class="img_card" id="' + id + '"></td>';
            id++;
        }
        txt += '</tr>';
    }
    document.getElementById("table_memory").innerHTML = txt;
}


function mixCards() {
    var x = img_card.length, rand, temp;
    while (--x) {
        rand = Math.floor(Math.random() * (x - 1));
        temp = img_card[x];
        img_card[x] = img_card[rand];
        img_card[rand] = temp;
    }

}