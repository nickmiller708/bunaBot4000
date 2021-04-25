const fs  = require('fs');

class TreatCounter {
	constructor(path_to_file) {
		this.path_to_file = path_to_file;
		this.treatCounter = require(path_to_file); 
	}

	getTreatCount() {
  		return this.treatCounter['totalTreats'] || 0;
  	} 

  	increaseTreatCount() {
	  let totalTreats = this.treatCounter['totalTreats'] || 0; 
	  let todaysTreats = this.treatCounter[this.formatDateString()] || 0;
	  this.treatCounter['totalTreats'] = totalTreats + 1;
	  this.treatCounter[this.formatDateString()] = todaysTreats + 1;

	  try { 
	  	this.updateTreatFile();
	  } catch (error) { 
	  	console.log('failed to write to file');
	  	console.log(error);
	  }

	  return totalTreats + 1;
	}

	decreaseTreatCount() {
		let totalTreats = this.treatCounter['totalTreats'] || 0; 
		let todaysTreats = this.treatCounter[this.formatDateString()] || 0;
	  	let poopCount = this.randomNumber(0, todaysTreats);
	  	this.treatCounter['totalTreats'] = totalTreats - poopCount;
	  	this.treatCounter[this.formatDateString()] = totalTreats - poopCount;

	  	try {
	  		this.updateTreatFile();
	  	} catch (error) { 
	  		console.log('failed to write to file');
	  		console.log(error);
	  	}
	  	return totalTreats - poopCount;
	}

	updateTreatFile() { 
		let contents = JSON.stringify(this.treatCounter);
		fs.writeFile(this.path_to_file, contents, error => {
	    if (error) {
	      console.log('could not write to file. sadge');
	      console.error(error);
	      return;
	    }
	  });
	}

	randomNumber(min, max) { 
    	 return Math.floor(Math.random() * max);
	}	 
	
	// Formats Date String for Curent Day
	formatDateString() { 
	  const currentDate = new Date();
	  const currentDayOfMonth = currentDate.getDate();
	  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
	  const currentYear = currentDate.getFullYear();

	  const dateString = (currentMonth + 1) + "-" + currentDayOfMonth + "-" + currentYear;

	  return dateString
	}
}

module.exports = TreatCounter