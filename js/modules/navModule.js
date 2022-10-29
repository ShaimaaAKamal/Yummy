

export function navAnimation(){
const navLinks=['#searchLink','#categoriesLink','#areaLink','#ingredientsLink','#contactLink'];
const delays=[300,500,700,900,1100];

// $('#menuIcon').click(function(){
//     $('.mainNav').css({'width':'270px','opacity':'1'}).addClass('ps-4 pe-1');

//     // $('.mainNav').css({'width':'270px','opacity':'1'}).addClass('ps-4 pe-1');
//     $('#closeMenuIcon').removeClass('d-none');
//     $(this).addClass('d-none');
//     navLinks.forEach((link,i)=> 
//     $(link).delay(delays[i]).animate({'bottom':'0px','opacity':1},400));
// })

// $('#closeMenuIcon').click(function(){
//     $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
//     $('#menuIcon').removeClass('d-none');
//     $(this).addClass('d-none');
//     navLinks.forEach(link=> $(link).css({'bottom':'-24vh','opacity':0}));
// })

$('#menuIcon').click(function(){
    $('aside').css({'transform':'translateX(0%)'});

    // $('.mainNav').css({'transform':'translateX(0%)','opacity':'1'}).addClass('ps-4 pe-1');
    $('#closeMenuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    navLinks.forEach((link,i)=> 
    $(link).delay(delays[i]).animate({'bottom':'0px','opacity':1},400));
})

$('#closeMenuIcon').click(function(){
    $('aside').css({'transform':'translateX(-270px)'});
    // $('.mainNav').css({'transform':'translateX(-150%)','opacity':'0'}).removeClass('ps-4 pe-1');
    $('#menuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    navLinks.forEach(link=> $(link).css({'bottom':'-24vh','opacity':0}));
})


}

    