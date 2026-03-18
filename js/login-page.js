const loginForm = document.getElementById("loginForm");
      const emailInput = document.getElementById("email");
      const emailError = document.getElementById("emailError");

      function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return pattern.test(email);
      }

      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
          emailError.style.display = "block";
          emailInput.style.borderColor = "red";
          return;
        }

        emailError.style.display = "none";
        emailInput.style.borderColor = "#d1d5db";

        window.location.href = "main-interface.html";
      });