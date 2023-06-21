import { user } from "../index.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let isLoginMode = true;
    let imageUrl = "";
    

    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-header">
    <h1 class="logo">instapro</h1>
    <button class="header-button add-or-login-button">
    ${
      user
        ? `<div title="Добавить пост" class="add-post-sign"></div>`
        : "Войти"
    }
    </button>
    ${
      user
        ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>`
        : ""
    }  
    </button>
</div>
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
    
              <button class="button button-photo" id="button-photo">Выберите фото</button>
              <p>Опишите фотографию:</p>
                  <textarea type="text" id="text-input" class="textarea"></textarea>
                  
                  <div class="form-error"></div>
                  
                  <button class="button" id="login-button">Добавить</button>
              </div>
            
              
          </div>
      </div>    
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
