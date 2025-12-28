import { hsk1Words } from './hsk1Words';

export const readingQuestions = [
  // Part 1: True or False
  {
    id: 101,
    part: 1,
    type: 'true-false',
    question: { text: '飞机', pinyin: 'fēijī', image: '✈️' },
    answer: true,
    explanation: "'飞机' (fēijī) significa 'avión'. La imagen muestra un avión."
  },
  {
    id: 102,
    part: 1,
    type: 'true-false',
    question: { text: '苹果', pinyin: 'píngguǒ', image: '🐶' },
    answer: false,
    explanation: "'苹果' (píngguǒ) significa 'manzana', pero la imagen muestra un perro (狗 gǒu)."
  },
  {
    id: 103,
    part: 1,
    type: 'true-false',
    question: { text: '看', pinyin: 'kàn', image: '👀' },
    answer: true,
    explanation: "'看' (kàn) significa 'mirar', 'ver' o 'leer'."
  },
  {
    id: 104,
    part: 1,
    type: 'true-false',
    question: { text: '冷', pinyin: 'lěng', image: '🔥' },
    answer: false,
    explanation: "'冷' (lěng) significa 'frío', pero la imagen es fuego (calor/rè)."
  },
    {
    id: 105,
    part: 1,
    type: 'true-false',
    question: { text: '下雨', pinyin: 'xià yǔ', image: '🌧️' },
    answer: true,
    explanation: "'下雨' (xià yǔ) significa 'llover'."
  },

  // Part 2: Matching
  {
    id: 201,
    part: 2,
    type: 'matching',
    options: [
      { id: 'a', content: '我喜欢吃米饭。', pinyin: 'Wǒ xǐhuan chī mǐfàn.', image: '🍚' },
      { id: 'b', content: '他在睡觉。', pinyin: 'Tā zài shuìjiào.', image: '😴' },
      { id: 'c', content: '这儿有很多书。', pinyin: 'Zhèr yǒu hěn duō shū.', image: '📚' }
    ],
    answer: 'a', // Default target for this flow
    explanation: "a: Me gusta comer arroz (🍚). b: Él está durmiendo (😴). c: Aquí hay muchos libros (📚)."
  },

  // Part 3: Multiple Choice
  {
    id: 301,
    part: 3,
    type: 'multiple-choice',
    question: "你喜欢喝什么？",
    pinyin: "Nǐ xǐhuan hē shénme?",
    options: [
      { id: 'a', text: '茶', pinyin: 'chá', image: '🍵' },
      { id: 'b', text: '电视', pinyin: 'diànshì', image: '📺' },
      { id: 'c', text: '飞机', pinyin: 'fēijī', image: '✈️' }
    ],
    answer: 'a',
    explanation: "La pregunta es '¿Qué te gusta beber?'. La única opción bebible es 'Té' (茶 chá)."
  },
  {
    id: 302,
    part: 3,
    type: 'multiple-choice',
    question: "现在几点？",
    pinyin: "Xiànzài jǐ diǎn?",
    options: [
      { id: 'a', text: '苹果', pinyin: 'píngguǒ', image: '🍎' },
      { id: 'b', text: '五点', pinyin: 'wǔ diǎn', image: '🕔' },
      { id: 'c', text: '猫', pinyin: 'māo', image: '🐱' }
    ],
    answer: 'b',
    explanation: "La pregunta es '¿Qué hora es?'. La respuesta correcta indica una hora: 'Cinco en punto'."
  },

  // Part 4: Fill in the blanks
  {
    id: 401,
    part: 4,
    type: 'fill-blank',
    sentence: "我是___生。",
    pinyin: "Wǒ shì ___ sheng.",
    options: [
      { id: 'a', text: '学', word: 'xué' },
      { id: 'b', text: '大', word: 'dà' },
      { id: 'c', text: '不', word: 'bù' }
    ],
    answer: 'a',
    explanation: "'学生' (xuésheng) significa 'estudiante'. '我是学生' = 'Yo soy estudiante'."
  },
  {
    id: 402,
    part: 4,
    type: 'fill-blank',
    sentence: "你___去哪儿？",
    pinyin: "Nǐ ___ qù nǎr?",
    options: [
      { id: 'a', text: '想', word: 'xiǎng' },
      { id: 'b', text: '岁', word: 'suì' },
      { id: 'c', text: '个', word: 'gè' }
    ],
    answer: 'a',
    explanation: "'想' (xiǎng) significa 'querer' o 'pensar'. '你想去哪儿？' = '¿A dónde quieres ir?'"
  }
];