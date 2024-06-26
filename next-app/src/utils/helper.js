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
  const minTimestamp = Math.min(...timestamps);
  const maxTimestamp = Math.max(...timestamps);
  
  // Calculate the time interval between timestamps in milliseconds
  const interval = (maxTimestamp - minTimestamp) / timestamps.length;

  // Calculate the time interval in minutes
  const intervalInMinutes = interval / (1000 * 60);

  // Define the interval for displaying time strings (e.g., every 30 minutes)
  const displayInterval = 30; // Change this value to adjust the interval

  // Generate time strings based on the display interval
  const timeStrings = [];
  let currentTimestamp = minTimestamp;
  while (currentTimestamp <= maxTimestamp) {
    const date = new Date(currentTimestamp * 1000); // Convert to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    timeStrings.push(`${hours}:${minutes}`);

    // Move to the next timestamp based on the display interval
    currentTimestamp += displayInterval * 60 * 1000; // Convert minutes to milliseconds
  }

  return timeStrings;
}

// export function convertTimestampsToTimeStrings(timestamps) {
//   return timestamps.map(timestamp => {
//     const date = new Date(timestamp * 1000); // Convert to milliseconds
//     const hours = date.getHours().toString().padStart(2, '0');
//     let minutes = date.getMinutes();
    
//     minutes = Math.round(minutes / 30) * 30;
    
//     if (minutes === 60) {
//       minutes = 0;
//       date.setHours(date.getHours() + 1);
//     }

//     return `${hours}:${minutes.toString().padStart(2, '0')}`;
//   });
// }

// export function convertTimestampsToTimeStrings(timestamps) {
//   console.log(timestamps)
//   return timestamps.map(timestamp => {
//     const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
//   });
// }