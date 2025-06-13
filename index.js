
(function() {
    emailjs.init("egGxGLl1UvIRdXlWF"); 
})();


class AppointmentForm {
    constructor() {
        this.form = document.getElementById('appointmentForm');
        this.successMessage = document.getElementById('successMessage');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    async handleSubmit() {
     
        const formData = new FormData(this.form);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        
        if (!this.validateForm(formDataObj)) {
            return;
        }

        try {
            this.showLoading();

            
            const templateParams = {
                from_name: `${formDataObj.firstName} ${formDataObj.lastName}`,
                from_email: formDataObj.email,
                course: formDataObj.course,
                message: formDataObj.message,
                to_name: 'Admissions Office'
            };

           
            await emailjs.send(
                'service_3t9gqwt', 
                'template_x4pbj2o', 
                templateParams
            );

       
            this.showSuccess();
            console.log('Email sent successfully');
        } catch (error) {
            this.handleError(error);
        }
    }

    validateForm(data) {
     
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        let isValid = true;

       
        if (!data.firstName || data.firstName.trim().length < 2) {
            this.showError('firstName', 'Please enter a valid first name');
            isValid = false;
        }

        
        if (!data.lastName || data.lastName.trim().length < 2) {
            this.showError('lastName', 'Please enter a valid last name');
            isValid = false;
        }

       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }

       
        if (!data.course) {
            this.showError('course', 'Please select a course');
            isValid = false;
        }

       
        if (!data.message || data.message.trim().length < 10) {
            this.showError('message', 'Please enter a message (minimum 10 characters)');
            isValid = false;
        }

        return isValid;
    }

    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('is-invalid');
    }

    showLoading() {
        this.loadingSpinner.style.display = 'block';
        this.form.style.display = 'none';
    }

    showSuccess() {
        this.loadingSpinner.style.display = 'none';
        this.successMessage.style.display = 'block';
    }

    handleError(error) {
        this.loadingSpinner.style.display = 'none';
        this.form.style.display = 'block';
        this.showError('email', 'Failed to send email. Please try again later.');
        console.error('Error sending email:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new AppointmentForm();
});
