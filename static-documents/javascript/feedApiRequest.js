const main = document.querySelector("main")



fetch("http://localhost:8000/posts", {
    method: "GET"
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const post = data.map(post => {

            let postDescription = ""
            if (post.description.length <= 60) {
                postDescription = `<p class="post-description">${post.description}</p>`
            }
            else {
                postDescription = `<p class="post-description">${post.description.substring(0, 60)}   <span>
            LER MAIS
            <p class="readMore-description">${post.description}</p>
            </span></p>`
            }

            return `
      <div class="post">
        <div class="user-info">
            <img src="../icons/logo.jpeg" alt="Avatar" class="avatar">
            <span class="email">${post.email}</span>
        </div>
        <img src="http://localhost:8000/image/${post.picture}" class="post-image">
        <div class="post-content">
            ${postDescription}
            <div class="likes-container">
                <p>Descrição:</p>
                <div>
                    <span class="likes">5 Curtidas</span>
                    <ion-icon name="heart-empty"></ion-icon>
                </div>
            </div>
        </div>
    </div>
        `
        }).join("")

        main.innerHTML = post

        const readMoreButtons = document.querySelectorAll(".post-description span")
        const normalText = document.querySelector(".post-description")

        readMoreButtons.forEach((readMoreButton) => {
            const moreText = document.querySelector(".readMore-description")
            readMoreButton.addEventListener("click", () => {
                moreText.style.display = "block"
                normalText.style.display = "none"
            })
        })
    })