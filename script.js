document.getElementById("tshirtForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = document.getElementById("tshirtForm");
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;

  // Generate 4-digit unique ID prefixed with 'T'
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
      // ✅ WhatsApp message to be sent to user
      const message = `Hi ${name},\nThank you for registering!\nYour Reg ID: ${uniqueId}\nSize: ${size}\nPay ₹200 via QR sent on WhatsApp and send the screenshot with your ID.`;
      const whatsappLink = `https://wa.me/91${mobile}?text=${encodeURIComponent(message)}`;

      // ✅ Show confirmation + WhatsApp button
      const confirmationBox = document.getElementById("confirmation");
      const regIdText = document.getElementById("regIdText");
      regIdText.innerHTML = `
        ✅ Submitted!<br>Your ID: <strong>${uniqueId}</strong><br>
        <a href="${whatsappLink}" target="_blank" style="display:inline-block;margin-top:10px;padding:10px 15px;background:#25D366;color:white;border-radius:5px;text-decoration:none;font-weight:bold;">
          📲 Send to WhatsApp
        </a>
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
