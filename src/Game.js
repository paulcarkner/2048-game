import $ from "jquery";

$(document).keydown(function (e) {
    var moved = false;
    switch (e.which) {
      case 37: // left
        $("td:not(.empty)").each(function () {
          var emptytd = $(this).prevAll(".empty").last();
          var newtd = $(this);
          if (emptytd.length > 0) {
            moved = moveTile($(this), emptytd);
            newtd = emptytd;
          }
          if (
            newtd.prev().text() === newtd.text() &&
            !newtd.prev().is(".merged")
          ) {
            moved = mergeTiles(newtd.prev(), newtd);
          }
        });
        if (moved) createTile();
        break;

      case 38: // up
        $("td:not(.empty)").each(function () {
          var colNum = $(this).parent().children().index(this);
          //var rows = $(this).parent().prevAll();
          var emptytd = $(this)
            .parent()
            .prevAll()
            .children(":nth-child(" + (colNum + 1).toString() + ")")
            .not(":not(.empty)")
            .last();
          var newtd = $(this);
          if (emptytd.length > 0) {
            moved = moveTile($(this), emptytd);
            newtd = emptytd;
          }
          var mergetd = newtd.parent().prev().children().eq(colNum);
          if (mergetd.text() === newtd.text() && !mergetd.is(".merged")) {
            moved = mergeTiles(mergetd, newtd);
          }
        });
        if (moved) createTile();
        break;

      case 39: // right
        $($("td:not(.empty)").get().reverse()).each(function () {
          var emptytd = $(this).nextAll(".empty").last();
          var newtd = $(this);
          if (emptytd.length > 0) {
            moved = moveTile($(this), emptytd);
            newtd = emptytd;
          }
          if (
            newtd.next().text() === newtd.text() &&
            !newtd.next().is(".merged")
          ) {
            moved = mergeTiles(newtd.next(), newtd);
          }
        });
        if (moved) createTile();
        break;

      case 40: // down
        $($("td:not(.empty)").get().reverse()).each(function () {
          var colNum = $(this).parent().children().index(this);
          //var rows = $(this).parent().nextAll();
          var emptytd = $(this)
            .parent()
            .nextAll()
            .children(":nth-child(" + (colNum + 1).toString() + ")")
            .not(":not(.empty)")
            .last();
          var newtd = $(this);
          if (emptytd.length > 0) {
            moved = moveTile($(this), emptytd);
            newtd = emptytd;
          }
          var mergetd = newtd.parent().next().children().eq(colNum);
          if (mergetd.text() === newtd.text() && !mergetd.is(".merged")) {
            moved = mergeTiles(mergetd, newtd);
          }
        });
        if (moved) createTile();
        break;

      default:
        return; // exit this handler for other keys
    }
    //if ($("td.empty").length == 0) endGame();
    $(".merged").removeClass("merged");
    e.preventDefault();
  });

  $(document).ready(function () {
    $("td").addClass("empty");
    createTile();
    createTile();
  });

  function createTile() {
    var tds = $("td.empty");
    // if (tds.length == 0) {
    //   endGame();
    // }
    var newTile = tds.eq(getRand(tds.length));
    newTile.removeClass("empty").css("color", "inherit");
    if (getRand(10) === 9) {
      newTile.text("4").css("background-color", "hsla(22, 100%, 90%, 1)");
    } else {
      newTile.text("2").css("background-color", "hsla(22, 100%, 95%, 1)");
    }
  }

  function moveTile(oldTile, newTile) {
    newTile
      .text(oldTile.text())
      .removeClass("empty")
      .css("background-color", oldTile.css("background-color"))
      .css("color", oldTile.css("color"));
    oldTile.text("").addClass("empty").css("background-color", "");
    return true;
  }

  function mergeTiles(mergedTile, oldTile) {
    var value = parseInt(oldTile.text()) * 2;
    mergedTile
      .text(value)
      .css(
        "background-color",
        "hsla(22, 100%, " +
          (100 - 5 * Math.log2(value)).toString() +
          "%, 1)"
      )
      .css(
        "color",
        (value >= 2048 ? "white" : "")
      )
      .addClass("merged");
    oldTile.text("").addClass("empty").css("background-color", "").css("color", "");
    return true;
  }

  function getRand(x) {
    return Math.floor(Math.random() * x);
  }

//   function endGame() {
//     window.location.reload();
//   }