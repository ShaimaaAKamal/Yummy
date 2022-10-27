

$('#menuIcon').click(function(){
    $('.mainNav').removeClass('d-none');
    $('#closeMenuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    // $('#searchLink').delay(200).animate({'bottom':'0px','opacity':1},400);
    // $('#categoriesLink').delay(300).animate({'bottom':'0px','opacity':1},500);
    // $('#areaLink').delay(400).animate({'bottom':'0px','opacity':1},600)
    // $('#ingredientsLink').delay(500).animate({'bottom':'0px','opacity':1},700)
    // $('#contactLink').delay(600).animate({'bottom':'0px','opacity':1},800)
    $('#searchLink').delay(250).animate({'bottom':'0px','opacity':1},400);
    $('#categoriesLink').delay(400).animate({'bottom':'0px','opacity':1},400);
    $('#areaLink').delay(600).animate({'bottom':'0px','opacity':1},400)
    $('#ingredientsLink').delay(800).animate({'bottom':'0px','opacity':1},400)
    $('#contactLink').delay(1000).animate({'bottom':'0px','opacity':1},400)

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



