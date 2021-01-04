$( () => {
   $('#mymodal').on('shown.bs.modal', ()  => {
      $('#myInput').trigger('focus')
   });
   setTimeout(openModal, 5);
});
