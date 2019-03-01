function validate() {
	$('#company').on('click', isCompany)
	$('#submit').on('click', checkData)

	function isCompany() {
		if ($('#companyInfo').css('display') === "none") {
			$('#companyInfo').css('display', "block")
		} else {
			$('#companyInfo').css('display', "none")
		}
	}

	function checkData(event) {
		event.preventDefault();

		let username = $('#username')
		let email = $('#email');
		let password = $('#password');
		let confirmPassword = $('#confirm-password')
		let cumpanyNumber = $('#companyNumber')
		let isValid = true;

		let pattern = /^(.+)?@(.+)?\.(.+)?$/g;

		if (!/^[A-Za-z0-9]{3,20}$/g.test(username.val())) {
			username.css("border-color", "red")
			isValid = false;
		}
		if (!pattern.test(email.val())) {
			email.css("border-color", "red")
			isValid = false;
		}
		if (!/^\w{5,15}$/g.test(password.val())) {
			password.css("border-color", "red")
			isValid = false;
		}
		if (!/^\w{5,15}$/g.test(confirmPassword.val()) || password.val() !== confirmPassword.val()) {
			confirmPassword.css("border-color", "red");
			password.css("border-color", "red")
			isValid = false;
		}
		if ($('#companyInfo').css('display') === "block" &&
			(cumpanyNumber.val() < 1000 || cumpanyNumber.val() > 9999)
		) {
			cumpanyNumber.css("border-color", "red");
			isValid = false;
		}
		if (isValid) {
			$('#valid').css('display', "block")
		}
	}
}