const id = localStorage.getItem("id");

if (!id) {
  window.location.href = "index.html";
}
