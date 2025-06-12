// const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

// window.addEventListener("scroll", function()
// {
//     let offset = window.pageYOffset;
//     // parallax.style.backgroundPositionX = Math.sin(offset*0.01) * 10 - 50+ "px";
// })


window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=3100;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Calculate baseOffset only in landscape mode
    let baseOffset = 0;
    if (width > height) {
        baseOffset = -(width - height) * 0.25; // Adjust multiplier to control strength
    }

    parallax1.style.backgroundPositionY = baseOffset + offset*(0.1) + "px";
})

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=4800;
    parallax2.style.backgroundPositionY = offset*(-0.1) + "px";
})

function myFunction() {
    document.getElementById("check").checked = false;
  }


  
function reveal() {
var reveals = document.querySelectorAll(".reveal");
  
for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}
  
window.addEventListener("scroll", reveal);