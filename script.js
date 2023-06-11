const resultText = document.querySelector(".result");
const operationText = document.querySelector(".operation");
const userInputText = document.querySelector(".userInput");
const btnContainer = document.querySelector(".btn-container");

let result = '';
let resultShown = false;

// check which button is clicked by user 
const validateInput = event =>
{
    // get the value of the button clicked 
    const keyValue = event.target.getAttribute("value");

    if(keyValue === "AC")
        clearText();
    else if(keyValue === "C")
        removeLast();
    else if(keyValue === "=")
        calculateResults();
    else
        updateDisplay(keyValue);
}

// AC button clicked, erased everything on screen 
const clearText = () => {

    if(resultShown)
    {
        operationText.textContent = '';
        resultText.textContent = '';
        resultShown = false;
    }
    else
        userInputText.textContent = '';
}

// C button clicked, remove the last character 
const removeLast = () => {
    if(resultShown)
    {
        userInputText.textContent = result;
        operationText.textContent = '';
        resultText.textContent = '';
        resultShown = false;
    }
    else
        userInputText.textContent = userInputText.textContent.slice(0, -1);
}

// = button clicked, calculate results and format it 
const calculateResults = () => {

    if (!resultShown && userInputText.textContent !== '') 
    {
        try 
        {
            result = eval(userInputText.textContent);
            resultShown = true;
            operationText.textContent = userInputText.textContent;
            userInputText.textContent = '';
            result = formatResult(result);
            resultText.textContent = result;
        }
        catch (error) {
            alert(`${error}`);
            userInputText.textContent = '';
            resultShown = false;
        }
    }
}

// if result contains decimal numbers, limit it for only 2 digits 
const formatResult = result => {

    if (Number.isInteger(result))
        return result; // No decimal places, return as is
    else
        return result.toFixed(2); // Two decimal places
};

// update text at screen 
const updateDisplay = keyValue => {

    if(resultShown)
    {
        operationText.textContent = '';
        resultText.textContent = '';
        keyValue = result + keyValue;
        resultShown = false;
    }

    // userInputText.textContent += keyValue;

    const operatorResult = formatOperator(keyValue);

    // Append the result if it's not undefined 
    if (operatorResult !== undefined && operatorResult !== null)
        userInputText.textContent += operatorResult; 
}

// if same operator is clicked twice, prevent it on screen 
const formatOperator = userChar => {
    const lastChar = userInputText.textContent.charAt(userInputText.textContent.length - 1);
    const operators = ['+', '-', '*', '/', '%', '.'];

    if (
        lastChar !== '' &&
        operators.includes(lastChar) &&
        operators.includes(userChar)
    ) {
        userInputText.textContent = userInputText.textContent.slice(0, -1);
    }

    return userChar;
}

// event listener for button clicks 
btnContainer.addEventListener("click", validateInput);
