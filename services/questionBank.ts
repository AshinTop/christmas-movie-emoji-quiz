import { MovieQuestion } from "../types";

export const QUESTION_BANK: Omit<MovieQuestion, 'id'>[] = [
  // --- The Absolute Classics ---
  {
    emojis: "🏠😱👦🎄",
    titleZh: "小鬼当家",
    titleEn: "Home Alone",
    acceptableAnswers: ["Home Alone", "Kevin", "小鬼当家", "独自在家"],
    difficulty: "Easy"
  },
  {
    emojis: "🏠😱👦🗽🐦",
    titleZh: "小鬼当家2",
    titleEn: "Home Alone 2: Lost in New York",
    acceptableAnswers: ["Home Alone 2", "Home Alone 2: Lost in New York", "Lost in New York", "小鬼当家2"],
    difficulty: "Medium"
  },
  {
    emojis: "🧝‍♂️🍝🍬🍁",
    titleZh: "精灵总动员",
    titleEn: "Elf",
    acceptableAnswers: ["Elf", "Buddy the Elf", "精灵总动员", "圣诞精灵"],
    difficulty: "Easy"
  },
  {
    emojis: "🟢👺🎄🎁",
    titleZh: "圣诞怪杰",
    titleEn: "How the Grinch Stole Christmas",
    acceptableAnswers: ["The Grinch", "How the Grinch Stole Christmas", "Dr Seuss The Grinch", "圣诞怪杰", "格林奇"],
    difficulty: "Easy"
  },
  {
    emojis: "🚂❄️🎟️🎅🔔",
    titleZh: "极地特快",
    titleEn: "The Polar Express",
    acceptableAnswers: ["The Polar Express", "Polar Express", "极地特快", "极地快车"],
    difficulty: "Easy"
  },
  {
    emojis: "💀🎃🎅🎁😱",
    titleZh: "圣诞夜惊魂",
    titleEn: "The Nightmare Before Christmas",
    acceptableAnswers: ["The Nightmare Before Christmas", "Nightmare Before Christmas", "Tim Burton's Nightmare Before Christmas", "圣诞夜惊魂"],
    difficulty: "Medium"
  },
  {
    emojis: "👮‍♂️🏢🦶🔫🧨",
    titleZh: "虎胆龙威",
    titleEn: "Die Hard",
    acceptableAnswers: ["Die Hard", "John McClane", "虎胆龙威"],
    difficulty: "Medium"
  },
  {
    emojis: "💂‍♀️🧸🩰🐀👑",
    titleZh: "胡桃夹子",
    titleEn: "The Nutcracker",
    acceptableAnswers: ["The Nutcracker", "Nutcracker", "The Nutcracker and the Four Realms", "胡桃夹子"],
    difficulty: "Medium"
  },
  {
    emojis: "❄️☃️🎩🧹",
    titleZh: "雪人",
    titleEn: "The Snowman",
    acceptableAnswers: ["The Snowman", "Snowman", "雪人"],
    difficulty: "Medium"
  },
  {
    emojis: "☃️❄️👭👑🦌",
    titleZh: "冰雪奇缘",
    titleEn: "Frozen",
    acceptableAnswers: ["Frozen", "Elsa", "Anna", "Olaf", "冰雪奇缘"],
    difficulty: "Easy"
  },
  {
    emojis: "💌🇬🇧🇺🇸🏡💏",
    titleZh: "恋爱假期",
    titleEn: "The Holiday",
    acceptableAnswers: ["The Holiday", "恋爱假期"],
    difficulty: "Medium"
  },
  {
    emojis: "📝❤️🇬🇧🎤🥁🦀",
    titleZh: "真爱至上",
    titleEn: "Love Actually",
    acceptableAnswers: ["Love Actually", "真爱至上"],
    difficulty: "Hard"
  },
  {
    emojis: "🎅📝📬🎁📮",
    titleZh: "克劳斯：圣诞节的秘密",
    titleEn: "Klaus",
    acceptableAnswers: ["Klaus", "克劳斯", "圣诞节的秘密"],
    difficulty: "Medium"
  },
  {
    emojis: "🔴🦌👃☁️",
    titleZh: "红鼻子鲁道夫",
    titleEn: "Rudolph the Red-Nosed Reindeer",
    acceptableAnswers: ["Rudolph", "Rudolph the Red-Nosed Reindeer", "Red Nosed Reindeer", "红鼻子鲁道夫"],
    difficulty: "Easy"
  },
  {
    emojis: "🎩☃️☀️❄️",
    titleZh: "冰霜雪人",
    titleEn: "Frosty the Snowman",
    acceptableAnswers: ["Frosty the Snowman", "Frosty", "冰霜雪人"],
    difficulty: "Easy"
  },
  {
    emojis: "👦👓🔫🧼🤬",
    titleZh: "圣诞故事",
    titleEn: "A Christmas Story",
    acceptableAnswers: ["A Christmas Story", "Christmas Story", "Red Ryder", "圣诞故事"],
    difficulty: "Medium"
  },
  {
    emojis: "👻⛓️👴💰🎄🛌",
    titleZh: "圣诞颂歌",
    titleEn: "A Christmas Carol",
    acceptableAnswers: ["A Christmas Carol", "Christmas Carol", "Scrooge", "圣诞颂歌"],
    difficulty: "Medium"
  },
  {
    emojis: "🐸🐷👻🎄🎶",
    titleZh: "布偶圣诞颂歌",
    titleEn: "The Muppet Christmas Carol",
    acceptableAnswers: ["The Muppet Christmas Carol", "Muppet Christmas Carol", "Muppets", "布偶圣诞颂歌"],
    difficulty: "Hard"
  },
  {
    emojis: "👨‍👩‍👧‍👦🛣️🎄🤪⚡️",
    titleZh: "疯狂圣诞假期",
    titleEn: "National Lampoon's Christmas Vacation",
    acceptableAnswers: ["National Lampoon's Christmas Vacation", "Christmas Vacation", "Clark Griswold", "疯狂圣诞假期"],
    difficulty: "Medium"
  },
  {
    emojis: "🎅👨‍⚖️🏛️3️⃣4️⃣",
    titleZh: "34街的奇迹",
    titleEn: "Miracle on 34th Street",
    acceptableAnswers: ["Miracle on 34th Street", "Miracle on 34th St", "34街的奇迹"],
    difficulty: "Medium"
  },
  {
    emojis: "👼🔔🌉👨‍👩‍👧‍👦💋",
    titleZh: "生活多美好",
    titleEn: "It's a Wonderful Life",
    acceptableAnswers: ["It's a Wonderful Life", "Wonderful Life", "生活多美好"],
    difficulty: "Hard"
  },
  {
    emojis: "🎅🧔⬇️🧱🎄",
    titleZh: "圣诞老人",
    titleEn: "The Santa Clause",
    acceptableAnswers: ["The Santa Clause", "Santa Clause", "Tim Allen", "圣诞老人"],
    difficulty: "Easy"
  },
  {
    emojis: "🎅🤶💍👰‍♀️",
    titleZh: "圣诞老人2",
    titleEn: "The Santa Clause 2",
    acceptableAnswers: ["The Santa Clause 2", "Santa Clause 2", "圣诞老人2"],
    difficulty: "Medium"
  },
  {
    emojis: "🎅😈🎩❄️",
    titleZh: "圣诞老人3",
    titleEn: "The Santa Clause 3: The Escape Clause",
    acceptableAnswers: ["The Santa Clause 3", "Santa Clause 3", "Jack Frost", "圣诞老人3"],
    difficulty: "Hard"
  },
  {
    emojis: "👨🚀🦸‍♂️🎁🏃‍♂️",
    titleZh: "一路响叮当",
    titleEn: "Jingle All the Way",
    acceptableAnswers: ["Jingle All the Way", "Turbo Man", "一路响叮当"],
    difficulty: "Medium"
  },
  {
    emojis: "🥃🚬🎅😈👶",
    titleZh: "坏圣诞老人",
    titleEn: "Bad Santa",
    acceptableAnswers: ["Bad Santa", "Billy Bob Thornton", "坏圣诞老人"],
    difficulty: "Medium"
  },
  {
    emojis: "🙅‍♂️🎄🚢⛱️🎅🍖",
    titleZh: "逃离圣诞",
    titleEn: "Christmas with the Kranks",
    acceptableAnswers: ["Christmas with the Kranks", "With the Kranks", "逃离圣诞"],
    difficulty: "Hard"
  },
  {
    emojis: "4️⃣🏡🎄😰💑",
    titleZh: "四个圣诞节",
    titleEn: "Four Christmases",
    acceptableAnswers: ["Four Christmases", "4 Christmases", "四个圣诞节"],
    difficulty: "Medium"
  },
  {
    emojis: "🛸📦🎅🚲👽",
    titleZh: "亚瑟·圣诞",
    titleEn: "Arthur Christmas",
    acceptableAnswers: ["Arthur Christmas", "亚瑟圣诞", "亚瑟·圣诞"],
    difficulty: "Medium"
  },
  {
    emojis: "👹💧🚫🍗🕰️",
    titleZh: "小格林灵",
    titleEn: "Gremlins",
    acceptableAnswers: ["Gremlins", "Gizmo", "Mogwai", "小格林灵", "贪利小人"],
    difficulty: "Hard"
  },
  {
    emojis: "🦇🐧🐱🤡🎄",
    titleZh: "蝙蝠侠归来",
    titleEn: "Batman Returns",
    acceptableAnswers: ["Batman Returns", "Batman", "蝙蝠侠归来"],
    difficulty: "Hard"
  },
  {
    emojis: "✂️👐❄️🏰👩‍❤️‍👨",
    titleZh: "剪刀手爱德华",
    titleEn: "Edward Scissorhands",
    acceptableAnswers: ["Edward Scissorhands", "Scissorhands", "剪刀手爱德华"],
    difficulty: "Medium"
  },
  {
    emojis: "🦁🧙‍♀️🚪❄️⚔️",
    titleZh: "纳尼亚传奇",
    titleEn: "The Chronicles of Narnia",
    acceptableAnswers: ["The Chronicles of Narnia", "Narnia", "Lion Witch Wardrobe", "纳尼亚传奇"],
    difficulty: "Easy"
  },
  {
    emojis: "🧙‍♂️🧹⚡️🍬🏰",
    titleZh: "哈利·波特与魔法石",
    titleEn: "Harry Potter and the Sorcerer's Stone",
    acceptableAnswers: ["Harry Potter", "Sorcerer's Stone", "Philosopher's Stone", "哈利波特"],
    difficulty: "Easy"
  },
  {
    emojis: "👸🔄🎂🍰👩‍🍳",
    titleZh: "公主大对换",
    titleEn: "The Princess Switch",
    acceptableAnswers: ["The Princess Switch", "Princess Switch", "公主大对换"],
    difficulty: "Medium"
  },
  {
    emojis: "🛡️👸🕰️🎄❤️",
    titleZh: " 圣诞前夜的骑士",
    titleEn: "The Knight Before Christmas",
    acceptableAnswers: ["The Knight Before Christmas", "Knight Before Christmas", "圣诞前夜的骑士"],
    difficulty: "Hard"
  },
  {
    emojis: "🗓️👫🚫❤️🎉",
    titleZh: "假日约会",
    titleEn: "Holidate",
    acceptableAnswers: ["Holidate", "假日约会"],
    difficulty: "Medium"
  },
  {
    emojis: "🎤👻👩‍❤️‍👨🏥❤️",
    titleZh: "去年圣诞",
    titleEn: "Last Christmas",
    acceptableAnswers: ["Last Christmas", "George Michael", "去年圣诞"],
    difficulty: "Medium"
  },
  {
    emojis: "🏢🥳🍸👔🎄🤪",
    titleZh: "办公室圣诞派对",
    titleEn: "Office Christmas Party",
    acceptableAnswers: ["Office Christmas Party", "办公室圣诞派对"],
    difficulty: "Hard"
  },
  {
    emojis: "💡🏠👀🛰️⚔️",
    titleZh: "闪亮的圣诞节",
    titleEn: "Deck the Halls",
    acceptableAnswers: ["Deck the Halls", "闪亮的圣诞节"],
    difficulty: "Medium"
  },
  {
    emojis: "🐶🎄🎤🎹",
    titleZh: "查理布朗的圣诞节",
    titleEn: "A Charlie Brown Christmas",
    acceptableAnswers: ["A Charlie Brown Christmas", "Charlie Brown", "Snoopy", "查理布朗", "花生漫画"],
    difficulty: "Easy"
  },
  {
    emojis: "🤖🦾🦸‍♂️🎄",
    titleZh: "钢铁侠3",
    titleEn: "Iron Man 3",
    acceptableAnswers: ["Iron Man 3", "Iron Man", "Tony Stark", "钢铁侠3"],
    difficulty: "Hard"
  },
  {
    emojis: "👦🍫🏭🎫🎅",
    titleZh: "查理和巧克力工厂",
    titleEn: "Charlie and the Chocolate Factory",
    acceptableAnswers: ["Charlie and the Chocolate Factory", "Willy Wonka", "查理和巧克力工厂"],
    difficulty: "Easy"
  },
  {
    emojis: "🧸🍯🐅🐷",
    titleZh: "小熊维尼：非常快乐的维尼新年",
    titleEn: "Winnie the Pooh: A Very Merry Pooh Year",
    acceptableAnswers: ["Winnie the Pooh", "Pooh", "小熊维尼"],
    difficulty: "Medium"
  },
  {
    emojis: "👮‍♀️🚔❄️",
    titleZh: "冰血暴",
    titleEn: "Fargo",
    acceptableAnswers: ["Fargo", "冰血暴"],
    difficulty: "Hard"
  },
  {
    emojis: "💰👬🎩📉🎅",
    titleZh: "颠倒乾坤",
    titleEn: "Trading Places",
    acceptableAnswers: ["Trading Places", "颠倒乾坤"],
    difficulty: "Hard"
  },
  {
    emojis: "🧛‍♂️🦇🏨🎅",
    titleZh: "精灵旅社",
    titleEn: "Hotel Transylvania",
    acceptableAnswers: ["Hotel Transylvania", "精灵旅社"],
    difficulty: "Medium"
  },
  {
    emojis: "🐾🐶🎄🏘️",
    titleZh: "汪汪队立大功之圣诞拯救",
    titleEn: "Paw Patrol: Pups Save Christmas",
    acceptableAnswers: ["Paw Patrol", "汪汪队"],
    difficulty: "Easy"
  },
  {
    emojis: "👶🍼🏙️🦖",
    titleZh: "小鬼当街",
    titleEn: "Baby's Day Out",
    acceptableAnswers: ["Baby's Day Out", "小鬼当街"],
    difficulty: "Medium"
  },
  {
    emojis: "❄️🎄🎶💃🕺",
    titleZh: "白色圣诞节",
    titleEn: "White Christmas",
    acceptableAnswers: ["White Christmas", "Bing Crosby", "白色圣诞节"],
    difficulty: "Medium"
  },
  {
    emojis: "📺👻🚕🏌️‍♂️",
    titleZh: "孤寒财主",
    titleEn: "Scrooged",
    acceptableAnswers: ["Scrooged", "Bill Murray", "孤寒财主"],
    difficulty: "Hard"
  },
  {
    emojis: "💍🖼️🏳️‍🌈🍝",
    titleZh: "斯通家族",
    titleEn: "The Family Stone",
    acceptableAnswers: ["The Family Stone", "Family Stone", "斯通家族"],
    difficulty: "Hard"
  },
  {
    emojis: "👹🐐⛓️❄️💀",
    titleZh: "坎卜斯",
    titleEn: "Krampus",
    acceptableAnswers: ["Krampus", "坎卜斯", "圣诞妖怪"],
    difficulty: "Medium"
  },
  {
    emojis: "🎅📹🎹🚓🧥",
    titleZh: "圣诞大件事",
    titleEn: "The Christmas Chronicles",
    acceptableAnswers: ["The Christmas Chronicles", "Christmas Chronicles", "圣诞大件事"],
    difficulty: "Easy"
  },
  {
    emojis: "👮🏿‍♂️👮🏻‍♂️🔫🎄🛁",
    titleZh: "致命武器",
    titleEn: "Lethal Weapon",
    acceptableAnswers: ["Lethal Weapon", "致命武器"],
    difficulty: "Hard"
  },
  {
    emojis: "🚇🛌🏥💍❄️",
    titleZh: "二见钟情",
    titleEn: "While You Were Sleeping",
    acceptableAnswers: ["While You Were Sleeping", "Sandra Bullock", "二见钟情"],
    difficulty: "Medium"
  },
  {
    emojis: "📔🍷👙🦁🧣",
    titleZh: "BJ单身日记",
    titleEn: "Bridget Jones's Diary",
    acceptableAnswers: ["Bridget Jones's Diary", "Bridget Jones", "BJ单身日记"],
    difficulty: "Medium"
  },
  {
    emojis: "❄️🐰🧚🦷🎅",
    titleZh: "守护者联盟",
    titleEn: "Rise of the Guardians",
    acceptableAnswers: ["Rise of the Guardians", "Guardians", "守护者联盟"],
    difficulty: "Easy"
  },
  {
    emojis: "☃️🎸👨‍👦🧣",
    titleZh: "雪人爸爸",
    titleEn: "Jack Frost",
    acceptableAnswers: ["Jack Frost", "Michael Keaton", "雪人爸爸"],
    difficulty: "Medium"
  },
  {
    emojis: "🎅🛌🎁👮‍♂️",
    titleZh: "圣诞老兄",
    titleEn: "Fred Claus",
    acceptableAnswers: ["Fred Claus", "Vince Vaughn", "圣诞老兄"],
    difficulty: "Medium"
  },
  {
    emojis: "🔨🎅🩸💰🏰",
    titleZh: "暴力之夜",
    titleEn: "Violent Night",
    acceptableAnswers: ["Violent Night", "David Harbour", "暴力之夜"],
    difficulty: "Easy"
  },
  {
    emojis: "👻🎭💃🕺🎤",
    titleZh: "精神溢满",
    titleEn: "Spirited",
    acceptableAnswers: ["Spirited", "Ryan Reynolds", "精神溢满"],
    difficulty: "Medium"
  },
  {
    emojis: "👦🐭🍄🦌👑",
    titleZh: "圣诞男孩",
    titleEn: "A Boy Called Christmas",
    acceptableAnswers: ["A Boy Called Christmas", "圣诞男孩"],
    difficulty: "Medium"
  },
  {
    emojis: "🧸⚙️📐👴🏾👧🏾",
    titleZh: "铃乐大闹耶诞城",
    titleEn: "Jingle Jangle: A Christmas Journey",
    acceptableAnswers: ["Jingle Jangle", "A Christmas Journey", "铃乐大闹耶诞城"],
    difficulty: "Hard"
  },
  {
    emojis: "🎿🤕🏨🧹💍",
    titleZh: "圣诞倾情",
    titleEn: "Falling for Christmas",
    acceptableAnswers: ["Falling for Christmas", "Lindsay Lohan", "圣诞倾情"],
    difficulty: "Medium"
  },
  {
    emojis: "👬🪴📸🌲❄️",
    titleZh: "单身直到永远",
    titleEn: "Single All the Way",
    acceptableAnswers: ["Single All the Way", "单身直到永远"],
    difficulty: "Hard"
  },
  {
    emojis: "🚋💃🎀🎄😿",
    titleZh: "遇见圣路易斯",
    titleEn: "Meet Me in St. Louis",
    acceptableAnswers: ["Meet Me in St. Louis", "Judy Garland", "遇见圣路易斯"],
    difficulty: "Hard"
  },
  {
    emojis: "🐭🎀🦆🎁",
    titleZh: "米奇温馨圣诞",
    titleEn: "Mickey's Once Upon a Christmas",
    acceptableAnswers: ["Mickey's Once Upon a Christmas", "Mickey Mouse", "米奇温馨圣诞"],
    difficulty: "Easy"
  },
  {
    emojis: "👹🤢🏰🎄🔥",
    titleZh: "史莱克过圣诞",
    titleEn: "Shrek the Halls",
    acceptableAnswers: ["Shrek the Halls", "Shrek", "史莱克过圣诞"],
    difficulty: "Easy"
  },
  {
    emojis: "🐼🍜🕯️🥋",
    titleZh: "功夫熊猫感恩节",
    titleEn: "Kung Fu Panda Holiday",
    acceptableAnswers: ["Kung Fu Panda Holiday", "Kung Fu Panda", "功夫熊猫感恩节"],
    difficulty: "Medium"
  },
  {
    emojis: "☃️🐐🥫🛎️",
    titleZh: "奥拉夫的冰雪冒险",
    titleEn: "Olaf's Frozen Adventure",
    acceptableAnswers: ["Olaf's Frozen Adventure", "Olaf", "奥拉夫的冰雪冒险"],
    difficulty: "Easy"
  },
  {
    emojis: "🦌🍎👧🏚️",
    titleZh: "普兰瑟",
    titleEn: "Prancer",
    acceptableAnswers: ["Prancer", "普兰瑟"],
    difficulty: "Hard"
  },
  {
    emojis: "🎮🕹️📺🤛",
    titleZh: "8比特圣诞",
    titleEn: "8-Bit Christmas",
    acceptableAnswers: ["8-Bit Christmas", "8 Bit Christmas", "8比特圣诞"],
    difficulty: "Medium"
  },
  {
    emojis: "👨‍👦👨‍👦👴👴✈️",
    titleZh: "老爸当家2",
    titleEn: "Daddy's Home 2",
    acceptableAnswers: ["Daddy's Home 2", "Daddy's Home", "老爸当家2"],
    difficulty: "Medium"
  },
  {
    emojis: "👩‍👧‍👦🍷💃👵👵",
    titleZh: "坏妈妈的圣诞节",
    titleEn: "A Bad Moms Christmas",
    acceptableAnswers: ["A Bad Moms Christmas", "Bad Moms Christmas", "坏妈妈的圣诞节"],
    difficulty: "Medium"
  },
  {
    emojis: "⛸️🎤🍽️🚑",
    titleZh: "朋友一场",
    titleEn: "Just Friends",
    acceptableAnswers: ["Just Friends", "Ryan Reynolds", "朋友一场"],
    difficulty: "Medium"
  },
  {
    emojis: "🧤🧣💵☕⛸️",
    titleZh: "缘分天注定",
    titleEn: "Serendipity",
    acceptableAnswers: ["Serendipity", "缘分天注定"],
    difficulty: "Hard"
  },
  {
    emojis: "🎅👧🦌🧘‍♀️",
    titleZh: "诺艾尔",
    titleEn: "Noelle",
    acceptableAnswers: ["Noelle", "Anna Kendrick", "诺艾尔"],
    difficulty: "Medium"
  },
  {
    emojis: "🧚‍♀️🏰👗🎸",
    titleZh: "魔法教母",
    titleEn: "Godmothered",
    acceptableAnswers: ["Godmothered", "魔法教母"],
    difficulty: "Medium"
  },
  {
    emojis: "🏨👩🏾🍳⛷️🎰",
    titleZh: "最后的假期",
    titleEn: "Last Holiday",
    acceptableAnswers: ["Last Holiday", "Queen Latifah", "最后的假期"],
    difficulty: "Medium"
  },
  {
    emojis: "🥜☎️🚑🔫",
    titleZh: "混合坚果",
    titleEn: "Mixed Nuts",
    acceptableAnswers: ["Mixed Nuts", "混合坚果"],
    difficulty: "Hard"
  },
  {
    emojis: "🏦💰❄️🚌👮",
    titleZh: "困在天堂",
    titleEn: "Trapped in Paradise",
    acceptableAnswers: ["Trapped in Paradise", "Nicolas Cage", "困在天堂"],
    difficulty: "Hard"
  },
  {
    emojis: "💰🏠👪🔨",
    titleZh: "谁来陪我过圣诞",
    titleEn: "Surviving Christmas",
    acceptableAnswers: ["Surviving Christmas", "Ben Affleck", "谁来陪我过圣诞"],
    difficulty: "Medium"
  },
  {
    emojis: "✈️❄️🏃‍♂️👮‍♂️",
    titleZh: "机场客运站",
    titleEn: "Unaccompanied Minors",
    acceptableAnswers: ["Unaccompanied Minors", "机场客运站"],
    difficulty: "Medium"
  },
  {
    emojis: "🏡🕸️📼🔪",
    titleZh: "最好小心",
    titleEn: "Better Watch Out",
    acceptableAnswers: ["Better Watch Out", "最好小心"],
    difficulty: "Hard"
  },
  {
    emojis: "📞🏠😱👯‍♀️",
    titleZh: "黑色圣诞节",
    titleEn: "Black Christmas",
    acceptableAnswers: ["Black Christmas", "黑色圣诞节"],
    difficulty: "Hard"
  },
  {
    emojis: "🧟🧟‍♀️🎤🏫🍭",
    titleZh: "安娜与世界末日",
    titleEn: "Anna and the Apocalypse",
    acceptableAnswers: ["Anna and the Apocalypse", "安娜与世界末日"],
    difficulty: "Medium"
  },
  {
    emojis: "🤐🍽️☠️🌪️",
    titleZh: "平安夜",
    titleEn: "Silent Night",
    acceptableAnswers: ["Silent Night", "Keira Knightley", "平安夜"],
    difficulty: "Hard"
  },
  {
    emojis: "🎅🔫🏔️🧒",
    titleZh: "胖人",
    titleEn: "Fatman",
    acceptableAnswers: ["Fatman", "Mel Gibson", "胖人"],
    difficulty: "Medium"
  },
  {
    emojis: "🎅💪🐃😈",
    titleZh: "圣诞老人大杀四方",
    titleEn: "Santa's Slay",
    acceptableAnswers: ["Santa's Slay", "Goldberg", "圣诞老人大杀四方"],
    difficulty: "Hard"
  },
  {
    emojis: "📦🎅🇫🇮⛏️",
    titleZh: "稀有出口",
    titleEn: "Rare Exports: A Christmas Tale",
    acceptableAnswers: ["Rare Exports", "Rare Exports A Christmas Tale", "稀有出口"],
    difficulty: "Hard"
  },
  {
    emojis: "👶🗑️🏳️‍🌈⛪🗼",
    titleZh: "东京教父",
    titleEn: "Tokyo Godfathers",
    acceptableAnswers: ["Tokyo Godfathers", "东京教父"],
    difficulty: "Hard"
  },
  {
    emojis: "👩‍❤️‍👩📸🧤🧥",
    titleZh: "卡罗尔",
    titleEn: "Carol",
    acceptableAnswers: ["Carol", "Cate Blanchett", "卡罗尔"],
    difficulty: "Hard"
  },
  {
    emojis: "👩‍👩‍👧‍👧✍️❄️🎹",
    titleZh: "小妇人",
    titleEn: "Little Women",
    acceptableAnswers: ["Little Women", "小妇人"],
    difficulty: "Medium"
  },
  {
    emojis: "🎩🖋️👻🏚️",
    titleZh: "发明圣诞节的人",
    titleEn: "The Man Who Invented Christmas",
    acceptableAnswers: ["The Man Who Invented Christmas", "Charles Dickens", "发明圣诞节的人"],
    difficulty: "Hard"
  },
  {
    emojis: "🏫🎭⭐️👶",
    titleZh: "圣丹尼斯学校",
    titleEn: "Nativity!",
    acceptableAnswers: ["Nativity!", "Nativity", "圣丹尼斯学校"],
    difficulty: "Hard"
  },
  {
    emojis: "🎅🚔🦌🚽",
    titleZh: "拯救圣诞老人",
    titleEn: "Get Santa",
    acceptableAnswers: ["Get Santa", "拯救圣诞老人"],
    difficulty: "Medium"
  },
  {
    emojis: "🧝⏰🎅🏔️",
    titleZh: "拯救大明星",
    titleEn: "Saving Santa",
    acceptableAnswers: ["Saving Santa", "拯救大明星"],
    difficulty: "Hard"
  },
  {
    emojis: "🐕🦌📻",
    titleZh: "橄榄",
    titleEn: "Olive, the Other Reindeer",
    acceptableAnswers: ["Olive the Other Reindeer", "Olive", "橄榄"],
    difficulty: "Medium"
  },
  {
    emojis: "👵🚗🦌🚑",
    titleZh: "奶奶被驯鹿撞了",
    titleEn: "Grandma Got Run Over by a Reindeer",
    acceptableAnswers: ["Grandma Got Run Over by a Reindeer", "奶奶被驯鹿撞了"],
    difficulty: "Easy"
  },
  {
    emojis: "👽🎁🧸🛸",
    titleZh: "外星人圣诞劫",
    titleEn: "Alien Xmas",
    acceptableAnswers: ["Alien Xmas", "外星人圣诞劫"],
    difficulty: "Easy"
  },
  {
    emojis: "👧⛪👶🧥",
    titleZh: "安吉拉的圣诞",
    titleEn: "Angela's Christmas",
    acceptableAnswers: ["Angela's Christmas", "Angela's Christmas Wish", "安吉拉的圣诞"],
    difficulty: "Medium"
  },
  {
    emojis: "🐴🐑🐪🌟",
    titleZh: "圣诞星",
    titleEn: "The Star",
    acceptableAnswers: ["The Star", "圣诞星"],
    difficulty: "Easy"
  },
  {
    emojis: "👣🏔️🦶🎤",
    titleZh: "雪怪大冒险",
    titleEn: "Smallfoot",
    acceptableAnswers: ["Smallfoot", "Yeti", "雪怪大冒险"],
    difficulty: "Easy"
  },
  {
    emojis: "👶🧠🔫🎄",
    titleZh: "宝贝智多星3",
    titleEn: "Home Alone 3",
    acceptableAnswers: ["Home Alone 3", "宝贝智多星3"],
    difficulty: "Medium"
  }
];
