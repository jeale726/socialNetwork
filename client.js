displayView = function(){
   // the code required to display a view
};
window.onload = function(){
   //code that is executed as the page is loaded.
   //You shall put your own custom code here.
   //document.getElementById("body").innerHTML= "hello";
   //window.alert() is not allowed to be used in your implementation.
   //window.alert("Hello TDDD97!");

    function validateForm() {

	    var password = document.getElementById("password");
	    var repeatPassword = document.getElementById("repeatPassword");

	    if (password.value != repeatPassword.value){
	    	password.focus();
	    	window.alert("they are the same!");
	    	//return false;
	    }
	    else{
	    	window.alert("they are NOT the same!");
	    	//return true;
	    }
	}

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