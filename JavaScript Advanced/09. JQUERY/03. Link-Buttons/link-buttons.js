function attachEvents() {
   $('body a').on('click', addRemoveClassSelected)
   function addRemoveClassSelected(){
       $('.selected').removeClass('selected')
       $(this).addClass('selected')
   }
}