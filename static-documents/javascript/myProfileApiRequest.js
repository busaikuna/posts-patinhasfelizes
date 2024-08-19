const main = document.querySelector("main")

if(!localStorage.getItem("HASH")){
    localStorage.setItem("HASH", "secret")
}
const HASH = localStorage.getItem("HASH")
fetch(`http://localhost:8000/my-posts/${HASH}`, {
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
            <img class="post-img" src="http://localhost:8000/image/${post.picture}" alt="" />
        </div>`
    }).join("")

    main.innerHTML = myPosts
})
.catch(error => {
    console.error('Fetch error:', error);
    main.innerHTML = `<p>Error loading posts</p>`;
});
