const person = document.querySelector("#name");
const photo = document.querySelector("#photo");
const comment = document.querySelector("#comment");
const button = document.querySelector(".button");
const chatArea = document.querySelector(".chat__wrapper");
const radio = document.querySelectorAll(".spam-filter__checkbox-input");
const radioCustom = document.querySelectorAll(".spam-filter__checkbox-custom");
const labelName = document.querySelector(".form__label-name");
const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
const commentTemplate = `
<div class="chat__item">
<div class="chat__item-wrapper">
    <div class="chat__photo">
        <img alt="profile photo" class="chat__photo-img" />
    </div>
    <div class="chat__name"></div>
</div>
<div class="chat__comment"></div>
<div class="chat__date"></div>
</div>`;

const images = [
	{
		src: "./img/avatar1.jpg",
	},
	{
		src: "./img/avatar2.jpg",
	},
	{
		src: "./img/avatar3.jpg",
	},
	{
		src: "./img/avatar4.jpg",
	},
	{
		src: "./img/avatar5.jpg",
	},
	{
		src: "./img/avatar6.jpg",
	},
	{
		src: "./img/avatar7.jpg",
	},
	{
		src: "./img/avatar8.jpg",
	},
	{
		src: "./img/avatar9.jpg",
	},
];

radioCustom[0].style.background = "#6495ee";

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
	let dateInComment = document.querySelector(".chat__date");
	personInComment.innerHTML = checkPersonField();
	photoInComment.src = checkPhotoField();
	textInComment.innerHTML = checkSpam();
	dateInComment.innerHTML = showDate();
	person.value = "";
	photo.value = "";
	comment.value = "";
}

function showDate() {
	let now = new Date();
	var options = {
		weekday: "short",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};
	let date = now.toLocaleString("en-GB", options);
	return date;
}

function checkRadio() {
	for (let i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			radioCustom[i].style.background = "#6495ee";
		} else {
			radioCustom[i].style.background = "none";
		}
	}
}

function hideName() {
	if (el.getAttribute("id") == "yes") {
		person.style.display = "block";
		labelName.style.display = "block";
		person.setAttribute("required", "");
		person.value = "";
	} else {
		person.style.display = "none";
		labelName.style.display = "none";
		person.removeAttribute("required");
		person.value = "";
	}
}

function checkPersonField() {
	if (person.value == "") {
		return "Username";
	} else {
		return person.value;
	}
}

function checkPhotoField() {
	if (urlPattern.test(photo.value) == false) {
		let i = Math.floor(Math.random() * images.length);
		return images[i].src;
	} else {
		return photo.value;
	}
}

radio.forEach((el) => el.addEventListener("click", checkRadio));

radio.forEach((el) =>
	el.addEventListener("click", function hideName() {
		if (el.getAttribute("id") == "yes") {
			person.style.display = "block";
			labelName.style.display = "block";
			person.setAttribute("required", "");
			person.value = "";
		} else {
			person.style.display = "none";
			labelName.style.display = "none";
			person.removeAttribute("required");
			person.value = "";
		}
	})
);

person.addEventListener("blur", checkName);
button.addEventListener("click", checkValidity);
