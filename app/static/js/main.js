const CATEGORY_API = "http://92.38.48.73/api/categories";
const CHAPTER_API = "http://92.38.48.73/api/chapters";
const DUA_API = "http://92.38.48.73/api/duas";
const FAVORITE_API = "http://92.38.48.73/api/favorites/";
const AUDIO_API = "http://92.38.48.73/audio";

function toggleSearch() {
  const navItems = document.querySelector(".nav-items");
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".searchicon");
  navItems.style.display = "none";
  searchInput.style.display = "flex";
  searchIcon.style.display = "none";
}

function closeSearch() {
  const navItems = document.querySelector(".nav-items");
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".searchicon");

  navItems.style.display = "flex";
  searchIcon.style.display = "flex";
  searchInput.style.display = "none";
}

const sections = document.querySelectorAll(".section");
const sectionNavs = document.querySelectorAll(".navbar_bottom__a");
const navPanel = document.querySelector(".navbar_bottom");
const scrollContainer = document.querySelector(".scroll-container");
const sectionOffcanvas = document.querySelectorAll(".offcanvas__a");

const section2 = document.querySelector("#section2");
const section3 = document.querySelector("#section3");
scrollContainer.addEventListener("scroll", () => {
  const scrollLeft = scrollContainer.scrollLeft;
  const containerWidth = scrollContainer.clientWidth;

  sections.forEach((section, index) => {
    const offsetLeft = section.offsetLeft;
    const offsetRight = offsetLeft + section.offsetWidth;

    // Проверяем, если прокрутка больше чем на 50% секции
    if (
      scrollLeft + containerWidth / 3 >= offsetLeft &&
      scrollLeft + containerWidth / 3 < offsetRight
    ) {
      sectionNavs.forEach(nav => nav.classList.remove("active-section"));
      sectionNavs[index].classList.add("active-section");
      sectionOffcanvas.forEach(nav => nav.classList.remove("active-section1"));
      sectionOffcanvas[index].classList.add("active-section1");
    }
  });
});

let isScrolling = false;
let startX;
let scrollLeft;

// Функция для обработки скролла
function handleScroll(element, event) {
  if (!element) return;

  let isScrolling = false;
  let startY;
  let scrollTop;

  element.addEventListener("mousedown", e => {
    isScrolling = true;
    startY = e.pageY - element.offsetTop;
    scrollTop = element.scrollTop;
  });

  element.addEventListener("touchstart", e => {
    isScrolling = true;
    startY = e.touches[0].pageY - element.offsetTop;
    scrollTop = element.scrollTop;
  });

  element.addEventListener("mousemove", e => {
    if (!isScrolling) return;
    e.preventDefault();
    const y = e.pageY - element.offsetTop;
    const walk = (y - startY) * 1;
    element.scrollTop = scrollTop - walk;
  });

  element.addEventListener("touchmove", e => {
    if (!isScrolling) return;
    e.preventDefault();
    const y = e.touches[0].pageY - element.offsetTop;
    const walk = (y - startY) * 1;
    element.scrollTop = scrollTop - walk;
  });

  element.addEventListener("mouseup", () => {
    isScrolling = false;
  });

  element.addEventListener("touchend", () => {
    isScrolling = false;
  });
}

// Применяем обработчик для всех элементов с классом .section
sections.forEach(section => {
  handleScroll(section);
});
const sect3 = document.querySelector(".sect3");
handleScroll(sect3);

let startY;

section2.addEventListener("touchstart", e => {
  isScrolling = true;
  startY = e.touches[0].pageY - section1.offsetTop;
  scrollTop = section2.scrollTop;
});

section2.addEventListener("touchmove", e => {
  if (!isScrolling) return;
  e.preventDefault();
  const y = e.touches[0].pageY - section2.offsetTop;
  const walk = (y - startY) * 1;
  section2.scrollTop = scrollTop - walk;
});

section2.addEventListener("touchend", () => {
  isScrolling = false;
});

// Применяем обработчик для всех элементов с классом .scroll-container
const scrollContainers = document.querySelectorAll(".scroll-container");
scrollContainers.forEach(scrollContainer => {
  handleScroll(scrollContainer);
});

scrollContainer.addEventListener("mousedown", e => {
  isScrolling = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener("touchstart", e => {
  isScrolling = true;
  startX = e.touches[0].pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener("mousemove", e => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 3;
  scrollContainer.scrollLeft = scrollLeft - walk;
});

scrollContainer.addEventListener("touchmove", e => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.touches[0].pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 3;
  scrollContainer.scrollLeft = scrollLeft - walk;
});

scrollContainer.addEventListener("mouseup", () => {
  isScrolling = false;
});

scrollContainer.addEventListener("touchend", () => {
  isScrolling = false;
});

function updateActiveSection(navIndex = null) {
  const scrollLeft = scrollContainer.scrollLeft;
  const containerWidth = scrollContainer.clientWidth;

  sections.forEach((section, index) => {
    const offsetLeft = section.offsetLeft;
    const offsetRight = offsetLeft + section.offsetWidth;

    const isNavClick = navIndex !== null;
    const isActive = isNavClick
      ? navIndex === index
      : scrollLeft + containerWidth / 3 >= offsetLeft &&
        scrollLeft + containerWidth / 3 < offsetRight;

    if (isActive) {
      sectionNavs.forEach(nav => nav.classList.remove("active-section"));
      sectionNavs[index].classList.add("active-section");
      sectionOffcanvas.forEach(nav => nav.classList.remove("active-section1"));
      sectionOffcanvas[index].classList.add("active-section1");
    }
    let sec1 = document.getElementById("sec1");
    let sec2 = document.getElementById("sec2");
    const container = document.getElementById("container");

    if (sec1.classList.contains("active-section")) {
      container.style.height = "100vh";
    }
    if (sec2.classList.contains("active-section")) {
      container.style.height = "auto";
    }
  });
}

sectionNavs.forEach((nav, index) => {
  nav.addEventListener("click", () => {
    scrollContainer.scrollTop = 0;
    let section = sections[index];
    let sectionRect = section.getBoundingClientRect();
    let containerRect = scrollContainer.getBoundingClientRect();
    let offsetTop = sectionRect.top - containerRect.top;
    let currentScrollTop = scrollContainer.scrollTop;

    scrollContainer.scrollTop = currentScrollTop + offsetTop;
    section.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });
});

sectionOffcanvas.forEach((nav, index) => {
  nav.addEventListener("click", () => {
    sections[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  });
});

const section1 = document.getElementById("section1");

document.addEventListener("DOMContentLoaded", function () {
  let searchInput = document.querySelector(".search-input");

  function handleInputChange(event) {
    const query = event.target.value;
    search(query);
    search1(query);
  }

  searchInput.addEventListener("input", handleInputChange);
});

async function search(query) {
  let categoryList = document.querySelector("#section1");
  let requestAPI = `${CATEGORY_API}/filter?query=${query}`;
  let res = await fetch(requestAPI);
  let data = await res.json();

  categoryList.innerHTML = "";

  try {
    let res = await fetch(requestAPI);
    let data = await res.json();
    console.log(data);

    const requestAPI2 = `${CHAPTER_API}`;
    const res2 = await fetch(requestAPI2);
    const data2 = await res2.json();

    categoryList.innerHTML = "";

    data.forEach(async (item, index) => {
      let collapseId = `collapseExample-${index}`;

      categoryList.innerHTML += `
          <div class="category" data-category-id="${item.id}" data-bs-toggle="collapse" href="#${collapseId}" role="button" aria-expanded="false" aria-controls="${collapseId}">
            <div class="dropdown">
              <div class="dropdown_top">
                <img alt="arrow_bottom" src="./media/down.png" id="myImage" class="img_down"/>
                <div class="card-body">
                  <h5 class="card-title">${item.category}</h5>
                </div>
              </div>
              <div class="collapse" id="${collapseId}">
                <div class="card card-body card-content">
                  <!-- Сюда будет вставлен контент -->
                </div>
              </div>
            </div>
          </div>
        `;
    });

    document.querySelectorAll(".category").forEach(categoryElement => {
      categoryElement.addEventListener("click", async () => {
        const categoryId = parseInt(categoryElement.dataset.categoryId, 10);

        const contentContainer = categoryElement.querySelector(".card-content");
        let data3 = [];
        data2.forEach(function (chapter) {
          if (chapter.category_id === categoryId) {
            data3.push(chapter);
          }
        });
        let contentHTML = "";
        data3.forEach(item => {
          contentHTML += `<div class="content__div" data-item-id="${item.id}"><img src="./media/link-arrow.svg" alt="link-arrow" class="img__link"/><p class="content__p">${item.chapter}</p></div>`;
        });

        contentContainer.innerHTML = contentHTML;
        const contentElements = categoryList.querySelectorAll(".content__div");

        contentElements.forEach(contentElement => {
          contentElement.addEventListener("click", async event => {
            const itemId = contentElement.getAttribute("data-item-id");
            window.location.href = `dua?itemId=${itemId}`;
            renderContent(itemId);
          });
        });
      });
    });
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

async function renderCategory() {
  let categoryList = document.querySelector("#section1");
  categoryList.innerHTML = "";
  let requestAPI = `${CATEGORY_API}`;

  try {
    let res = await fetch(requestAPI);
    let data = await res.json();
    console.log(data);

    const requestAPI2 = `${CHAPTER_API}`;
    const res2 = await fetch(requestAPI2);
    const data2 = await res2.json();

    categoryList.innerHTML = "";

    data.forEach(async (item, index) => {
      let collapseId = `collapseExample-${index}`;

      categoryList.innerHTML += `
          <div class="category" data-category-id="${item.id}" data-bs-toggle="collapse" href="#${collapseId}" role="button" aria-expanded="false" aria-controls="${collapseId}">
            <div class="dropdown">
              <div class="dropdown_top">
                <img alt="arrow_bottom" src="./media/down.png" id="myImage" class="img_down"/>
                <div class="card-body">
                  <h5 class="card-title">${item.category}</h5>
                </div>
              </div>
              <div class="collapse" id="${collapseId}">
                <div class="card card-body card-content">
                  <!-- Сюда будет вставлен контент -->
                </div>
              </div>
            </div>
          </div>
        `;
    });

    document.querySelectorAll(".category").forEach(categoryElement => {
      categoryElement.addEventListener("click", async () => {
        const categoryId = parseInt(categoryElement.dataset.categoryId, 10);

        const contentContainer = categoryElement.querySelector(".card-content");
        let data3 = [];
        data2.forEach(function (chapter) {
          if (chapter.category_id === categoryId) {
            data3.push(chapter);
          }
        });
        let contentHTML = "";
        data3.forEach(item => {
          contentHTML += `<div class="content__div" data-item-id="${item.id}"><img src="./media/link-arrow.svg" alt="link-arrow" class="img__link"/><p class="content__p">${item.chapter}</p></div>`;
        });

        contentContainer.innerHTML = contentHTML;
        const contentElements = categoryList.querySelectorAll(".content__div");

        contentElements.forEach(contentElement => {
          contentElement.addEventListener("click", async event => {
            const itemId = contentElement.getAttribute("data-item-id");
            window.location.href = `dua?itemId=${itemId}`;
            renderContent(itemId);
          });
        });
      });
    });
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

const urlParams = new URLSearchParams(window.location.search);

const itemId = urlParams.get("itemId");

if (itemId) {
  console.log("itemId:", itemId);
  renderContent(itemId);
} else {
  console.log("itemId не найден в URL");
}

async function search1(query) {
  let chapterList = document.querySelector("#section2");
  chapterList.innerHTML = "";
  let user = 1342244632;
  let requestAPIp = `${CHAPTER_API}/filter?query=${query}`;
  let requestAPI2 = `${FAVORITE_API}filter?user_id=${user}&content_type=chapter`;
  let res2 = await fetch(requestAPI2);
  let data2 = await res2.json();

  try {
    let resp = await fetch(requestAPIp);
    let datap = await resp.json();
    datap.forEach(item => {
      const chapterElement = document.createElement("div");
      chapterElement.classList.add("chapter");
      chapterElement.setAttribute("data-item-id", item.id);
      chapterElement.innerHTML = `
        <div class="chapter_left">
            <div class="count">${item.dua_count} Дуа</div>
            <div class="index">${item.id}</div>
            <img src="./media/star-fill.svg" alt="star" class="img__active" id="img_white" data-item-id="${item.id}" data-content-type="chapter"/>
            <img src="./media/star-fill2.svg" alt="star" class="img__nonactive" id="img_yellow"  data-item-id="${item.id}" data-content-type="chapter"/>
        </div>
        <p class="chapter__name">${item.chapter}</p>
    `;

      const starImageWhite = chapterElement.querySelector("#img_white");
      const starImageYellow = chapterElement.querySelector("#img_yellow");

      let cont;
      let idg;
      data2.forEach(dataItem => {
        cont = dataItem.content_id;
        idg = dataItem.id;
        let itemId = chapterElement.getAttribute("data-item-id");
        if (cont == itemId) {
          starImageWhite.classList.add("img__nonactive");
          starImageWhite.classList.remove("img__active");
          starImageYellow.classList.remove("img__nonactive");
          starImageYellow.classList.add("img__active");
        }
      });

      chapterElement.addEventListener("click", async function (event) {
        let itemId = chapterElement.getAttribute("data-item-id");
        window.location.href = `dua?itemId=${itemId}`;
        renderContent(itemId);
      });

      starImageWhite.addEventListener("click", async function (event) {
        event.stopPropagation();
        const contentId = starImageWhite.getAttribute("data-item-id");
        const contentType = starImageWhite.getAttribute("data-content-type");

        const favoriteData = {
          content_id: parseInt(contentId),
          content_type: contentType,
          user_id: user,
        };

        const success = await postingChapter(favoriteData);
        if (success) {
          starImageWhite.classList.add("img__nonactive");
          starImageWhite.classList.remove("img__active");
          starImageYellow.classList.remove("img__nonactive");
          starImageYellow.classList.add("img__active");
        }
      });

      starImageYellow.addEventListener("click", async function (event) {
        event.stopPropagation();
        const success = await deletingChapter(idg);
        if (success) {
          starImageWhite.classList.remove("img__nonactive");
          starImageWhite.classList.add("img__active");
          starImageYellow.classList.add("img__nonactive");
          starImageYellow.classList.remove("img__active");
        }
      });

      chapterList.appendChild(chapterElement);
    });

    if (datap.length === 0) return;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

async function renderChapter() {
  let chapterList = document.querySelector("#section2");
  chapterList.innerHTML = "";

  let requestAPI = `${CHAPTER_API}`;
  let user = 1342244632;
  let requestAPI2 = `${FAVORITE_API}filter?user_id=${user}&content_type=chapter`;
  let res2 = await fetch(requestAPI2);
  let data2 = await res2.json();

  try {
    let res = await fetch(requestAPI);
    let data = await res.json();

    data.forEach(item => {
      const chapterElement = document.createElement("div");
      chapterElement.classList.add("chapter");
      chapterElement.setAttribute("data-item-id", item.id);
      chapterElement.innerHTML = `
        <div class="chapter_left">
            <div class="count">${item.dua_count} Дуа</div>
            <div class="index">${item.id}</div>
            <img src="./media/star-fill.svg" alt="star" class="img__active" id="img_white" data-item-id="${item.id}" data-content-type="chapter"/>
            <img src="./media/star-fill2.svg" alt="star" class="img__nonactive" id="img_yellow"  data-item-id="${item.id}" data-content-type="chapter"/>
        </div>
        <p class="chapter__name">${item.chapter}</p>
    `;

      const starImageWhite = chapterElement.querySelector("#img_white");
      const starImageYellow = chapterElement.querySelector("#img_yellow");

      let cont;
      let idg;
      data2.forEach(dataItem => {
        cont = dataItem.content_id;
        idg = dataItem.id;
        let itemId = chapterElement.getAttribute("data-item-id");
        if (cont == itemId) {
          starImageWhite.classList.add("img__nonactive");
          starImageWhite.classList.remove("img__active");
          starImageYellow.classList.remove("img__nonactive");
          starImageYellow.classList.add("img__active");
        }
      });

      chapterElement.addEventListener("click", async function (event) {
        let itemId = chapterElement.getAttribute("data-item-id");
        window.location.href = `dua?itemId=${itemId}`;
        renderContent(itemId);
      });

      starImageWhite.addEventListener("click", async function (event) {
        event.stopPropagation();
        const contentId = starImageWhite.getAttribute("data-item-id");
        const contentType = starImageWhite.getAttribute("data-content-type");

        const favoriteData = {
          content_id: parseInt(contentId),
          content_type: contentType,
          user_id: user,
        };

        const success = await postingChapter(favoriteData);
        if (success) {
          starImageWhite.classList.add("img__nonactive");
          starImageWhite.classList.remove("img__active");
          starImageYellow.classList.remove("img__nonactive");
          starImageYellow.classList.add("img__active");
        }
      });

      starImageYellow.addEventListener("click", async function (event) {
        event.stopPropagation();
        const success = await deletingChapter(idg);
        if (success) {
          starImageWhite.classList.remove("img__nonactive");
          starImageWhite.classList.add("img__active");
          starImageYellow.classList.add("img__nonactive");
          starImageYellow.classList.remove("img__active");
        }
      });

      chapterList.appendChild(chapterElement);
    });

    if (data.length === 0) return;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

async function renderFavorites(type) {
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
          chapterElement.classList.add("prog");
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
            duaElement.classList.add("prog");
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

let back = document.querySelector("#btn_back");
back.addEventListener("click", () => {
  renderChapter();
  renderCategory();
});
async function postingChapter(favoriteData) {
  try {
    const requestAPI = `${FAVORITE_API}create`;
    const response = await fetch(requestAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteData),
    });
    console.log("Успешно добавлено в избранное");
    renderFavorites("chapter");
  } catch (error) {
    console.error("Произошла ошибка при добавлении в избранное:", error);
  }
}

async function deletingChapter(id) {
  let requestAPI = `${FAVORITE_API}delete?favorite_id=${id}`;
  fetch(requestAPI, {
    method: "DELETE",
  })
    .then(response => {
      // Обработка успешного ответа
      if (response.ok) {
        console.log("Избранный элемент успешно удален");
        renderFavorites("chapter");
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
}
document.addEventListener("DOMContentLoaded", function () {
  const chapterRadio = document.getElementById("chapterCheck");
  const duaRadio = document.getElementById("duaCheck");

  duaRadio.addEventListener("change", function () {
    console.log("wtf");
    renderFavorites("dua");
    chapterRadio.checked = false;
    renderChapter();
  });

  chapterRadio.addEventListener("change", function () {
    renderFavorites("chapter");
    duaRadio.checked = false;
    renderChapter();
  });
});

async function deletingDua(id) {
  let requestAPI = `${FAVORITE_API}delete?favorite_id=${id}`;
  fetch(requestAPI, {
    method: "DELETE",
  })
    .then(response => {
      // Обработка успешного ответа
      if (response.ok) {
        console.log("Избранный элемент успешно удален");
        renderFavorites("dua");
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
}

function loadAd() {
  fetch("http://92.38.48.73/api/ads/last")
    .then(response => response.json())
    .then(data => {
      const ad = data;
      const mainAdImg2 = document.getElementById("mainAd2");
      const mainAdLink2 = document.getElementById("mainA2");

      mainAdImg2.src = `http://92.38.48.73/ads/${ad.img}`;
      mainAdLink2.href = ad.url;
    })
    .catch(error => {
      console.error("Ошибка при загрузке рекламы:", error);
    });
}
loadAd();

renderCategory();
renderChapter();
let type = "chapter";
renderFavorites(type);
