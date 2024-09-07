const modal = document.querySelector("dialog");
const modalPic = document.querySelector("#change-pic")
const addButton = document.querySelector("#add");

addButton.addEventListener('click', () => {
   modal.showModal()
})
const closeButton = document.querySelector(".close");
closeButton.addEventListener('click', () => {
    modal.close()
 })