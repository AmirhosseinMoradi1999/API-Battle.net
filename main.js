
async function fetchData() {
  let data = await fetch("http://localhost:3001/header");
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
fetch('http://localhost:3001/Navbar')
  .then(response => response.json())
  .then(data => {
    const navContainer = document.getElementById('navbar');

    data.forEach(item => {
      const title = document.createElement('h3');
      title.textContent = item.text;

      const ul = document.createElement('ul');

      item.subMenu.forEach(sub => {
        const li = document.createElement('li');
        li.textContent = sub.text;
        ul.appendChild(li);
      });

      navContainer.appendChild(title);
      navContainer.appendChild(ul);
    });
  })
  .catch(error => {
    console.error('خطا   :', error);
  });
  fetch('http://localhost:3001/cards')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cards-container');

    data.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.style.width = '20%';
      cardDiv.style.border = '1px solid #ccc';
      cardDiv.style.borderRadius = '8px';
      cardDiv.style.overflow = 'hidden';
      cardDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      cardDiv.style.background = '##313339';
      cardDiv.style.fontFamily = 'sans-serif';

      cardDiv.innerHTML = `
        <img src="${card.img}" alt="${card.title}" style="width: 100%; height: auto;">
        <div style="padding: 1rem; color: white;">
          <h3 style="margin: 0 0 0.5rem 0;">${card.title}</h3>
          <p style="margin: 0 0 1rem 0; color: #CA9E07;">${card.text}</p>
          <strong style="color: #e53935;">${card.price}</strong>
        </div>
      `;

      container.appendChild(cardDiv);
    });
  })
  .catch(err => {
    console.error('خطا :', err);
  });
fetch('http://localhost:3001/footer')
  .then(res => res.json())
  .then(data => {
    const footer = document.getElementById('footer');

    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    ul.style.display = 'flex';
    ul.style.flexWrap = 'wrap';
    ul.style.gap = '2rem';
    ul.style.background = '#15171E';

    data.forEach(item => {
      const li = document.createElement('li');
      li.style.position = 'relative';

      li.innerHTML = `<strong>${item.text}</strong>`;

  
      if (item.subMenu && item.subMenu.length > 0) {
        const subUl = document.createElement('ul');
        subUl.style.listStyle = 'none';
        subUl.style.padding = '0.5rem';
        subUl.style.margin = '0.5rem 0 0 0';
        subUl.style.background = '#15171E';
        subUl.style.borderRadius = '5px';

        item.subMenu.forEach(sub => {
          const subLi = document.createElement('li');
          subLi.textContent = sub.text;
          subLi.style.color = '#ccc';
          subLi.style.padding = '0.25rem 0';
          subUl.appendChild(subLi);
        });

        li.appendChild(subUl);
      }

      ul.appendChild(li);
    });

    footer.appendChild(ul);
  })
  .catch(err => {
    console.error('خطا   :', err);
  });
