
const complaints = [
  {
    id: "CMP-001",
    status: "Pending",
    title: "Water heater not working in bathroom",
    desc: "The water heater in my bathroom stopped working yesterday. No hot water available.",
    date: "Jan 8, 2024",
    category: "Water",
    icon: "🚿"
  },
  {
    id: "CMP-002",
    status: "In Progress",
    title: "WiFi connectivity issues in room",
    desc: "WiFi keeps disconnecting every few minutes. Very slow speeds when connected.",
    date: "Jan 7, 2024",
    category: "Internet",
    icon: "📶"
  },
  {
    id: "CMP-003",
    status: "Resolved",
    title: "Room cleaning not done today",
    desc: "The cleaning staff did not clean my room today as scheduled.",
    date: "Jan 5, 2024",
    category: "Cleaning",
    icon: "🧹"
  },
  {
    id: "CMP-004",
    status: "Resolved",
    title: "Light bulb burnt out in study area",
    desc: "The main light bulb in the study corner has stopped working.",
    date: "Jan 3, 2024",
    category: "Electricity",
    icon: "💡"
  },
  {
    id: "CMP-005",
    status: "Pending",
    title: "Food quality issue with dinner",
    desc: "The dinner served yesterday was cold and not properly cooked.",
    date: "Jan 2, 2024",
    category: "Food",
    icon: "🍲"
  },
  {
    id: "CMP-006",
    status: "In Progress",
    title: "AC making loud noise",
    desc: "The air conditioner is making a very loud rattling noise.",
    date: "Dec 28, 2023",
    category: "Other",
    icon: "🧰"
  }
];

const cardsContainer = document.getElementById("cardsContainer");
const footerText = document.getElementById("footerText");

const searchInput = document.getElementById("searchInput");
const statusBtn = document.getElementById("statusBtn");
const categoryBtn = document.getElementById("categoryBtn");

const statusMenu = document.getElementById("statusMenu");
const categoryMenu = document.getElementById("categoryMenu");

let selectedStatus = "all";
let selectedCategory = "all";

// ------- dropdown open/close -------
statusBtn.addEventListener("click", () => {
  toggleMenu(statusMenu);
  categoryMenu.style.display = "none";
});

categoryBtn.addEventListener("click", () => {
  toggleMenu(categoryMenu);
  statusMenu.style.display = "none";
});

function toggleMenu(menu) {
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// close menus when clicking outside
document.addEventListener("click", (e) => {
  const clickedInsideStatus = statusBtn.contains(e.target) || statusMenu.contains(e.target);
  const clickedInsideCategory = categoryBtn.contains(e.target) || categoryMenu.contains(e.target);

  if (!clickedInsideStatus) statusMenu.style.display = "none";
  if (!clickedInsideCategory) categoryMenu.style.display = "none";
});

// ------- menu options -------
statusMenu.querySelectorAll(".option").forEach(opt => {
  opt.addEventListener("click", () => {
    selectedStatus = opt.dataset.value; // all / pending / in progress / resolved
    statusBtn.textContent = opt.textContent + " ▾";
    statusMenu.style.display = "none";
    renderCards();
  });
});

categoryMenu.querySelectorAll(".option").forEach(opt => {
  opt.addEventListener("click", () => {
    selectedCategory = opt.dataset.value; // all / food / cleaning / ...
    categoryBtn.textContent = opt.textContent + " ▾";
    categoryMenu.style.display = "none";
    renderCards();
  });
});

// ------- search -------
searchInput.addEventListener("input", renderCards);

// ------- render cards -------
function getStatusClass(statusText) {
  const s = statusText.toLowerCase();
  if (s === "pending") return "status-pending";
  if (s === "in progress") return "status-inprogress";
  return "status-resolved";
}

function renderCards() {
  const search = searchInput.value.trim().toLowerCase();

  const filtered = complaints.filter(c => {
    const statusOk = (selectedStatus === "all") || (c.status.toLowerCase() === selectedStatus);
    const catOk = (selectedCategory === "all") || (c.category.toLowerCase() === selectedCategory);

    const searchOk =
      c.title.toLowerCase().includes(search) ||
      c.id.toLowerCase().includes(search);

    return statusOk && catOk && searchOk;
  });

  cardsContainer.innerHTML = "";

  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="left-part">
        <div class="icon-box">${c.icon}</div>

        <div class="info">
          <div class="card-top">
            <span class="comp-id">${c.id}</span>
            <span class="status-pill ${getStatusClass(c.status)}">${c.status}</span>
          </div>

          <h3>${c.title}</h3>
          <p class="desc">${c.desc}</p>

          <div class="meta">
            <span>📅 ${c.date}</span>
            <span>${c.category}</span>
          </div>
        </div>
      </div>

      <div class="arrow">→</div>
    `;

    cardsContainer.appendChild(card);
  });

  footerText.textContent = `Showing ${filtered.length} of ${complaints.length} complaints`;
}

// first load
renderCards();