async function fetchData() {
  let data = await fetch("http://localhost:3000/header");
  let res = await data.json();

  let html = res.map(elem => {
    if (elem.subMenu.length === 0) {
      return `
        <li class="d-flex justify-content-start align-items-center gap-1">
          ${elem.svg}
          <span class="text-white text-nowrap">${elem.text}</span>
        </li>
      `;
    } else {
      let subMenuHtml = elem.subMenu.map(sub => {
        return `
          <li class="p-3">
            <a class="dropdown-item text-secondary px-0" href="#">
              <span>${sub.text}</span>
            </a>
          </li>
        `;
      }).join("");

      return `
        <li class="d-flex justify-content-start align-items-center gap-1">
          <div class="dropdown">
            <div class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${elem.svg}
              <span class="text-white text-nowrap">${elem.text}</span>
            </div>
            <ul class="dropdown-menu bg-dark rounded-sm p-4 px-0 pb-0 mt-2">
              ${subMenuHtml}
            </ul>
          </div>
        </li>
      `;
    }
  }).join("");

  document.getElementById("your-container-id").innerHTML = html;
}
