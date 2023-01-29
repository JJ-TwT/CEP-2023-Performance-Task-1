const quoteDisplayElement = document.getElementById('text-display');
const quoteInputElement =  document.getElementById('input');
const timerElement =  document.getElementById('timer');
const resultTime = document.getElementById('timeTaken')
const totalWordCount = document.getElementById('numberWords')
const wpm = document.getElementById('speedWPM')
const accuracy = document.getElementById('totalAccuracy')
var timer

function getRandomQuote(Number){
  //different texts to type for user
  var quotes = [
    "He was a big, beefy man with hardly any neck, although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors", 
    "He was wearing long robes, a purple cloak that swept the ground, and high-heeled, buckled boots. His blue eyes were light, bright, and sparkling behind half-moon spectacles and his nose was very long and crooked, as though it has been broken at least twice",
    "The four Houses are called Gryffindor, Hufflepuff, Ravenclaw, and Slytherin. Each House has its own noble history and each has produced outstanding witches and wizards. While you are at Hogwarts, your triumphs will earn your House points, while any rule-breaking will lose House points",
    "Harry had a lot of trouble keeping his mind on his lessons that day. It kept wandering up to the dormitory where his new broomstick was lying under his bed, or straying off to the Quidditch field where he'd be learning to play that night. He bolted his dinner that evening without noticing what he was eating, and then rushed upstairs with Ron to unwrap the Nimbus Two Thousand at last",
    "Barrels of slimy stuff stood on the floor; jars of herbs, dried roots, and bright powders lined the walls; bundles of feathers, strings of fangs, and snarled claws hung from the ceiling",
    "They had a good time eating the Every Flavor Beans. Harry got toast, coconut, baked bean, strawberry, curry, grass, coffee, sardine, and was even brave enough to nibble the end off a funny gray one Ron wouldn't touch, which turned out to be pepper",
    "Easily the most boring class was History of Magic, which was the only one taught by a ghost. Professor Binns had been very old indeed when he had fallen asleep in front of the staff room fire and got up next morning to teach, leaving his body behind him.",
    "Not my daughter, you bitch!",
    "Professor McGonagall was looking at Ron and Harry. Harry had never seen her look so angry. Her lips were white. Hopes of winning fifty points for Gryffindor faded quickly from Harry's mind",
    "Harry was speeding toward the ground when the crowd saw him clap his hand to his mouth as though he was about to be sick - he hit the field on all fours - coughed - and something gold fell into his hand",
    "Harry followed Hagrid out onto the rock. The sky was quite clear now and the sea gleamed in the sunlight. The boat Uncle Vernon had hired was still there, with a lot of water in the bottom after the storm"
  ];

var randomQuote = 0;

if ((Number === undefined) || (Number >= quotes.length )){
  randomQuote = Math.floor(Math.random() * quotes.length);
}
else {
  randomQuote = Number;
}

var selectedQuote = quotes[randomQuote];
console.log(selectedQuote);
return selectedQuote;
}

quoteInputElement.addEventListener('input', function(){
  startTimer()
}, {once : true})

quoteInputElement.addEventListener('input', () => {
  console.log('changed')
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')


  let allCorrect = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null){
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('wrong')
      allCorrect = false
    }
    else if (character === characterSpan.innerText){
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('wrong')
    }
    else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('wrong')
      allCorrect = false
    }
  })

  var lastCharacter = arrayValue[arrayQuote.length - 1];
  if (lastCharacter != null) {
    console.log(timerElement.innerText)
    resultTime.innerText = timerElement.innerText
    stopTimer();
  }

  if (allCorrect) {
    accuracy.innerText = '100'
  }
  else {
    accuracy.innerText = 'Not 100'
  }

}) 

function wordcount(){
  var fullText = document.getElementById("input").value
  console.log(fullText.length)
  var count = 0;
  var split = fullText.split(' ')
  for (var i=0; i<split.length; i++){
    if(split[i] != ""){
      count ++
    }
  }

  totalWordCount.innerText = count
  const denominator = resultTime.innerText
  wpm.innerText = Math.floor(count / denominator * 60)
}

async function getInputQuote(){
  const selectedQuote = await getRandomQuote();
  quoteDisplayElement.innerHTML = ''
  selectedQuote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null;
}

let startTime
function startTimer(){
  timerElement.innerText = 0
  startTime = new Date()
  timer = setInterval(() => {
    timerElement.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime(){
  return Math.floor((new Date() - startTime) / 1000)
}

function stopTimer(){
  clearInterval(timer);
}

getInputQuote();
