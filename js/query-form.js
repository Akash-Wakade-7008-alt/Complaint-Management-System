const form = document.getElementById("complaintForm");
      const categoryEl = document.getElementById("category");
      const titleEl = document.getElementById("title");
      const descEl = document.getElementById("desc");

      const uploadBox = document.getElementById("uploadBox");
      const imageInput = document.getElementById("imageInput");
      const fileInfo = document.getElementById("fileInfo");
      const errorMsg = document.getElementById("errorMsg");
      const cancelBtn = document.getElementById("cancelBtn");

      let selectedImageDataUrl = "";
      let selectedImageName = "";

      function setError(msg) {
        errorMsg.textContent = msg || "";
      }

      function validateFile(file) {
        if (!file) return true;

        const isValidType =
          file.type === "image/png" || file.type === "image/jpeg";
        if (!isValidType) {
          setError("Only PNG or JPG images are allowed.");
          return false;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          setError("Image must be 5MB or smaller.");
          return false;
        }

        return true;
      }

      function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      async function handleFile(file) {
        setError("");

        if (!validateFile(file)) {
          selectedImageDataUrl = "";
          selectedImageName = "";
          fileInfo.textContent = "";
          return;
        }

        selectedImageName = file.name;
        fileInfo.textContent = `Selected: ${file.name}`;
        selectedImageDataUrl = await readFileAsDataURL(file);
      }

      uploadBox.addEventListener("click", () => imageInput.click());
      uploadBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") imageInput.click();
      });

      imageInput.addEventListener("change", async () => {
        const file = imageInput.files[0];
        await handleFile(file);
      });

      uploadBox.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadBox.classList.add("dragover");
      });

      uploadBox.addEventListener("dragleave", () => {
        uploadBox.classList.remove("dragover");
      });

      uploadBox.addEventListener("drop", async (e) => {
        e.preventDefault();
        uploadBox.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        await handleFile(file);
      });

      cancelBtn.addEventListener("click", () => {
        form.reset();
        selectedImageDataUrl = "";
        selectedImageName = "";
        fileInfo.textContent = "";
        setError("");
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        setError("");

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const complaints = JSON.parse(
          localStorage.getItem("complaints") || "[]",
        );

        const nextNumber = complaints.length + 1;
        const complaintId = `CMP-${String(nextNumber).padStart(3, "0")}`;

        const complaintObj = {
          id: complaintId,
          status: "Pending",
          category: categoryEl.value,
          title: titleEl.value.trim(),
          description: descEl.value.trim(),
          date: new Date().toISOString(),
          imageName: selectedImageName,
          imageDataUrl: selectedImageDataUrl,
        };

        complaints.unshift(complaintObj);
        localStorage.setItem("complaints", JSON.stringify(complaints));

        window.location.href = "my-complaints.html";
      });