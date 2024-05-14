export function autoCapitalize(str) {
    return str
      .split(' ')               
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })                        
      .join(' ');               
  }

export function getStartAndEndOfWeek() {
  const now = new Date();
  
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);

  // Get the end of the week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return {
    startOfWeek: Math.floor(startOfWeek.getTime()/1000),
    endOfWeek: Math.floor(endOfWeek.getTime()/1000)
  };
}

export function getStartAndEndOfDay() {
  const now = new Date();

  // Get the start of the day
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));

  // Get the end of the day
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  return {
    startOfDay: Math.floor(startOfDay.getTime() / 1000),
    endOfDay: Math.floor(endOfDay.getTime() / 1000),
  };
}

export function getStartAndEndOfHour() {
  const now = new Date();

  // Get the start time one hour before the current time
  const startOfHour = new Date(now.getTime() - (30 * 60 * 1000));

  // Get the current time
  const endOfHour = new Date(now);

  return {
    startOfHour: Math.floor(startOfHour.getTime() / 1000),
    endOfHour: Math.floor(endOfHour.getTime() / 1000),
  };
}

export function convertTimestampsToTimeStrings(timestamps) {
  console.log(timestamps)
  return timestamps.map(timestamp => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  });
}