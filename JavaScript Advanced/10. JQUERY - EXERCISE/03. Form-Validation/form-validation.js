function validate() {



	function checkData() {
		let username = $('#username')
		let email = $('#email');
		let password = $('#password');
		let confirmPassword = $('#confir-password')
		let pattern = /(.+)?@(.+)?\.(.+)?/g;
		let cumpanyNumber = $('#cumpanyNumber')

		if (!/[A-Za-z0-9]{3,20}/g.test(username.val())) {
			username.css("border-color", "red")
		}
		if (!pattern.test(email.val())) {
			email.css("border-color", "red")
		}
		if (!/^.{5,15}$/.test(password.val())) {
			password.css("border-color", "red")
		}
		if (!/^.{5,15}$/.test(password.val()) || password.val() !== confirmPassword.val()) {
			//password.css("border-color", "red")
			confirmPassword.css("border-color", "red");
		}

		if (('#cumpanyInfo').css('display') === "block" &&
			(cumpanyNumber.val() < 1000 || cumpanyNumber.val() > 9999)
		) {
			confirmPassword.css("border-color", "red");
		}


	}
}
