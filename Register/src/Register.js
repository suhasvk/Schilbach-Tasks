// Register.js
const ENTER_NAME_PANE_ITEM_CLASS_SELECTOR = ".inputNamePaneItem";
const VIEW_RID_PANE_ITEM_CLASS_SELECTOR = ".viewRidPaneItem";
const GENERATE_RID_BUTTON_ID_SELECTOR = "#generateRidButton";
const NAME_INPUT_ID_SELECTOR = "#nameInput";
const NAME_FORM_GROUP_ID_SELECTOR = "#nameFormGroup";
const SURVEYOR_NAME_TEXT_ID_SELECTOR = "#surveyorName";
const ASSIGNED_RID_TEXT_ID_SELECTOR = "#assignedRid";
const REGISTER_RID_MODAL_ID_SELECTOR = "#registerRidModal";

$(document).ready(function(){
	$(REGISTER_RID_MODAL_ID_SELECTOR).modal('show');

	$(GENERATE_RID_BUTTON_ID_SELECTOR).click(function(ev,er){
		ev.preventDefault();
		var surveyor_name =  $.trim($(NAME_INPUT_ID_SELECTOR).val());
		form_data = new FormData();
		form_data.append("surveyor_name",surveyor_name);
		
		if (surveyor_name.length === 0){
			$(NAME_FORM_GROUP_ID_SELECTOR)
						.addClass("has-error has-feedback")
						.find('.form-control-feedback, .help-block')
							.removeClass('hidden');


		} else {
			console.log(form_data)
			$.ajax({
			    type: "POST",
			    url: "/register-surveyor",
			    data: form_data,
	    	    processData: false,
			    contentType: false,
			    success: function(response) {

					$(ENTER_NAME_PANE_ITEM_CLASS_SELECTOR).addClass('hidden');
					$(SURVEYOR_NAME_TEXT_ID_SELECTOR).text(response.name);
					$(ASSIGNED_RID_TEXT_ID_SELECTOR).text(response.RID);
					$(VIEW_RID_PANE_ITEM_CLASS_SELECTOR).removeClass('hidden');

			    },
			    error: function(errResponse) {
			        console.log(errResponse);
			    }
			});
		}
	});
})