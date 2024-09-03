localStorage.setItem("hashptfl", "519d63c1e373f99f62d3803698a57094a4ef14a05a2a6d21b5df4b35d5bde25f")

const addButton = document.querySelector("#add");
const postModal = document.querySelector(".modal-newPost");
const closeModal = document.querySelector(".modal-newPost span");
const picture = document.querySelector("#image");
const imgPreview = document.querySelector(".image-upload");
const form = document.querySelector("form");

// Exibe o modal de postagem quando o botão "Adicionar" é clicado
addButton.addEventListener("click", () => {
  window.scrollTo(0, 0);
  postModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// Fecha o modal de postagem quando o botão "Fechar" é clicado
closeModal.addEventListener("click", () => {
  postModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Previsualiza a imagem no modal ao selecionar um arquivo
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

// Envia o formulário usando AJAX (com Axios)
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede o envio tradicional do formulário

  // Seleciona os campos de entrada de dados
  const fileInput = document.querySelector("#image");
  const description = document.querySelector("#description").value;
  const typeAnimal = document.querySelector("#type-animal").value;

  // Verifica se o input de arquivo e seu valor são válidos
  if (!fileInput || fileInput.files.length === 0) {
    alert("Por favor, selecione um arquivo.");
    return;
  }

  const file = fileInput.files[0]; // Obtém o primeiro arquivo

  const formData = new FormData();
  formData.append("image", file); // Adiciona o arquivo ao FormData
  formData.append("description", description); // Adiciona a descrição ao FormData
  formData.append("typeAnimal", typeAnimal); // Adiciona o tipo de animal ao FormData
  formData.append("hash", localStorage.getItem("hashptfl"))

  // Envia a solicitação POST usando Axios
  axios
    .post("http://localhost:8008/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Success:", response.data);
      // Lógica para mostrar uma mensagem de sucesso ou atualizar a UI
      alert("Postagem enviada com sucesso!");
      postModal.style.display = "none"; // Fecha o modal após o envio bem-sucedido
      document.body.style.overflow = "auto";
      form.reset(); // Limpa o formulário após o envio
      imgPreview.style.backgroundImage = ''; // Limpa a pré-visualização da imagem
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
