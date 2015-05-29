(function() {

	var inputs = {};
	var labels = {};
	var angles = {
		"a1": new Angle(),
		"a2": new Angle()
	};

	document.addEventListener("DOMContentLoaded", function() {
		inputs.a1 = document.getElementById("input_a1");
		inputs.a2 = document.getElementById("input_a2");
		inputs.a1deg = document.getElementById("input_a1deg");
		inputs.a2deg = document.getElementById("input_a2deg");
		inputs.a1rev = document.getElementById("input_a1rev");
		inputs.a2rev = document.getElementById("input_a2rev");

		labels.diff = document.getElementById("label_diff");
		labels.dirDiff = document.getElementById("label_dirDiff");

		for(var input in inputs) {
			inputs[input].addEventListener("change", inputHandler, false);
			inputs[input].addEventListener("keyup", inputHandler, false);
		}
	});

	var inputHandler = function(e) {
		var input = e.target;
		var angleId = input.id.substr(6,2);
		var angleUnit = input.id.substr(8);

		switch(angleUnit) {
			case "deg":
				angles[angleId].setDeg(inputs[angleId+"deg"].value);
				inputs[angleId].value = angles[angleId].get();
				inputs[angleId+"rev"].value = angles[angleId].getRevolutions();
			break;
			case "rev":
				angles[angleId].setRevolutions(inputs[angleId+"rev"].value);
				inputs[angleId].value = angles[angleId].get();
				inputs[angleId+"deg"].value = angles[angleId].getDeg();
			break;
			default:
				angles[angleId].set(inputs[angleId].value);
				inputs[angleId+"deg"].value = angles[angleId].getDeg();
				inputs[angleId+"rev"].value = angles[angleId].getRevolutions();
		}

		updateResults();
	};

	var updateResults = function() {
		labels.diff.textContent = angles.a1.diff(angles.a2).getDeg();
		labels.dirDiff.textContent = angles.a1.dirDiff(angles.a2).getDeg();
	}




}());