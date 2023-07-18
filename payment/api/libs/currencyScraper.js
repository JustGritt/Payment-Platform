const cheerio = require('cheerio');

const validCurrencies = {
    USD: "United States Dollar",
    EUR: 'Euro',
    GBP: "Pound sterling",
    AFN: "Afghan Afghani",
    ALL: "Albanian Lek",
    DZD: "Algerian Dinar",
    AOA: "Angolan Kwanza",
    ARS: "Argentine Peso",
    AMD: "Armenian Dram",
    AWG: "Aruban Florin",
    AUD: "Australian Dollar",
    AZN: "Azerbaijani M anat",
    BSD: "Bahamian Dollar",
    BHD: "Bahraini Dinar",
    BBD: "Bajan Dollar",
    BDT: "Bangladeshi Taka",
    BYN: "Belarusian Ruble",
    BZD: "Belize Dollar",
    BMD: "Bermudan Dollar",
    BTN: "Bhutan currency",
    BOB: "Bolivian Boliviano",
    BAM: "Bosnia-Herzegovina Convertible Mark",
    BWP: "Botswanan Pula",
    BRL: "Brazilian Real",
    BND: "Brunei Dollar",
    BGN: "Bulgarian Lev",
    BIF: "Burundian Fra nc",
    XPF: "CFP Franc",
    KHR: "Cambodian riel",
    CAD: "Canadian Dollar",
    CVE: "Cape Verdean Escudo",
    KYD: "Cayman Islands Dollar",
    FCFA: "Central African CFA Franc",
    CLP: "Chilean Peso",
    CLF: "Chilean Unit of Account (UF)",
    CNY: "Chinese Yuan",
    CNY: "Chinese Yuan (offshore)",
    COP: "Colombian Peso",
    KMF: "Comorian Franc",
    CDF: "Congolese Franc",
    CRC: "Costa Rican Colón",
    HRK: "Croatian Kuna",
    CUC: "Cuban Peso",
    CZK: "Czech Koruna",
    DKK: "Danish Krone",
    DJF: "Djiboutian Franc",
    DOP: "Dominican Pe so",
    XCD: "East Caribbean Dollar",
    EGP: "Egyptian Pound",
    ETB: "Ethiopian Birr",
    FJD: "Fijian Dollar",
    GMD: "Gambian dalasi",
    GEL: "Georgian Lari",
    GHS: "Ghanaian Cedi",
    GTQ: "Guatemalan Quetzal",
    GNF: "Guinean Franc",
    GYD: "Guyanaese Dollar",
    HTG: "Haitian Gourde",
    HNL: "Honduran Lempira",
    HKD: "Hong Kong Dollar",
    HUF: "Hungarian Forint",
    ISK: "Icelandic Króna",
    INR: "Indian Rupee",
    IDR: "Indonesian Rupiah",
    IRR: "Iranian Rial",
    IQD: "Iraqi Dinar",
    ILS: "Israeli New Shekel",
    JMD: "Jamaican Dollar",
    JPY: "Japanese Yen",
    JOD: "Jordanian Dinar",
    KZT: "Kazakhstani Tenge",
    KES: "Kenyan Shilling",
    KWD: "Kuwaiti Dinar",
    KGS: "Kyrgystani Som",
    LAK: "Laotian Kip",
    LBP: "Lebanese pound",
    LSL: "Lesotho Loti",
    LRD: "Liberian Dollar",
    LYD: "Libyan Dinar",
    MOP: "Macanese Pataca",
    MKD: "Macedonian Denar",
    MGA: "Malagasy Ariary",
    MWK: "Malawian Kwacha",
    MYR: "Malaysian Ringgit",
    MVR: "Maldivian Rufiyaa",
    MRO: "Mauritanian Ouguiya",
    MUR: "Mauritian Rupee",
    MXN: "Mexican Peso",
    MDL: "Moldovan Leu",
    MAD: "Moroccan Dirham",
    MZN: "Mozambican metical",
    MMK: "Myanmar Kyat",
    NAD: "Namibian dol lar",
    NPR: "Nepalese Rupee",
    ANG: "Netherlands Antillean Guilder",
    NZD: "New Zealand Dollar",
    NIO: "Nicaraguan Córdoba",
    NGN: "Nigerian Naira",
    NOK: "Norwegian Krone",
    OMR: "Omani Rial",
    PKR: "Pakistani Rupee",
    PAB: "Panamanian Balboa",
    PGK: "Papua New Guinean Kina",
    PYG: "Paraguayan Guarani",
    PHP: "Philippine peso",
    PLN: "Poland Złoty",
    GBP: "Pound sterling",
    QAR: "Qatari Rial",
    RON: "Romania n Leu",
    RUB: "Russian Ruble",
    RWF: "Rwandan franc",
    SVC: "Salvadoran Colón",
    SAR: "Saudi Riyal",
    RSD: "Serbian Dinar",
    SCR: "Seychellois Rupee",
    SLL: "Sierra Leonean Leone",
    SGD: "Singapore Dollar",
    SBD: "Solomon Islands Dollar",
    SOS: "Somali Shilling",
    ZAR: "South African Rand",
    KRW: "South Korean won",
    VES: "Sovereign Bolivar",
    LKR: "Sri Lankan Rupee",
    SDG: "Sudanese pound",
    SRD: "Surinamese Dollar",
    SZL: "Swazi Lilangeni",
    SEK: "Swedish Krona",
    CF: "Swiss Franc",
    CHF: "Swiss Franc",
    TJS: "Tajikistani Somoni",
    TZS: "Tanzanian Shilling",
    THB: "Thai Baht",
    TOP: "Tongan Pa\"anga",
    TTD: "Trinidad and Tobago Dollar",
    TND: "Tunisian Dinar",
    TRY: "Turkish lira",
    TMT: "Turkmenistan manat",
    UGX: "Ugandan Shilling",
    UAH: "Ukrainian hryvnia",
    AED: "United Arab Emirates Dirham",
    USD: "United States Dollar",
    UYU: "Uruguayan Peso",
    UZS: "Uzbekistani Som",
    VND: "Vietnamese dong",
    XOF: "West African CFA franc",
    YER: "Yemeni Rial",
    ZMW: "Zambian Kwacha",
    XBT: "Bitcoin",
    ETH: "Ether",
    EUR: "Euro",
    // Add more currency codes as needed
};
  
async function convertCurrency(from, to, amount) {
  if (!validCurrencies[from] || !validCurrencies[to]) {
    throw new Error('Invalid currency code');
  }
  const parsedAmount = parseFloat(amount.replace(',', '.'));
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Invalid amount');
  }

  const response = await fetch(`https://www.google.com/search?q=${parsedAmount}+${from}+to+${to}`);
  const html = await response.text();

  const $ = cheerio.load(html);

  const targetElement = $('div.BNeawe.iBp4i.AP7Wnd').filter((index, element) => {
    const text = $(element).text();
    return text.includes(validCurrencies[to]);
  });

  const resultText = targetElement.text();
  const regex = /([\d.,]+)/;
  const match = resultText.match(regex);
  const result = match ? match[1] : null;

  return result;
}

module.exports = { convertCurrency };