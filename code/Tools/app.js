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
                                        location: "", distance: "120m away"
                              },
                              {
                                        label: "Ryan",
                                        location: "", distance: "120m away"
                              }
                              ,
                              {
                                        label: "Alrayan",
                                        location: "", distance: "120m away"
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

Object.values(Tools).forEach(element => {
          items.push(`             
                    <div class="card" onclick="item_selected('${element.Label}')">
                    
                              <i class="${element.IconClass}"></i>
                    
                              <h3>${element.Label}</h3>
                    
                              <p>${element.description}</p>
                    
                    </div>`)
          container.innerHTML = items.join("")

});



function item_selected(ItemName) {
          items = []
          Tools[ItemName].Options.forEach(element => {
                    items.push(`
                              <div class="card_type2">
                                        <img src="./img/${element.label}.png" alt="">
                                        <div class="details">
                                                  <h3>${element.label}</h3>
                                                  <p>${element.distance}</p>
                                                  <a href="${element.location}">
                                                            <button>Lets's Go</button>
                                                  </a>
                                        </div>
                              </div>`)

          })
          container.innerHTML=items.join("")


}