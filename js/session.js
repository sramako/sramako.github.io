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
		console.log(data);
		if(data) {
			console.log("Login Success");
			setCookie("login", "true", 1);
			setCookie("user", x, 1);
			window.location.href="announcements.html";
		}
		else {
			console.log("Login Failed");
			setCookie("login", "false", 1);
			alert("Wrong Credentials");
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
			alert("You're not logged in!");
			window.location.href="employee_login.html";
			return false;
		}
		return u;
	}

	function signout() {
		setCookie("login", "false", 1);
		check_login();
		window.location.href="employee_login.html";
	}
