let inputCount = 0;

function addInput() {
  inputCount++;

  const inputContainer = document.getElementById("input-container");

  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");

  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("name", "input" + inputCount);
  inputElement.setAttribute("placeholder", "Batch Code " + inputCount);
  inputElement.classList.add("professional-input");

  inputGroup.appendChild(inputElement);
  inputContainer.appendChild(inputGroup);
}


function removeInput() {
  const inputContainer = document.getElementById("input-container");
  const inputGroups = inputContainer.getElementsByClassName("input-group");

  if (inputGroups.length > 0) {
    inputContainer.removeChild(inputGroups[inputGroups.length - 1]);
    inputCount--;
  }
}
