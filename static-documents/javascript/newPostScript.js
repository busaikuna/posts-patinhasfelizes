const addButton = document.querySelector("#add")
const postModal = document.querySelector(".modal-newPost")
const closeModal = document.querySelector(".modal-newPost span")
const picture = document.querySelector("#image")
const imgPreview = document.querySelector(".image-upload")

addButton.addEventListener("click", ()=>{
    window.scrollTo(0, 0)
    postModal.style.display = "flex"
    document.body.style.overflow = "hidden"
})
closeModal.addEventListener("click", ()=>{
    postModal.style.display = "none"
    document.body.style.overflow = "auto"
})

picture.addEventListener("change", (event)=>{
    const file = event.target.files[0]
    if (file){
        const reader = new FileReader()
        reader.onload = (event)=>{
            imgPreview.style.backgroundImage = `url(${event.target.result})`
        }
        reader.readAsDataURL(file)
    }
})