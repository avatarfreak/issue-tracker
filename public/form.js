$(function() {
  $("#testForm").submit(function(e) {
    $.ajax({
      url: "/api/issues/apitest",
      type: "post",
      data: $("#testForm").serialize(),
      success: function(data) {
        $("#jsonResult").text(JSON.stringify(data));
        $("#issue").modal({ show: true });
        $("#testForm")[0].reset();
      },
      error: function(xhr, textStatus, error) {
        let data = xhr.responseText;
        $("#jsonResult").text(JSON.stringify(data));
        $("#issue").modal({ show: true });
      }
    });
    e.preventDefault();
  });

  $("#testForm2").submit(function(e) {
    $.ajax({
      url: "/api/issues/apitest",
      type: "put",
      data: $("#testForm2").serialize(),
      success: function(data) {
        $("#jsonResult").text(JSON.stringify(data));
        $("#issue").modal({ show: true });
        $("#testForm2")[0].reset();
      },
      error: function(xhr, textStatus, error) {
        let data = xhr.responseText;
        $("#jsonResult").text(JSON.stringify(data));
        $("#issue").modal({ show: true });
      }
    });
    e.preventDefault();
  });

  $("#testForm3").submit(function(e) {
    $.ajax({
      url: "/api/issues/apitest",
      type: "delete",
      data: $("#testForm3").serialize(),
      success: function(data) {
        $("#jsonResult").text(JSON.stringify(data));
        $("#issue").modal({ show: true });
        $("#testForm3")[0].reset();
      },
      error: function(xhr, textStatus, error) {
        let data = xhr.responseText;
        $("#jsonResult").text(JSON.stringify(data));
        $("#issue").modal({ show: true });
      }
    });
    e.preventDefault();
  });
});
