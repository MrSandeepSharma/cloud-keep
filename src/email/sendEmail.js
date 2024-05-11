import emailjs from '@emailjs/browser';

function sendEmail(email, otp) {
    emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID, 
        import.meta.env.VITE_EMAIL_TEMPLATE_ID, 
        {
            to_email: email,
            otp: otp
        }, 
        { 
            publicKey: "ak2zq7gZVUy6WiGD4",
        }
    ).then(function(response) {
        console.log("OTP email sent:", response);
    }, function(error) {
        console.error("Error sending OTP email:", error);
    });
}

export default sendEmail;