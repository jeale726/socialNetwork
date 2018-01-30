displayview = function(){
	//get the token in the local storage
   var token =localStorage.getItem("loggedinuser");
   var data =serverstub.getUserDataByToken(token);
   // check if this token exists in our server
   if(data.success){
	   // if it exists, show the profile view
	   document.getElementById("navcontainer").innerHTML=document.getElementById("navview").innerHTML;
	   var idnavbar = localStorage.getItem("navbar");
	   clicknavbutton(idnavbar);
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
			 var username = document.getElementById("username");
		}else{
			
			document.getElementById("browse").style.display = "none";
			// shox the profile view and store the token into le local storage
			document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
			var signingin=serverstub.signIn(newProfile.email,newProfile.password);
			localStorage.setItem("loggedinuser",signingin.data);
			// display profile of the current user
			displayprofile();
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
			document.getElementById("browse").style.display = "none";
			// if the user exist display his profile view and stor the token in the local storage
			document.getElementById("navcontainer").innerHTML=document.getElementById("navview").innerHTML;
			document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
			localStorage.setItem("loggedinuser",result.data);
			displayprofile();
		}
		// else display an error message
		message.innerText = result.message;
		return false;
}

signout = function(){
	var token =localStorage.getItem("loggedinuser");
	serverstub.signOut(token);
	localStorage.removeItem("loggedinuser");
	document.getElementById("navcontainer").innerHTML= "";
	document.getElementById("maincontainer").innerHTML=document.getElementById("welcomeview").innerHTML;
	localStorage.setItem('navbar',"homenav");
}

validatePassForm = function() {

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
	    	//messagePass.innerText = "The new pass are the same!";

	    	// Characters long validation ----------------------------
		    if(newpass.value.trim().length < X || repeatnewpass.value.trim().length < X){
		    	messagePass.innerText = "The new pass are too short!";
		    	return false;
		    }
	    	return true;
	    }
	};

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
			messagePass.innerText = "The password is changed successfully!";
		}
	}
	return false;
}

clicknavbutton = function(id){
	var button_nav = document.getElementById(id);
	var token = localStorage.getItem("loggedinuser");
	localStorage.setItem("navbar",id);
	if(!button_nav.classList.contains("active")){

		var active_button = document.getElementsByClassName("active")[0];
		active_button.classList.remove("active");

		button_nav.classList.add("active");
	}

	if(id == "homenav"){
		document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
		//var changinin=serverstub.signIn(newProfile.email,newProfile.password);
		//localStorage.setItem("loggedinuser",changinin.data);
		
		document.getElementById("browse").style.display = "none";
		document.getElementById("home").style.display = "block";
		// display profile of the current user
		displayprofile();
		
	}
	else if(id == "browsenav"){
		document.getElementById("maincontainer").innerHTML=document.getElementById("profileview").innerHTML;
		//var changinin=serverstub.signIn(newProfile.email,newProfile.password);
		//localStorage.setItem("loggedinuser",changinin.data);
		// display profile of the current user
		//displaypanel.profile();
		document.getElementById("browse").style.display = "block";
		document.getElementById("home").style.display = "none";
	}
	else if(id == "accountnav"){

		document.getElementById("maincontainer").innerHTML=document.getElementById("accountview").innerHTML;

	}
	else{
		document.getElementById("maincontainer").innerHTML="Sorry, this address doesn't exit";
	}
	return false;
}

// show the profile of a person depending on the token in parameter
displayprofile = function(email=""){
	
	var token = localStorage.getItem("loggedinuser");
	// get the data of the user from the server depending on his token
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
	var email = document.getElementById("homeemail").innerText;
	var token = localStorage.getItem("loggedinuser");
	var messages = serverstub.getUserMessagesByEmail(token,email);
	var currentuseremail = serverstub.getUserDataByToken(token).data.email;
	var result=""
	for (var i=0; i<messages.data.length;i++){
		//show messages and change style depending if the email is the current user's email
		if(messages.data[i].writer==currentuseremail){
			result+="<div class='postername'>"+messages.data[i].writer+"</div>";
			result+="<div class='postermessage'>"+messages.data[i].content+" </div>";
		}
		else{
			result+="<div class='posternameothers'>"+messages.data[i].writer+"</div>";
			result+="<div class='postermessageothers'>"+messages.data[i].content+" </div>";
		}
		
	}
	document.getElementById("messages").innerHTML=result;
	
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
		document.getElementById("messageusername").innerText=serverstub.getUserMessagesByEmail(token,email).message;
		document.getElementById("home").style.display = "none";
	}
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

