

$('#menuIcon').click(function(){
    $('.mainNav').removeClass('d-none');
    $('#closeMenuIcon').removeClass('d-none');
    $(this).addClass('d-none');

    $('#searchLink').animate({'bottom':'0px','opacity':1},400);
    $('#categoriesLink').animate({'bottom':'0px','opacity':1},500);
    $('#areaLink').animate({'bottom':'0px','opacity':1},600)
    $('#ingredientsLink').animate({'bottom':'0px','opacity':1},700)
    $('#contactLink').animate({'bottom':'0px','opacity':1},800)

})

$('#closeMenuIcon').click(function(){
    $('.mainNav').addClass('d-none');
    $('#menuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    $('#searchLink').css({'bottom':'-34vh','opacity':0});
    $('#categoriesLink').css({'bottom':'-34vh','opacity':0});
    $('#areaLink').css({'bottom':'-34vh','opacity':0});
    $('#ingredientsLink').css({'bottom':'-34vh','opacity':0});
    $('#contactLink').css({'bottom':'-34vh','opacity':0});
})



