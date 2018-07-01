$(function(){
  $.ajax({
    url: '/repos',
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      data.items.forEach(function(repo) {
        $("#reposList")
          .append(
            "<div class='repo'><span>" + repo.name +"</span><button>Star</button><br><span>"+ repo.description +"</span></div><br>");
      });
    },
    error: function(error) {
      console.log("error");
    }
  });
});