$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;
$(function(){
    $('#uiForm')
      .form({
        fields: {
          userName: {
            identifier: 'username',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce el nombre de usuario'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce la contraseña '
              }
            ]
          }
        }
      })
    ;
});