$(function(){
  $.ajax({
    url: '/repos',
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      data.items.forEach(function(repo) {
        $("#reposList")
          .append(
            "<div class='repo'><span>" + repo.full_name + "</span><button>Star</button><p>Stars : "+repo.stargazers_count+"</p><br><span>"+ repo.description +"</span></div></br><hr>");
      });
    },
    error: function(error) {
      console.log("error");
    }
  });
});