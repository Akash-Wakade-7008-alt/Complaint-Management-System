const form = document.getElementById("registerForm");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      const toggleBtn = document.getElementById("togglePassword");
      const errorMsg = document.getElementById("errorMsg");
      const emailInput = document.getElementById("email");

      toggleBtn.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";
        confirmPasswordInput.type = isHidden ? "text" : "password";
      });

      function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      }

      form.addEventListener("submit", (e) => {
        errorMsg.textContent = "";

        if (!form.checkValidity()) {
          e.preventDefault();
          form.reportValidity();
          return;
        }

        if (!isValidEmail(emailInput.value)) {
          e.preventDefault();
          errorMsg.textContent =
            "Please enter a valid email address (example: name@gmail.com).";
          emailInput.focus();
          return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
          e.preventDefault();
          errorMsg.textContent = "Password and Confirm Password do not match.";
          confirmPasswordInput.focus();
          return;
        }

        e.preventDefault();
        window.location.href = "main-interface.html";
      });
