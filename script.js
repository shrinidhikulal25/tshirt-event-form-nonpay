document.getElementById("tshirtForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = document.getElementById("tshirtForm");
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;

  // Generate unique ID (T + random 4-digit number)
  const uniqueId = "T" + Math.floor(1000 + Math.random() * 9000);

  fetch("https://script.google.com/macros/s/AKfycbzFG9oLcC_NTVQX9ahbCB3_OSkTRDCPAGqCRtf4gwR4NUghTxrLXO3PEx-VXLJ3W4G_/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&size=${encodeURIComponent(size)}&regid=${uniqueId}`,
  })
    .then((res) => res.text())
    .then(() => {
      alert(`✅ successful!\nYour ID: ${uniqueId}\nPay ₹200 via QR sent on WhatsApp and send the screenshot with your ID.`);
      form.reset();
    })
    .catch((err) => {
      alert("Error submitting form!");
      console.error(err);
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
