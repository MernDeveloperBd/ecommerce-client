
export const menuData = [
  {
    title: "পোশাক",
    link: "/clothes",
    sub: [
      {
        title: "মেয়েদের পোশাক",
        link: "/womenClothes",
        sub: [
          { title: "রেডিমেড থ্রি-পিছ", link: "/readyMadeThreePiece" },
          { title: "রেডিমেড টু-পিছ", link: "/readyMadeTwoPiece" },
        ],
      },
      {
        title: "ছেলেদের পোশাক",
        link: "/menClothes",
        sub: [
          { title: "পাঞ্জাবী", link: "/panjabi" },
          { title: "টি শার্ট", link: "/teaShirt" },
        ],
      }      
    ],
  },
  {
    title: "ইলেকট্রনিক্স",
    link: "/electronics",
    sub: [
      {
        title: "মোবাইল",
        link: "/mobile",
        sub: [
          { title: "Samsung", link: "/mobile/samsung" },
          { title: "iPhone", link: "/mobile/iphone" },
        ],
      },
      {
        title: "ল্যাপটপ",
        link: "/laptop",
        sub: [
          { title: "Dell", link: "/laptop/dell" },
          { title: "HP", link: "/laptop/hp" },
        ],
      },
    ],
  },
  {
    title: "জুতো",
    link: "/shoes",
    sub: [
      {
        title: "স্পোর্টস জুতো",
        link: "/shoes/sports",
        sub: [
          { title: "Nike", link: "/shoes/nike" },
          { title: "Adidas", link: "/shoes/adidas" },
        ],
      },
    ],
  },
];



/* export const categories = [
  { catValue: "all", catName: "All" },
  { catValue: "fashion", catName: "ফ্যাশন" },
  { catValue: "womenFashion", catName: "মহিলাদের পোশাক" },
  { catValue: "babyProducts", catName: "বাচ্চা পোশাক" },
  { catValue: "menFashion", catName: "ছেলেদের পোশাক" },
  { catValue: "borkha", catName: "বোরকা" },
  { catValue: "cosmetics", catName: "কসমেটিক্স" },
  { catValue: "perfume", catName: "সুগন্ধী" },
  { catValue: "combo", catName: "কম্বো প্যাকেজ" },
  { catValue: "others", catName: "অন্যান্য" },
];


export const subCategories = {
  fashion: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "three-pieces", subCatName: "রেডিমেড থ্রিপিছ" },
    { subCatValue: "two-pieces", subCatName: "রেডিমেড টুপিছ" },
    { subCatValue: "unstege3pieces", subCatName: "আনস্টিজ থ্রিপিছ" },
    { subCatValue: "kurti", subCatName: "গাউন ও কুর্তি" },
    { subCatValue: "lehanga&party", subCatName: "লেহেঙ্গা ও পার্টি" },
    { subCatValue: "ladiesTShirt", subCatName: "লেডিস টি-শার্ট" },
    { subCatValue: "sunglashh", subCatName: "চশমা" },
    { subCatValue: "comboPackage", subCatName: "কম্বো প্যাকেজ" },
  ],
  borkha: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "borkha", subCatName: "বোরকা" },
    { subCatValue: "baby_borkha", subCatName: "বেবি বোরকা" },
    { subCatValue: "hijab&nikan", subCatName: "হিজান ও নিকাব" },
    { subCatValue: "sunnotDress", subCatName: "সুন্নতি ড্রেস" }  
  ],
  perfume: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "top_perfumes", subCatName: "Top Perfumes" },
    { subCatValue: "100_mL_Perfumes", subCatName: "100 mL Perfumes" },
    { subCatValue: "30_mL_Perfumes", subCatName: "30 mL Perfumes" },
    { subCatValue: "Pocket_Perfumes", subCatName: "Pocket Perfumes" }  
  ],
  womenFashion: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "three-piece", subCatName: "রেডিমেড থ্রিপিছ" },
    { subCatValue: "two-piece", subCatName: "রেডিমেড টুপিছ" },
    { subCatValue: "unstege3pieces", subCatName: "আনস্টিজ থ্রিপিছ" },
    { subCatValue: "gown&kurti", subCatName: "গাউন ও কুর্তি" },
    { subCatValue: "lehanga&party", subCatName: "লেহেঙ্গা ও পার্টি" },
    { subCatValue: "westernDress", subCatName: "ওয়েস্টার্ন ড্রেস" },   
    { subCatValue: "saree", subCatName: "শাড়ী" },
    { subCatValue: "handPrintsaree", subCatName: "হ্যান্ডপ্রিন্ট শাড়ী" },
    { subCatValue: "indiansaree", subCatName: "ইন্ডিয়ান শাড়ী" },
    { subCatValue: "tatersaree", subCatName: "তাতের শাড়ী" },       
    { subCatValue: "skirt-top", subCatName: "স্কার্ট" },
    { subCatValue: "onePiece", subCatName: "ওয়ান পিছ" },
    { subCatValue: "twoPiece", subCatName: "টু পিছ" },
    { subCatValue: "threePiece", subCatName: "থ্রি পিছ" },
    { subCatValue: "fourPiece", subCatName: "ফোর পিছ" },
    { subCatValue: "women-bag", subCatName: "মেয়েদের ব্যাগ" },
    { subCatValue: "shoes", subCatName: "জুতা" }
  ],
  babyProducts: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "baby-dress", subCatName: "বেবি ড্রেস" },    
    { subCatValue: "onePiece", subCatName: "ওয়ান পিছ" },
    { subCatValue: "twoPiece", subCatName: "টু পিছ" },
    { subCatValue: "baby-bag", subCatName: "বেবি ব্যাগ" },
    { subCatValue: "towel-tupi", subCatName: "টাওয়েল ও টুপি" },
    { subCatValue: "others", subCatName: "অন্যান্য" },
  ],
  menFashion: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "panjabi", subCatName: "পাঞ্জাবি" },    
    { subCatValue: "shirt", subCatName: "শার্ট" },
    { subCatValue: "t-shirt", subCatName: "টি-শার্ট" },
    { subCatValue: "pant", subCatName: "প্যান্ট" },
    { subCatValue: "shoes", subCatName: "জুতা" },
    { subCatValue: "men-bag", subCatName: "ছেলেদের ব্যাগ" },
    { subCatValue: "lungi", subCatName: "লুঙ্গী" },
    { subCatValue: "others", subCatName: "অন্যান্য" },
  ],
  cosmetics: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "lipstick", subCatName: "লিপস্টিক" },
    { subCatValue: "foundation", subCatName: "ফাউন্ডেশন" },
    { subCatValue: "facewash", subCatName: "ফেস ওয়াশ" },
    { subCatValue: "facemask", subCatName: "ফেস মাস্ক" },
    { subCatValue: "serum", subCatName: "সিরাম" },
    { subCatValue: "leafliner", subCatName: "লিপ লাইনার" },
    { subCatValue: "compactPowder", subCatName: "কম্প্যাক্ট পাউডার" },
    { subCatValue: "others", subCatName: "অন্যান্য" }
  ],
  combo: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "couple-dress", subCatName: "কাপল ড্রেস" },
    { subCatValue: "panjabi-combo", subCatName: "পাঞ্জাবি কম্বো" },
    { subCatValue: "shirt-combo", subCatName: "শার্ট কম্বো" },
    { subCatValue: "saree-combo", subCatName: "শাড়ি কম্বো" },
    { subCatValue: "others", subCatName: "অন্যান্য" },

  ],
  others: [
    { subCatValue: "all", subCatName: "All" },
    { subCatValue: "gift-item", subCatName: "গিফট আইটেম" },
    { subCatValue: "bed-sheet", subCatName: "বেড শীট" },
    { subCatValue: "dining-sheet", subCatName: "ডাইনিং শীট" },
    { subCatValue: "porda", subCatName: "পর্দা" },
    { subCatValue: "grihoSojja", subCatName: "গৃহসজ্জা" },
    { subCatValue: "bag", subCatName: "ব্যাগ" },
    { subCatValue: "watch", subCatName: "ঘড়ি" },
    { subCatValue: "combo", subCatName: "কম্বো প্যাকেজ" },
    { subCatValue: "others", subCatName: "অন্যান্য" },

  ],
};

export const colors = [
    { label: 'All', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' }
]; */
