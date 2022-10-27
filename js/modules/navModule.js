
export function navAnimation(){
const navLinks=['#searchLink','#categoriesLink','#areaLink','#ingredientsLink','#contactLink']
const delays=[250,400,600,800,1000]
$('#menuIcon').click(function(){
    $('.mainNav').removeClass('d-none');
    $('#closeMenuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    navLinks.forEach((link,i)=> 
    $(link).delay(delays[i]).animate({'bottom':'0px','opacity':1},400));
})

$('#closeMenuIcon').click(function(){
    $('.mainNav').addClass('d-none');
    $('#menuIcon').removeClass('d-none');
    $(this).addClass('d-none');
    navLinks.forEach(link=> $(link).css({'bottom':'-24vh','opacity':0}));
})

}
