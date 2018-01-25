displayview = function(){
	//get the token in the local storage
   var token =localStorage.getItem("loggedinuser");
   var data =serverstub.getUserDataByToken(token);
   // check if this token exists in our server
   if(data.success){
	   // if it exists, show the profile view
	   document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
	   // display home page
	   displaypanel.profile();
   }else{
	// else show the welcome view
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
		// show an error message 
		if(!result.success){
			document.getElementById("message").innerText=result.message;
		}else{
			// shox the profile view and store the token into le local storage
			document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
			var signingin=serverstub.signIn(newProfile.email,newProfile.password);
			localStorage.setItem("loggedinuser",signingin.data);
			// display profile of the current user
			displaypanel.profile();
		}
	}
	return false;
}

//Sign-in function called when the user submit the form to login
signin = function(){
		var formData = document.forms["login-form"];
		//receive the token from the server and see if the user exist
		var result =serverstub.signIn(formData.emaillogin.value.trim(), formData.passwordlogin.value.trim());
		if(result.success){
			// if the user exist display his profile view and stor the token in the local storage
			document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
			localStorage.setItem("loggedinuser",result.data);
			displaypanel.profile();
		}
		// else display an error message
		message.innerText = result.message;
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

displaypanel = {
	
	// show the profile of a person depending on the token in parameter
	profile: function(){
		var token = localStorage.getItem("loggedinuser");
		// get the data of the user from the server depending on his token
		var result= serverstub.getUserDataByToken(token);
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

displaymessages= function(){
	var email = document.getElementById("homeemail").innerText;
	var token = localStorage.getItem("loggedinuser");
	var messages = serverstub.getUserMessagesByEmail(token,email);
	var result=""
	for (var i=0; i<messages.data.length;i++){
		result+="<div class='postername'>"+messages.data[i].writer+"</div>";
		result+="<div class='postermessage'>"+messages.data[i].content+" </div>";
	}
	document.getElementById("messages").innerHTML=result;
	
}

window.onload = function(){
	
	displayview();
	
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

