import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, user, getToken, renderApp, page, goToPage } from "../index.js";
import { addDislike, addLike, getPosts } from "../api.js";
import {format, formatDistance, formatDistanceToNow} from "date-fns";
import { ru } from "date-fns/locale";


export function initLikeButton(token, appEl) {
  
  const likeButtonsElements = document.querySelectorAll(".like-button");
  // console.log(appEl);

  for (const likeButtonElement of likeButtonsElements) {
    let index = likeButtonElement.dataset.index;

      likeButtonElement.addEventListener("click", () => {
        // console.log("кликнул");
        // console.log(likeButtonElement);
        if(likeButtonElement.dataset.isliked === "true") {
          addDislike({
            id: likeButtonElement.dataset.postId,
            token: getToken(),
          })
          .then((responseData) => {
            console.log(responseData);
            // let newPost = response[index].likes;
            // likeButtonElement = newPost;
            // console.log(renderPostsPageComponent);
            // renderPostsPageComponent({appEl});
            renderApp({appEl});
            getPosts({getToken});
          })  
        }
        else {
          addLike({
            id: likeButtonElement.dataset.postId,
            token: getToken(),
          })
          .then((responseData) => {
            console.log(responseData);
            // let newPost = response[index].likes;
            // likeButtonElement = newPost;
            // console.log(renderPostsPageComponent);
            // renderPostsPageComponent({appEl});
            renderApp();
            getPosts({getToken});
          })
        }
      })
          
  }

}

export function renderPostsPageComponent({ appEl, page }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);


  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  let postsHTML = posts.map((post, index) => {
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
        Нравится: <strong>${
          (post.likes.length) === 0 ? 0 : 
          (post.likes.length === 1) ? post.likes[post.likes.length - 1].name :
          (post.likes.length > 1) ? post.likes[post.likes.length - 1].name + ' и ещё ' + (post.likes.length - 1): ''}</strong>
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${post.user.name}</span>
      ${post.description}
    </p>
    <p class="post-date">
      ${formatDistanceToNow(new Date(post.createdAt), {locale: ru}) + " назад"}
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

  page = POSTS_PAGE;

  let data = {
    userId: posts[0]?.user.id
};

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


