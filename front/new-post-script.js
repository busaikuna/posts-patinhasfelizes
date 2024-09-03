const picture = document.querySelector("#image");
const imgPreview = document.querySelector(".image-upload");
const form = document.querySelector("form");


picture.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imgPreview.style.backgroundImage = `url(${event.target.result})`;
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const fileInput = document.querySelector("#image");
  const description = document.querySelector("#description").value;
  const typeAnimal = document.querySelector("#type-animal").value;


  if (!fileInput || fileInput.files.length === 0) {
    alert("Por favor, selecione um arquivo.");
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", file); 
  formData.append("description", description); 
  formData.append("typeAnimal", typeAnimal); 
  formData.append("hash", localStorage.getItem("hashptfl"))

  axios
    .post("http://localhost:8008/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Success:", response.data);
      postModal.style.display = "none";
      form.reset();
      imgPreview.style.backgroundImage = ''; 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
