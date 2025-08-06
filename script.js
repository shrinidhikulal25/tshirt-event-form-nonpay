document.getElementById("tshirtForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = document.getElementById("tshirtForm");
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;

  const uniqueId = "T" + Math.floor(1000 + Math.random() * 9000);

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("mobile", mobile);
  formData.append("gender", gender);
  formData.append("size", size);
  formData.append("regid", uniqueId);

  fetch("https://script.google.com/macros/s/AKfycbzFG9oLcC_NTVQX9ahbCB3_OSkTRDCPAGqCRtf4gwR4NUghTxrLXO3PEx-VXLJ3W4G_/exec", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((response) => {
      if (response === "duplicate") {
        alert("❌ This mobile number has already been registered.");
        submitButton.disabled = false;
        return;
      }

      // Show success
      const regIdText = document.getElementById("regIdText");
      regIdText.textContent = `✅ Submitted! Your ID: ${uniqueId}. Pay ₹200 via QR sent on WhatsApp and send the screenshot with your ID.`;
      document.getElementById("confirmation").style.display = "block";
      form.reset();
    })
    .catch((error) => {
      alert("❌ Something went wrong while submitting.");
      console.error(error);
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
