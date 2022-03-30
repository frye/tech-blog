module.exports = {
	format_date: (date) => {
		// Formatting date to ISO standard and getting YYYY-MM-DD
		return date.toISOString().slice(0, 10);
	},
  post_preview: str => {
    const preview =  str.slice(0, 245);
    return preview + '...';
}
};