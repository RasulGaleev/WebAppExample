const DUA_API = "http://92.38.48.73/api/duas";
const AUDIO_API = "http://92.38.48.73/audio";
const FAVORITE_API = "http://92.38.48.73/api/favorites/";

const urlParams = new URLSearchParams(window.location.search);

const itemId = urlParams.get("itemId");

if (itemId) {
  console.log(itemId);

  renderContent(itemId);
} else {
  console.log("itemId не найден в URL");
}

async function renderContent(itemId) {
  let contentList = document.querySelector("#content2");
  contentList.innerHTML = "";
  let requestAPI = `${DUA_API}/filter?chapter_id=${itemId}`;
  let user = 1342244632;
  let requestAPI3 = `${FAVORITE_API}filter?user_id=${user}&content_type=dua`;
  let res2 = await fetch(requestAPI3);
  let data2 = await res2.json();
  try {
    let res = await fetch(requestAPI);
    let data = await res.json();
    data.forEach(item => {
      let requestAPI2 = `${AUDIO_API}/${item.audio}`;
      const duaElement = document.createElement("div");
      duaElement.classList.add("dua");
      duaElement.setAttribute("data-item-id", item.id);
      duaElement.setAttribute("data-content-type", "dua");
      duaElement.innerHTML = `
                    <div class="dua__navbar">
                    <img src="./media/star-fill.svg" alt="star" width="30px" class="dua__img" id="img_white"/>
                        <img src="./media/star-fill2.svg" alt="star" width="30px" class="img__nonactive" id="img_yellow"/>
                        <p class="dua__navbar__p">Дуа ${item.id}</p>
                        <img src="./media/play-circle-fill.svg" alt="star" width="20px" class="dua__img"" style="display: none"/>
                    </div>
                    <div class="dua__content">
                        ${
                          item.arab
                            ? `<p class="arabicContent">${item.arab}</p>`
                            : ""
                        }
                        ${
                          item.transcript
                            ? `<p class="transcriptContent">${item.transcript}</p>`
                            : ""
                        }
                        ${
                          item.translate
                            ? `<p class="russianContent">${item.translate}</p>`
                            : ""
                        }
                    </div>
                    <div class="dua__info">
                        <p class="dua_informat">${item.source}</p>
                    </div>
                    ${
                      item.audio
                        ? `<div class="audio__container">
                            <audio controls>
                                <source src="${requestAPI2}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>`
                        : ""
                    }
            `;

      const starImageWhite = duaElement.querySelector("#img_white");
      const starImageYellow = duaElement.querySelector("#img_yellow");
      data2.forEach(item => {
        let itemId = duaElement.getAttribute("data-item-id");
        if (item.content_id == itemId) {
          starImageWhite.classList.add("img__nonactive");
          starImageWhite.classList.remove("dua__img");
          starImageYellow.classList.remove("img__nonactive");
          starImageYellow.classList.add("dua__img");
        }
      });
      starImageYellow.addEventListener("click", async function (event) {
        event.stopPropagation();
        let contentId = duaElement.getAttribute("data-item-id");
        for (const item of data2) {
          if (item.content_id == contentId) {
            let itemId = item.id;
            deletingDua(itemId);
            starImageWhite.classList.remove("img__nonactive");
            starImageWhite.classList.add("dua__img");
            starImageYellow.classList.add("img__nonactive");
            starImageYellow.classList.remove("dua__img");
          }
        }
      });
      starImageWhite.addEventListener("click", async function (event) {
        starImageWhite.classList.add("img__nonactive");
        starImageWhite.classList.remove("dua__img");
        starImageYellow.classList.remove("img__nonactive");
        starImageYellow.classList.add("dua__img");

        event.stopPropagation();
        const contentId = duaElement.getAttribute("data-item-id");
        const contentType = duaElement.getAttribute("data-content-type");

        const favoriteData = {
          content_id: parseInt(contentId),
          content_type: contentType,
          user_id: user,
        };

        postingDua(favoriteData);
      });
      contentList.appendChild(duaElement);
    });
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

function check() {
  const arabicCheckbox = document.querySelector(".arabicCheckbox");
  const arabicContent = document.querySelectorAll(".arabicContent");

  arabicCheckbox.addEventListener("change", function () {
    arabicContent.forEach(function (paragraph) {
      paragraph.style.display = arabicCheckbox.checked ? "block" : "none";
    });
  });
}

async function deletingDua(id) {
  let requestAPI = `${FAVORITE_API}delete?favorite_id=${id}`;
  fetch(requestAPI, {
    method: "DELETE",
  })
    .then(response => {
      // Обработка успешного ответа
      if (response.ok) {
        console.log("Избранный элемент успешно удален");
      } else {
        console.error("Ошибка удаления избранного элемента");
      }
    })
    .catch(error => {
      // Обработка ошибки
      console.error(
        "Произошла ошибка при удалении избранного элемента:",
        error
      );
    });
  renderFavorites2("dua");
}

async function renderFavorites2(type) {
  let favoriteList = document.querySelector("#section3");
  let chapters = document.querySelectorAll(".chapter");

  chapters.forEach(chapter => {
    chapter.parentNode.removeChild(chapter);
  });
  let duas = document.querySelectorAll(".dua");

  duas.forEach(dua => {
    dua.parentNode.removeChild(dua);
  });
  let userId = 1342244632;
  let requestAPI = `${FAVORITE_API}filter?user_id=${userId}&content_type=${type}`;
  let res = await fetch(requestAPI);
  let data = await res.json();

  if (type === "chapter") {
    try {
      for (const item of data) {
        let requestAPI3 = `${CHAPTER_API}/filter?chapter_id=${item.content_id}`;
        let res2 = await fetch(requestAPI3);
        let data2 = await res2.json();
        let cont = item.content_id;
        let idd = item.id;

        data2.forEach(item => {
          const chapterElement = document.createElement("div");
          chapterElement.classList.add("chapter");
          chapterElement.setAttribute("data-item-id", item.id);
          chapterElement.innerHTML = `
        <div class="chapter_left">
            <div class="count">${item.dua_count} Дуа</div>
            <div class="index">${item.id}</div>
            <img src="./media/star-fill2.svg" alt="star" class="img__active" id="img_yellow"  data-item-id="${item.id}" data-content-type="chapter"/>
        </div>
        <p class="chapter__name">${item.chapter}</p>
    `;
          const starImageYellow = chapterElement.querySelector("#img_yellow");
          starImageYellow.addEventListener("click", async function (event) {
            event.stopPropagation();
            deletingChapter(idd);
            renderChapter();
          });

          chapterElement.addEventListener("click", function (event) {
            let itemId = chapterElement.getAttribute("data-item-id");
            window.location.href = `dua?itemId=${itemId}`;
            renderContent(itemId);
          });
          favoriteList.appendChild(chapterElement);
        });
      }

      if (data.length === 0) return;
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  }
  if (type === "dua") {
    try {
      for (const item of data) {
        let requestAPI3 = `${DUA_API}/filter?dua_id=${item.content_id}`;
        let res2 = await fetch(requestAPI3);
        let data2 = await res2.json();
        let itemId = item.content_id;
        let idd = item.id;

        if (data2.length === 0) {
          console.log("wtf");
          favoriteList.innerHTML += `<p class="chapterP">Нет избранных</p>`;
        } else {
          data2.forEach(item => {
            let requestAPI2 = `${AUDIO_API}/${item.audio}`;
            const duaElement = document.createElement("div");
            duaElement.classList.add("dua");
            duaElement.setAttribute("data-item-id", item.id);
            duaElement.innerHTML = `
                          <div class="dua__navbar">
                              <img src="./media/star-fill2.svg" alt="star" width="20px" class="dua__img" id="img_yellow"/>
                              <p class="dua__navbar__p">Дуа ${item.id}</p>
                              <img src="./media/play-circle-fill.svg" alt="star" width="20px" class="dua__img"" style="display: none"/>
                          </div>
                          <div class="dua__content">
                              ${
                                item.arab
                                  ? `<p class="arabicContent">${item.arab}</p>`
                                  : ""
                              }
                              ${
                                item.transcript
                                  ? `<p class="transcriptContent">${item.transcript}</p>`
                                  : ""
                              }
                              ${
                                item.translate
                                  ? `<p class="russianContent">${item.translate}</p>`
                                  : ""
                              }
                          </div>
                          <div class="dua__info">
                              <p class="dua_informat">${item.source}</p>
                          </div>
                          ${
                            item.audio
                              ? `<div class="audio__container">
                                  <audio controls>
                                      <source src="${requestAPI2}" type="audio/mpeg">
                                      Your browser does not support the audio element.
                                  </audio>
                              </div>`
                              : ""
                          }
                  `;
            const starImageYellow = duaElement.querySelector("#img_yellow");
            starImageYellow.addEventListener("click", async function (event) {
              event.stopPropagation();
              deletingDua(idd);
              renderChapter();
            });
            favoriteList.appendChild(duaElement);
          });
        }
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  }
}

async function postingDua(favoriteData) {
  try {
    const requestAPI = `${FAVORITE_API}create`;
    const response = await fetch(requestAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteData),
    });
    if (!response.ok) {
      throw new Error("Ошибка при добавлении в избранное");
    }
    console.log("Успешно добавлено в избранное");
  } catch (error) {
    console.error("Произошла ошибка при добавлении в избранное:", error);
  }
}

function checks() {
  const transcriptCheckbox = document.querySelector(".transcriptCheckbox");
  const transcriptContent = document.querySelectorAll(".transcriptContent");

  transcriptCheckbox.addEventListener("change", function () {
    transcriptContent.forEach(function (paragraph) {
      paragraph.style.display = transcriptCheckbox.checked ? "block" : "none";
    });
  });
}

function check2() {
  const russianCheckbox = document.querySelector(".russianCheckbox");
  const russianContent = document.querySelectorAll(".russianContent");

  russianCheckbox.addEventListener("change", function () {
    russianContent.forEach(function (paragraph) {
      paragraph.style.display = russianCheckbox.checked ? "block" : "none";
    });
  });
}
