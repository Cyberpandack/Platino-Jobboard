document.addEventListener('DOMContentLoaded', () => {
  function loadData() {
    try {
      const savedOffers = localStorage.getItem('offers');
      const savedUsers = localStorage.getItem('users');
      if (savedOffers) offers = JSON.parse(savedOffers);
      if (savedUsers) users = JSON.parse(savedUsers);
    } catch (err) {
      console.error("Erreur loadData:", err);
    }
  }

  function saveData() {
    try {
      localStorage.setItem('offers', JSON.stringify(offers));
      localStorage.setItem('users', JSON.stringify(users));
    } catch (err) {
      console.error("Erreur saveData:", err);
    }
  }

  let offers = [
    { id: '001', title: "Chargé de recrutement", status: "Ouverte" },
    { id: '002', title: "Développeur web", status: "Fermée" },
    { id: '003', title: "Chef de projet RH", status: "Ouverte" }
  ];

  let users = [
    { id: '98765', nom: "Dupont", prenom: "Jean", email: "jean.dupont@example.com", statut: "Actif" },
    { id: '12345', nom: "Martin", prenom: "Sophie", email: "sophie.martin@example.com", statut: "Bloqué" }
  ];

  loadData();

  function renderOffers(list = offers) {
    const table = document.getElementById('offerTable');
    if (!table) { console.error("Element #offerTable introuvable"); return; }
    table.innerHTML = "";
    list.forEach(offer => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="px-4 py-3">${escapeHtml(offer.id)}</td>
        <td class="px-4 py-3">${escapeHtml(offer.title)}</td>
        <td class="px-4 py-3 ${offer.status === 'Ouverte' ? 'text-green-600' : 'text-red-600'}">${escapeHtml(offer.status)}</td>
        <td class="px-4 py-3 flex gap-2">
          <button data-action="close" data-id="${offer.id}" class="offer-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Fermer</button>
          <button data-action="open" data-id="${offer.id}" class="offer-btn bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Ouvrir</button>
          <button data-action="delete" data-id="${offer.id}" class="offer-btn bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Supprimer</button>
        </td>`;
      table.appendChild(tr);
    });
  }

  function toggleOffer(id, newStatus) {
    offers = offers.map(o => o.id === id ? { ...o, status: newStatus } : o);
    saveData();
    renderOffers();
  }

  function deleteOffer(id) {
    if (!confirm("Supprimer cette offre ?")) return;
    offers = offers.filter(o => o.id !== id);
    saveData();
    renderOffers();
  }

  function filterOffers() {
    const input = document.getElementById('searchOffers');
    const search = input ? input.value.toLowerCase() : "";
    const filtered = offers.filter(o => o.title.toLowerCase().includes(search));
    renderOffers(filtered);
  }

  function renderUsers(list = users) {
    const table = document.getElementById('userTable');
    if (!table) { console.error("Element #userTable introuvable"); return; }
    table.innerHTML = "";
    list.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="px-4 py-3">${escapeHtml(u.id)}</td>
        <td class="px-4 py-3">${escapeHtml(u.prenom)} ${escapeHtml(u.nom)}</td>
        <td class="px-4 py-3">${escapeHtml(u.email)}</td>
        <td class="px-4 py-3 ${u.statut === 'Actif' ? 'text-green-600' : 'text-red-600'}">${escapeHtml(u.statut)}</td>
        <td class="px-4 py-3 flex gap-2">
          <button data-action="block" data-id="${u.id}" class="user-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Bloquer</button>
          <button data-action="unblock" data-id="${u.id}" class="user-btn bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Débloquer</button>
          <button data-action="delete" data-id="${u.id}" class="user-btn bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Supprimer</button>
        </td>`;
      table.appendChild(tr);
    });
  }

  function blockUser(id) {
    users = users.map(u => u.id === id ? { ...u, statut: "Bloqué" } : u);
    saveData();
    renderUsers();
  }

  function unblockUser(id) {
    users = users.map(u => u.id === id ? { ...u, statut: "Actif" } : u);
    saveData();
    renderUsers();
  }

  function deleteUser(id) {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    users = users.filter(u => u.id !== id);
    saveData();
    renderUsers();
  }

  function filterUsers() {
    const input = document.getElementById('searchUsers');
    const search = input ? input.value.toLowerCase() : "";
    const filtered = users.filter(u => 
      u.nom.toLowerCase().includes(search) ||
      u.prenom.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    );
    renderUsers(filtered);
  }

  const createForm = document.getElementById('createUserForm');
  if (createForm) {
    createForm.addEventListener('submit', e => {
      e.preventDefault();
      const id = (document.getElementById('userID') || {}).value?.trim();
      const nom = (document.getElementById('nom') || {}).value?.trim();
      const prenom = (document.getElementById('prenom') || {}).value?.trim();
      const email = (document.getElementById('email') || {}).value?.trim();
      const tel = (document.getElementById('telephone') || {}).value?.trim();

      if (!id || !nom || !prenom || !email || !tel) {
        alert("Merci de remplir tous les champs !");
        return;
      }
      if (users.some(u => u.id === id)) {
        alert("Un utilisateur avec cet ID existe déjà !");
        return;
      }
      users.push({ id, nom, prenom, email, telephone: tel, statut: "Actif" });
      saveData();
      renderUsers();
      createForm.reset();
      alert("Utilisateur créé avec succès !");
    });
  } else {
    console.warn("#createUserForm introuvable — formulaire non initialisé");
  }

  const offerTableParent = document.getElementById('offerTable');
  if (offerTableParent) {
    offerTableParent.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.offer-btn');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (!id || !action) return;
      if (action === 'close') toggleOffer(id, 'Fermée');
      if (action === 'open') toggleOffer(id, 'Ouverte');
      if (action === 'delete') deleteOffer(id);
    });
  }

  const userTableParent = document.getElementById('userTable');
  if (userTableParent) {
    userTableParent.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.user-btn');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (!id || !action) return;
      if (action === 'block') blockUser(id);
      if (action === 'unblock') unblockUser(id);
      if (action === 'delete') deleteUser(id);
    });
  }

  const searchOffersBtn = document.querySelector('[onclick*="filterOffers"], #searchOffersBtn');
  const searchOffersInput = document.getElementById('searchOffers');
  if (searchOffersInput) {
    searchOffersInput.addEventListener('input', debounce(filterOffers, 250));
  }

  const searchUsersInput = document.getElementById('searchUsers');
  if (searchUsersInput) {
    searchUsersInput.addEventListener('input', debounce(filterUsers, 250));
  }

  function escapeHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function debounce(fn, ms = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  window.toggleOffer = toggleOffer;
  window.deleteOffer = deleteOffer;
  window.filterOffers = filterOffers;
  window.renderOffers = renderOffers;

  window.blockUser = blockUser;
  window.unblockUser = unblockUser;
  window.deleteUser = deleteUser;
  window.filterUsers = filterUsers;
  window.renderUsers = renderUsers;

  renderOffers();
  renderUsers();

  console.info("Admin script initialisé — offres:", offers.length, "utilisateurs:", users.length);
});
