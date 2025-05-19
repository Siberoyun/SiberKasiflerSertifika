const { jsPDF } = window.jspdf;

function generateCertificate() {
  const name = document.getElementById("fullname").value;
  if (!name) {
    alert("Lütfen isminizi giriniz.");
    return;
  }

  const canvas = document.getElementById("certificateCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    ctx.font = "120px Nunito Bold";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    ctx.fillText(name, canvas.width / 2, canvas.height / 2 - 205);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("sertifikaniz.pdf");
  };

  img.src = "certificate.png";
}

window.generateCertificate = generateCertificate;
