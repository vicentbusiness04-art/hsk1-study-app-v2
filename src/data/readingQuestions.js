export const readingQuestions = [
  // PART 1: Word + Image (True/False)
  {
    id: 21,
    part: 1,
    type: 'true-false',
    question: { text: '写', pinyin: 'xiě', image: '✍️' },
    answer: true,
    explanation: "El carácter '写' (xiě) significa escribir."
  },
  {
    id: 22,
    part: 1,
    type: 'true-false',
    question: { text: '听', pinyin: 'tīng', image: '🎧' },
    answer: true,
    explanation: "El carácter '听' (tīng) significa escuchar."
  },
  {
    id: 23,
    part: 1,
    type: 'true-false',
    question: { text: '菜', pinyin: 'cài', image: '🍵' },
    answer: false,
    explanation: "'菜' (cài) significa comida/verduras, pero la imagen muestra té."
  },
  {
    id: 24,
    part: 1,
    type: 'true-false',
    question: { text: '他', pinyin: 'tā', image: '👩' },
    answer: false,
    explanation: "'他' (tā) es 'él', pero la imagen muestra a una mujer (她)."
  },
  {
    id: 25,
    part: 1,
    type: 'true-false',
    question: { text: '狗', pinyin: 'gǒu', image: '🐶' },
    answer: true,
    explanation: "'狗' (gǒu) significa perro."
  },
  {
    id: 101,
    part: 1,
    type: 'true-false',
    question: { text: '看', pinyin: 'kàn', image: '📖' },
    answer: true,
    explanation: "El carácter '看' (kàn) puede significar leer o mirar."
  },
  {
    id: 102,
    part: 1,
    type: 'true-false',
    question: { text: '米饭', pinyin: 'mǐfàn', image: '🍚' },
    answer: true,
    explanation: "'米饭' (mǐfàn) significa arroz cocido."
  },
  {
    id: 103,
    part: 1,
    type: 'true-false',
    question: { text: '喝', pinyin: 'hē', image: '🥤' },
    answer: true,
    explanation: "'喝' (hē) significa beber."
  },
  {
    id: 104,
    part: 1,
    type: 'true-false',
    question: { text: '猫', pinyin: 'māo', image: '🐶' },
    answer: false,
    explanation: "'猫' (māo) es gato, pero la imagen es un perro."
  },
  {
    id: 105,
    part: 1,
    type: 'true-false',
    question: { text: '衣服', pinyin: 'yīfu', image: '👕' },
    answer: true,
    explanation: "'衣服' (yīfu) significa ropa."
  },
  {
    id: 106,
    part: 1,
    type: 'true-false',
    question: { text: '打', pinyin: 'dǎ', image: '📞' },
    answer: true,
    explanation: "'打' (dǎ) se usa en '打电话' para llamar."
  },
  {
    id: 107,
    part: 1,
    type: 'true-false',
    question: { text: '椅子', pinyin: 'yǐzi', image: '🪑' },
    answer: true,
    explanation: "'椅子' (yǐzi) significa silla."
  },
  {
    id: 108,
    part: 1,
    type: 'true-false',
    question: { text: '苹果', pinyin: 'píngguǒ', image: '🍎' },
    answer: true,
    explanation: "'苹果' (píngguǒ) significa manzana."
  },
  {
    id: 109,
    part: 1,
    type: 'true-false',
    question: { text: '书', pinyin: 'shū', image: '💻' },
    answer: false,
    explanation: "'书' (shū) es libro, pero la imagen es un ordenador."
  },
  {
    id: 110,
    part: 1,
    type: 'true-false',
    question: { text: '钱', pinyin: 'qián', image: '💰' },
    answer: true,
    explanation: "'钱' (qián) significa dinero."
  },

  // PART 2: Match sentence to Image
  {
    id: 26,
    part: 2,
    type: 'matching-image',
    images: [
      { id: 'A', url: '🎁' },
      { id: 'B', url: '📞' },
      { id: 'C', url: '🍎' },
      { id: 'D', url: '👥' },
      { id: 'E', url: '📖' },
      { id: 'F', url: '👗' }
    ],
    sentences: [
      { id: 26, text: '你好，我能吃一块儿吗？', pinyin: 'Nǐ hǎo, wǒ néng chī yíkuàir ma?', answer: 'C' },
      { id: 27, text: '她们在买衣服呢。', pinyin: 'Tāmen zài mǎi yīfu ne.', answer: 'F' },
      { id: 28, text: '天气太热了，多吃些水果。', pinyin: 'Tiānqì tài rè le, duō chī xiē shuǐguǒ.', answer: 'C' },
      { id: 29, text: '喂，你睡觉了吗？', pinyin: 'Wéi, nǐ shuìjiào le ma?', answer: 'B' },
      { id: 30, text: '我们在看看里面是什么东西。', pinyin: 'Wǒmen kànkan lǐmiàn shì shénme dōngxi.', answer: 'A' }
    ],
    example: { text: '我很喜欢这本书。', pinyin: 'Wǒ hěn xǐhuan zhè běn shū.', answer: 'E' }
  },
  {
    id: 41,
    part: 2,
    type: 'matching-image',
    images: [
      { id: 'A', url: '🚗' },
      { id: 'B', url: '🏫' },
      { id: 'C', url: '🍚' },
      { id: 'D', url: '👩‍🏫' },
      { id: 'E', url: '🐱' },
      { id: 'F', url: '✈️' }
    ],
    sentences: [
      { id: 41, text: '他在开车。', pinyin: 'Tā zài kāi chē.', answer: 'A' },
      { id: 42, text: '我想去学校。', pinyin: 'Wǒ xiǎng qù xuéxiào.', answer: 'B' },
      { id: 43, text: '这是一只小猫。', pinyin: 'Zhè shì yì zhī xiǎomāo.', answer: 'E' },
      { id: 44, text: '我爱吃米饭。', pinyin: 'Wǒ ài chī mǐfàn.', answer: 'C' },
      { id: 45, text: '王老师在说话。', pinyin: 'Wáng lǎoshī zài shuōhuà.', answer: 'D' }
    ],
    example: { text: '他在飞机上。', pinyin: 'Tā zài fēijī shàng.', answer: 'F' }
  },

  // PART 3: Match Question to Answer
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
    example: { q: '你喝水 ma？', a: '好的，谢谢！', letter: 'F' }
  },
  {
    id: 51,
    part: 3,
    type: 'matching-text',
    questions: [
        { id: 51, text: '你家在哪儿？', pinyin: 'Nǐ jiā zài nǎr?', answer: 'C' },
        { id: 52, text: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', answer: 'A' },
        { id: 53, text: '你认识他吗？', pinyin: 'Nǐ rènshi tā ma?', answer: 'B' },
        { id: 54, text: '谁在里面？', pinyin: 'Shéi zài lǐmiàn?', answer: 'E' },
        { id: 55, text: '这个多少钱？', pinyin: 'Zhè ge duōshao qián?', answer: 'D' }
    ],
    options: [
        { id: 'A', text: '10点。', pinyin: '10 diǎn.' },
        { id: 'B', text: '是的，他是我老师。', pinyin: 'Shì de, tā shì wǒ lǎoshī.' },
        { id: 'C', text: '北京。', pinyin: 'Běijīng.' },
        { id: 'D', text: '50块。', pinyin: '50 kuài.' },
        { id: 'E', text: '我朋友。', pinyin: 'Wǒ péngyou.' },
        { id: 'F', text: '没关系。', pinyin: 'Méi guānxi.' }
    ],
    example: { q: '对不起。', a: '没关系。', letter: 'F' }
  },

  // PART 4: Fill in the Blanks
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
      { id: 40, text: 'A: 对不起，我不会做饭。 B: （  ），我会。', pinyin: 'A: Duìbuqǐ, wǒ bú huì zuò fàn. B: ( ), wǒ huì.', answer: 'C' }
    ],
    example: { text: '你叫什么（  ）？', pinyin: 'Nǐ jiào shénme ( )?', answer: 'D' }
  },
  {
    id: 61,
    part: 4,
    type: 'fill-blank-group',
    options: [
        { id: 'A', text: '睡觉', pinyin: 'shuìjiào' },
        { id: 'B', text: '电视', pinyin: 'diànshì' },
        { id: 'C', text: '高兴', pinyin: 'gāoxìng' },
        { id: 'D', text: '谢谢', pinyin: 'xièxie' },
        { id: 'E', text: '漂亮', pinyin: 'piàoliang' },
        { id: 'F', text: '水果', pinyin: 'shuǐguǒ' }
    ],
    questions: [
        { id: 61, text: '今天我很高（  ）。', pinyin: 'Jīntiān wǒ hěn gāo ( ).', answer: 'C' },
        { id: 62, text: '这些（  ）很好吃。', pinyin: 'Zhèxiē ( ) hěn hǎochī.', answer: 'F' },
        { id: 63, text: '太晚了，我想（  ）。', pinyin: 'Tài wǎn le, wǒ xiǎng ( ).', answer: 'A' },
        { id: 64, text: '你的衣服很（  ）。', pinyin: 'Nǐ de yīfu hěn ( ).', answer: 'E' },
        { id: 65, text: '爸爸在看（  ）。', pinyin: 'Bàba zài kàn ( ).', answer: 'B' }
    ],
    example: { text: '（  ）你。', pinyin: '( ) nǐ.', answer: 'D' }
  }
];
