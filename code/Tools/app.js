const container = document.getElementById("Container")


const mobilemenu = document.getElementById("mobilemenu");


let items = []

mobilemenu.style.display = "none"

function openMenu() {
          mobilemenu.style.display = "block";
}

function closeMenu() {
          mobilemenu.style.display = "none";
}




const Tools = {
          "Classroom Locator": {
                    Label: "Classroom Locator",
                    IconClass: "fa-solid fa-location-dot",
                    description: "Find any classroom instantly."
          },
          "Food Court": {
                    Label: "Food Court",
                    IconClass: "fa-solid fa-utensils",
                    description: "Menus, locations and timings.",
                    Options: [
                              {
                                        label: "MandiMansil",
                                        location: "https://maps.app.goo.gl/Dr6Q8fMmTnynD9vm7?g_st=ac",
                                        distance: "120m away"
                              },
                              {
                                        label: "Rayan",
                                        location: "",
                                        distance: "120m away"
                              }
                              ,
                              {
                                        label: "Alrayan",
                                        location: "https://maps.app.goo.gl/858me3E9kB4CGfCH7?g_st=ac", 
                                        distance: "120m away"
                              }

                    ]
          },
          "Clubs": {
                    Label: "Clubs",
                    IconClass: "fa-solid fa-users",
                    description: "Explore all student clubs.",
                    Options: [
                              {
                                        label: "MandiMansil",
                                        location: "",
                                        distance: "120m away"
                              },

                    ]
          },
          "Emergency": {
                    Label: "Emergency",
                    IconClass: "fa-solid fa-phone",
                    description: "Quick access to important contacts."
          },
          "Gyms": {
                    Label: "Gyms",
                    IconClass: "fa-solid fa-dumbbell",
                    description: "Quick access to important contacts."
          },
          "Announcements": {
                    Label: "Announcements",
                    IconClass: "fa-solid fa-bullhorn",
                    description: "Stay updated with campus news."
          }
}
function CardGenerator(type, label, p, Icon, location) {
          switch (type) {
                    case 1:
                              return (`
                                        <div class="card" onclick="item_selected('${label}')">
                                                  <i class="${Icon}"></i>
                                                  <h3>${label}</h3>
                                                  <p>${p}</p>
                                        </div>
                                        `)
                              break
                    case 2:
                              return (`
                                        <div class="card_type2">
                                                  <img src="./img/${label}.png" alt="">
                                                  <div class="details">
                                                            <h3>${label}</h3>
                                                            <p>${p}</p>
                                                            <a href="${location}">
                                                                      <button>Lets's Go</button>
                                                            </a>
                                                  </div>
                                        </div>
                                        `)
          }

}

Object.values(Tools).forEach(element => {
          items.push(CardGenerator(1, element.Label, element.description, element.IconClass, ""))
          container.innerHTML = items.join("")


});



function item_selected(ItemName) {
          items = []
          Tools[ItemName].Options.forEach(element => {
                    items.push(CardGenerator(2, element.label, element.distance, "", element.location))
          })
          container.innerHTML = items.join("")


}