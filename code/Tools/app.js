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
                    type:1,
                    Label: "Classroom Locator",
                    IconClass: "fa-solid fa-location-dot",
                    description: "Find any classroom instantly."
          },
          "Food Court": {
                    type: 1,
                    Label: "Food Court",
                    IconClass: "fa-solid fa-utensils",
                    description: "Menus, locations and timings.",
                    Options: [
                              {
                                        type: 2,
                                        label: "MandiMansil",
                                        link: "https://maps.app.goo.gl/Dr6Q8fMmTnynD9vm7?g_st=ac",
                                        distance: "120m away"
                              },
                              {
                                        type: 2,
                                        label: "Rayan",
                                        link: "",
                                        distance: "120m away"
                              }
                              ,
                              {
                                        type: 2,
                                        label: "Alrayan",
                                        link: "https://maps.app.goo.gl/858me3E9kB4CGfCH7?g_st=ac", 
                                        distance: "120m away"
                              },
                              {
                                        type: 2,
                                        label: "Alrayan",
                                        link: "https://maps.app.goo.gl/858me3E9kB4CGfCH7?g_st=ac",
                                        distance: "120m away"
                              }
                              ,
                              {
                                        type: 2,
                                        label: "Alrayan",
                                        link: "https://maps.app.goo.gl/858me3E9kB4CGfCH7?g_st=ac",
                                        distance: "120m away"
                              },
                              {
                                        type: 2,
                                        label: "Alrayan",
                                        link: "https://maps.app.goo.gl/858me3E9kB4CGfCH7?g_st=ac",
                                        distance: "120m away"
                              },
                              {
                                        type: 2,
                                        label: "Alrayan",
                                        link: "https://maps.app.goo.gl/858me3E9kB4CGfCH7?g_st=ac",
                                        distance: "120m away"
                              }
                    ]
          },
          "Clubs": {
                    type: 1,
                    Label: "Clubs",
                    IconClass: "fa-solid fa-users",
                    description: "Explore all student clubs.",
                    Options: [
                              {
                                        type: 2,
                                        label: "Bios",
                                        link: "",
                                        distance: "120m away"
                              },
                              {
                                        type: 2,
                                        label: "Amfoss",
                                        link: "",
                                        distance: "120m away"
                              },

                    ]
          },
          "Emergency": {
                    type: 1,
                    Label: "Emergency",
                    IconClass: "fa-solid fa-phone",
                    description: "Quick access to important contacts.",
                    Options: [
                              {
                                        type: 3,
                                        label: "Fire 1",
                                        link: "",
                                        Icon:"fa-solid fa-fire"
                                        
                              },
                              {
                                        type: 3,
                                        label: "Fire 2",
                                        link: "",
                                        Icon: "fa-solid fa-fire"

                              },
                              
                              {
                                        type: 3,
                                        label: "Ambulance",
                                        link: "",
                                        Icon:"fa-solid fa-truck-medical"
                              }

                    ]
          },
          "Gyms": {
                    type: 1,
                    Label: "Gyms",
                    IconClass: "fa-solid fa-dumbbell",
                    description: "Quick access to important contacts."
          },
          "Announcements": {
                    type: 1,
                    Label: "Announcements",
                    IconClass: "fa-solid fa-bullhorn",
                    description: "Stay updated with campus news."
          }
}


Object.values(Tools).forEach(element => {
          items.push(CardGenerator(1, element.Label, element.description,"", element.IconClass, ""))
          container.innerHTML = items.join("")


});


function item_selected(ItemName) {
          items = []
          Tools[ItemName].Options.forEach(element => {
                    items.push(CardGenerator(element.type, element.label, element.description,element.distance,element.Icon, element.link))
          })
          container.innerHTML = items.join("")


}
function CardGenerator(type, label,description,distance, Icon, link) {
          switch (type) {
                    case 1:
                              return (`
                                        <div class="card" onclick="item_selected('${label}')">
                                                  <i class="${Icon}"></i>
                                                  <h3>${label}</h3>
                                                  <p>${description}</p>
                                        </div>
                                        `)
                              break
                    case 2:
                              return (`
                                        <div class="card_type2" id="${label}" onclick="expand('${label}')">
                                                  <img src="./img/${label}.png" alt="">
                                                  <div class="details">
                                                            <h3>${label}</h3>
                                                            <p>${distance}</p>
                                                            <a href="${link}">
                                                                      <button>Lets's Go</button>
                                                            </a>
                                                  </div>
                                        </div>
                                        `)
                    case 3:
                              return (`<a class="cardType3" href="tel:${link}">

                                                  <i class="${Icon}"></i>
                                                  <h3>${label}</h3>
                                                  

                                        </a>`)                                        
          }

}
function expand(id) {
          const box =document.getElementById(id)
          if (box.style.width != "100vw") { 
                    document.body.style="overflow:hidden"
                    box.style = "filter: blur(20px);"
                    box.style = "filter: blur(20px);animation:expand 200ms forwards;  z-index: 99999999999999;position: absolute;"
                    setTimeout(() => {
                              box.style = " height: 100vh; width: 100vw;filter: blur(0px); z-index: 99999999999999;position: absolute;top: 0px;  left: 0px;";
                    }, 400);
          }
         
           
}