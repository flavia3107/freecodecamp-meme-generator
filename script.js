const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
let uploadedImage = null;

canvas.style.display = 'none';

// Load the image onto the canvas
imageInput.addEventListener('change', (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = (e) => {
		const img = new Image();
		img.src = e.target.result;
		img.onload = () => {
			uploadedImage = img;
			canvas.style.display = 'block';
			drawImage();
		};
	};

	reader.readAsDataURL(file);
});

// Draw image and text on canvas
function drawImage() {
	if (uploadedImage) {
		const maxWidth = 1000;
		const maxHeight = 600;

		let imgWidth = uploadedImage.naturalWidth;
		let imgHeight = uploadedImage.naturalHeight;

		let scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight, 1);
		let newWidth = imgWidth * scale;
		let newHeight = imgHeight * scale;

		canvas.width = newWidth;
		canvas.height = newHeight;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(uploadedImage, 0, 0, newWidth, newHeight);

		// Get text values
		const topText = document.getElementById('topText').value;
		const bottomText = document.getElementById('bottomText').value;

		// Dynamic font size based on canvas width
		const fontSize = Math.max(20, newWidth / 10); // Ensures text is always readable
		ctx.font = `30px Impact`;
		ctx.fillStyle = '#f3f2f2';
		ctx.strokeStyle = '#f3f2f2';
		ctx.lineWidth = 2;
		ctx.textAlign = 'center';

		// Draw top text
		ctx.fillText(topText, newWidth / 2, fontSize);
		ctx.strokeText(topText, newWidth / 2, fontSize);

		// Draw bottom text
		ctx.fillText(bottomText, newWidth / 2, newHeight - fontSize / 2);
		ctx.strokeText(bottomText, newWidth / 2, newHeight - fontSize / 2);
	}
}

// Generate meme by drawing text on the uploaded image
function generateMeme() {
	drawImage();
}

// Download the meme as an image
function downloadMeme() {
	const link = document.createElement('a');
	link.download = 'meme.png';
	link.href = canvas.toDataURL();
	link.click();
}