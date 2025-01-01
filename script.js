async function generateQRCodes() {
    const names = document.getElementById('names').value.trim().split('\n');
    if (names.length === 0 || names[0] === '') {
        alert("Please enter at least one name.");
        return;
    }

    const apiUrl = "https://script.google.com/macros/s/AKfycby9AL5HznH3yN9XLdHfGCQndAZO0tl-nykznLAELSxVa5U3OmHAlZSbCgeLFuqVAhoHGQ/exec"; // Replace with your deployment URL

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "generateQRCodes", names }),
        });

        const data = await response.json();
        if (data.success) {
            const qrDisplay = document.getElementById("qr-display");
            qrDisplay.innerHTML = ''; // Clear previous results
            data.qrCodes.forEach(qrCode => {
                const img = document.createElement("img");
                img.src = qrCode;
                qrDisplay.appendChild(img);
            });
        } else {
            alert("Error generating QR codes: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating QR codes.");
        alert(":/n ",error);
    }
}
