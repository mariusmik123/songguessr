// back to main menu
const backBtn = document.querySelector(".js-backBtn");
backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

async function loadAlbums() {
  const response = await fetch("http://127.0.0.1:3500/api/albums");
  if (!response.ok) {
    throw new Error("failed to load albums");
  }
  return await response.json();
}

function findOptionById(options, optionId) {
  return options.find((o) => o.id === Number(optionId));
}
async function addEventListeners(albums) {
  const options = document.querySelectorAll(".js-option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const optionId = option.dataset.albumOption;
      const a = findOptionById(albums, optionId);
      console.log(a);
      const params = new URLSearchParams({ id: optionId, album: a.fileName });
      window.location.href = `/localgame.html?${params}`;
    });
  });
}

// generate album options
async function renderAlbumOptions() {
  let totalHtml = "";
  const albums = await loadAlbums();
  albums.forEach((album) => {
    totalHtml += `
    <div class="option js-option"
    data-album-option="${album.id}">
        <h2>${album.name}</h2>
        <img src="./Img/${album.albumCover}" alt="albumcover" />
    </div>`;
  });
  const albumSection = document.querySelector(".js-albumContainer");
  albumSection.innerHTML = totalHtml;

  //TODO add eventlisteners
  await addEventListeners(albums);
}

renderAlbumOptions();
