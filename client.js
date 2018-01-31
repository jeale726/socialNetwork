
// display the welcome view if the user wasn't login before or the latest visited view if he was
displayview = function(){
	//get the token in the local storage
   var token =localStorage.getItem("loggedinuser");
   var data =serverstub.getUserDataByToken(token);
   // check if this token exists in our server
   if(data.success){
	   // if it exists, show the latest visited view
	   document.getElementById("navcontainer").innerHTML=document.getElementById("navview").innerHTML;
	   var idnavbar = localStorage.getItem("navbar");
	   clicknavbutton(idnavbar);
   }else{
	// else show the welcome view
	   document.getElementById("maincontainer").innerHTML=document.getElementById("welcomeview").innerHTML;
   }
};

// Function that validates the form
validateForm = function() {

		// Passwords inputs and message to display
	    var password = document.getElementById("passwordsignup");
	    var repeatPassword = document.getElementById("repeatpassword");

	    var message = document.getElementById("message");
	    var X = 6;

	    // Passwords validation, if both are the same ---------------------------
	    if (password.value.trim() != repeatPassword.value.trim()){
	    	message.innerText = "Passwords are NOT the same!";
	    	password.focus();
	    	return false;
	    }
	    else{
	    	message.innerText = "Passwords are the same!";

	    	// Characters long validation, if both passwords are longer than certain value ---------
		    if(password.value.trim().length < X || repeatPassword.value.trim().length < X){
		    	message.innerText = "Passwords are too short!";
		    	return false;
		    }
	    	return true;
	    }
	};

//Sign-up function called when the user submit the form to sign up
signup = function(){
	var formData = document.forms["sign-up-form"];
	if(validateForm()){
		// create a new JSON object
		var newProfile = {
				"email": formData.emailsignup.value.trim(),
				"password": formData.passwordsignup.value.trim(),
				"firstname": formData.firstname.value.trim(),
				"familyname": formData.familyname.value.trim(),
				"gender": formData.gender.value.trim(),
				"city": formData.city.value.trim(),
				"country": formData.country.value.trim()
		};
		// try to sign up with this contact
		var result = serverstub.signUp(newProfile);

		if(!result.success){
      	// if there is an error show the error message sent by the server
			document.getElementById("message").innerText=result.message;
			 var username = document.getElementById("username");
		}else{

			// show the profile view and store the token into the local storage
			document.getElementById("navcontainer").innerHTML=document.getElementById("navview").innerHTML;
			document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
			// display profile of the current user
			displayprofile();
		}
	}
	return false;
}

//Sign-in function called when the user submit the form to login
signin = function(){
		var formData = document.forms["login-form"];
		var message = document.getElementById("message");
		//receive the token from the server and see if the user exist
		var result = serverstub.signIn(formData.emaillogin.value.trim(), formData.passwordlogin.value.trim());
		if(result.success){

			// if the user exist display his profile view and store the token in the local storage
			document.getElementById("navcontainer").innerHTML = document.getElementById("navview").innerHTML;
			document.getElementById("maincontainer").innerHTML = document.getElementById("profileview").innerHTML;
			localStorage.setItem("loggedinuser",result.data);
			displayprofile();
		}else {
      // else display an error message
  		message.innerText = result.message;
		}
		return false;
}

//Sign-out function called when the user wants to signout from the system
signout = function(){
  // get the token of the user in the local Storage
	var token =localStorage.getItem("loggedinuser");
	serverstub.signOut(token);
  // remove the token from the local Storage
	localStorage.removeItem("loggedinuser");
  //delete the navbar and put the welcome view in the main container
	document.getElementById("navcontainer").innerHTML= "";
	document.getElementById("maincontainer").innerHTML=document.getElementById("welcomeview").innerHTML;
  // set homenav by default in the navbar
  localStorage.setItem('navbar',"homenav");
}

//Function to validate the forms in account view
validatePassForm = function() {

		// Passwords inputs and message to display
	    var newpass = document.getElementById("newpass");
	    var repeatnewpass= document.getElementById("repeatnewpass");

	    var messagePass = document.getElementById("messagePass");
	    var X = 6;

	    // Passwords validation ----------------------------------
	    if (newpass.value.trim() != repeatnewpass.value.trim()){
	    	messagePass.innerText = "The new pass are NOT the same!";
	    	newpass.focus();
	    	return false;
	    }
	    else{

	    	// Characters long validation ----------------------------
		    if(newpass.value.trim().length < X || repeatnewpass.value.trim().length < X){
		    	messagePass.innerText = "The new pass are too short!";
		    	return false;
		    }
	    	return true;
	    }
	};

//Function that triggers the password change
changePassword = function(){
	var token = localStorage.getItem("loggedinuser");
	var formData = document.forms["changepass-form"];

	if(validatePassForm()){
		var old_pass = formData.oldpass.value.trim();
		var new_pass = formData.newpass.value.trim();

		// try to sign up with this contact
		var result = serverstub.changePassword(token, old_pass, new_pass);
		// show an error message
		if(!result.success){
			document.getElementById("messagePass").innerText=result.message;
		}else{
			messagePass.innerText = "The password was changed successfully!";
		}
	}
	return false;
}

//Function that triggers different behaviors depending which button is clicked from the tab
clicknavbutton = function(id){

	// Variables
	var button_nav = document.getElementById(id);
	var token = localStorage.getItem("loggedinuser");
	localStorage.setItem("navbar",id);

	// To change the active section of the bar
	if(!button_nav.classList.contains("active")){

		var active_button = document.getElementsByClassName("active")[0];
		active_button.classList.remove("active");
		button_nav.classList.add("active");
	}

	if(id == "homenav"){ // If the home button is active
		document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;

		// display profile of the current user
		displayprofile();
	}
	else if(id == "browsenav"){ // If the browse button is active
		document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;

		// display profile of the current user
		//displaypanel.profile();
		document.getElementById("browse").style.display = "block";
		document.getElementById("home").style.display = "none";
	}
	else if(id == "accountnav"){ // If the account button is active

		document.getElementById("maincontainer").innerHTML=document.getElementById("accountview").innerHTML;

	}
	else{ // Error
		document.getElementById("maincontainer").innerHTML="Sorry, this address doesn't exit";
	}
	return false;
}

// Show the profile of a person depending on the token in parameter
displayprofile = function(email=""){

	var token = localStorage.getItem("loggedinuser");
	// Get the data of the user from the server depending on his token
	if(email==""){
		var result= serverstub.getUserDataByToken(token);
	}else{
		var result= serverstub.getUserDataByEmail(token,email);
	}

	if(result.success){
		// display all the data of the user
		document.getElementById("homeusername").innerText=result.data.firstname +" " + result.data.familyname;
		document.getElementById("homegender").innerText=result.data.gender;
		document.getElementById("homeemail").innerText=result.data.email;
		document.getElementById("homecity").innerText=result.data.city;
		document.getElementById("homecountry").innerText=result.data.country;
	}
	displaymessages();
}

// methode to post a message to a wall
postmessage = function(){
	var message = document.getElementById("postmessage").value.trim();
	// if the message is not null, send it to the server
	if(message!=""){
		var token = localStorage.getItem("loggedinuser");
		var email = document.getElementById("homeemail").innerText;
		serverstub.postMessage(token, message, email);
		document.getElementById("postmessage").value="";
	}
	return false;
}

/*display messages of all the current profile -- also called to refresh a page*/
displaymessages= function(){
  //get the email of the profile displayed
	var email = document.getElementById("homeemail").innerText;

  // get the token of the current user
	var token = localStorage.getItem("loggedinuser");
  // get the messages of the displayed profile
	var messages = serverstub.getUserMessagesByEmail(token,email);

  // get the email of the current user with his token
	var currentuseremail = serverstub.getUserDataByToken(token).data.email;

	document.getElementById("messages").innerHTML="";
	var result=document.getElementById("messages");
	for (var i=0; i<messages.data.length;i++){

		//show messages and change style depending if the email is the current user's email
		if(messages.data[i].writer==currentuseremail){
			result.innerHTML+="<div class='postername'><span id='postername"+i+"'></span></div><div class='postermessage'><span id='postermessage"+i+"'></span></div>";
		}
		else{
			result.innerHTML+="<div class='posternameothers'><span id='postername"+i+"'></span></div><div class='postermessageothers'><span id='postermessage"+i+"'></span></div>";
		}
    // affect to all this label messages and username of the poster
		document.getElementById("postername"+i).innerText=messages.data[i].writer;
		document.getElementById("postermessage"+i).innerText=messages.data[i].content;

	}

}

// find the profile with the username given by the input
searchprofile = function(){
	var email = document.getElementById("search").value.trim();
	var token = localStorage.getItem("loggedinuser");
	var result=serverstub.getUserMessagesByEmail(token,email);
	if(result.success){// if the user exists
		//show profile
		displayprofile(email);
		document.getElementById("home").style.display = "block";
		document.getElementById("messageusername").innerText="";
	}else{
    // else show the error message from the server and hide the profile view
		document.getElementById("messageusername").innerText=serverstub.getUserMessagesByEmail(token,email).message;
		document.getElementById("home").style.display = "none";
	}
}

// Main function - Called when the page is loading
window.onload = function(){

	displayview();

}
