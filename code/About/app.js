const container = document.getElementById("Container")


const mobilemenu = document.getElementById("mobilemenu");

let skipper = 1
let items = []

mobilemenu.style.display = "none"

function openMenu() {
          mobilemenu.style.display = "block";
}

function closeMenu() {
          mobilemenu.style.display = "none";
}
function cardCreator() {
          const Tools = {
                    "": {
                              type: 1,
                              Label: "Classroom Locator",
                              IconClass: "fa-solid fa-location-dot",
                              description: "Find any classroom instantly.",
                              link: "ClassroomLocator/index.html"
                    }
          }
}