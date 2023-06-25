import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user, getToken, renderApp } from "../index.js";
import { addDislike, addLike, getPosts } from "../api.js";


export function initLikeButton(page, token, data) {
  
  const likeButtonsElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonsElements) {
    let index = likeButtonElement.dataset.index;

      likeButtonElement.addEventListener("click", () => {
        console.log(`лайк поставлен ${likeButtonElement.dataset.isliked}`);
        console.log("кликнул");
        if(likeButtonElement.dataset.isLiked === "true") {
          addDislike({
            id: likeButtonElement.dataset.postId,
            token: getToken(),
          })
          .then(() => {
            getPosts({getToken});
          })  
        }
        else {
          addLike({
            id: likeButtonElement.dataset.postId,
            token: getToken(),
          })
          .then(() => {
            getPosts({getToken});
          })
        }
      })    
  }

}

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);


  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const postsHTML = posts.map((post, index) => {
    return  `<li class="post" data-post-index=${index}>
    <div class="post-header" data-user-id=${post.user.id}>
        <img src=${post.user.imageUrl} class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
    </div>
    <div class="post-image-container">
      <img class="post-image" src=${post.imageUrl}>
    </div>
    <div class="post-likes">
      <button data-post-id=${post.id} data-index=${index} data-isLiked=${post.isLiked} class="like-button">
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
                  ${postsHTML}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  initLikeButton();

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}


