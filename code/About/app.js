const container = document.getElementById("Container");
const Creatorcontainer = document.getElementById("crearots");
const mobilemenu = document.getElementById("mobilemenu");

let skipper = 1;
let items = [];

const details = {
          1: {
                    name: "Adwaith.A",
                    class: "AIE B",
                    whatapp: "+919544654395",
                    insta: "",
                    phone: "+919544654395"
          },
          2: {
                    name: "Rohan R",
                    class: "AIE B",
                    whatapp: "+917276882215",
                    insta: "",
                    phone: "7276882215"
          },
          3: {
                    name: "Jayanth",
                    class: "AIE B",
                    whatapp: "+919059981065",
                    insta: "",
                    phone: "9059981065"
          },
          4: {
                    name: "Riya",
                    class: "AIE B",
                    whatapp: "9895921308",
                    insta: "",
                    phone: "9895921308"
          },
          5: {
                    name: "Meenakshy",
                    class: "AIE B",
                    whatapp: "+917012444529",
                    insta: "",
                    phone: "7012444529"
          },
          6: {
                    name: "Swathi",
                    class: "AIE B",
                    whatapp: "8921321507",
                    insta: "",
                    phone: "8921321507"
          },
          7: {
                    name: "Chetana",
                    class: "AIE B",
                    whatapp: "833087562",
                    insta: "",
                    phone: "833087562"
          },
          8: {
                    name: "Hemaprabha K",
                    class: "AIE B",
                    whatapp: "+919150359502",
                    insta: "",
                    phone: "9150359502"
          },
          9: {
                    name: "Varsha",
                    class: "AIE B",
                    whatapp: "+918520034519",
                    insta: "",
                    phone: "8520034519"
          },
          10: {
                    name: "P V Sri Harsha",
                    class: "AIE B",
                    whatapp: "+9172819606367",
                    insta: "",
                    phone: "72819606367"
          },
          11: {
                    name: "Satish",
                    class: "AIE B",
                    whatapp: "+918125349760",
                    insta: "",
                    phone: "+918125349760"
          },
          12: {
                    name: "Vardhan Tammina",
                    class: "AIE B",
                    whatapp: "+918014355143",
                    insta: "",
                    phone: "+918014355143"
          },
          13: {
                    name: "Pranaya Sree",
                    class: "AIE B",
                    whatapp: "+918374128467",
                    insta: "",
                    phone: "+918374128467"
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