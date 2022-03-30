module.exports = {
	format_date: (date) => {
		// Formatting date to ISO standard and getting YYYY-MM-DD
    localDate = new Date(date + 'Z');
    return localDate.toISOString().slice(0,10);
	},
  format_date_time: (date) => {
    localDate = new Date(date + 'Z');
    return localDate.toISOString().slice(11, 16);
  },
  post_preview: str => {
    const preview =  str.slice(0, 245);
    return preview + '...';
}
};