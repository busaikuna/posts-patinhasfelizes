const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const payload = {
    email: username,
    password,
  };

  axios
    .post("http://localhost:8008/signin", payload)
    .then((res) => {
      const user = res.data;
      localStorage.setItem("id", user.id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("avatar", user.avatar);

      window.location.href = 'feed.html'
      console.log(res.data);
    })
    .catch((err) => {
      const alert = document.querySelector("#alert-error-in");
      alert.classList.remove("none");
      console.log(err.response);
    });
});
