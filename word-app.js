const words = [
    { word: 'apple', phonetic: '/ˈæpl/', meaning: '苹果', example: 'I eat an apple every day.', image: 'apple' },
    { word: 'banana', phonetic: '/bəˈnænə/', meaning: '香蕉', example: 'Monkeys like bananas.', image: 'banana' },
    { word: 'cat', phonetic: '/kæt/', meaning: '猫', example: 'The cat is sleeping.', image: 'cat' },
    { word: 'dog', phonetic: '/dɒɡ/', meaning: '狗', example: 'I have a pet dog.', image: 'dog' },
    { word: 'egg', phonetic: '/eɡ/', meaning: '鸡蛋', example: 'I eat an egg for breakfast.', image: 'egg' },
    { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', example: 'Fish can swim.', image: 'fish' },
    { word: 'girl', phonetic: '/ɡɜːl/', meaning: '女孩', example: 'She is a happy girl.', image: 'girl' },
    { word: 'hand', phonetic: '/hænd/', meaning: '手', example: 'Wash your hands before dinner.', image: 'hand' },
    { word: 'ice', phonetic: '/aɪs/', meaning: '冰', example: 'The ice is cold.', image: 'ice' },
    { word: 'juice', phonetic: '/dʒuːs/', meaning: '果汁', example: 'I drink orange juice.', image: 'juice' },
    { word: 'kite', phonetic: '/kaɪt/', meaning: '风筝', example: 'We fly kites in spring.', image: 'kite' },
    { word: 'lion', phonetic: '/ˈlaɪən/', meaning: '狮子', example: 'The lion is strong.', image: 'lion' },
    { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', example: 'Drink milk every day.', image: 'milk' },
    { word: 'notebook', phonetic: '/ˈnəʊtbʊk/', meaning: '笔记本', example: 'I write in my notebook.', image: 'notebook' },
    { word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙子', example: 'Orange is my favorite fruit.', image: 'orange' },
    { word: 'pencil', phonetic: '/ˈpensl/', meaning: '铅笔', example: 'I write with a pencil.', image: 'pencil' },
    { word: 'queen', phonetic: '/kwiːn/', meaning: '女王', example: 'The queen lives in a castle.', image: 'queen' },
    { word: 'rabbit', phonetic: '/ˈræbɪt/', meaning: '兔子', example: 'The rabbit has long ears.', image: 'rabbit' },
    { word: 'sun', phonetic: '/sʌn/', meaning: '太阳', example: 'The sun is bright.', image: 'sun' },
    { word: 'tree', phonetic: '/triː/', meaning: '树', example: 'There is a big tree in the yard.', image: 'tree' }
];

let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let showAnswerFlag = false;

const wordElement = document.getElementById('word');
const phoneticElement = document.getElementById('phonetic');
const meaningElement = document.getElementById('meaning');
const exampleElement = document.getElementById('example');
const imageElement = document.getElementById('wordImage');
const imageOverlay = document.getElementById('imageOverlay');
const meaningSection = document.getElementById('meaningSection');
const progressFill = document.getElementById('progressFill');
const currentWordSpan = document.getElementById('currentWord');
const totalWordsSpan = document.getElementById('totalWords');
const resultModal = document.getElementById('resultModal');
const correctCountSpan = document.getElementById('correctCount');
const wrongCountSpan = document.getElementById('wrongCount');
const accuracySpan = document.getElementById('accuracy');

function getImageUrl(imageName) {
    return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(imageName + ' cartoon illustration for kids')}&image_size=landscape_4_3`;
}

function showWord() {
    const word = words[currentIndex];
    wordElement.textContent = word.word;
    phoneticElement.textContent = word.phonetic;
    meaningElement.textContent = word.meaning;
    exampleElement.textContent = word.example;
    imageElement.src = getImageUrl(word.image);
    imageOverlay.classList.remove('show-hint');
    meaningSection.classList.remove('show');
    showAnswerFlag = false;
    updateProgress();
}

function updateProgress() {
    currentWordSpan.textContent = currentIndex + 1;
    totalWordsSpan.textContent = words.length;
    const progress = ((currentIndex + 1) / words.length) * 100;
    progressFill.style.width = progress + '%';
}

function showResult() {
    const accuracy = Math.round((correctCount / words.length) * 100);
    correctCountSpan.textContent = correctCount;
    wrongCountSpan.textContent = wrongCount;
    accuracySpan.textContent = accuracy + '%';
    resultModal.classList.add('show');
}

function nextWord() {
    if (currentIndex < words.length - 1) {
        currentIndex++;
        showWord();
    } else {
        showResult();
    }
}

document.getElementById('btnRemember').addEventListener('click', function() {
    if (!showAnswerFlag) {
        meaningSection.classList.add('show');
        showAnswerFlag = true;
        setTimeout(nextWord, 1000);
    } else {
        correctCount++;
        nextWord();
    }
});

document.getElementById('btnForget').addEventListener('click', function() {
    if (!showAnswerFlag) {
        meaningSection.classList.add('show');
        showAnswerFlag = true;
        setTimeout(nextWord, 1000);
    } else {
        wrongCount++;
        nextWord();
    }
});

document.querySelector('.btn-show').addEventListener('click', function() {
    meaningSection.classList.add('show');
    showAnswerFlag = true;
});

imageOverlay.addEventListener('click', function() {
    imageOverlay.classList.add('show-hint');
});

document.getElementById('btnRestart').addEventListener('click', function() {
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    resultModal.classList.remove('show');
    showWord();
});

showWord();