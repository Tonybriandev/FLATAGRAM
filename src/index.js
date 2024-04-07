//Write your code here!
// defining HTML content
document.addEventListener('DOMContentLoaded', function () {
    const title = document.getElementById('card-title');
    const myRequest = new Request('http://localhost:3000/images')
    const commentRequest = new Request('http://localhost:3000/comments')
    const image = document.getElementById('card-image');
    const like = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count');
    const comments = document.getElementById('comment');
    const form = document.getElementById('comment-form');
    const commentList = document.getElementById('comments-list');
    let count = 0;

    // fetching data from server
    fetch(myRequest)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // looping (for loop)
            for (let i = 0; i < data.length; i++) {
                let obj = data[0];
                title.innerHTML = `${obj.title}`;
                image.src = `${obj.image}`;
// adding event listeners
                like.addEventListener('click', () => {
                    count++;
                    likeCount.innerHTML = `${count} likes`;
                }

                )
            }

        });
    commentList.innerHTML = "";
    // fetching data from server
    fetch(commentRequest)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            // the for loop
            for (let i = 0; i < data.length; i++) {
                let newComment = data[i];
                // console.log(newComment);

                const li = document.createElement("li");
                li.innerHTML = `${newComment.content}`;
                commentList.appendChild(li);
            }
        });
        // adding event listeners
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const postComments = document.getElementById("comment").value;
        console.log(postComments);
        if (postComments == "") {
            alert("Enter a comment");
            return;
        }
// commands for adding comment
        fetch(commentRequest, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                imageId: 1,
                // id: { id },
                content: postComments,
            }),
        });
    });
})




