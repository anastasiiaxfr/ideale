const field_name = document.querySelector("[name=name]");
const field_email = document.querySelector("[name=email]");
const field_phone = document.querySelectorAll("[name=tel]");
const field_message = document.querySelectorAll("[name=question]");

// Inputmask("*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]", {
//     placeholder: "your@mail.com",
// }).mask(field_email);

// for (let i = 0; i < field_phone.length; i++) {
//     Inputmask('(999) 99-99-99-999').mask(field_phone[i]);
// }


const token = '5601478768:AAFQjTOcFqol4WXcUwNf5JPEya8TJZIaHNo';
const chat_id = '5125757387';

var smtp = "3964d5-2109-4f37-b69b-0225db33e3a1";
var target_email = "anastasiiaberest@gmail.com";
var send_email = "anastasiiaberest@gmail.com";

var date = new Date().toLocaleString();
let storage = localStorage.getItem('storage');


var validateForms = function(selector, rules, callback) {
  new window.JustValidate(selector, {
    rules: rules,
    focusWrongField: true,
    submitHandler: function(form, values, ajax) {
      const msg = callback(values);
      const success = document.createElement("label");

      success.className = "form__label_success text-center";
      success.innerHTML = "Your data sent!";

      form.append(success);
      form.querySelector("[type=submit]").disabled = true;
      localStorage.setItem('storage', 'true');
      console.log(storage);
      ajax({
        url: 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chat_id + '&parse_mode=html' + '&text=' + encodeURIComponent(msg),
        method: 'POST',
        data: {
            chat_id: $('5125757387').val(),
            text: $('input').val()
        },
        success: function() {
            alert('your message has been sent!');
        },
        async: true,
        callback: (response)=>{
            console.log(response);
        }
    });

      Email.send({
        SecureToken: smtp,

        To: target_email,

        From: send_email,

        Subject: "itg.com",
        Body:
          "<br> Name: " + field_name.value + "<br> Phone: " + field_phone.value,
      }).then();

     
    },
    invalidFormCallback: function(errors) {
      console.log(errors);
    },
  });
};

if(storage){
  form.querySelector("[type=submit]").disabled = true;
}

validateForms('.js-form', {
    tel: {
        required: true,
        minLength: "10"
    },
    name: {
        required: true,
        minLength: "2"
    },
    email: {
        required: true,
        email: true
    },
    question: {
      required: false
    }
}, (values)=>{
    return `
Source: itg.com,
ФИО:  ${values['name']},
E-mail: ${values['email']},
Телефон: ${values['tel']},
Cообщение: ${values['question']},
`;
}
);

