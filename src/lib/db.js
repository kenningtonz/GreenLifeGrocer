export const db = "https://db.kennedyadams.ca/greenlife";
// export const db =
// 	"https://dca.durhamcollege.ca/~adamskennedy/easy_groceries/greenlife";

export const dbBody = (body) => {
	return {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",

			// Authorization: "Basic " + btoa("adamskennedy:JLpfre[76"),
		},
		body: JSON.stringify({
			...body,
			dbUSER: process.env.dbUSER,
			dbPASS: "Kmma68062",
		}),
	};
};

export const fetchData = async (getFunction, ...args) => {
	// console.log(getFunction, args);
	let json;
	let res;
	let errorMessage;
	try {
		res = await getFunction(...args);
		// if (res === undefined || res != 200) {
		// 	errorMessage = "There was an error";
		// 	console.log(`HTTP Response Code: ${res?.status}`);
		// } else {
		json = await res.json();
		console.log(json);
		// }
	} catch (error) {
		errorMessage = "There was an error";
		if (error instanceof SyntaxError) {
			// Unexpected token < in JSON
			console.log("There was a SyntaxError", error);
		} else {
			console.log("There was an error", error);
		}
	}

	if (json) {
		//checks php errors
		if (json.error.id == "0") {
			return json;
		} else {
			return json.error.error_message;
		}
	} else {
		return errorMessage;
	}
};
