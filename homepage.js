// roei hamihas id-323919829 ---------- tal braunstein  id-207118365
document.addEventListener("DOMContentLoaded", () => {

    const postContainers = document.querySelectorAll(".post-container"); // נוספה
  
    postContainers.forEach(container => { // נוספה
  
      const commentsSection = container.querySelector(".comments"); // נוספה
      const toggleBtn = container.querySelector(".toggle-comments-btn"); // נוספה
      const input = container.querySelector(".comment-form input"); // נוספה
      const sendBtn = container.querySelector(".submit-comment-btn"); // נוספה
      const commentCounter = container.querySelector(".comment-counter"); // נוספה
  
      toggleBtn.addEventListener("click", () => { // נוספה
        if (commentsSection.style.display === "none" || !commentsSection.style.display) {
          commentsSection.style.display = "block";
          toggleBtn.textContent = "הסתר תגובות";
        } else {
          commentsSection.style.display = "none";
          toggleBtn.textContent = "הצג תגובות";
        }
      });
  
      sendBtn.addEventListener("click", () => { // נוספה
        const text = input.value.trim();
        if (!text) return;
  
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `
          <strong>you</strong>: ${text}
          <div class="comment-actions">
            <button class="like-btn comment-like"><i class="fas fa-arrow-up"></i> <span class="like-count">0</span></button>
            <button class="unlike-btn"><i class="fas fa-arrow-down"></i></button>
            <button class="reply-btn"><i class="fas fa-reply"></i> Reply</button>
          </div>
        `;
  
        commentsSection.appendChild(comment);
        input.value = "";
  
        const count = parseInt(commentCounter.textContent);
        commentCounter.textContent = count + 1;
  
        attachLikeEvents(comment); // נוספה
      });
    });
  
    // פונקציונליות חיפוש בפוסטים
    const searchInput = document.querySelector(".search-bar input"); // נוספה
    const postContainersAll = document.querySelectorAll(".post-container"); // נוספה
    const noResultsMessage = document.getElementById("no-results"); // נוספה
  
    searchInput.addEventListener("input", () => { // נוספה
      const query = searchInput.value.toLowerCase();
      let found = false;
  
      postContainersAll.forEach(container => {
        const post = container.querySelector(".post");
        const title = post.querySelector(".post-title").textContent.toLowerCase();
        const meta = post.querySelector(".post-meta").textContent.toLowerCase();
  
        if (title.includes(query) || meta.includes(query)) {
          container.style.display = "block";
          found = true;
        } else {
          container.style.display = "none";
        }
      });
  
      noResultsMessage.style.display = found ? "none" : "block";
    });
  
    // פונקציה גלובלית להפעלת לייק/אנלייק
    function attachLikeEvents(root = document) {
      root.querySelectorAll(".like-btn").forEach(button => {
        let liked = false;
        const countSpan = button.querySelector(".like-count");
  
        button.onclick = () => {
          button.style.transform = "scale(1.2)";
          setTimeout(() => button.style.transform = "scale(1)", 150);
          const current = parseInt(countSpan.textContent);
          countSpan.textContent = liked ? current - 1 : current + 1;
          button.style.color = liked ? "#7c7c7c" : "red";
          liked = !liked;
        };
      });
  
      root.querySelectorAll(".unlike-btn").forEach(button => {
        let unliked = false;
  
        button.onclick = () => {
          button.style.transform = "scale(1.2)";
          setTimeout(() => button.style.transform = "scale(1)", 150);
          button.style.color = unliked ? "#7c7c7c" : "purple";
          unliked = !unliked;
        };
      });
    }
  
    attachLikeEvents(); // נוספה
  
  });
  