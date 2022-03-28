module.exports = {
	format_date: (date) => {
		// Formatting date to ISO standard and getting YYYY-MM-DD
		return date.toISOString().slice(0, 10);
	},
};