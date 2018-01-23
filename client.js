displayView = function(){
   // the code required to display a view
};

validateForm = function() {

	    var password = document.getElementById("password-sign-up");
	    var repeatPassword = document.getElementById("repeatpassword");

	    var message = document.getElementById("message");

	    if (password.value.trim() != repeatPassword.value.trim()){
	    	message.innerText = "Passwords are NOT the same!";
	    	password.focus();
	    	return false;
	    }
	    else{
	    	message.innerText = "Passwords are the same!";
	    	return true;
	    }
	};


window.onload = function(){
   //code that is executed as the page is loaded.
   //You shall put your own custom code here.
   //document.getElementById("body").innerHTML= "hello";
   //window.alert() is not allowed to be used in your implementation.
   //window.alert("Hello TDDD97!");

    
   $("#login-form").submit(function() {
	    if(validateForm()){
	    	return true;
	    }
	    return false;
	});

   $("#sign-up-form").submit(function() {
	    if(validateForm()){
	    	// signup();  
	    	// Change to true when you want to reload the page 
	    	return false;
	    }
	    return false;
	});

	
	
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

//Sign-up function called when the user submit the form to sign up (if the form is correctly filled)
signup = function(){
	// create a new JSON object
	var newProfile = {
			"email": formData.email.value.trim(),
			"password": formData.password-sign-up.value.trim(),
			"firstname": formData.firstname.value.trim(),
			"gender": formData.gender.value.trim(),
			"city": formData.city.value.trim(),
			"country": formData.country.value.trim()
	};
	// try to sign up with this contact
	var result = serverstub.signup(newProfile);
	
	// show an error message 
	if(!result.succeed){
		document.getElementById("message").innerText=result.message;
		return false;
	}
	// else go to profile page
	return true;
	
}

//Sign-up function called when the user submit the form to login (if the form is correctly filled)
signin = function(){
	
	
}
