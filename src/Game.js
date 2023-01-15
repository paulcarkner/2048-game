import $ from "jquery";

$(document).on("keydown", function (e) {
  var moved = false;
  switch (e.key) {
    case "ArrowLeft": // left
      $("td:not(.empty)").each(function () {
        //for each tile
        var emptytd = $(this).prevAll(".empty").last(); //get left-most empty square
        var newtd = $(this);
        if (emptytd.length > 0) { //if there is space move left
          moved = moveTile($(this), emptytd);
          newtd = emptytd;
        }
        if (
          newtd.prev().text() === newtd.text() &&
          !newtd.prev().is(".merged")
        ) { //if a tile exists with the same value that hasn't already merged
          moved = mergeTiles(newtd.prev(), newtd); //merge two tiles
        }
      });
      if (moved) createTile(); //if move was successful create new tile
      break;

    case "ArrowUp": // up
      $("td:not(.empty)").each(function () {
        //for each tile
        var colNum = $(this).parent().children().index(this); //get tile column index
        var emptytd = $(this)
          .parent()
          .prevAll()
          .children(":nth-child(" + (colNum + 1).toString() + ")")
          .not(":not(.empty)")
          .last(); //get top-most empty square
        var newtd = $(this);
        if (emptytd.length > 0) { //if there is space move up
          moved = moveTile($(this), emptytd);
          newtd = emptytd;
        }
        var mergetd = newtd.parent().prev().children().eq(colNum);
        if (mergetd.text() === newtd.text() && !mergetd.is(".merged")) { //if a tile exists with the same value that hasn't already merged
          moved = mergeTiles(mergetd, newtd);
        }
      });
      if (moved) createTile(); //if move was successful create new tile
      break;

    case "ArrowRight": // right
      $($("td:not(.empty)").get().reverse()).each(function () { //for each tile
        var emptytd = $(this).nextAll(".empty").last(); //get right-most empty square
        var newtd = $(this);
        if (emptytd.length > 0) { //if there is space move right
          moved = moveTile($(this), emptytd);
          newtd = emptytd;
        }
        if (
          newtd.next().text() === newtd.text() &&
          !newtd.next().is(".merged")
        ) { //if a tile exists with the same value that hasn't already merged
          moved = mergeTiles(newtd.next(), newtd);
        }
      });
      if (moved) createTile(); //if move was successful create new tile
      break;

    case "ArrowDown": // down
      $($("td:not(.empty)").get().reverse()).each(function () { //for each tile
        var colNum = $(this).parent().children().index(this);
        var emptytd = $(this)
          .parent()
          .nextAll()
          .children(":nth-child(" + (colNum + 1).toString() + ")")
          .not(":not(.empty)")
          .last(); //get bottom-most empty square
        var newtd = $(this);
        if (emptytd.length > 0) { //if there is space move down
          moved = moveTile($(this), emptytd);
          newtd = emptytd;
        }
        var mergetd = newtd.parent().next().children().eq(colNum);
        if (mergetd.text() === newtd.text() && !mergetd.is(".merged")) { //if a tile exists with the same value that hasn't already merged
          moved = mergeTiles(mergetd, newtd);
        }
      });
      if (moved) createTile(); //if move was successful create new tile
      break;

    default:
      return; // exit this handler for other keys
  }
  $(".merged").removeClass("merged"); //remove merged flags from tiles
  e.preventDefault();
});

//on load start with two tiles on board
$(function () {
  $("td").addClass("empty");
  createTile();
  createTile();
});

//creates a new tile in an empty space with value "2" (or 1 in 10 chance "4")
function createTile() {
  var tds = $("td.empty");
  var newTile = tds.eq(getRand(tds.length));
  newTile.removeClass("empty").css("color", "inherit");
  if (getRand(10) === 9) {
    newTile.text("4").css("background-color", "hsla(22, 100%, 90%, 1)");
  } else {
    newTile.text("2").css("background-color", "hsla(22, 100%, 95%, 1)");
  }
}

//transfers all parameters from tiles old location to new location
function moveTile(oldTile, newTile) {
  newTile
    .text(oldTile.text())
    .removeClass("empty")
    .css("background-color", oldTile.css("background-color"))
    .css("color", oldTile.css("color"));
  oldTile.text("").addClass("empty").css("background-color", "");
  return true;
}

//combines two tiles of similar value to one tile of double value
function mergeTiles(mergedTile, oldTile) {
  var value = parseInt(oldTile.text()) * 2;
  mergedTile
    .text(value)
    .css(
      "background-color",
      "hsla(22, 100%, " +
        (100 - 5 * Math.log2(value)).toString() + //colour lightness set by tile value
        "%, 1)"
    )
    .css("color", value >= 2048 ? "white" : "")
    .addClass("merged");
  oldTile
    .text("")
    .addClass("empty")
    .css("background-color", "")
    .css("color", ""); //removes and resets old tile
  return true;
}

//creates a random integer between 0 and x
function getRand(x) {
  return Math.floor(Math.random() * x);
}
