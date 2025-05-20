// roei hamihas id-323919829 ---------- tal braunstein  id-207118365
document.addEventListener("DOMContentLoaded", () => {
    const postContainers = document.querySelectorAll(".post-container");
  
    postContainers.forEach(container => {
      const post = container.querySelector(".post");
      const commentsSection = container.querySelector(".comments");
      const toggleBtn = container.querySelector(".toggle-comments-btn");
      const input = container.querySelector(".comment-form input");
      const sendBtn = container.querySelector(".submit-comment-btn");
      const commentCounter = container.querySelector(".comment-counter");
      const typingIndicator = container.querySelector(".typing-indicator");
  
      // טוגל תגובות
      toggleBtn.addEventListener("click", () => {
        if (commentsSection.style.display === "none" || !commentsSection.style.display) {
          commentsSection.style.display = "block";
          toggleBtn.textContent = "הסתר תגובות";
        } else {
          commentsSection.style.display = "none";
          toggleBtn.textContent = "הצג תגובות";
        }
      });
  
      // פונקציית יצירת תגובה
      function addComment(text) {
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `
          <strong>Anonymous</strong>: ${text}
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
  
        attachLikeEvents(comment);
      }
  
      // קלידת אינפוט – הצגת טייפינג
      input.addEventListener("input", () => {
        typingIndicator.style.display = input.value.trim() ? "block" : "none";
      });
  
      // שליחה בלחיצה
      sendBtn.addEventListener("click", () => {
        if (input.value.trim()) {
          addComment(input.value.trim());
          typingIndicator.style.display = "none";
        }
      });
  
      // שליחה ב־Enter
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (input.value.trim()) {
            addComment(input.value.trim());
            typingIndicator.style.display = "none";
          }
        }
      });
    });
  
    // כפתור "חזור למעלה"
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
      });
  
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    // חיפוש בפיד
    const searchInput = document.querySelector(".search-bar input");
    const postContainersAll = document.querySelectorAll(".post-container");
    const noResultsMessage = document.getElementById("no-results");
  
    if (searchInput) {
      searchInput.addEventListener("input", () => {
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
    }
  
    // הפעלת לייקים ואנלייקים
    function attachLikeEvents(root = document) {
      root.querySelectorAll(".like-btn").forEach(button => {
        let liked = false;
        const countSpan = button.querySelector(".like-count");
  
        button.addEventListener("click", () => {
          button.style.transform = "scale(1.2)";
          setTimeout(() => button.style.transform = "scale(1)", 150);
          const current = parseInt(countSpan.textContent);
          countSpan.textContent = liked ? current - 1 : current + 1;
          button.style.color = liked ? "#7c7c7c" : "red";
          liked = !liked;
        });
      });
  
      root.querySelectorAll(".unlike-btn").forEach(button => {
        let unliked = false;
  
        button.addEventListener("click", () => {
          button.style.transform = "scale(1.2)";
          setTimeout(() => button.style.transform = "scale(1)", 150);
          button.style.color = unliked ? "#7c7c7c" : "purple";
          unliked = !unliked;
        });
      });
    }
  
    attachLikeEvents();
  });
  
  