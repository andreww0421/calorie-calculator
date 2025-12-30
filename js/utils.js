function toBase64(file) {
    return new Promise((r, j) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => r(reader.result.split(',')[1]);
        reader.onerror = j;
    });
}
