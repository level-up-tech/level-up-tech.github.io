
let ContactForm = {

    // url: "https://innovation-contact.herokuapp.com/submit-contact-form",

    url: window.location.href.startsWith('http://localhost') 
        ? "http://localhost:3000/submit-contact-form"
        : "https://innovation-contact.herokuapp.com/submit-contact-form",

    form: null,
    fields: {},

    init() {

        ContactForm.form = document.querySelector('form')
        ContactForm.fields = {
            name: ContactForm.form.querySelector('input[name="name"]'),
            email: ContactForm.form.querySelector('input[name="email"]'),
            phone: ContactForm.form.querySelector('input[name="phone"]'),
            company: ContactForm.form.querySelector('input[name="company"]'),
            description: ContactForm.form.querySelector('textarea'),
            budget: ContactForm.form.querySelector('select[name="budget"]'),
            estimate: ContactForm.form.querySelector('select[name="estimate"]')
        }

        ContactForm.form.querySelector('button').onclick = ContactForm.submit
    },

    submit() {

        var data = {
            name: ContactForm.fields.name.value,
            email: ContactForm.fields.email.value,
            phone: ContactForm.fields.phone.value,
            company: ContactForm.fields.company.value,
            description: ContactForm.fields.description.value,
            budget: ContactForm.fields.budget.value,
            estimate: ContactForm.fields.budget.value
        }

        if (!data.name) { 
            alert("Please enter your name")
            return 
        }

        if (!data.email || /[^@]+@[^\.]+\..+/g.test(data.email) == false) { 
            alert("Please enter a valid email address")
            return 
        }

        var xhr = new XMLHttpRequest();   // new HttpRequest instance 
        xhr.open("POST", ContactForm.url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                ContactForm.on_success()
            }
        }

        xhr.send(JSON.stringify(data));
    },

    on_success() {
        alert('Thank you for submitting your request. We typically respond within one business day. Thanks again!')
    }
}

ContactForm.init()