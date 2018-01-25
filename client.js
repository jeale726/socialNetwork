displayview = function(){
   var token =localStorage.getItem("loggedinuser");
   var data =serverstub.getUserDataByToken(token);
   if(data.success==true){
	   document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
   }else{
	document.getElementById("maincontainer").innerHTML=document.getElementById("welcomeview").innerHTML;
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
		if(!result.success){
			document.getElementById("message").innerText=result.message;
		}else{
			document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
		}
	}
	return false;
}

//Sign-in function called when the user submit the form to login (if the form is correctly filled)
signin = function(){
		var formData = document.forms["login-form"];
		var tokencorrect =serverstub.signIn(formData.emaillogin.value.trim(), formData.passwordlogin.value.trim()).data;
		if(tokencorrect.success){
			document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
		}
		message.innerText = tokencorrect.message;
		return false;
}

clicknavbutton = function(id){
	var button_nav = document.getElementById(id);

	if(!button_nav.classList.contains("active")){

		var active_button = document.getElementsByClassName("active")[0];
		active_button.classList.remove("active");

		button_nav.classList.add("active");
	}


}

window.onload = function(){
	
	displayview();
	
	
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

}

