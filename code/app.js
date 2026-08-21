

const cards = document.querySelectorAll(".card");
const Elements = document.querySelectorAll(".element");
const h1s = document.querySelectorAll(".slidIn");

const collage = document.getElementById("Collage");
collage.style.opacity = "0";
collage.style.transform = "translateX(240px)";
collage.style.transition = "1s";
document.body.display = "0";

const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
                    if (entry.isIntersecting) {
                              entry.target.style.opacity = "1";
                              entry.target.style.transform = "translateY(0px)";
                    }

          });

});
const h1observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
                    if (entry.isIntersecting) {
                              entry.target.style.opacity = "1";
                              entry.target.style.transform = "translateY(0px)";
                    }

          });

});
const elementobserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
                    if (entry.isIntersecting) {
                              entry.target.style.opacity = "1";
                    }

          });

});
setTimeout(() => {
          collage.style.opacity = "1";
          collage.style.transform = "translateX(0px)";

}, 300

)


cards.forEach(card => {

          card.style.opacity = "0";
          card.style.transform = "translateY(40px)";
          card.style.transition = "0.6s";
          observer.observe(card);

});
Elements.forEach(element => {

          element.style.opacity = "0";
          element.style.transition = "1.6s";
          elementobserver.observe(element);

});
h1s.forEach(h1 => {
          h1.style.transform = "translateX(-40vw)";
          h1.style.opacity = "0";
          h1.style.transition = "1.6s";
          h1observer.observe(h1);

});

const mobilemenu = document.getElementById("mobilemenu");
mobilemenu.style.display = "none"

function openMenu() {
          mobilemenu.style.display = "block";
}

function closeMenu() {
          mobilemenu.style.display = "none";
}