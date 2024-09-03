document
  .querySelector("#signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const userData = { name, email, password };

    try {
      const response = await fetch("http://localhost:8008/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        axios
          .post("http://localhost:8008/signin", { email, password })
          .then((res) => {
            const user = res.data;
            localStorage.setItem("id", user.id);
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);
            localStorage.setItem("avatar", user.avatar);

            window.location.href = "feed.html";
          });
      } else if (response.status === 409) {
        const alert = document.querySelector("#alert-error-in");
        alert.classList.remove("none");
        alert.textContent = "Usuário já existe";
      } else {
        const alert = document.querySelector("#alert-error-in");
        alert.classList.remove("none");
        alert.textContent = "Erro ao cadastrar";
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão.");
    }
  });
