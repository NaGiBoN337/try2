const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth.split('.').reverse().join('-'));
    const currentDate = new Date();
    
    const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    
    let ageString = '';
    
    if (monthsDiff < 0) {
      ageString = `${yearsDiff - 1} лет ${12 + monthsDiff} месяцев`;
    } else if (monthsDiff > 0) {
      ageString = `${yearsDiff} лет ${monthsDiff} месяцев`;
    } else {
      ageString = `${yearsDiff} лет`;
    }
    
    return ageString;
  };
  
  export default calculateAge;