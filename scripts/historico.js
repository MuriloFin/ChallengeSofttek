$(document).ready(function() {
    $('#ticketModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var title = button.data('title'); 
        var description = button.data('description');

        var modal = $(this);
        modal.find('.modal-title').text(title);
        modal.find('.modal-body').text(description);
    });
});
