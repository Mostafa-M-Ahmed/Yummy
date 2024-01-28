'use strict'

let btnSearch = document.getElementById('btn1');
let btnCategory = document.getElementById('btn2');
let btnArea = document.getElementById('btn3');
let btnIngredients = document.getElementById('btn4');
let btnContact = document.getElementById('btn5');

$(document).ready(() => {
    getStart().then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})




// aside
let optionsIcon = document.getElementById("options-icon");
let menuWidth = $('.menu').outerWidth()
$('.option').click(function () {
	if ($('aside').css('left') == '0px') {
		$('aside').animate({ left: `-${menuWidth}` });
		optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');

		$(".menu a").animate({
			top: 200
		}, 100)

	}
	else {
		$('aside').animate({ left: `0px` });
		optionsIcon.children[0].classList.replace('fa-bars', 'fa-x');

		$(".menu a").animate({
			top: 0
		}, 350)

	}
});



///////////////////////////////////////////////////change it to query
//switching navbar tabs
btnSearch.addEventListener("click", function () {
	getSearch();
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
btnCategory.addEventListener("click", function () {
	getCategories();
	$('aside').animate({ left: `-${menuWidth}` })
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
btnArea.addEventListener("click", function () {
	getAreas();
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
btnIngredients.addEventListener("click", function () {
	getIngredients();
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
btnContact.addEventListener("click", function () {
	getContact();
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});



function cleanList(list) {
	document.getElementById(list).innerHTML = '';
}



//search 
//////////////////////////////////////////////////////////////////////////
document.getElementById("nameSearch").addEventListener("keyup", a => {
	searchByName(a.target.value)
	// console.log(a.target.value);
}
);

document.getElementById("firstLetterSearch").addEventListener("keyup", a => {
	searchByFLetter(a.target.value)
	// console.log(a.target.value);
}
);




async function searchByName(term) {

	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
	const response = await fetch(url);
	const result = await response.json();
	// console.log(result.meals);
	displayMeals(result.meals);
	$(".inner-loading-screen").fadeOut(300)
}

async function searchByFLetter(term) {

	$(".inner-loading-screen").fadeIn(300)
	term == "" ? term = "a" : "";
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`;
	const response = await fetch(url);
	const result = await response.json();

	// response.meals ? displayMeals(response.meals) : displayMeals([])
	// console.log(result.meals);
	displayMeals(result.meals);
	$(".inner-loading-screen").fadeOut(300)
}
//////////////////////////////////////////////////////////////////////////





//display meals
//////////////////////////////////////////////////////////////////////////
function displayMeals(meal) {
	setActiveTab("displayMealsList");
	let box = "";
	cleanList("mealsList");

	if (meal.length > 20) {
		for (let i = 0; i < 20; i++) {
			box += `
		<div class="col">
			<div class="meal position-relative overflow-hidden rounded-3" onclick="getMealDetails(${meal[i].idMeal})">
				<img class="card-img" src=${meal[i].strMealThumb} alt="">
				<div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
					<h3>${meal[i].strMeal}</h3>
				</div>
			</div>
		</div>`;
		}
		document.getElementById("mealsList").innerHTML += box
		// console.log(meal[i].title);
	}
	else {
		for (let i = 0; i < meal.length; i++) {
			box += `
		<div class="col">
			<div class="meal position-relative overflow-hidden rounded-3" onclick="getMealDetails(${meal[i].idMeal})">
				<img class="card-img" src=${meal[i].strMealThumb} alt="">
				<div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
					<h3>${meal[i].strMeal}</h3>
				</div>
			</div>
		</div>`;
		}
		document.getElementById("mealsList").innerHTML += box
		// console.log(meal[i].title);
	}

}
//////////////////////////////////////////////////////////////////////////







//fetch categories
/////////////////////////////////////////////////////////////////////////
async function getCategories() {
	setActiveTab("displayMealsList");
	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
	const response = await fetch(url);
	const result = await response.json();


	displayCategories(result.categories);
	$(".inner-loading-screen").fadeOut(300)
	// console.log(result);
}

function displayCategories(meal) {
	cleanList("mealsList");
	// console.log(meal);
	let box = "";
	for (let i = 0; i < meal.length; i++) {

		let text = meal[i].strCategoryDescription;
		let part = text.slice(0, 161);


		box += `
	<div class="col">
		<div class="meal show-pointer position-relative overflow-hidden rounded-3" onclick="getCategoriesMeals('${meal[i].strCategory}')">
			<img class="card-img" src=${meal[i].strCategoryThumb} alt="">
			<div class="meal-layer position-absolute text-center text-black p-2">
				<h3>${meal[i].strCategory}</h3>
                <p>${part} . . .</p>

			</div>
		</div>
	</div>`;
	}
	document.getElementById("mealsList").innerHTML += box
	// console.log("donzo");
}
/////////////////////////////////////////////////////////////////////////






//fetch meal categories
/////////////////////////////////////////////////////////////////////////
async function getCategoriesMeals(cat) {
	// console.log("da5lna");
	setActiveTab("displayMealsList");
	$(".inner-loading-screen").fadeIn(300)
	// console.log("cat = "+cat);

	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;
	const response = await fetch(url);
	const result = await response.json();

	displayMeals(result.meals);
	$(".inner-loading-screen").fadeOut(300)
}
/////////////////////////////////////////////////////////////////////////








//fetch meal details    (should work but didnt do the meal.info shit cuz i havent read them yet)
//////////////////////////////////////////////////////////////////////////
async function getMealDetails(mealID) {
	setActiveTab("mealDetails")
	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
	const response = await fetch(url);
	const result = await response.json();

	displayMealDetails(result.meals[0]);
	// console.log(result.meals[0]);
	$(".inner-loading-screen").fadeOut(300)
}

function displayMealDetails(mealInfo) {

	cleanList("mealDetailsList");

	let ingredients = ``
	for (let i = 1; i <= 20; i++) {
		if (mealInfo[`strIngredient${i}`]) {
			ingredients += `<li class="alert alert-info m-2 p-1">${mealInfo[`strMeasure${i}`]} ${mealInfo[`strIngredient${i}`]}</li>`
		}
	}

	let tags = mealInfo.strTags?.split(",")
	// let tags = mealInfo.strTags.split(",")
	if (!tags) tags = []

	let tagsStr = ''
	for (let i = 0; i < tags.length; i++) {
		tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
	}




	let box = `
				<div class="col-4">
                    <img src="${mealInfo.strMealThumb}" class="w-100 border border-2 rounded-3 border-info" alt="meal thumbnail">
                    <h1 class="text-white pt-2 text-center mt-3">${mealInfo.strMeal}</h1>
                </div>
                <div class="col-8 text-white">
                    <h2 class="d-inline-flex me-2">Instructions</h2>
                    <p class="small">${mealInfo.strInstructions}</p>
                    <h3>Area: <span class="fw-light h3">${mealInfo.strArea}</span></h3>
                    <h3>Category: <span class="fw-light h3">${mealInfo.strCategory}</span></h3>
                    <h3>Recipes</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
					${ingredients}
                    </ul>
                    <h3>Tags: </h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
					${tagsStr}
                    </ul>
					<hr>
                    <a href="${mealInfo.strSource}" target="_blank" class="mb-5 btn btn-success me-3">Source</a>
                    <a href="${mealInfo.strYoutube}" target="_blank" class="mb-5 btn btn-danger ">Youtube</a>
                </div>
				`

	document.getElementById("mealDetailsList").innerHTML += box

}
//////////////////////////////////////////////////////////////////////////





// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
//fetch area  
//////////////////////////////////////////////////////////////////////////
async function getAreas() {
	setActiveTab("area");
	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
	const response = await fetch(url);
	const result = await response.json();
	// console.log(result.meals);
	displayAreas(result.meals);
	// console.log(result.categories);
	$(".inner-loading-screen").fadeOut(300)
}


function displayAreas(area) {
	let box = "";
	cleanList("areaList");
	// console.log(area.length);
	for (let i = 0; i < area.length; i++) {
		box += `
	<div class="col">
		<div class="text-white d-flex flex-column align-items-center show-pointer" onclick="getAreaMeals('${area[i].strArea}')">
            <i class="fa-solid fa-house-laptop fa-3x"></i>
			<h3>${area[i].strArea}</h3>
		</div>
	</div>`;
	}
	document.getElementById("areaList").innerHTML += box;
}
//////////////////////////////////////////////////////////////////////////




//fetch area meals
//////////////////////////////////////////////////////////////////////////
async function getAreaMeals(area) {

	setActiveTab("displayMealsList");
	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
	const response = await fetch(url);
	const result = await response.json();

	displayMeals(result.meals);
	$(".inner-loading-screen").fadeOut(300)
}
//////////////////////////////////////////////////////////////////////////






//fetch ingredients  
//////////////////////////////////////////////////////////////////////////
async function getIngredients() {
	setActiveTab("ingredients")
	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
	const response = await fetch(url);
	const result = await response.json();
	// console.log(result.meals);
	displayIngredients(result.meals);
	// console.log(result.meals);
	$(".inner-loading-screen").fadeOut(300)
}


function displayIngredients(ing) {
	let box = "";
	cleanList("ingredientsList");
	for (let i = 0; i < 25; i++) {
		let ingName = ing[i].strIngredient;
		let newIngName = ingName.replace(/ /g, "_");

		let text = ing[i].strDescription;
		let part = text.slice(0, 80);

		box += `
	<div class="col">
		<div class="ingDIV show-pointer rounded-2 text-center text-white border border-info" onclick="getIngredientMeals('${newIngName}')">
            <i class="fa-solid fa-utensils fa-3x"></i>
			<h3>${ing[i].strIngredient}</h3>
            <p>${part} . . .</p>
		</div>
	</div>`;
	}
	document.getElementById("ingredientsList").innerHTML += box;

}
//////////////////////////////////////////////////////////////////////////




//fetch area meals
//////////////////////////////////////////////////////////////////////////
async function getIngredientMeals(id) {
	setActiveTab("displayMealsList");
	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`;
	const response = await fetch(url);
	const result = await response.json();
	// console.log(result.meals);
	displayMeals(result.meals);
	$(".inner-loading-screen").fadeOut(300)
}
//////////////////////////////////////////////////////////////////////////




//start page
//////////////////////////////////////////////////////////////////////////
async function getStart() {
	$(".inner-loading-screen").fadeIn(300)
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
	const response = await fetch(url);
	const result = await response.json();
	// console.log(result.meals);
	displayMeals(result.meals);
	$(".inner-loading-screen").fadeOut(300)
}
//////////////////////////////////////////////////////////////////////////



//get Contacts
//////////////////////////////////////////////////////////////////////////
function getContact() {
	setActiveTab("contact");
}
//////////////////////////////////////////////////////////////////////////




//get search
//////////////////////////////////////////////////////////////////////////
function getSearch() {
	setActiveTab("search");
}

function setActiveTab(tab) {

	let arr = ["search", "displayMealsList", "mealDetails", "area", "ingredients", "contact"]



	arr.forEach(element => {
		if (element != tab) {
			if (document.getElementById("search").classList.contains("d-none") == false && tab == arr[1]) {
			}
			else {
				document.getElementById(element).classList.add("d-none")
			}
		}
	});
	document.getElementById(tab).classList.remove("d-none");

}
//////////////////////////////////////////////////////////////////////////



// validation
///////////////////////////////////////////////////////////////////////
let submitBtn = document.getElementById("submitBtn")


submitBtn.addEventListener("click", function () {
	inputsValidation();
});


function inputsValidation() {
	if (nameValidation()) {
		document.getElementById("nameAlert").classList.replace("d-block", "d-none")

	} else {
		document.getElementById("nameAlert").classList.replace("d-none", "d-block")

	}
	if (emailValidation()) {
		document.getElementById("emailAlert").classList.replace("d-block", "d-none")
	} else {
		document.getElementById("emailAlert").classList.replace("d-none", "d-block")

	}
	if (phoneValidation()) {
		document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
	} else {
		document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

	}

	if (ageValidation()) {
		document.getElementById("ageAlert").classList.replace("d-block", "d-none")
	} else {
		document.getElementById("ageAlert").classList.replace("d-none", "d-block")

	}

	if (passwordValidation()) {
		document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
	} else {
		document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

	}
	if (repasswordValidation()) {
		document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
	} else {
		document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

	}

}

function nameValidation() {
	return (/^\w{3,}$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
	return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
	return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
	return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
	return (/^\w{6,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
	return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
///////////////////////////////////////////////////////////////////////





// getStart();