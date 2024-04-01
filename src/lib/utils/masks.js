function maskPhone(value) {
	value = value.replace(/\D/g, "");
	value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
	value = value.replace(/(\d)(\d{4})$/, "$1-$2");
	return value;
}

export const currencyFormatter = () => {
	const numberFormatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	});

	return {
		format: (value) => {
			return numberFormatter.format(value);
		},
		parse: (value) => {
			const rawValue = parseInt(value.replace(/\D/g, ""), 10) || 0;

			return rawValue / 100;
		},
	};
};

export const defaultMask = {
	format: (value) => value,
	parse: (value) => value,
};

export { maskPhone };
