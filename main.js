import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Replace these values with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB5usLOtpEiZgIMceVWU6mUM21yNM49FKE",
    authDomain: "weddingrsvp-45942.firebaseapp.com",
    projectId: "weddingrsvp-45942",
    storageBucket: "weddingrsvp-45942.firebasestorage.app",
    messagingSenderId: "533864515136",
    appId: "1:533864515136:web:1f5235739e1fb3d6f1c1a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ✅ Initialize Firestore (after app init)
const db = getFirestore(app);

let guestList;
fetchGuestList().then((data) => {
  guestList = data.guestList;
  guestDataById = data.guestDataById;

  // console.log(data);
});
// const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

let animatingIn = false;
let message = ""

// window.addEventListener("scroll", function()
// {
//     let offset = window.pageYOffset;
//     // parallax.style.backgroundPositionX = Math.sin(offset*0.01) * 10 - 50+ "px";
// })
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

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

document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("check").checked = false;
  });
});

// const guestList = {
//   "kevin soliman": 4,
//   "sarah cruz": 2,
//   "john doe": 0
// };

document.getElementById("rsvp1").onclick = () => {
  showRSVPForm();
};

document.getElementById("rsvp2").onclick = () => {
  showRSVPForm();
};

document.getElementById("view1").onclick = () => {
  document.getElementById('entourageModal').classList.remove('hidden');
  document.getElementById('entourageOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  document.getElementById('entourageModal').classList.add("fade-in");
  document.getElementById('entourageOverlay').classList.add("fade-in2");
};

document.getElementById("view2").onclick = () => {
  document.getElementById('attireModal').classList.remove('hidden');
  document.getElementById('entourageOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  document.getElementById('attireModal').classList.add("fade-in");
  document.getElementById('entourageOverlay').classList.add("fade-in2");
};

document.getElementById("view3").onclick = () => {
  document.getElementById('venueModal').classList.remove('hidden');
  document.getElementById('entourageOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  document.getElementById('venueModal').classList.add("fade-in");
  document.getElementById('entourageOverlay').classList.add("fade-in2");
};

// Close Entourage Modal
document.getElementById('closeEntourageModal').onclick = () => {
  animateOutEntourage();
};
document.getElementById('modalEntourageOverlay').onclick = () => {
  animateOutEntourage();
};
document.getElementById('closeAttireModals').onclick = () => {
  animateOutAttire();
};
document.getElementById('modalAttireOverlay').onclick = () => {
  animateOutAttire();
};
document.getElementById('closeVenueModal').onclick = () => {
  animateOutVenue();
};
document.getElementById('modalVenueOverlay').onclick = () => {
  animateOutVenue();
};


function animateOutEntourage() {
  document.getElementById('entourageModal').classList.remove("fade-in");
  document.getElementById('entourageOverlay').classList.remove("fade-in2");

  document.getElementById('entourageModal').classList.add("fade-out");
  document.getElementById('entourageOverlay').classList.add("fade-out2");

  setTimeout(() => {
    document.getElementById('entourageModal').classList.remove("fade-out");
    document.getElementById('entourageOverlay').classList.remove("fade-out2");

    document.getElementById('entourageModal').classList.add('hidden');
    document.getElementById('entourageOverlay').classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

function animateOutAttire() {
  document.getElementById('attireModal').classList.remove("fade-in");
  document.getElementById('entourageOverlay').classList.remove("fade-in2");

  document.getElementById('attireModal').classList.add("fade-out");
  document.getElementById('entourageOverlay').classList.add("fade-out2");

  setTimeout(() => {
    document.getElementById('attireModal').classList.remove("fade-out");
    document.getElementById('entourageOverlay').classList.remove("fade-out2");

    document.getElementById('attireModal').classList.add('hidden');
    document.getElementById('entourageOverlay').classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

function animateOutVenue() {
  document.getElementById('venueModal').classList.remove("fade-in");
  document.getElementById('entourageOverlay').classList.remove("fade-in2");

  document.getElementById('venueModal').classList.add("fade-out");
  document.getElementById('entourageOverlay').classList.add("fade-out2");

  setTimeout(() => {
    document.getElementById('venueModal').classList.remove("fade-out");
    document.getElementById('entourageOverlay').classList.remove("fade-out2");

    document.getElementById('venueModal').classList.add('hidden');
    document.getElementById('entourageOverlay').classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

document.getElementById("submitRSVP").onclick = async () => {
  const rawName = document.getElementById("guestName").value.trim();
  const name = rawName.toLowerCase();

  const guestId = guestList[name];
  const guestData = guestDataById?.[guestId];

  if (!guestId || !guestData) {
    showRSVPModal("error");
    return;
  }

  const willAttend = document.getElementById("willAttend").value === "yes";
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  const plusOnes = [];
  document.querySelectorAll("#plusOnesContainer input").forEach((input) => {
    const val = input.value.trim();
    if (val) plusOnes.push(val);
  });

  const rsvpData = {
    id: guestData.id,
    name: rawName,
    willAttend,
    email,
    mobile,
    plusOnes,
    secretKey: "MY_SUPER_SECRET_KEY"
  };

  document.querySelector(".modal-content").classList.remove("fade-in");
  document.querySelector(".modal-content").classList.remove("fade-out");

  document.querySelector(".modal-content").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".modal-content").classList.remove("fade-out");
    document.querySelector(".modal-content").classList.add("hidden");
    document.body.style.overflow = "";
    hideForms();
  }, 300);

  message = `
    Thank you for responding!  
    We're so happy you'll be joining us on our special day.  
    We can't wait to celebrate together!
  `;

  showRSVPModal("loading");

  try {
    await submitRSVP(rsvpData);
    showRSVPModal("success");
  } catch (error) {
    console.error(error);
    showRSVPModal("error");
  }
};

async function submitRSVP(data) {
  await setDoc(doc(db, "rsvps", data.id), data);
}

function showRSVPModal(status) {
  const modal = document.getElementById("rsvpSubmitModal");
  
  if (modal.classList.contains("hidden")) {
    modal.classList.add("fade-in");
    updateRSVPModal(status);
    setTimeout(() => {
      modal.classList.remove("fade-in");
    }, 300);
  } else {
    modal.classList.add("fade-out");
    setTimeout(() => {
      updateRSVPModal(status);
      modal.classList.remove("fade-out");
      modal.classList.add("fade-in");
      setTimeout(() => {
        modal.classList.remove("fade-in");
      }, 300);

    }, 300);
  }

  // Always show the modal container
  modal.classList.remove("hidden");  
}

function updateRSVPModal(status) {
  const loading = document.getElementById("rsvpLoading");
  const success = document.getElementById("rsvpSuccess");
  const error = document.getElementById("rsvpError");

  // Hide all inner status views first
  loading.style.display = "none";
  success.style.display = "none";
  error.style.display = "none";

  // Show only the one that matches the status
  if (status === "loading") {
    loading.style.display = "flex";
  } else if (status === "success") {
    success.style.display = "flex";
    animateOutRSVPModal();
  } else if (status === "error") {
    message = `Please try submitting your RSVP again shortly. If the issue continues, don't hesitate to contact us directly. Thank you!`
    error.style.display = "flex";
    animateOutRSVPModal();
  }
}

function animateOutRSVPModal() {
  const modal = document.getElementById("rsvpSubmitModal");

  setTimeout(() => {
      modal.classList.add("fade-out");
      setTimeout(() => {
        modal.classList.remove("fade-out");
        modal.classList.add("hidden");
        animateOutRSVPCompleted();
      }, 300);
    }, 2000);
}

function animateOutRSVPCompleted() {
  const messageDiv = document.getElementById("rsvpMessage");
  messageDiv.classList.remove("hidden");
  document.querySelector(".modal-content").classList.remove("hidden");

  // setTimeout(() => {
    document.querySelector(".modal-content").classList.remove("fade-out");
    document.querySelector(".modal-content").classList.add("fade-in");

    hideRSVPForm(true);
    messageDiv.innerHTML = message;
    animatePopupOut(5000);
  // }, 300);
}

async function willNotAttend() {
  const rawName = document.getElementById("guestName").value.trim();
  const name = rawName.toLowerCase();

  const guestId = guestList[name]; // guestList maps normalized name → ID
  const guestData = guestDataById?.[guestId];

  if (!guestId || !guestData || typeof guestId !== "string") {
    console.error("Guest not found or invalid guestId:", guestId);
    showRSVPModal("error");
    return;
  }

  const rsvpData = {
    id: guestId,
    name: rawName,
    willAttend: false,
    email: "n/a",
    mobile: "n/a",
    plusOnes: [],
    secretKey: "MY_SUPER_SECRET_KEY"
  };

  showRSVPModal("loading");

  try {
    await submitRSVP(rsvpData);
    showRSVPModal("success");
  } catch (error) {
    console.error("RSVP submit error:", error);
    showRSVPModal("error");
  }
}

async function fetchGuestList() {
  const guestCollection = collection(db, "guests");
  const guestSnapshot = await getDocs(guestCollection);
  const guestList = {};        // name variations → ID
  const guestDataById = {};    // ID → full guest data

  guestSnapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    guestDataById[id] = data;

    const lastName = data.lastName ? data.lastName.toLowerCase().trim() : "";

    // Add display names
    (data.displayNames || []).forEach((fullName) => {
      guestList[fullName.toLowerCase().trim()] = id;
    });

    // Add full names from 'names' array
    (data.names || []).forEach((guest) => {
      const firstName = guest.firstName?.toLowerCase().trim() || "";
      const fullName = `${firstName} ${lastName}`;
      guestList[fullName] = id;

      // Add nicknames + last name
      (guest.nicknames || []).forEach((nickname) => {
        const combo = `${nickname.toLowerCase().trim()} ${lastName}`;
        guestList[combo] = id;
      });
    });
  });

  // Reveal UI
  document.getElementById("rsvp1").classList.remove("hidden");
  document.getElementById("rsvp2").classList.remove("hidden");
  document.getElementById("rsvp1").classList.add("fade-in");
  document.getElementById("rsvp2").classList.add("fade-in");

  // Store both globally if needed
  window.guestList = guestList;
  window.guestDataById = guestDataById;

  return { guestList, guestDataById };
}

document.getElementById("closeModal").onclick = () => {
  // document.getElementById("rsvpModal").classList.add("hidden");
  // document.body.style.overflow = "";
  animatePopupOut(0);
};

// Optional: close on click outside
document.getElementById("rsvpModal").addEventListener("click", (e) => {
  if (e.target.id === "overlay") {
    animatePopupOut(0);
  }
});

function hideRSVPForm(hideCloseButton) {
  document.getElementById("rsvpStep1").classList.add("hidden");
  document.querySelector("#rsvpModal h2").classList.add("hidden");
  if (hideCloseButton) document.getElementById("closeModal").classList.add("hidden");
}

function showRSVPForm() {
  hideForms();
  animatePopupIn();
}

function hideForms() {
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

  const rawName = document.getElementById("guestName").value.trim();
  const name = rawName.toLowerCase();
  const willAttend = document.getElementById("willAttend").value;
  const messageDiv = document.getElementById("rsvpMessage");

  // Find guest ID by name
  const guestId = guestList[name];
  const guestData = guestDataById?.[guestId];

  const onList = !!guestData;

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
    
    message = `
      Thank you for responding.  
      We're sad to hear you can't make it, but truly appreciate you taking the time to RSVP.
    `;
    
    willNotAttend();
    // setTimeout(() => {
    //   document.querySelector(".modal-content").classList.remove("fade-out");
    //   document.querySelector(".modal-content").classList.add("fade-in");

    //   hideRSVPForm(true);
    //   messageDiv.innerHTML = `
    //     Thank you for responding.  
    //     We're sad to hear you can't make it, but truly appreciate you taking the time to RSVP.
    //   `;
    //   animatePopupOut(4000);
    // }, 300);

    return;
  }

  if (onList && willAttend === "yes") {
  setTimeout(() => {
    document.querySelector(".modal-content").classList.remove("fade-out");
    document.querySelector(".modal-content").classList.add("fade-in");

    hideRSVPForm(false);

    // Show Step 2 form
    document.getElementById("rsvpStep2").classList.remove("hidden");

    // Get guest ID and data
    const guestId = guestList[name];
    const guestData = guestDataById?.[guestId];

    const plusGuests = guestData?.plus || 0;
    const container = document.getElementById("plusOnesContainer");
    container.innerHTML = ""; // Clear previous content

    if (plusGuests > 0 && guestData?.names?.length > 0) {
      container.innerHTML += `
        <p class="plus-label">Additional Guests</p>
        <p class="disclaimer left-align">Leave the box empty if you have no additional guest.</p>
      `;

      const lowerInput = name.toLowerCase();

      // Filter out the main name used during RSVP
      const otherNames = guestData.names.filter((n) => {
        const full = `${n.firstName} ${guestData.lastName}`.toLowerCase();
        const nickMatches = (n.nicknames || []).some((nick) =>
          `${nick} ${guestData.lastName}`.toLowerCase() === lowerInput
        );
        return full !== lowerInput && !nickMatches;
      });

      for (let i = 0; i < plusGuests; i++) {
        const plusName = otherNames[i]
          ? `${otherNames[i].firstName} ${guestData.lastName}`
          : "";
        container.innerHTML += `
          <input type="text" name="plus${i + 1}" placeholder="Full Name" value="${plusName}" />
        `;
      }
    }
  }, 300);
}
});

function startAttireRotation(imgElement, imagePaths, boy, colorElement,  interval = 3000) {
    // list.forEach(li => li.classList.remove("active"));
    
    let index = 0;

    setInterval(() => {
        var list = boyListItems.querySelectorAll("span");
        if (!boy) list = girlListItems.querySelectorAll("span");

        list.forEach(li => li.classList.remove("bold"));

        imgElement.classList.remove("fade-in");
        imgElement.classList.add("fade-out");

        colorElement.classList.remove("fade-in");
        colorElement.classList.add("fade-out");

        setTimeout(() => {
          index = (index + 1) % imagePaths.length;
          imgElement.src = imagePaths[index].src;

          list[index].classList.add("bold");

          if (boy) {
            boyColorContainer.innerHTML = ""; // Clear old colors

            boyColors[index].forEach(color => {
              const circle = document.createElement("div");
              circle.classList.add("color-circle");
              circle.style.backgroundColor = color;
              boyColorContainer.appendChild(circle);
            });
          }

          imgElement.classList.remove("fade-out");
          imgElement.classList.add("fade-in");

          colorElement.classList.remove("fade-out");
          colorElement.classList.add("fade-in");
        }, 300);
    }, interval);
}

// Boy images
const boyImages = [
    "media/boy_attire1.png",
    "media/boy_attire2.png",
    "media/boy_attire3.png"
];
const boyColors = [
  ["#FFFFF0", "#F5F5DC", "#FFFFFF"], // for attire1
  ["#919EA4", "#A7A376", "#F2E88A", "#D4B2E4", "#C4A092"], // for attire2
  ["#000000", "#203354", "#C4A484"]  // for attire3
];
const boyAttireImg = document.getElementById("boyAttire");
const boyListItems = document.getElementById("boyAttireLine");
const boyColorContainer = document.getElementById("boyColors");
// const boyColorCircles = document.querySelectorAll("#boyColors .color-circle");

// Girl images
const girlImages = [
    "media/girl_attire1.png",
    "media/girl_attire2.png",
    "media/girl_attire3.png"
];
const girlAttireImg = document.getElementById("girlAttire");
const girlListItems = document.getElementById("girlAttireLine");
const girlColorContainer = document.getElementById("girlColors");
// const girlColorCircles = document.querySelectorAll("#girlColors .color-circle");

function preloadImages(paths) {
  var preloadedImages = [];

  paths.forEach((path, i) => {
    const img = new Image();
    img.src = path;
    preloadedImages[i] = img;
  });

  return preloadedImages;
}

var preloadedBoyImages = preloadImages(boyImages);
var preloadedGirlImages = preloadImages(girlImages);

// Start both rotations
startAttireRotation(boyAttireImg, preloadedBoyImages, true, boyColorContainer);
startAttireRotation(girlAttireImg, preloadedGirlImages, false, girlColorContainer);
