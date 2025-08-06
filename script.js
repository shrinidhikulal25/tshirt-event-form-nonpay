document.getElementById("tshirtForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;

  fetch("https://script.google.com/macros/s/AKfycbzFG9oLcC_NTVQX9ahbCB3_OSkTRDCPAGqCRtf4gwR4NUghTxrLXO3PEx-VXLJ3W4G_/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&size=${encodeURIComponent(size)}`,
  })
  .then((res) => res.text())
  .then((text) => {
    alert("Submitted successfully!");
    document.getElementById("tshirtForm").reset();
  })
  .catch((err) => {
    alert("Error submitting form!");
    console.error(err);
  });
});
