const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const btnContainer = document.getElementById('buttons');
let uploadedImage = null;
canvas.style.display = 'none';
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
			btnContainer.style.display = 'flex';
		};
	};
	reader.readAsDataURL(file);
});

function drawImage() {
	const maxWidth = 1000;
	const maxHeight = 600;
	const scale = Math.min(maxWidth / uploadedImage.naturalWidth, maxHeight / uploadedImage.naturalHeight, 1);
	const newWidth = canvas.width = uploadedImage.naturalWidth * scale;
	const newHeight = canvas.height = uploadedImage.naturalHeight * scale;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(uploadedImage, 0, 0, newWidth, newHeight);
}

function generateMeme() {
	if (uploadedImage) {
		const topText = document.getElementById('topText').value;
		const bottomText = document.getElementById('bottomText').value;
		const fontSize = Math.max(20, canvas.width / 10); // Ensures text is always readable
		ctx.font = `30px Impact`;
		ctx.fillStyle = '#f3f2f2';
		ctx.strokeStyle = '#f3f2f2';
		ctx.lineWidth = 2;
		ctx.textAlign = 'center';

		// Draw top text
		ctx.fillText(topText, canvas.width / 2, fontSize);
		ctx.strokeText(topText, canvas.width / 2, fontSize);

		// Draw bottom text
		ctx.fillText(bottomText, canvas.width / 2, canvas.height - fontSize / 2);
		ctx.strokeText(bottomText, canvas.width / 2, canvas.height - fontSize / 2);
	}
}

function downloadMeme() {
	const link = document.createElement('a');
	link.download = 'meme.png';
	link.href = canvas.toDataURL();
	link.click();
}