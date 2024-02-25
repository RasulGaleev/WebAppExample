const CATEGORY_API =
  "https://3d57-95-26-81-230.ngrok-free.app/api/categories/";
const CHAPTER_API =
  "https://3d57-95-26-81-230.ngrok-free.app/api/chapters/";
const DUA_API =
  "https://3d57-95-26-81-230.ngrok-free.app/api/duas/filter?chapter_id=";

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
    const walk = (y - startY) * 2;
    element.scrollTop = scrollTop - walk;
  });

  element.addEventListener("touchmove", e => {
    if (!isScrolling) return;
    e.preventDefault();
    const y = e.touches[0].pageY - element.offsetTop;
    const walk = (y - startY) * 2;
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

let startY;

section2.addEventListener("touchstart", e => {
  isScrolling = true;
  startY = e.touches[0].pageY - section2.offsetTop;
  scrollTop = section2.scrollTop;
});

section2.addEventListener("touchmove", e => {
  if (!isScrolling) return;
  e.preventDefault();
  const y = e.touches[0].pageY - section2.offsetTop;
  const walk = (y - startY) * 2;
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

sectionNavs.forEach((nav, index) => {
  nav.addEventListener("click", () => {
    sections[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  });
});

sectionNavs.forEach((nav, index) => {
  nav.addEventListener("click", event => {
    event.preventDefault(); // Предотвращаем выполнение действия по умолчанию
    sections[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  });
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
    const section = sections[index];
    const sectionRect = section.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const offsetTop = sectionRect.top - containerRect.top;
    const currentScrollTop = scrollContainer.scrollTop;

    scrollContainer.scrollTop = currentScrollTop + offsetTop;
    section.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
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

async function search(query) {
  let categoryList = document.querySelector("#section1");
  let requestAPI = `${CATEGORY_API}filter?query=${query}`;
  const headers = new Headers({
    "ngrok-skip-browser-warning": "true",
  });
  let res = await fetch(requestAPI, { headers });
  let data = await res.json();

  categoryList.innerHTML = "";

  try {
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
        const categoryId = categoryElement.dataset.categoryId;

        const contentContainer = categoryElement.querySelector(".card-content");

        const requestAPI2 = `${CHAPTER_API}filter?category_id=${categoryId}`;
        const res = await fetch(requestAPI2, { headers });
        const data2 = await res.json();

        let contentHTML = "";
        data2.forEach(item => {
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

    if (data.length === 0) return;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let searchInput = document.querySelector(".search-input");

  function handleInputChange(event) {
    const query = event.target.value;
    search(query);
    search1(query);
  }

  searchInput.addEventListener("input", handleInputChange);
});

async function renderCategory() {
  let categoryList = document.querySelector("#section1");
  categoryList.innerHTML = "";
  let requestAPI = `${CATEGORY_API}`;

  const headers = new Headers({
    "ngrok-skip-browser-warning": "true",
  });

  try {
    let res = await fetch(requestAPI, { headers });
    let data = await res.json();
    console.log(data);

    const requestAPI2 = `${CHAPTER_API}`;
    const res2 = await fetch(requestAPI2, { headers });
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
  let requestAPI = `${CHAPTER_API}filter?query=${query}`;
  const headers = new Headers({
    "ngrok-skip-browser-warning": "true",
  });

  try {
    let res = await fetch(requestAPI, { headers });
    let data = await res.json();
    data.forEach(item => {
      const chapterElement = document.createElement("div");
      chapterElement.classList.add("chapter");
      chapterElement.setAttribute("data-item-id", item.id);
      chapterElement.innerHTML = `
        <div class="chapter_left">
            <div class="count">${item.dua_count} Дуа</div>
            <div class="index">${item.id}</div>
            <img src="./media/star.png" alt="star" class="img__star"/>
        </div>
        <p class="chapter__name">${item.chapter}</p>
    `;

      chapterElement.addEventListener("click", function (event) {
        let itemId = chapterElement.getAttribute("data-item-id");
        window.location.href = `dua?itemId=${itemId}`;
        renderContent(itemId);
      });
      chapterList.appendChild(chapterElement);
    });

    if (data.length === 0) return;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

async function renderChapter() {
  let chapterList = document.querySelector("#section2");
  chapterList.innerHTML = "";
  let requestAPI = `${CHAPTER_API}`;

  const headers = new Headers({
    "ngrok-skip-browser-warning": "true",
  });

  try {
    let res = await fetch(requestAPI, { headers });
    let data = await res.json();

    console.log(data);

    data.forEach(item => {
      const chapterElement = document.createElement("div");
      chapterElement.classList.add("chapter");
      chapterElement.setAttribute("data-item-id", item.id);
      chapterElement.innerHTML = `
        <div class="chapter_left">
            <div class="count">${item.dua_count} Дуа</div>
            <div class="index">${item.id}</div>
            <img src="./media/star.png" alt="star" class="img__star"/>
        </div>
        <p class="chapter__name">${item.chapter}</p>
    `;

      chapterElement.addEventListener("click", function (event) {
        let itemId = chapterElement.getAttribute("data-item-id");
        window.location.href = `dua?itemId=${itemId}`;
        renderContent(itemId);
      });
      chapterList.appendChild(chapterElement);
    });

    if (data.length === 0) return;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

let back = document.querySelector("#btn_back");
back.addEventListener("click", () => {
  renderChapter();
  renderCategory();
});

renderCategory();
renderChapter();
