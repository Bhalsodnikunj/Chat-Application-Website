document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const chatForm = document.getElementById("chatForm");
  const chatBox = document.getElementById("chatBox");
  const logoutBtn = document.getElementById("logoutBtn");

  // --------- SIGNUP PAGE ---------
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("signupUsername").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
      }

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify({ username, password }));
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    });
  }

  // --------- LOGIN PAGE ---------
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "chat.html";
      } else {
        alert("Invalid username or password!");
      }
    });
  }

  // --------- CHAT PAGE ---------
  if (chatForm && chatBox) {
    const loggedInUser = localStorage.getItem("loggedInUser");

    // Redirect to login if not logged in
    if (!loggedInUser) {
      window.location.href = "chat.html";
    }

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = document.getElementById("chatInput").value.trim();
      if (message === "") return;

      // Create message element
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message");
      msgDiv.textContent = `${loggedInUser}: ${message}`;

      // Append message to chat box
      chatBox.appendChild(msgDiv);

      // Clear input & scroll to bottom
      document.getElementById("chatInput").value = "";
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  }

  // --------- LOGOUT BUTTON ---------
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
