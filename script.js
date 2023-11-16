// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  // Create the lists of characters for the passwords, using split between each character to make it an array
  var lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var digits = '0123456789'.split('');
  // Uses backticks to escape the special characters, and backslashes to escape specifically the backslash and backtick
  var specialChars = ` !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`.split('');

  var inCharTypeLoop = true;
  var includeLowercase = false;
  var includeUppercase = false;
  var includeDigits = false;
  var includeSpecial = false;

  while (inCharTypeLoop){
    // Prompts the user for what types of characters they want in the password
    includeLowercase = window.confirm("Do you want to include lowercase letters?");
    includeUppercase = window.confirm("Do you want to include capital letters?");
    includeDigits = window.confirm("Do you want to include digits?");
    includeSpecial = window.confirm("Do you want to include special characters?");

    // If no types of characters were selected, alert the user and restart the process
    if (includeLowercase || includeUppercase || includeDigits || includeSpecial){
      // Allows the loop to be escaped if at least one kind of character was selected
      inCharTypeLoop=false;
    } else {
      window.alert("Please select at least 1 type of characters to include in the password.");
    }
  }
  
  var inCharNumberLoop = true;
  var passwordLength = -1;

  while (inCharNumberLoop){
    // Prompts the user for a password length with a text input field. If its not a number or can't be converted to one,
    // passwordLength will be set to NaN, and fail the next test
    passwordLength = Number(window.prompt("How many characters in the password? (at least 8, and no more than 128)"));
    // Checks if the passwordLength is an integer, and alerts the user if not, restarting this process
    if (!Number.isInteger(passwordLength)){
      window.alert("Please enter an integer.");
    } else {
      // Checks if the passwordLength is in the specific range, and alerts the user if not, restarting this process
      if ((passwordLength < 8) || (passwordLength > 128)){
        window.alert("Please enter a number between 8 and 128, inclusive.");
      } else {
        // Allows the loop to be escaped if the passwordLength is an integer between 8 and 128, inclusive
        inCharNumberLoop = false;
      }
    }
  }

  // Adds all the selected character lists as arrays within the selectedCharLists array, and creates unusedCharLists to keep track of
  // which character lists have not been used
  var selectedCharLists = [];
  var unusedCharLists = [];
  if(includeLowercase){
    selectedCharLists.push(lowercaseChars);

    // adds the index that lowercaseChars was added to
    unusedCharLists.push(selectedCharLists.length-1);
  }
  if(includeUppercase){
    selectedCharLists.push(uppercaseChars);
    unusedCharLists.push(selectedCharLists.length-1);
  }
  if(includeDigits){
    selectedCharLists.push(digits);
    unusedCharLists.push(selectedCharLists.length-1);
  }
  if(includeSpecial){
    selectedCharLists.push(specialChars);
    unusedCharLists.push(selectedCharLists.length-1);
  }

  // Creates the blank initial password
  var password = '';
  for (var i=0; i<passwordLength; i++){
    var chosenListIndex = -1;

    // unusedCharLists.length is the number of lists not used yet; passwordLength - i is the number of characters left to add 
    // to the password; if there are as many or more lists unused as characters to add, only use characters from those lists
    if (passwordLength-i<=unusedCharLists.length){
      // Only selects an array from the unused ones (gives the index of the array in selectedCharLists)
      // Math.random will be 0 (inclusive) to 1 (exclusive), when multiplied by the length and floored, gives a random index
      // which is used to get a random element from the array (in this case, the element will be an index for selectedCharLists)
      chosenListIndex = unusedCharLists[Math.floor(Math.random() * unusedCharLists.length)];
    } else {
      // Selects any of the selected character lists at random
      chosenListIndex = Math.floor(Math.random() * selectedCharLists.length);
    }

    // Uses the index to get the actual character list
    var chosenList = selectedCharLists[chosenListIndex];

    // Gets a random character from that list
    var chosenCharacter = chosenList[Math.floor(Math.random() * chosenList.length)];

    // Adds that character to the list
    password += chosenCharacter;

    // Removes the chosenListIndex from unusedCharLists if it is still in there, because the list was just used
    var index = unusedCharLists.indexOf(chosenListIndex);
    if (index >= 0){
      unusedCharLists.splice(index, 1);
    }
  }
  
  // The for loop ended, so the password should be done and able to be returned
  return password;
}