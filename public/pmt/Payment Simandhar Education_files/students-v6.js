"use strict"  

class StudentRegistration{


	constructor (){}

	registerAndSendMail(student_object,callback){

		// Call ajax for pass data to other place
		$.ajax({
			type: 'POST',
			url: 'https://simandhareducation.com/student-registration6.php',
			data: "name="+student_object.name+"&email="+student_object.email+"&phone="+student_object.phone+"&address_line1="+student_object.address_line1+"&address_line2="+student_object.address_line2+"&course="+student_object.course+"&state="+student_object.state+"&city="+student_object.city+"&pincode="+student_object.pincode+
"&profession="+student_object.profession+"&profession_company="+student_object.profession_company+"&amount="+student_object.amount+"&sign="+null+ "&cname="+student_object.cname// getting filed value in serialize form
		})
			.done(function(data){ 

			console.log("successfull lead data",data);

			callback(data);
			//updateLead(student_object);

			// show the response
			$('#response').html(data);
			return true;

		})
			.fail(function(err) { 

			callback(err);

		});

	}

	updateLead(student_object){

		$.ajax({
			type: 'POST',
			url: 'https://simandhareducation.com/updateLead.php',
			data:"email="+student_object.email+
			"&address1="+student_object.address_line1+
			"&address2="+student_object.address_line2+
			"&city="+student_object.city
		})
			.done(function(data){ 

			console.log("successfullupdate",data);

			return true;

		})
			.fail(function(err) { 

			console.log("successfull",err);

		});

	}

	verifyRegistration(verify_email,callback){

		var is_registered = false;
		// var verify_email = document.getElementById('verify_email').value;
		debugger;
		// Call ajax for pass data to other place
		$.ajax({
			type: 'POST',
			url: 'https://simandhareducation.com/student-registration6.php',
			data:"verify_email=" + verify_email 
		})
			.done(function(data){ // if getting done then call.


			var student_data = JSON.parse(data);
			student_data = student_data[0];

			callback(student_data);

			console.log("successfull",data);
			// $("#success_tic").modal('show');

			if(student_data){
				is_registered =true;


			}


			// show the response
			$('#response').html(data);
			return true;

		})
			.fail(function(s) { // if fail then getting message
			console.log(s);

			callback({});
			// just in case posting your form failed

			return false;

		});


	}

	pushToCrm(){

		// Call ajax for pass data to other place
		$.ajax({
			type: 'POST',
			url: 'https://simandhareducation.com/student-registration6.php',
			data: "name="+student_object.name+"&lname="+student_object.lastName+"&email="+student_object.email+"&phone="+student_object.phone+"&address_line1="+student_object.address_line1+"&address_line2="+student_object.address_line2+"&course="+student_object.course+"&state="+student_object.state+"&city="+student_object.city+"&pincode="+student_object.pincode+"&profession="+student_object.profession+"&profession_company="+student_object.profession_company+"&amount="+student_object.amount // getting filed value in serialize form
		})
			.done(function(data){ // if getting done then call.

			console.log("successfull",data);

			// show the response
			$('#response').html(data);
			return true;

		})
			.fail(function(s) { // if fail then getting message
			console.log(s);
			// just in case posting your form failed

			return false;

		});

	}

	validate(val,callback){


		var student_object = {};
		let v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14;
		v1 = document.getElementById("billing_name");
		v3 = document.getElementById("email");
		v4 = document.getElementById("mobile");
		v5 = document.getElementById("state");
		v6 = document.getElementById("city");
		v7 = document.getElementById("address_line1");
		v8 = document.getElementById("address_line2");
		v9 = document.getElementById("zip");
		v10 = document.getElementById("course-optd");
		v11 = document.getElementById("amount");
		v12 = document.getElementById("cname");
		v13 = document.getElementById("profession");
		v14 = document.getElementById("profession_company");


		let flag1 = true,
			flag3 = true,
			flag4 = true,
			flag5 = true,
			flag6 = true,
			flag7 = true,
			flag8 = true,
			flag9 = true,
			flag10 = true,
			flag11 = true,
			flag12 = true;



		if(val>=1 || val==0) {
			if(v1.value == "") {
				v1.style.borderColor = "red";
				flag1 = false;
			}
			else {
				v1.style.borderColor = "green";
				flag1 = true;
			}
		}

		if(val>=3 || val==0) {
			if(v4.value == "") {
				v3.style.borderColor = "red";
				flag3 = false;
			}
			else {
				v3.style.borderColor = "green";
				flag3 = true;
			}
		}

		if(val>=4 || val==0) {
			if(v4.value == "") {
				v4.style.borderColor = "red";
				flag4 = false;
			}
			else {
				v4.style.borderColor = "green";
				flag4 = true;
			}
		}
		if(val>=5 || val==0) {
			if(v5.value == "") {
				v5.style.borderColor = "red";
				flag5 = false;
			}
			else {
				v5.style.borderColor = "green";
				flag5 = true;
			}
		}
		if(val>=5 || val==0) {
			if(v6.value == "") {
				v6.style.borderColor = "red";
				flag6 = false;
			}
			else {
				v6.style.borderColor = "green";
				flag6 = true;
			}
		}

		if(val>=6 || val==0) {
			if(v7.value == "") {
				v7.style.borderColor = "red";
				flag7 = false;
			}
			else {
				v7.style.borderColor = "green";
				flag7 = true;
			}
		}

		if(val>=7 || val==0) {
			if(v8.value == "") {
				v8.style.borderColor = "red";
				flag8 = false;
			}
			else {
				v8.style.borderColor = "green";
				flag8 = true;
			}
		}
		if(val>=8 || val==0) {
			if(v9.value == "") {
				v9.style.borderColor = "red";
				flag9 = false;
			}
			else {
				v9.style.borderColor = "green";
				flag9 = true;
			}
		}
		if(val>=9 || val==0) {
			if(v10.value == "") {
				v10.style.borderColor = "red";
				flag10 = false;
			}
			else {
				v10.style.borderColor = "green";
				flag10 = true;
			}
		}
		if(val>=10 || val==0) {
			if(v11.value == "") {
				v11.style.borderColor = "red";
				flag11 = false;
			}
			else {
				v11.style.borderColor = "green";
				flag11 = true;
			}
		}
		if(val>=11 || val==0) {
			if(v12.value == "") {
				v12.style.borderColor = "red";
				flag12 = false;
			}
			else {
				v12.style.borderColor = "green";
				flag12 = true;
			}
		}

		var flag = flag1  && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 &&  flag12 ;



		if(flag){
			student_object.name=v1.value;  
			student_object.email=v3.value;
			student_object.phone=v4.value;
			student_object.state=v5.value;
			student_object.city=v6.value;
			student_object.address_line1=v7.value;
			student_object.address_line2=v8.value;
			student_object.pincode=v9.value;
			student_object.course=v10.value;
			student_object.amount=v11.value;
			student_object.cname=v12.value;
			student_object.profession=v13.value;
			student_object.profession_company=v14.value;
			
			callback(student_object);
		}
		else{
			callback({});
		}





	}
}