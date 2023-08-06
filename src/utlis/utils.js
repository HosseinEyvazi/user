function persianToEnglishNumber(persianNumber) {

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  let englishNumber = "";
  for (let i = 0; i < persianNumber.length; i++) {
    const persianDigit = persianNumber[i];
    const digitIndex = persianDigits.indexOf(persianDigit);
    if (digitIndex !== -1) {
      englishNumber += englishDigits[digitIndex];
    } else {
      englishNumber += persianDigit;
    }
  }

  return englishNumber;
}


  console.log(convertPersianToEnglishNumber("۸۹۴۶۵۴۶"));
  
  
  export default convertPersianToEnglishNumber;