$(document).ready(function () {
	let user_id = $.cookie("user_id");
	let socket = io.connect();
	console.log("user_id",user_id);
	$(".show_id_btn").click(function(){
		$(".show").fadeIn(300);
		$(".join").fadeOut(300);
	});

	$(".join_pair_btn").click(function () {
		$(".join").fadeIn(300);
		$(".show").fadeOut(300);
	})

	socket.on('pair_success', function (data) {
		let pair_user_id = data.pair_user_id;
		let room_id = data.room_id;
		let user_id = $.cookie("user_id");
		console.log(user_id,pair_user_id);
		let is_your_id = user_id == pair_user_id
		if (is_your_id){
			window.location.href = window.location.origin + "/setting?room_id=" + room_id;
		}
	});
});