document.addEventListener('DOMContentLoaded', function() {

    var burgerIcon = document.getElementById('burger-icon');
    var burgerMenu = document.getElementById('burger-menu');

    burgerIcon.addEventListener('click', function () {
       if(burgerIcon.classList.contains("active")){
           burgerIcon.classList.remove("active");
       }
       else {
           burgerIcon.classList.add("active");
       }
        if(burgerMenu.classList.contains("burger-menu_visible")){
            burgerMenu.classList.remove("burger-menu_visible");
        }
        else {
            burgerMenu.classList.add("burger-menu_visible");
        }
    });

    burgerMenu.addEventListener('click', function () {
        if(burgerIcon.classList.contains("active")){
            burgerIcon.classList.remove("active");
        }
        if(burgerMenu.classList.contains("burger-menu_visible")){
            burgerMenu.classList.remove("burger-menu_visible");
        }
    });

});
