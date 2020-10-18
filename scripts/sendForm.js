const deliveryForm = document.querySelector('#deliveryForm');
const deliverySend = document.querySelector('#deliverySend');
const message = document.querySelector('.message');
const messageText = document.querySelector('.message__text');
const messageClose = document.querySelector('.message__close-btn');

const toggleMessage = () => {
  message.classList.toggle("message--active");
  body.classList.toggle("body--active");
}


deliveryForm.addEventListener('submit', e => {
  e.preventDefault();

  

  const nameField = deliveryForm.elements.name;
  const phoneField = deliveryForm.elements.phone;
  const commentField = deliveryForm.elements.comment;
  const toField = deliveryForm.elements.to;

  const data = {
    name: nameField.value,
    phone: phoneField.value,
    comment: commentField.value,
    to: toField.value
  } 
  const arr = [nameField, phoneField, commentField, toField];

  let checkResult = arr.filter(el => {
    if (el.value.trim() !== "") { 
      el.style.border = "3px solid transparent";
      return el;
    } else {el.style.border = "3px solid red";}
  }); 

  if (checkResult.length === arr.length) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.addEventListener('load', () => {
      messageText.innerText = xhr.response.message;
      if (xhr.status > 400) {
        messageText.classList.add("error");
      } else {
        messageText.classList.remove("error");
      }
      $.fancybox.open({
        src: "#message",
        type: "inline"
      });
    })
  }
});

  messageClose.addEventListener('click', (e) => {
    e.preventDefault();
    $.fancybox.close()});