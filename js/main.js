
var Butt_toggle = document.getElementById("toggle-buuton")
var nav_links = document.getElementById("nav-links")


window.onscroll = function () {
    const myBtn = document.getElementById('btn');

    if (window.scrollY >= 400) {

        myBtn.style.display = "block";

    }
    else if (window.scrollY < 400) {

        myBtn.style.display = "none";
    }


};

function topFunction() {
    document.body.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function openLinks() {
    // nav_links.style.display = "block"
    nav_links.classList.toggle("collapse");

}