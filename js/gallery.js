let prevCategory = document.querySelector(".imgs-categories li");
const allImgsBtn = document.getElementById("all-imgs");
const charactersImgsBtn = document.getElementById("characters-imgs");
const generalImgsBtn = document.getElementById("general-pictures");
const gallery = document.querySelector(".gallery");

// utilities functions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// imgs arrays

const charImgs = [];
const generalImgs = [];

for (let i = 0; i <= 37; i++) {
  charImgs.push(`img/characters/${i}.jpg`);
}
for (let i = 0; i <= 21; i++) {
  generalImgs.push(`img/general/${i}.jpg`);
}

shuffleArray(charImgs);
shuffleArray(generalImgs);
const allImgs = [...charImgs, ...generalImgs];
shuffleArray(allImgs);
function toggleActiveClass(element) {
  prevCategory.classList.remove("active");
  prevCategory = element;
  prevCategory.classList.add("active");
}
let intervalError = 0; // for handling some interval errors
function showImages(imgs) {
  intervalError++;
  console.log(imgs);
  gallery.innerHTML = "";
  let i = 0;
  const currInterval = intervalError;
  const interval = setInterval(() => {
    if (i >= imgs.length || currInterval != intervalError) {
      clearInterval(interval);
      return;
    }
    const elemnt = document.createElement("div");
    elemnt.classList.add("book-pic");
    elemnt.innerHTML = `
        <img src="${imgs[i]}" alt="" />
      `;
    gallery.appendChild(elemnt);
    i++;
  }, 300);
}

allImgsBtn.addEventListener("click", function (e) {
  toggleActiveClass(this);
  showImages(allImgs);
});
charactersImgsBtn.addEventListener("click", function (e) {
  toggleActiveClass(this);
  showImages(charImgs);
});
generalImgsBtn.addEventListener("click", function (e) {
  toggleActiveClass(this);
  showImages(generalImgs);
});
{
  allImgsBtn.click();
}
