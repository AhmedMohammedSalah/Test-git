const API = {
  getProfile: () => ({
    name: "Ahmed Mohamed Salah",
    title: "Software Engineer",
  }),

  getPosts: async (page = 1) => {
    try {
      const response = await fetch(
        "https://api-generator.retool.com/t3s9Gn/posts"
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const posts = await response.json();
      return { data: posts, totalPages: Math.ceil(posts.length / 5) };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { data: [], totalPages: 0 };
    }
  },

  getSuggestions: () => [
    { name: "Alice Smith", role: "Product Manager" },
    { name: "Bob Johnson", role: "UX Designer" },
    { name: "Charlie Brown", role: "Data Scientist" },
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
  posts.slice(start, start + itemsPerPage).forEach((post) => {
    const div = document.createElement("div");
    div.className = "feed-post";
    div.innerHTML = `
      <div class="post-header">
        <img src="${post.image}" width="50" alt="${post.author}">
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
    "https://media.licdn.com/dms/image/v2/D4D03AQF1QbmAFhTNtA/profile-displayphoto-shrink_100_100/0/1715774532387",
    "https://media.licdn.com/dms/image/v2/D4D03AQETgiaudy569Q/profile-displayphoto-shrink_100_100/0/1732541569109",
    "https://media.licdn.com/dms/image/v2/D4D03AQFp38uLMpPn1w/profile-displayphoto-shrink_100_100/0/1726927516392",
  ];
  const container = document.getElementById("suggestionsList");
  container.innerHTML = "";
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

window.onload = async () => {
  const postsData = await API.getPosts();
  const suggestionsData = API.getSuggestions();
  displayPosts(postsData.data, currentPage);
  displaySuggestions(suggestionsData);
  setupPagination(postsData.data.length);
};

function setupPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  pagination.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", async (e) => {
      e.preventDefault();
      currentPage = i;
      const postsData = await API.getPosts();
      displayPosts(postsData.data, currentPage);
      setupPagination(totalItems);
    });
    pagination.appendChild(li);
  }
}
