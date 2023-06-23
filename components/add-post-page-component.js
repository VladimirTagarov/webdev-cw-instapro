import { addNewPost } from "../api.js";
import { user, getToken } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let isLoginMode = true;
    let imageUrl = "";
    

    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    
    <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                ${
                  isLoginMode
                    ? "Добавить пост"
                    : "Регистрация в&nbsp;Instapro"
                }
                </h3>
              <div class="form-inputs">
    
              <div class="upload-image-container"></div>
              <p>Опишите фотографию:</p>
                  <input type="text" id="text-input" class="textarea"/>
                  
                  <div class="form-error"></div>
                  
                  <button class="button" id="add-button">Добавить</button>
              </div>
            
              
          </div>
      </div>    
  `;

    appEl.innerHTML = appHtml;

   

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      const descr = document.getElementById("text-input");

      addNewPost({
        token: getToken(),
        description: descr,
        imageUrl: imageUrl,
      });

      onAddPostClick({
        descr,
        imageUrl,
      });
      render();
    });
    

  };

  render();
}
