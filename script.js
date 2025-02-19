const API = {
  getProfile: () => ({
    name: "Ahmed Mohamed Salah",
    title: "Software Engineer",
  }),

  getPosts: (page = 1) => {
    const posts = [];
    for (let i = 1; i <= 90; i++) {
      posts.push({
        id: i,
        title: `Post Title ${i} `,
        content: `Post Content content for post ${i}`,
        author: "Adel Elbamby",
        hours: Math.floor(Math.random() * 100),
      });
    }
    return { data: posts, totalPages: 18 };
  },

  getSuggestions: () => [
    {
      name: "Alice Smith",
      role: "Product Manager",
    },
    {
      name: "Bob Johnson",
      role: "UX Designer",
    },
    {
      name: "Charlie Brown",
      role: "Data Scientist",
    },
  ],
};

const profileData = API.getProfile();
document.getElementById("profileName").textContent = profileData.name;
document.getElementById("profileTitle").textContent = profileData.title;
let currentPage = 1;
const itemsPerPage = 5;
function displayPosts(posts, page) {
  const container = document.getElementById("feedContainer");
  container.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  posts.slice(start, end).forEach((post) => {
    const div = document.createElement("div");
    div.className = "feed-post";
    div.innerHTML = `
                        <div class="post-header">
                            <img src="https://media.licdn.com/dms/image/v2/D4D03AQG8Lw4V9cuKnw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1733112923020?e=1745452800&v=beta&t=UK42z0T6WRN1Rfs3ab2gBulsoVGA2kMFN7rgUqK_4k8" 
                                 width="50" alt="${post.author}">
                            <div>
                                <h6>${post.author}</h6>
                                <small>${
                                  post.hours > 24
                                    ? Math.ceil(post.hours / 24) + " days"
                                    : post.hours + " hours"
                                } ago</small>
                            </div>
                        </div>
                        <h5>${post.title}</h5>
                        <p>${post.content}</p>
                        <div class="post-actions">
                            <button class="btn btn-outline-secondary btn-sm"><i class="far fa-thumbs-up"></i> Like</button>
                            <button class="btn btn-outline-secondary btn-sm"><i class="far fa-comment"></i> Comment</button>
                            <button class="btn btn-outline-secondary btn-sm"><i class="far fa-share-square"></i> Share</button>
                        </div>
                    `;
    container.appendChild(div);
  });
}
function displaySuggestions(suggestions) {
  const suggestionImages = [
    "https://media.licdn.com/dms/image/v2/D4D03AQF1QbmAFhTNtA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1715774532387?e=1745452800&v=beta&t=gdgrwH_vSYxAXuqXAmsfqQ3l6tWbzwOF2dZo2UxxpNw",
    "https://media.licdn.com/dms/image/v2/D4D03AQETgiaudy569Q/profile-displayphoto-shrink_100_100/B4DZNjhlLwHIAY-/0/1732541569109?e=1745452800&v=beta&t=5ZHGzIkA5snQZUSYyIVOAVnVkspG7gY9AfBGYs_0JQo",
    "https://media.licdn.com/dms/image/v2/D4D03AQFp38uLMpPn1w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1726927516392?e=1745452800&v=beta&t=yykFlzMMsVL1AZV6ZYXUKqBK-eugCF4u2SWBzkcVB0c",
  ];

  const container = document.getElementById("suggestionsList");
  suggestions.forEach((suggestion, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
                        <img src="${suggestionImages[index]}" width="40" alt="${suggestion.name}">
                        <div>
                            <strong>${suggestion.name}</strong><br>
                            <small>${suggestion.role}</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm"><i class="fas fa-user-plus"></i> Connect</button>
                    `;
    container.appendChild(li);
  });
}

window.onload = () => {
  const postsData = API.getPosts().data;
  const suggestionsData = API.getSuggestions();

  displayPosts(postsData, currentPage);
  displaySuggestions(suggestionsData);
  setupPagination(postsData.length);
};

function setupPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  pagination.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      const postsData = API.getPosts().data;
      displayPosts(postsData, currentPage);
      setupPagination(totalItems);
    });
    pagination.appendChild(li);
  }
}
