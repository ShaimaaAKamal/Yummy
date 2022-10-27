

$('#menuIcon').click(function(){
    $('.mainNav').removeClass('d-none');
    $('#closeMenuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    $('#searchLink').delay(150).animate({'bottom':'0px','opacity':1},400);
    $('#categoriesLink').delay(150).animate({'bottom':'0px','opacity':1},500);
    $('#areaLink').delay(150).animate({'bottom':'0px','opacity':1},600)
    $('#ingredientsLink').delay(150).animate({'bottom':'0px','opacity':1},700)
    $('#contactLink').delay(150).animate({'bottom':'0px','opacity':1},800)

})

$('#closeMenuIcon').click(function(){
    $('.mainNav').addClass('d-none');
    $('#menuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    $('#searchLink').css({'bottom':'-24vh','opacity':0});
    $('#categoriesLink').css({'bottom':'-24vh','opacity':0});
    $('#areaLink').css({'bottom':'-24vh','opacity':0});
    $('#ingredientsLink').css({'bottom':'-24vh','opacity':0});
    $('#contactLink').css({'bottom':'-24vh','opacity':0});
})



