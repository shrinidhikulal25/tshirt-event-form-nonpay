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

  fetch("https://script.google.com/macros/s/AKfycbzFG9oLcC_NTVQX9ahbCB3_OSkTRDCPAGqCRtf4gwR4NUghTxrLXO3PEx-VXLJ3W4G_/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}&gender=${encodeURIComponent(gender)}&size=${encodeURIComponent(size)}&regid=${uniqueId}`,
  })
    .then((res) => res.text())
    .then(() => {
      const confirmationBox = document.getElementById("confirmation");
      const regIdText = document.getElementById("regIdText");
      const qrImage = document.getElementById("qrImage");

      // ✅ Set QR image (hosted publicly)
      qrImage.src = "https://i.postimg.cc/TPjf10dN/Whats-App-Image-2025-08-06-at-3-33-49-PM.jpg";  // replace this with your actual QR image URL
      qrImage.style.display = "block";

      const message = `Hi ${name},\nThank you for registering!\nReg ID: ${uniqueId}\nSize: ${size}\nPlease pay ₹200 using this QR:`;
      const whatsappLink = `https://wa.me/91${mobile}?text=${encodeURIComponent(message)}&media=${encodeURIComponent(qrImage.src)}`;

      regIdText.innerHTML = `
        ✅ Submitted!<br>Your ID: <strong>${uniqueId}</strong><br>
        <a href="${whatsappLink}" target="_blank">📲 Send to WhatsApp</a>
      `;

      confirmationBox.style.display = "block";
      form.reset();
    })
    .catch((err) => {
      alert("❌ Error submitting form!");
      console.error(err);
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
