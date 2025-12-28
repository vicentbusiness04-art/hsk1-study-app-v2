export const readingQuestions = [
  // PART 1: Word + Image (True/False)
  // Exam H10901, questions 21-25
  {
    id: 21,
    part: 1,
    type: 'true-false',
    question: { text: '写', pinyin: 'xiě', image: 'https://img.icons8.com/color/144/writing.png' },
    answer: true,
    example: { text: '电视', pinyin: 'diànshì', image: 'https://img.icons8.com/color/144/television.png', answer: false },
    explanation: "El carácter '写' (xiě) significa escribir."
  },
  {
    id: 22,
    part: 1,
    type: 'true-false',
    question: { text: '听', pinyin: 'tīng', image: 'https://img.icons8.com/color/144/headphones.png' },
    answer: true,
    explanation: "El carácter '听' (tīng) significa escuchar."
  },
  {
    id: 23,
    part: 1,
    type: 'true-false',
    question: { text: '菜', pinyin: 'cài', image: 'https://img.icons8.com/color/144/tea-cup.png' },
    answer: false,
    explanation: "'菜' (cài) significa comida/verduras, pero la imagen muestra té."
  },
  {
    id: 24,
    part: 1,
    type: 'true-false',
    question: { text: '他', pinyin: 'tā', image: 'https://img.icons8.com/color/144/woman-profile.png' },
    answer: false,
    explanation: "'他' (tā) se refiere a 'él' (hombre), pero la imagen muestra a una mujer (她 tā)."
  },
  {
    id: 25,
    part: 1,
    type: 'true-false',
    question: { text: '狗', pinyin: 'gǒu', image: 'https://img.icons8.com/color/144/dog.png' },
    answer: true,
    explanation: "'狗' (gǒu) significa perro."
  },

  // PART 2: Match sentence to Image
  // Exam H10901, questions 26-30
  {
    id: 26,
    part: 2,
    type: 'matching-image',
    images: [
      { id: 'A', url: 'https://img.icons8.com/color/144/gift--v1.png' },
      { id: 'B', url: 'https://img.icons8.com/color/144/phone.png' },
      { id: 'C', url: 'https://img.icons8.com/color/144/fruits.png' },
      { id: 'D', url: 'https://img.icons8.com/color/144/business-group.png' },
      { id: 'E', url: 'https://img.icons8.com/color/144/reading.png' },
      { id: 'F', url: 'https://img.icons8.com/color/144/clothes.png' }
    ],
    sentences: [
      { id: 26, text: '你好，我能吃一块儿吗？', pinyin: 'Nǐ hǎo, wǒ néng chī yíkuàir ma?', answer: 'C' },
      { id: 27, text: '她们在买衣服呢。', pinyin: 'Tāmen zài mǎi yīfu ne.', answer: 'F' },
      { id: 28, text: '天气太热了，多吃些水果。', pinyin: 'Tiānqì tài rè le, duō chī xiē shuǐguǒ.', answer: 'C' }, // Usando C de nuevo como ejemplo
      { id: 29, text: '喂，你睡觉了吗？', pinyin: 'Wéi, nǐ shuìjiào le ma?', answer: 'B' },
      { id: 30, text: '我们在看看里面是什么东西。', pinyin: 'Wǒmen kànkan lǐmiàn shì shénme dōngxi.', answer: 'A' }
    ],
    example: { text: '我很喜欢这本书。', pinyin: 'Wǒ hěn xǐhuan zhè běn shū.', answer: 'E' }
  },

  // PART 3: Match Question to Answer
  // Exam H10901, questions 31-35
  {
    id: 31,
    part: 3,
    type: 'matching-text',
    questions: [
      { id: 31, text: '那个人是谁？', pinyin: 'Nàge rén shì shéi?', answer: 'C' },
      { id: 32, text: '他女儿多大了？', pinyin: 'Tā nǚ’ér duō dà le?', answer: 'D' },
      { id: 33, text: '你的同学在哪儿工作？', pinyin: 'Nǐ de tóngxué zài nǎr gōngzuò?', answer: 'A' },
      { id: 34, text: '昨天上午天气怎么样？', pinyin: 'Zuótiān shàngwǔ tiānqì zěnmeyàng?', answer: 'B' },
      { id: 35, text: '爸爸什么时候来北京呢？', pinyin: 'Bàba shénme shíhou lái Běijīng ne?', answer: 'E' }
    ],
    options: [
      { id: 'A', text: '医院。', pinyin: 'Yīyuàn.' },
      { id: 'B', text: '下雨了。', pinyin: 'Xià yǔ le.' },
      { id: 'C', text: '我不认识她。', pinyin: 'Wǒ bú rènshi tā.' },
      { id: 'D', text: '7岁。', pinyin: '7 suì.' },
      { id: 'E', text: '下个月。', pinyin: 'Xià ge yuè.' },
      { id: 'F', text: '好的，谢谢！', pinyin: 'Hǎo de, xièxie!' }
    ],
    example: { q: '你喝水吗？', a: '好的，谢谢！', letter: 'F' }
  },

  // PART 4: Fill in the Blanks
  // Exam H10901, questions 36-40
  {
    id: 36,
    part: 4,
    type: 'fill-blank-group',
    options: [
      { id: 'A', text: '坐', pinyin: 'zuò' },
      { id: 'B', text: '前面', pinyin: 'qiánmiàn' },
      { id: 'C', text: '没关系', pinyin: 'méi guānxi' },
      { id: 'D', text: '名字', pinyin: 'míngzi' },
      { id: 'E', text: '汉语', pinyin: 'Hànyǔ' },
      { id: 'F', text: '月', pinyin: 'yuè' }
    ],
    questions: [
      { id: 36, text: '昨天是 8（  ）19 日。', pinyin: 'Zuótiān shì 8 ( ) 19 rì.', answer: 'F' },
      { id: 37, text: '那个饭馆儿在火车站（  ）。', pinyin: 'Nàge fànguǎnr zài huǒchēzhàn ( ).', answer: 'B' },
      { id: 38, text: '你会说（  ）吗？', pinyin: 'Nǐ huì shuō ( ) ma?', answer: 'E' },
      { id: 39, text: 'A: 王先生在吗？ B: 在，请（  ），我去叫他。', pinyin: 'A: Wáng xiānsheng zài ma? B: Zài, qǐng ( ), wǒ qù jiào tā.', answer: 'A' },
      { id: 40, peasant: 'A: 对不起，我不会做饭。 B: （  ），我会。', pinyin: 'A: Duìbuqǐ, wǒ bú huì zuò fàn. B: ( ), wǒ huì.', answer: 'C' }
    ],
    example: { text: '你叫什么（  ）？', pinyin: 'Nǐ jiào shénme ( )?', answer: 'D' }
  }
];
