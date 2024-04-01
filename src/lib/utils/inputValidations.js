export const name_validation = {
	maxLength: {
		value: 30,
		message: "30 characters max",
	},
};

export const text_validation = {
	maxLength: {
		value: 50,
		message: "50 characters max",
	},
};

export const phone_validation = {
	pattern: {
		value: /^\d{10}$/,
		message: "10 digits",
	},
};

export const postal_validation = {
	pattern: {
		value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
		message: "Not a valid postal code",
	},
};

export const password_validation = {
	minLength: {
		value: 6,
		message: "Min 6 characters",
	},
};

export const email_validation = {
	pattern: {
		value:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: "Not a valid email.",
	},
};

export const creditCard_validation = {
	pattern: {
		value: /^\d{16}$/,
		message: "16 digits",
	},
};

export const cvv_validation = {
	pattern: {
		value: /^\d{3}$/,
		message: "3 digits",
	},
};

export const expiryDate_validation = {
	pattern: {
		value: /^(0[1-9]|1[0-2])\/\d{2}$/,
		message: "MM/YY",
	},
};
