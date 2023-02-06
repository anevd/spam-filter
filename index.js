const person = document.querySelector("#name");
const photo = document.querySelector("#photo");
const comment = document.querySelector("#comment");
const button = document.querySelector(".button");
const chatArea = document.querySelector(".chat__wrapper");
const commentTemplate = `
<div class="chat__item">
<div class="chat__item-wrapper">
    <div class="chat__photo">
        <img alt="profile photo" class="chat__photo-img" />
    </div>
    <div class="chat__name"></div>
</div>
<div class="chat__comment"></div>
</div>`;

function checkName() {
	let personValue = person.value;
	let correctName = personValue[0].toUpperCase();
	for (let i = 1; i < personValue.length; i++) {
		if (personValue[i - 1] == " ") {
			correctName += personValue[i].toUpperCase();
		}
		if (personValue[i - 1] != " ") {
			correctName += personValue[i].toLowerCase();
		}
		if (personValue[i] == " " && personValue[i - 1] == " ") {
			correctName = correctName.slice(0, -1);
		}
		if (i == personValue.length - 1 && personValue[i] == " ") {
			correctName = correctName.slice(0, -1);
		}
	}
	person.value = correctName;
}

function checkSpam() {
	let commentValue = comment.value;
	if (commentValue.toLowerCase().includes("viagra")) {
		commentValue = commentValue.replace(/viagra/gi, "***");
	}
	if (commentValue.toLowerCase().includes("xxx")) {
		commentValue = commentValue.replace(/xxx/gi, "***");
	}
	return commentValue;
}

function checkValidity() {
	if (person.validity.valid && comment.validity.valid) {
		showComment();
	}
}

function showComment() {
	chatArea.insertAdjacentHTML("afterbegin", commentTemplate);
	let personInComment = document.querySelector(".chat__name");
	let photoInComment = document.querySelector(".chat__photo-img");
	let textInComment = document.querySelector(".chat__comment");
	personInComment.innerHTML = person.value;
	photoInComment.src = photo.value;
	textInComment.innerHTML = checkSpam();
	person.value = "";
	photo.value = "";
	comment.value = "";
}

person.addEventListener("blur", checkName);
button.addEventListener("click", checkValidity);
