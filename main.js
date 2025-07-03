// const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

let animatingIn = false;

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

const guestList = {
  "kevin soliman": 4,
  "sarah cruz": 2,
  "john doe": 0
};

document.getElementById("rsvp1").onclick = () => {
  showRSVPForm();
};

document.getElementById("rsvp2").onclick = () => {
  showRSVPForm();
};

document.getElementById("submitRSVP").onclick = () => {
  console.log("submit");
};

document.getElementById("closeModal").onclick = () => {
  // document.getElementById("rsvpModal").classList.add("hidden");
  // document.body.style.overflow = "";
  this.animatePopupOut(0);
};

// Optional: close on click outside
document.getElementById("rsvpModal").addEventListener("click", (e) => {
  if (e.target.id === "overlay") {
    this.animatePopupOut(0);
  }
});

function hideRSVPForm(hideCloseButton) {
  document.getElementById("rsvpStep1").classList.add("hidden");
  document.querySelector("#rsvpModal h2").classList.add("hidden");
  if (hideCloseButton) document.getElementById("closeModal").classList.add("hidden");
}

function showRSVPForm() {
  // Reset form visibility
  document.getElementById("rsvpModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Show form and title again
  document.getElementById("rsvpStep1").classList.remove("hidden");
  document.querySelector("#rsvpModal h2").classList.remove("hidden");

  document.getElementById("closeModal").classList.remove("hidden");

  // Reset form fields
  // document.getElementById("guestName").value = "";
  // document.getElementById("willAttend").value = "";

  // Clear any previous messages
  const messageDiv = document.getElementById("rsvpMessage");
  messageDiv.classList.add("hidden");
  messageDiv.innerHTML = "";

  document.getElementById("rsvpStep2").classList.add("hidden");

  // const container = document.getElementById("plusOnesContainer");
  // container.innerHTML = ""; // Clear previous content

  animatePopupIn();
}

function animatePopupIn() {
  if (animatingIn) return;

  animatingIn = true;

  document.querySelector(".modal-content").classList.add("fade-in");
  document.querySelector(".overlay").classList.add("fade-in2");
  setTimeout(() => {
    document.querySelector(".modal-content").classList.remove("fade-in");
    document.querySelector(".overlay").classList.remove("fade-in2");
    document.body.style.overflow = "";
  }, 300);
}

function animatePopupOut(delay) {
  if (!animatingIn) return;

  animatingIn = false;

  document.querySelector(".modal-content").classList.remove("fade-in");

  setTimeout(() => {
    document.querySelector(".modal-content").classList.add("fade-out");
    document.querySelector(".overlay").classList.add("fade-out2");
    setTimeout(() => {
      document.getElementById("rsvpModal").classList.add("hidden");
      document.querySelector(".modal-content").classList.remove("fade-out");
      document.querySelector(".overlay").classList.remove("fade-out2");
      document.body.style.overflow = "";
    }, 300);
  }, delay);
}

// Handle RSVP check
document.getElementById("rsvpStep1").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim().toLowerCase();
  const willAttend = document.getElementById("willAttend").value;
  const messageDiv = document.getElementById("rsvpMessage");

  let onList = guestList.hasOwnProperty(name);

  messageDiv.classList.remove("hidden");

  document.querySelector(".modal-content").classList.add("fade-out");

  if (!onList && willAttend === "yes") {
    setTimeout(() => {
      document.querySelector(".modal-content").classList.remove("fade-out");
      document.querySelector(".modal-content").classList.add("fade-in");

      hideRSVPForm(false);
      messageDiv.innerHTML = `
        <strong>Oops!</strong><br>
        Your name wasn't found on the guest list.<br> 
        Please contact us directly.<br><br>
        Kevin: 0915-304-0613<br>
        Eunice: 0916-199-0609
      `;
    }, 300);
    return;
  }

  if (!onList && willAttend === "no") {
    setTimeout(() => {
      document.querySelector(".modal-content").classList.remove("fade-out");
      document.querySelector(".modal-content").classList.add("fade-in");

      hideRSVPForm(true);
      messageDiv.innerHTML = `
        Thank you for letting us know.  
        We're sorry to hear you won't be attending.  
        Sending love and warm wishes from afar!
      `;
      animatePopupOut(4000);
    }, 300);
    return;
  }

  if (onList && willAttend === "no") {
    setTimeout(() => {
      document.querySelector(".modal-content").classList.remove("fade-out");
      document.querySelector(".modal-content").classList.add("fade-in");

      hideRSVPForm(true);
      messageDiv.innerHTML = `
        Thank you for responding.  
        We're sad to hear you can't make it, but truly appreciate you taking the time to RSVP.
      `;
      animatePopupOut(4000);
    }, 300);
    
    return;
  }

  if (onList && willAttend === "yes") {
    setTimeout(() => {
      document.querySelector(".modal-content").classList.remove("fade-out");
      document.querySelector(".modal-content").classList.add("fade-in");
      
      hideRSVPForm(false);
      // messageDiv.classList.remove("hidden");
      // messageDiv.innerHTML = "Thank you for allotting your time for our wedding day!";

      // Show Step 2 form
      document.getElementById("rsvpStep2").classList.remove("hidden");

      // Add plus-one fields if needed
      const guestData = guestList[document.getElementById("guestName").value.trim().toLowerCase()];

      const container = document.getElementById("plusOnesContainer");
      container.innerHTML = ""; // Clear previous content

      if (guestData > 0) {
        container.innerHTML += `
          <p class="plus-label">Additional Guests</p>
          <p class="disclaimer left-align">Leave the box empty if you have no additional guest.</p>
        `;
        for (let i = 1; i <= guestData; i++) {
          container.innerHTML += `
            <input type="text" name="plus${i}" placeholder="Full Name" />
          `;
        }
      }
    }, 300);

    
    return;
  }
});
