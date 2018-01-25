displayView = function(){
   var token =localStorage.getItem("loggedinuser");
   var data =serverstub.getUserDataByToken(token);
   if(data.success==true){
	   // go to the profile view
	   window.alert("You are logged");
	   document.getElementById("welcomeview");
   }else{
	   // go to the welcome view
	   window.alert("welcome");
   }
};

validateForm = function() {

	    var password = document.getElementById("passwordsignup");
	    var repeatPassword = document.getElementById("repeatpassword");

	    var message = document.getElementById("message");
	    var X = 6;

	    // Passwords validation ----------------------------------
	    if (password.value.trim() != repeatPassword.value.trim()){
	    	message.innerText = "Passwords are NOT the same!";
	    	password.focus();
	    	return false;
	    }
	    else{
	    	message.innerText = "Passwords are the same!";

	    	// Characters long validation ----------------------------
		    if(password.value.trim().length < X || repeatPassword.value.trim().length < X){
		    	message.innerText = "Passwords are too short!";
		    	return false;
		    }
	    	return true;
	    }
	};

//Sign-up function called when the user submit the form to sign up (if the form is correctly filled)
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
		
		// show an error message 
		if(!result.succeed){
			document.getElementById("message").innerText=result.message;
			return false;
		}
		// else go to profile page
		//TODO
		}
	return false;
}

//Sign-in function called when the user submit the form to login (if the form is correctly filled)
signin = function(){
	if(validateForm()){
		var password = document.getElementById("password-login");
		var username = document.getElementById("email-login");
		var token =serverstub.signIn(username, password).data;
		localStorage.setItem("loggedinuser", token);
		return true;
	}
	return false;
}

window.onload = function(){
   //code that is executed as the page is loaded.
   //You shall put your own custom code here.
   //document.getElementById("body").innerHTML= "hello";
   //window.alert() is not allowed to be used in your implementation.
   //window.alert("Hello TDDD97!");
	
	
	/*
    $('#login-btn').on("click",function(){

		var div_id = (parseInt($(this).attr("id"))).toString();
		var clase = $(this).attr("class");
		var opt;

		if(clase == "grid-item con-sombrita cont"){
			opt = select1.find('option[value="'+ div_id +'"]');
		}
		else{
			opt = select2.find('option[value="'+ div_id +'"]');
		}
	});
	*/

};

