$(document).ready(function () {
    $(".dropdown-menu a").click(function() {
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});
    
    $(".my-rating").starRating({starSize: 10,strokeColor: "black", readOnly: true});
    
    function GetCriteria(){
        var e = $('#dropdownCriteriaButton');
        var criteria = e.attr("value");
        if(criteria != ''){
            return '&sort_by='+criteria;       
        }
        return '';
    }
    
    function GetGenres(){
        var genres = [];
        $('#divGenre input:checked').each(function() {
            genres.push($(this).data("value"));
        });
        if(genres.length === 0){
            return '';
        }else{
        return '&with_genres='+genres;
        }
    }
    
    
    
    var divGenre = $('#divGenre');
    $.ajax({
            type: 'GET',
            url: "https://api.themoviedb.org/3/genre/movie/list?api_key=ca3d69ee336e43d8099727f0d7ce3859&language=en-US",
            dataType: 'json',
            success: function (data) {
                ulMovies.empty();
                
                $.each(data.genres, function (index, val) {
                    divGenre.append('<input type="checkbox" id="chkBox'+val.id+'" data-value="'+val.id+'"> <span class="checkmark">'+val.name+'</span>');
                    
                });
            }
        });
    
    var ulMovies = $('#ulMovies');
        
    $('#btnGetMovies').click(function () {
        var yearString = $('#dropdownMenuButton').text();
        $.ajax({
            type: 'GET',
            url: "https://api.themoviedb.org/3/discover/movie?year="+yearString+GetCriteria()+GetGenres()+"&api_key=ca3d69ee336e43d8099727f0d7ce3859",
            dataType: 'json',
            success: function (data) {
                
                ulMovies.empty();
                ulMovies.append('<div class="row">');
                $.each(data.results, function (index, val) {
                                        ulMovies.append('<script>$(".my-rating").starRating({starSize: 20,strokeColor: "red", readOnly: true});</script>');
                    if(!$('#appearanceChkBox').is(":checked"))
                        {
                     ulMovies.append('<div class="column"><div class="content"><div class="my-rating" data-rating="'+val.popularity+'"></div><img src=http://image.tmdb.org/t/p/w220_and_h330_face/' + val.poster_path + '> <h4>'+val.title+'</h4><p class="column">'+val.overview.substring(0, 80)+'</p></div></div>');
                        }else{
                    ulMovies.append('<li><div class="my-rating" data-rating="'+val.popularity+'"></div> Title - ' + val.title +  " Overview - " + val.overview + " Year - " + val.release_date + '<img src=http://image.tmdb.org/t/p/w220_and_h330_face/' + val.poster_path + '> </li>');
                        }
                });
                ulMovies.append('</div>');
            }
        });
        });
    $('#btnClear').click(function () {
            ulMovies.empty();
        });
    });