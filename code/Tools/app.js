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
                    type: 1,
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
                                        Icon: "fa-solid fa-fire"

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
                                        Icon: "fa-solid fa-truck-medical"
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
const data = {
          "MandiMansil": {
                    type: 4,
                    label: "MandiMansil",
                    link: "https://maps.app.goo.gl/Dr6Q8fMmTnynD9vm7?g_st=ac",
                    distance: "120m away",
                    contacts: ["+91 9544457621", "+91 8918282189", "+91 8918282189"],
                    items: ["porita", "mandi", "chiken", "kundi", "kundi", "kundi", "kundi", "kundi", "kundi", "kundi", "kundi", "kundi", "kundi", "kundi", "kundi"],
                    price: ["110", "200", "232", "232", "232", "232", "232", "232", "232", "232", "232", "232", "232", "232", "232"]
          }
}


Object.values(Tools).forEach(element => {
          items.push(CardGenerator(1, element.Label, element.description, "", element.IconClass, ""))
          container.innerHTML = items.join("")


});

function closeMenu() { item_selected(localStorage.getItem('ItemName')) }

function item_selected(ItemName) {
          localStorage.setItem("ItemName", ItemName)
          items = []
          Tools[ItemName].Options.forEach(element => {
                    items.push(CardGenerator(element.type, element.label, element.description, element.distance, element.Icon, element.link))
          })
          container.innerHTML = items.join("")


}
function CardGenerator(type, label, description, distance, Icon, link, items, price, details) {
          switch (type) {
                    case 1:
                              return (`
                                        <div class="card" onclick="item_selected('${label}')">
                                                  <i class="${Icon}"></i>
                                                  <h3>${label}</h3>
                                                  <p>${description}</p>
                                        </div>
                                        `)

                    case 2:
                              return (`
                                        <div class="card_type2" id="${label}" onclick="expand('${label}')">
                                                  <img src="./img/${label}.png" alt="">
                                                  <div id="${label}d" class="details">
                                               
                                                  <h3 id="${label}h">${label}</h3>
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

                    case 4:
                              let k, ItemList = "", contacts = ""
                              console.log(items,price,details)
                              for (k = 0; k < items.length; k++) {
                                        ItemList += `
                                                  <tr>
                                                             <td>${items[k]}</td>
                                                             <td>${price[k]}</td>
                                                  </tr>`

                              }

                              for (k = 0; k < details.length; k++) {
                                        contacts += `
                                                            <a href="tel:${details[k]}">${details[k]}</a>
                                                            `
                              }
                              return (`
                                                            <h3>${label}</h3>
                                                            <p>${distance}</p>
                                                            <table>
                                                                      <thead>
                                                                               
                                                                                <tr>
                                                                                          <td>Item</td>
                                                                                          <td>Price</td>
                                                                                </tr>
                                                                      </thead>
                                                                      ${ItemList}

                                                            </table>
                                                            <div class="Phone">${contacts}</div>
                                                            <a href="${link}">
                                                                      <button>Lets's Go</button>
                                                            </a>
                                                            
                                                            <button class="close"><a href=""><i class="fa-solid fa-xmark"></a></i></button>
                                                             
                                                  `)

          }

}
function expand(id) {
          const box = document.getElementById(id)
          const details = document.getElementById(id + "d")
          if (box.style.width != "100vw") {
                    window.scrollTo({
                              top: 0,
                              behavior: 'instant'
                    });
                    document.body.style = "overflow:hidden;"
                    container.style = "overflow:scroll;"
                    box.style = "filter: blur(20px);"

                    box.style = "filter: blur(20px);animation:expand 200ms forwards;  z-index: 99999999999999;position: absolute;"
                    setTimeout(() => {
                              details.innerHTML = CardGenerator(data[id].type, data[id].label, "", data[id].distance, "", data[id].link, data[id].items, data[id].price, data[id].contacts)
                              box.style = "overflow:scroll; height: 100vh; width: 100vw;filter: blur(0px); z-index: 99999999999999;position: absolute;top: 0px;  left: 0px;";

                              box.classList.replace('card_type2', 'card_type4');
                    }, 400);
          }


}