$('#post-comment').hide();

$('#btn-toggle-comment').click(function(e){
     e.preventDefault()
     $('#post-comment').slideToggle();
})



$('#like').click(function(e){
    e.preventDefault()

   let imageID = $(this).attr('data-id')

   $.post('/image/'+imageID+'/likes')
   .done(data => {
       console.log(data)
       $('.like-count').text(data.like)
   })
})


$('#btn-delete').click(function(e){
    e.preventDefault()
  const response = confirm('estas seguro que desa eliminar la imagen ?')
  if(response){
     let imageId = $(this).attr('data-id')
     
     $.ajax({
        url: '/image/'+imageId,
        type: 'DELETE',
      
     }).done(result => {
         $(this).removeClass('btn-danger').addClass('btn-success')
         $(this).find('i').removeClass('fa-times').addClass('fa-check')
         
     })
  }

})