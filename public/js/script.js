function renderSuccessMessage(title){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: title,
    confirmButtonColor: '#009dff',
    showConfirmButton: true
  })
}
  
  function renderFailMessage(title){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: title,
    })
  }
  
  //Make sure of deleting something
  function deleteCheck(event, form){
    event.preventDefault(); 
    Swal.fire({
      title: 'Você deseja deletar?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#009dff',
    }).then((result) => {
      if (result.isConfirmed) {
          form.submit();
      }
    })
  }
  
  
  //Make sure sending form
  function sentCheck(event, form){
    event.preventDefault(); 
    Swal.fire({
      title: 'Você deseja enviar o e-mail?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#009dff',
      denyButtonText: `Cancelar`,
      timer: 4000
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Enviado!', '', 'success').then(()=>{
          event.preventDefault(); 
          form.submit();
        })
      }
    })
  }