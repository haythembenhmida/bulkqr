function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);

        if (data.action === "generateQRCodes") {
            const names = data.names;
            const qrCodes = [];
            const sheet = SpreadsheetApp.openById("1Bwh4zPZcCor_tbuozJAp-OaQ23H3zOsO634LMFCbSIE").getSheetByName("Sheet1");

            names.forEach(name => {
                const qrCodeUrl = generateQRCode(name);
                sheet.appendRow([name, qrCodeUrl]);
                qrCodes.push(qrCodeUrl);
            });

            return ContentService.createTextOutput(JSON.stringify({
                success: true,
                qrCodes,
            })).setMimeType(ContentService.MimeType.JSON);
        } else {
            throw new Error("Invalid action");
        }
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            success: false,
            error: error.message,
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function generateQRCode(name) {
    const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(name)}&chs=150x150`;
    return qrCodeUrl;
}
