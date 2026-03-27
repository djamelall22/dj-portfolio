(function () {
  const video = document.getElementById("about-video");
  const btn = document.getElementById("video-play-btn");
  const icon = document.getElementById("play-icon");
  if (!video || !btn) return;

  // Déclenche quand .ab1 est visible au scroll
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.classList.add("ready");
        observer.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  observer.observe(video.closest(".ab1"));

  // Clic = play avec son + cache le bouton
  btn.addEventListener("click", () => {
    video.muted = false;
    video.play();
    icon.classList.add("hidden");
  });

  // Si la vidéo se termine, réaffiche le bouton play
  video.addEventListener("ended", () => {
    icon.classList.remove("hidden");
  });
})();
