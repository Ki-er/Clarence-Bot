//Change first character of string from Lowercase to Uppercase
exports.ChangeFirstLetterToUpperCase = (string) => {
	const firstCharOfString = string[0];
	return string.replace(firstCharOfString, firstCharOfString.toUpperCase());
};
