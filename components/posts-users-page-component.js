import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user} from "../index.js";
import { postsUsers } from "../api.js";

export function renderPostsUsersPageComponent({ appEl}) {

    let postsUsersHTML = postsUsers.map((post, index) => {
      return  `<li class="post" data-post-index=${index}>
      <div class="post-header" data-user-id=${post.id}>
          <img src=${post.user.imageUrl} class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src=${post.imageUrl}>
      </div>
      <div class="post-likes">
        <button data-post-id=${post.id} class="like-button">
          <img src=${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}>
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${post.createdAt}
      </p>
    </li>`
    }).join("");
  
    const appHtml = `
                <div class="page-container">
                  <div class="header-container"></div>
                  <ul class="posts">
                    ${postsUsersHTML}
                  </ul>
                </div>`;
  
    appEl.innerHTML = appHtml;

    const page = USER_POSTS_PAGE;

    let data = {
        userId: postsUsers[0]?.user.id
    };

  
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
  
    // for (let userEl of document.querySelectorAll(".post-header")) {
    //   userEl.addEventListener("click", () => {
    //     console.log(user);
    //     goToPage(USER_POSTS_PAGE, {
    //       userId: userEl.dataset.userId,
    //     });
    //   });
    // }
  }