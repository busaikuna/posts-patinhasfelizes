const main = document.querySelector("main")
const contPub = document.querySelector("#cont-pub")
const email = document.querySelector(".info a")
const nickname = document.querySelector("#name")

const HASH = localStorage.getItem("hashptfl")
fetch(`http://localhost:8008/posts/${HASH}`, {
    method: "GET"
})
.then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data =>{
    const myPosts = data.map((post) =>{
        return `      
        <div class="post post-profile">
            <img class="post-img" src="http://localhost:8008/image/${post.picture}" alt="" />
        </div>`
    }).join("")

    main.innerHTML = myPosts
    contPub.innerHTML = data.length
    email.innerHTML = data[0].email
    nickname.innerHTML = data[0].name
})
.catch(error => {
    console.error('Fetch error:', error);
    main.innerHTML = `<p>Error loading posts</p>`;
});
