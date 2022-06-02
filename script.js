`use strict`;
$(function () {
	let timeH = `00`;
	let timeM = 59;
	let time = `${timeH}:${timeM}`;


	let textCheck = `You still have time, you sure?`

	$(`div.modalCheck`).hide();
	$(`div.someFone`).hide();
	$(`div.modalWinn`).hide();
	$(`div.modalLose`).hide();
	$(`[value="Start geme!"]`).attr(`disabled`, `true`);
	$(`[value="Check result"]`).attr(`disabled`, `true`);

	// start: function randomizerDiv
	function randomizerDiv() {
		let newPuzz = ``;
		let g = 0;
		let n = Math.floor(Math.random() * 16);
		$(`[value="Start geme!"]`).removeAttr(`disabled`);
		$(`.randomPuzz`).html(`${newPuzz}`);
		$(`.checkPuzz .randonPuzzPieces`).html(`${newPuzz}`);
		$(`[value="Check result"]`).attr(`disabled`, `true`);
		$(`.timer h2`).text(`01:00`)
		for (n; n >= -1; n = Math.floor(Math.random() * 16)) {
			if (($(`.randonPuzzPieces div`).hasClass(`${n}`) === false) && (n < 16)) {
				newPuzz += `<div class="randonPuzzPieces"><div class="${n}"></div></div>`;
				$(`.randomPuzz`).html(`${newPuzz}`);
				g = g + 1;
				if (g == 16) { n = -1; break };
			}
		}
	}
	// end: function randomizerDiv

	// start: function bgImg
	function bgImg() {
		let x = 0.01;
		let y = 0.01;
		for (let i = 0; i < 16; i++) {

			if (i <= 3) {
				$(`div.${i}`).css({
					backgroundPosition: `${x}% ${y}%`,
				})
				x = x + 33.33;
			}
			if (i > 3 && i <= 7) {
				y = 33.33;
				$(`div.${i}`).css({
					backgroundPosition: `${x}% ${y}%`,
				})
				x = x + 33.33;
			}
			if (i > 7 && i <= 11) {
				y = 66.66;
				$(`div.${i}`).css({
					backgroundPosition: `${x}% ${y}%`,
				})
				x = x + 33.33;
			}
			if (i > 11 && i <= 15) {
				y = 100;
				$(`div.${i}`).css({
					backgroundPosition: `${x}% ${y}%`,
				})
				x = x + 33.33;
			}
		}
	}
	// end: function bgImg

	// start: function check
	function check() {
		for (let i = 0; i <= 15; i++) {
			// console.log(i)
			if ($(`.checkPuzz .randonPuzzPieces div`).eq(i).hasClass(i) === true && i == 15) {
				$(`div.someFone`).show();
				$(`div.modalWinn`).show();
				$(`div.modalCheck`).hide();
			}
			if ($(`.checkPuzz .randonPuzzPieces div`).eq(i).hasClass(i) === false) {
				$(`div.modalCheck`).hide();
				$(`div.someFone`).show();
				$(`div.modalLose`).show();

			}
		}
	}
	// end: function check

	// Start: function runTime
	function runTime() {
		setIntervalId = setInterval(() => {

			time = `${timeH}:${timeM}`;
			timeM = timeM - 1;
			$(`.timer h2`).text(`${time}`)
			if (timeM <= 9) {
				timeM = `0${timeM}`;

				$(`.timer h2`).text(`${time}`)
			}
			if (timeM <= 0) {
				check()
				$(`.timer h2`).text(`00:00`)
				clearInterval(setIntervalId);
			}


			return time;
		}, 1000)
	}
	// End: function runTime

	// Start: прив'язую події до кнопок

	// Start: кнопка [value="New game"]
	$(`[value="New game"]`).click(randomizerDiv)
	$(`[value="New game"]`).click(bgImg)
	$(`[value="New game"]`).click(function () { clearInterval(setIntervalId) })
	$(`[value="New game"]`).remove(runTime)
	$(`[value="New game"]`).click(function () {
		$(`[value="Check result"]`).attr(`disabled`, `true`);
	})
	// End: кнопка [value="New game"]

	// Start: кнопка [value="Check result"]
	$(`[value="Check result"]`).remove(runTime)
	$(`[value="Check result"]`).click(function () {
		$(`.someFone`).show();
		$(`div.modalCheck`).show();
		$(`div.modalCheck p`).text(`${textCheck + time}`);
		clearInterval(setIntervalId)
	})

	// End: кнопка [value="Check result"]

	// Start: кнопка [value="Start geme!"]
	$(`[value="Start geme!"]`).click(runTime)
	$(`[value="Start geme!"]`).click(function () {
		$(`.puzzle .randonPuzzPieces`).sortable({
			connectWith: `.randomPuzz .randonPuzzPieces, .checkPuzz .randonPuzzPieces`,
			containment: `.gameContainer`,
			cancel: ``
		})
		$(`[value="Check result"]`).removeAttr(`disabled`);
		$(`[value="Start geme!"]`).attr(`disabled`, `true`);
	});
	// End: кнопка [value="Start geme!"]

	// Start: кнопка .modalCheck [value="Close"]
	$(`.modalCheck [value="Close"]`).click(function () {
		runTime();
		$(`.modalCheck`).hide()
		$(`.someFone`).hide()
	})
	// End: кнопка .modalCheck [value="Close"]

	// Start: кнопка .modalWinn [value="Close"]
	$(`.modalWinn [value="Close"]`).click(function () {
		let newPuzz = ``;
		$(`[value="Start geme!"]`).attr(`disabled`);
		$(`.randomPuzz`).html(`${newPuzz}`);
		$(`.checkPuzz .randonPuzzPieces`).html(`${newPuzz}`);
		$(`[value="Check result"]`).attr(`disabled`, `true`);
		$(`.timer h2`).text(`01:00`)
		$(`.someFone`).hide()
		$(`.modalWinn`).hide()
		timeH = `00`;
		timeM = 59;
		time = `${timeH}:${timeM}`;
		return time;
	})
	// End: кнопка .modalWinn [value="Close"]

	// Start: кнопка .modalLose [value="Close"]
	$(`.modalLose [value="Close"]`).click(function () {

		$(`[value="Start geme!"]`).attr(`disabled`, `true`);

		$(`[value="Check result"]`).attr(`disabled`, `true`);
		$(`.puzzle .randonPuzzPieces`).sortable({
			cancel: `.randonPuzzPieces div`
		})
		$(`.someFone`).hide()
		$(`.modalLose`).hide()
		timeH = `00`;
		timeM = 59;
		time = `${timeH}:${timeM}`;
		return time;
	})
	// End: кнопка .modalLose [value="Close"]

	// Start: кнопка [value="Close"]
	$(`[value="Check"]`).click(check)
	// End: кнопка [value="Close"]





	// End: прив'язую події до кнопок
})