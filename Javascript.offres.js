document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".learn-more-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".job-card");
      const details = card.querySelector(".job-description-detailed");

      if (!details) return;

      details.classList.toggle("show");

      btn.textContent = details.classList.contains("show") ? "Voir moins" : "En savoir plus";
    });
  });

  document.querySelectorAll(".apply-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const jobTitle = btn.closest(".job-card").querySelector(".job-title").textContent;
      alert(`Vous souhaitez postuler pour : ${jobTitle}\nFormulaire sur une autre page.`);
    });
  });
});
