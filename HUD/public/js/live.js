$(document).ready(() => {
  $(".switch")
    .find("input[type='checkbox'][id$='scoreboard']")
    .on("change", function () {
      var status = $(this).prop("checked");
      io.emit("toggleScoreboard", status);
    });
  $(".switch")
    .find("input[type='checkbox'][id$='scoreboard2']")
    .on("change", function () {
      var status = $(this).prop("checked");
      io.emit("toggleScoreboard2", status);
    });
  $(".switch")
    .find("input[type='checkbox'][id$='radar']")
    .on("change", function () {
      var status = $(this).prop("checked");
      io.emit("toggleRadar", status);
    });
  $(".switch")
    .find("input[type='checkbox'][id$='freezetime1']")
    .on("change", function () {
      var status = $(this).prop("checked");
      io.emit("toggleFreezetime", status);
    });
  $(".switch")
    .find("input[type='checkbox'][id$='map1']")
    .on("change", function () {
      var status = $(this).prop("checked");
      io.emit("toggleMap1", status);
    });
});
