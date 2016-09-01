// HeartsAndFlowersController.js
// Suhas Vijaykumar, July 2016

function setDisplayCondition(data){

	$('.stimulus').hide();

	// if (data.training){
	// 	if (data.incorrect){
	// 		switch(data.oldCondition){
	// 			case CONDITION_HEART_LEFT:
	// 				$('#' + HEART_LEFT_ID).show();
	// 				break;
	// 			case CONDITION_HEART_RIGHT:
	// 				$('#' + HEART_RIGHT_ID).show();
	// 				break;
	// 			case CONDITION_FLOWER_LEFT:
	// 				$('#' + FLOWER_LEFT_ID).show();
	// 				break;
	// 			case CONDITION_FLOWER_RIGHT:
	// 				$('#' + FLOWER_RIGHT_ID).show();
	// 				break;
	// 		}
	// 	}
	// }

	switch(data.newCondition){
		case CONDITION_HEART_LEFT:
			console.log('poop');
			$('#' + HEART_LEFT_ID).show();
			break;
		case CONDITION_HEART_RIGHT:
			$('#' + HEART_RIGHT_ID).show();
			break;
		case CONDITION_FLOWER_LEFT:
			$('#' + FLOWER_LEFT_ID).show();
			break;
		case CONDITION_FLOWER_RIGHT:
			$('#' + FLOWER_RIGHT_ID).show();
			break;
	}
}

// function incorrectAnimation(opts){
// 	$(elem).animate({
// 		{
// 			"background-color": COLOR_INCORRECT
// 		}
// 	});
// }

