
let ContactForm = {

    // url: "https://innovation-contact.herokuapp.com/submit-contact-form",

    url: window.location.href.startsWith('file://') 
        ? "http://localhost:3000/submit-contact-form"
        : "https://innovation-contact.herokuapp.com/submit-contact-form",

    form: null,
    fields: {},

    init() {

        ContactForm.form = document.querySelector('form')
        ContactForm.fields = {
            name: ContactForm.form.querySelector('input[name="name"]'),
            email: ContactForm.form.querySelector('input[name="email"]'),
            services: ContactForm.form.querySelectorAll('input[type="checkbox"]'),
            message: ContactForm.form.querySelector('textarea')
        }

        ContactForm.form.querySelector('button').onclick = ContactForm.submit
    },

    submit() {

        var data = {
            name: ContactForm.fields.name.value,
            email: ContactForm.fields.email.value,
            services: [
                ContactForm.fields.services[0].checked,
                ContactForm.fields.services[1].checked,
                ContactForm.fields.services[2].checked,
                ContactForm.fields.services[3].checked,
                ContactForm.fields.services[4].checked,
                ContactForm.fields.services[5].checked,
            ],
            message: ContactForm.fields.message.value
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
        window.location.href = "contact-success.html"
    }
}

ContactForm.init()