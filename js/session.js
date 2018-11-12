function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=sramako.github.io/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function login(x,y) {
	// $.post("server/login.php",
	$.post("https://ppdb-ep.herokuapp.com/emplogin",
	{
					"username": x,
					"password": y
	},
	function (data) {
		console.log("+"+JSON.stringify(data)+"+");
		console.log(data["isAdmin"]);
		if(data["isAdmin"]==true){
			setCookie("admin","true",1);
		}
		else{
			setCookie("admin","false",1);
		}

		if(data["status"]=="success") {
			console.log("Login Success");
			setCookie("login", "true", 1);
			setCookie("user", x, 1);
			if(data["isAdmin"]==true){
				window.location.href="newemp.html";
			}
			window.location.href="announcements.html";
		}
		else {
			console.log("Login Failed");
			setCookie("login", "false", 1);
			swal("Wrong Credentials","error");
			return "false";
		}
	})}

	function check_login() {
		c=getCookie("login");
		u=getCookie("user");
		console.log(c);
		console.log(u);
		if(c!="true") {
			window.stop();
			swal("You're not logged in!","error");
			window.location.href="employee_login.html";
			return false;
		}
		return u;
	}

	function check_login_admin() {
		c=getCookie("login");
		u=getCookie("user");
		a=getCookie("admin");
		console.log(c);
		console.log(u);
		if(c!="true") {
			window.stop();
			swal("You're not logged in!","error");
			window.location.href="admin_login.html";
			return false;
		}
		if(a!="true"){
			window.stop();
			swal("You're not logged in as admin","error");
			window.location.href="admin_login.html";
			return false;
		}
		return u;
	}



	function signout() {
		setCookie("login", "false", 1);
		setCookie("admin", "false", 1);
		check_login();
		window.location.href="https://sramako.github.io";
	}

	function signout_admin() {
		setCookie("login", "false", 1);
		setCookie("admin", "false", 1);
		window.location.href="admin_login.html";
	}
