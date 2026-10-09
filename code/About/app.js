const container = document.getElementById("Container");
const Creatorcontainer = document.getElementById("crearots");
const mobilemenu = document.getElementById("mobilemenu");

let skipper = 1;
let items = [];

const details = {
          1: {
                    name: "Adwaith.A",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          2: {
                    name: "Rohan R",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          3: {
                    name: "Jayanth",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          4: {
                    name: "Riya",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          5: {
                    name: "Meenakshy",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          6: {
                    name: "Swathi",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          7: {
                    name: "Chetana",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          8: {
                    name: "Hemaprabha K",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          9: {
                    name: "Varsha",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          10: {
                    name: "P V Sri Harsha",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          11: {
                    name: "Satish",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          12: {
                    name: "Vardhan Tammina",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          },
          13: {
                    name: "Pranaya Sree",
                    class: "AIE B",
                    whatapp: "",
                    insta: "",
                    phone: ""
          }
};


if (mobilemenu) {
          mobilemenu.style.display = "none";
}

function openMenu() {
          if (mobilemenu) mobilemenu.style.display = "block";
}

function closeMenu() {
          if (mobilemenu) mobilemenu.style.display = "none";
}

function shuffleArray(array) {
          const shuffled = [...array];
          for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
}

function cardCreator() {
          if (!Creatorcontainer) return;

          const keys = Object.keys(details);
          const shuffledKeys = shuffleArray(keys);

          let cardsHTML = "";

          for (let i = 0; i < shuffledKeys.length; i++) {
                    const key = shuffledKeys[i];
                    const person = details[key];

                    const cleanWhatsapp = person.whatapp.replace(/[^\d]/g, "");

                    cardsHTML += `
      <div class="creator-card">
        <div class="creator-img-container">
          <img src="./img/${person.name}.jpeg" alt="${person.name}" class="creator-img">
        </div>
        <h3>${person.name}</h3>
        <p class="creator-role">${person.class}</p>

        <div class="contact-bubbles">
          ${person.whatapp ? `
            <a href="https://wa.me/${cleanWhatsapp}" target="_blank" class="contact-bubble whatsapp" title="WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>` : ''
                              }
          ${person.insta ? `
            <a href="https://instagram.com/${person.insta}" target="_blank" class="contact-bubble instagram" title="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>` : ''
                              }
          ${person.phone ? `
            <a href="tel:${person.phone}" class="contact-bubble phone" title="Call">
              <i class="fa-solid fa-phone"></i>
            </a>` : ''
                              }
        </div>
      </div>`;
          }

          Creatorcontainer.innerHTML = cardsHTML;
}

cardCreator();