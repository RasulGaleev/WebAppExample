const DUA_API =
  "https://3d57-95-26-81-230.ngrok-free.app/api/duas";
const AUDIO_API =
  "https://3d57-95-26-81-230.ngrok-free.app/audio/";

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
  const headers = new Headers({
    "ngrok-skip-browser-warning": "true",
  });
  try {
    let res = await fetch(requestAPI, { headers });
    let data = await res.json();
    console.log(data);
    data.forEach(item => {
      let requestAPI2 = `${AUDIO_API}/${item.audio}`;
      console.log(requestAPI2);
      contentList.innerHTML += `
  <div class="dua">
      <div class="dua__navbar">
          <img src="./media/star.png" alt="star" width="20px" class="dua__img" style="display: none"/>
          <p class="dua__navbar__p">Дуа ${item.id}</p>
          <img src="./media/play-circle-fill.svg" alt="star" width="20px" class="dua__img"" style="display: none"/>
          </div>
      <div class="dua__content">
      ${item.arab ? `<p class="arabicContent">${item.arab}</p>` : ""}
      ${
        item.transcript
          ? `<p class="transcriptContent">${item.transcript}</p>`
          : ""
      }
      ${item.translate ? `<p class="russianContent">${item.translate}</p>` : ""}
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
  </div>
  `;
      check();
      checks();
      check2();
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
