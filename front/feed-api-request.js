const main = document.querySelector("main")



fetch("http://localhost:8008/posts", {
    method: "GET"
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.likes)
        const post = data.posts.map(post => {

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
            const likes = data.likes.filter((like) => like === localStorage.getItem("hashptfl"))
            alert(data.likes)

            return `
      <div class="post">
        <div class="user-info">
            <img src="../icons/logo.jpeg" alt="Avatar" class="avatar">
            <span class="email">${post.email}</span>
        </div>
        <img src="http://localhost:8008/image/${post.picture}" class="post-image">
        <div class="post-content">
            ${postDescription}
            <div class="likes-container">
                <p>Descrição:</p>
                <div class="like">
                    <span class="likes">${likes.liked.length}</span>
                    <img src="like.png" alt="Like" />
                    <input id="hash" type="hidden" value="${post.hash}">
                </div>
            </div>
        </div>
    </div>
        `
        }).join("")

        main.innerHTML = post

        const likes = document.querySelectorAll(".like");

        likes.forEach(like => {
            const button = like.querySelector("img");
            button.addEventListener("click", async () => {
                console.log(button.src)
                if(button.src == "like.png"){
                    button.src == "liked.png"
                }
                const user = localStorage.getItem("hashptfl");
                const hash = document.querySelector("#hash").value;
        
                try {
                    const response = await fetch(`http://localhost:8008/likes/${hash}/${user}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    if (response.ok) {
                        console.log("Like registered successfully");
                    } else {
                        console.error("Failed to register like");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            });
        });
        

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