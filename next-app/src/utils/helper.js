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