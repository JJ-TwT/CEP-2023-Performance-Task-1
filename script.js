//making constants so I can use them to input texts into their respective divisions
const quoteDisplayElement = document.getElementById('text-display');
const percentageCompletion = document.getElementById('completionPercentage');
const quoteInputElement =  document.getElementById('input');
const timerElement =  document.getElementById('timer');
const resultTime = document.getElementById('timeTaken')
const totalWordCount = document.getElementById('numberWords')
const wpm = document.getElementById('speedWPM')
const accuracy = document.getElementById('totalAccuracy')
var timer

//function to get a random quote for the user to type from the array of quotes
function getRandomQuote(Number){
  //different texts for the user to type out made into an array to be accessed
  var quotes = [
    "Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors", 
    "He was wearing long robes, a purple cloak that swept the ground, and high-heeled, buckled boots. His blue eyes were light, bright, and sparkling behind half-moon spectacles and his nose was very long and crooked, as though it has been broken at least twice",
    "The four Houses are called Gryffindor, Hufflepuff, Ravenclaw, and Slytherin. Each House has its own noble history and each produced outstanding witches and wizards",
    "Harry had a lot of trouble keeping his mind on his lessons that day. It kept wandering up to the dormitory where his new broomstick was lying under his bed, or straying off to the Quidditch field where he'd be learning to play that night",
    "Barrels of slimy stuff stood on the floor; jars of herbs, dried roots, and bright powders lined the walls; bundles of feathers, strings of fangs, and snarled claws hung from the ceiling",
    "They had a good time eating the Every Flavor Beans. Harry got toast, coconut, baked bean, strawberry, curry, grass, coffee, sardine, and was even brave enough to nibble the end off a funny gray one Ron wouldn't touch, which turned out to be pepper",
    "Easily the most boring class was History of Magic, which was the only one taught by a ghost. Professor Binns had been very old indeed when he had fallen asleep in front of the staff room fire and got up next morning to teach, leaving his body behind him",
    "Not my daughter, you bitch!",
    "A hooded figure came swiftly down the front steps of the castle. Clearly not wanting to be seen, it walked as fast as possible toward the forbidden forest",
    "Harry jumped back on his Nimbus Two Thousand and took off. Gliding silently over the castle he saw Snape enter the forest at a run. He followed",
    "Ron, full of turkey and cake and with nothing mysterious to bother him, fell asleep almost as soon as he'd drawn the curtains of his four-poster. Harry leaned over the side of his own bed and pulled the cloak out from under it",
    "The club flew suddenly out of the troll's hand, rose high, high up into the air, turned slowly over - and dropped, with a sickening crack, onto its owner's head",
    "The hooded figure raised its head and looked right at Harry - unicorn blood was dribbling down its front. It got to its feet and came swiftly toward Harry - he couldn't move for fear",
    "It was the best evening of Harry's life, better than winning at Quidditch, or Christmas, or knocking out mountain trolls ... he would never, ever forget tonight",
    "Professor McGonagall was looking at Ron and Harry. Harry had never seen her look so angry. Her lips were white. Hopes of winning fifty points for Gryffindor faded quickly from Harry's mind",
    "Harry was speeding toward the ground when the crowd saw him clap his hand to his mouth as though he was about to be sick - he hit the field on all fours - coughed - and something gold fell into his hand",
    "Harry followed Hagrid out onto the rock. The sky was quite clear now and the sea gleamed in the sunlight. The boat Uncle Vernon had hired was still there, with a lot of water in the bottom after the storm"
  ];

var randomQuote = 0;

//have a random number and take the text from the corresponding number in the array
if ((Number === undefined) || (Number >= quotes.length )){
  randomQuote = Math.floor(Math.random() * quotes.length);
}
else {
  randomQuote = Number;
}

//selected text is an index of the array of texts
var selectedQuote = quotes[randomQuote];
console.log(selectedQuote);
return selectedQuote;
}

//once the user inputs something into the input space, the timer would start only once
quoteInputElement.addEventListener('input', function(){
  startTimer()
}, {once : true})

//everytime a character is inputted, the console log would say 'changed'
//breaks the input into each individual element
quoteInputElement.addEventListener('input', () => {
  console.log('changed')
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

//checks all individual characters and assigns them classes based on whether they are correct, wrong or null
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    //if character is null, it means that the user has not inputted the character yet
    //thus, we remove both "correct" and "wrong" classes so the text font colour would stay grey
    if (character == null){
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('wrong')
    }
    //if character is the same as the character in the text, it means the user has inputted the character correcty
    //thus, we add the "correct" class and remove the "wrong" class
    //with the "correct" class, the character would now have the characteristics that all "correct"-classed characters would have
    //"correct"-classed characters would have a green font
    else if (character === characterSpan.innerText){
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('wrong')
    }
    //if the first two cases are false, it can only mean that the the character is wrongly inputted
    //thus, we add the "wrong" class and remove the "correct" class (for obvious reasons)
    //with the "wrong" class, the character would now have the characteristics that all "wrong"-classed characters would have
    //"wrong"-classed characters would have a red font and be underlined
    else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('wrong')
    }
  })

  //the following events would happen when the last character of the text is inputted (aka the typing test is over)

  //initializing the variable lastCharacter which is the last character of the text
  var lastCharacter = arrayValue[arrayQuote.length - 1];
  if (lastCharacter != null) {
    //the console log would show the end time
    console.log(timerElement.innerText)
    //the text inside the "timer-section" of the results would also show the time taken
    resultTime.innerText = timerElement.innerText
    //finally, we stop the timer
    stopTimer();

    //calculation for the "accuracy-section" of the results

    //initialize the variable totalWrong to be 0 since there will be 0 wrongly typed characters at the start of the typing test
    var totalWrong = 0;
    //individually check all the characters to see whether they have the 'wrong' class assigned to them
    for (var i=0; i<arrayQuote.length; i++){
      //if the character does have a "wrong" class assigned to them, then totalWrong (the number of wrongly typed characters) would increase
      if (arrayQuote[i].classList.contains('wrong')){
        totalWrong ++;
      }
    }
    //console long the number of characters that is typed wrongly
    console.log(totalWrong);
    //initializing totalAccuracy, which is the percentage for the total accuracy of the typing test
    // Math: ⌊((total number of characters) - (number of characters typed wrongly)) / (total number of lengths) * 100⌋ = percentage of accuracy👍
    var totalAccuracy = Math.floor((arrayQuote.length - totalWrong) * 100 / arrayQuote.length);
    //console log the accuracy percentage
    console.log(totalAccuracy);
    //makes the text inside the "accuracy-section" of the results to display the total accuracy percentage
    accuracy.innerText = totalAccuracy;
  }

  //initialize totalCharacters, which is the length of the text (in terms of characters)
  var totalCharacters = arrayQuote.length;
  //console log the text length
  console.log(arrayQuote.length);
  //initialize fullText, which is the length of whatever the user has inputted (in terms of characterss)
  var fullText = document.getElementById("input").value
  //after a new character is typed in, the percentage of completion would be recalculated
  for (var z=0; z<totalCharacters; z++){
      //the percentage of completion is calculated here using the variables initialized above
      //the percentage would then be shown in the bar and will increase/decrease based on how much the player inputs
      //Math: ⌊(length of text that has been inputted)/(total length of the text to be typed)*100⌋% = percentage of completion of the typing test
      percentageCompletion.innerText = Math.floor(fullText.length * 100 / arrayQuote.length) + "%";
  }
}) 

//function to count the total number of words that the user has inputted
function wordcount(){
  //again, we initialize fullText, which is whatever the user has inputted
  var fullText = document.getElementById("input").value
  console.log(fullText.length)
  //let the total count of spaces be 0 == number of words is 0 since the user has not inputted anything
  var count = 0;
  //splits the input into an array of substrings
  var split = fullText.split(' ')
  //for every time the user changes the input, the function would check the number of words
  for (var i=0; i<split.length; i++){
    //if the array is not empty, then the count would increase
    if(split[i] != ""){
      count ++
    }
    //the final count, when the timer ends, would be the total number of words typed by the user
  }

  //the number of words typed in by the user would be displayed in the "word count section" of the results
  totalWordCount.innerText = count
  //calculating the wpm
  //initialize the denominator (which is basically time it took to type in that number of words) in seconds
  const denominator = resultTime.innerText
  //the "wpm section" in results would then show the wpm of the user
  //MATH: ⌊(total number of words)/(time taken)*60⌋ = wpm
  wpm.innerText = Math.floor(count / denominator * 60)
}

//function to get the text for the user to type
async function getInputQuote(){
  //the selected text would be taken from the getRandomQuote() function
  const selectedQuote = await getRandomQuote();
  //splitting the text into their individual characters to then assign them classes
  quoteDisplayElement.innerHTML = ''
  selectedQuote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null;
}

//initialize the variable
let startTime;
//function to start the timer
function startTimer(){
  timerElement.innerText = 0
  //makes the timer to follow the same time as our current time (each interval between each seconds) to make the timer very precise
  startTime = new Date()
  timer = setInterval(() => {
    //the timer-section in the webpage would display the time that is gotten from the getTimerTime() function
    timerElement.innerText = getTimerTime()
  }, 1000)
}

//function to get the time
function getTimerTime(){
  return Math.floor((new Date() - startTime) / 1000)
}

//function to stop the timer
function stopTimer(){
  //once the function is called, the timer would be cleared
  clearInterval(timer);
}

//function is called to get the text for the user to type
getInputQuote();


