// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDKS_J_vMO7oxgusFcSujwN7zi-a9fYSaU",
    authDomain: "covid19tracker-81711.firebaseapp.com",
    projectId: "covid19tracker-81711",
    storageBucket: "covid19tracker-81711.appspot.com",
    messagingSenderId: "814933439666",
    appId: "1:814933439666:web:1f42a1143a6199ee52c5ab"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var PopUpIcon = document.getElementById("PopUpIcon");
var PopUpText = document.getElementById("PopUpText");
var PopUp = document.getElementById("PopUp");
var PopUpbtn = document.getElementById('PopUpbtn');


PopUpbtn.addEventListener("click",function(){

       
         if(PopUpIcon.classList.contains("fa-times-circle"))
         {
           PopUpIcon.classList.remove("fa-times-circle");
         }
         else if(PopUpIcon.classList.contains("fa-check-circle"))
         {
             PopUpIcon.classList.remove("fa-check-circle");
         }
         document.getElementById("PopUp").style.display = "none";

});

$(document).ready(function () {

    var status = $("#contactForm").validate({

        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 30

            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true,
                minlength: 3,
                maxlength: 40
            },
            message: {
                required: true,
                minlength: 10,
                maxlength: 100
            }
        },
        highlight: function (element) {
            $(element).removeClass("c2");
            $(element).addClass("c1");

        },
        unhighlight: function (element) {

            $(element).removeClass("c1");
            $(element).addClass("c2");
        },
        messages: {
            name: {
                required: "Name is Mandatory",
                minlength: "3 Characters Must"

            },
            email: {
                required: "Email is Mandatory"

            },
            subject: {
                required: "Subject is Mandatory"
            },
            message: {
                required: "Message is Mandatory"
            }
        },
        submitHandler: function (form) {
            
                let Name = document.getElementById("name").value;
                let email = document.getElementById("email").value;
                let Subject = document.getElementById("subject").value;
                let Message = document.getElementById("message").value;
                
                var checkStatus = false;


                var db = firebase.firestore();

                db.collection("users").add({
                    Name:Name,
                    Email:email,
                    Subject:Subject,
                    Message:Message,

                })
                    .then((docRef) => {
                        //console.log("Document written with ID: ", docRef.id);
                        checkStatus = true;
                        PopUpIcon.classList.add("fa-check-circle");
                        PopUpIcon.style.color = "#0be881";
                        PopUpText.innerHTML = "Thank You!! Your Response has been Recorded.Our Team Will Contact You Shortly";
                        PopUp.style.display = "flex";
                        // alert("Thank You!! Your Response has been Recorded.Our Team Will Contact You Shortly");
                    })
                    .catch((error) => {
                        // console.error("Error adding document: ", error);
                        alert("From Catch Section OOPs there was a Some Problem Try Again Later");
                    });


            form.reset();

            setTimeout(() => {
                
                if(checkStatus == false)
                {   
                    PopUpIcon.classList.add("fa-times-circle");
                    PopUpIcon.style.color = "red";
                    PopUpText.innerHTML = "Oops! There was a problem please Check Your Internet Connection.";
                    PopUp.style.display = "flex";
                    // alert("Oops! There was a problem please try again Later.");
                }

            }, 3000);

            console.log("Submitted");
        },

    });




});



