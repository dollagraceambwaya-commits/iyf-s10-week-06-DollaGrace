console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// What order will these print?
// A, C, E, B, D

// Build: Create a function that simulates loading user data
function loadUser(userId, callback) {
  setTimeout(() => {
    const user = {
      id: userId,
      name: "Israel",
      age: 27,
    };
    callback(user);
  }, 1500);
}

loadUser(101, function (user) {
  console.log("User loaded:", user);
});

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true; // Simulate success or failure
  setTimeout(() => {
    if (success) {
      resolve("It worked!");
    } else {
      reject("Something went wrong.");
    }
  }, 1000);
});

// Using the Promise
myPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// User Data
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: "Israel",
        });
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

// User posts
function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve([
          { id: 1, title: "First Post", content: "This is the first post." },
          { id: 2, title: "Second Post", content: "This is the second post." },
        ]);
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

// Post comments
function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (postId > 0) {
        resolve([
          { id: 1, comment: "Great post!" },
          { id: 2, comment: "Thanks for sharing." },
        ]);
      } else {
        reject("Invalid post ID");
      }
    }, 1000);
  });
}

// Fetch data for 3 users simultaneously and display them all at once.
Promise.all([getUserData(1), getUserData(2), getUserData(3)])
  .then((users) => {
    console.log("Fetched users:", users);
    users.forEach((user) => console.log(user));
  })
  .catch((error) => {
    console.log("Error fetching users:", error);
  });

//  Rewrite the callback hell example using async/await.
async function fetchUserData(userId) {
  try {
    const user = await getUserData(userId);
    console.log("User loaded:", user);

    const posts = await getUserPosts(userId);
    console.log("User posts:", posts);

    const comments = await getPostComments(posts[0].id);
    console.log("Post comments:", comments);
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchUserData(1);

// Fetching A single user from JSONPlaceholder
const user = await getUserData(1);
console.log("Single user:", user);

// Fetching All users
async function getAllUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  console.log("All users:", users);
}
getAllUsers();

// Fetching Posts for user 1
async function getUserPosts() {
  const response = await fetch(
    "(https://jsonplaceholder.typicode.com/users/1/posts)",
  );
  console.log("Posts for user 1:", pots);
}
getUserPosts();

// Create a form that submits a new post and displays the result
const form = document.getElementById("postForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 

  const title = document.getElementById("title").Value;
  const body = document.getElementById("body").Value;
  const userId = document.getElementById("userId").Value;

  try {
    const newPost = await createPost(title, body, userId);
    resultDiv.innerhtml = `
     <h2>Post Created!</h2>
      <p><strong>ID:</strong> ${newPost.id}</p>
            <p><strong>Title:</strong> ${newPost.title}</p>
            <p><strong>Content:</strong> ${newPost.body}</p>
            <p><strong>User ID:</strong> ${newPost.userId}</p>
            `;
  } catch (error) {
    resultDiv.textContent = `Error: ${error.message}`;
  }
})

// Search & Filter
let allUsers = [];

async function init() {
    allUsers = await fetchUsers();
    displayUsers(allUsers);
    
    // Live search
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allUsers.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
        displayUsers(filtered);
    });
}

// Sort
    const sortSelect = document.getElementById("sort");
    sortSelect.addEventListener("change", (e) => {
        const direction = e.target.value;
        const sorted = [...allUsers].sort((a, b) => 
            direction === "asc" 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name)
        );
        displayUsers(sorted);
    });

    // Filter by city
    const cityFilter = document.getElementById("cityFilter");
    cityFilter.addEventListener("change", (e) => {
        const city = e.target.value;
        const filtered = city 
            ? allUsers.filter(user => user.address.city === city)
            : allUsers;
        displayUsers(filtered);
    });

