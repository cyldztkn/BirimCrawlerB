const countryList = [
  {
    id: "2004",
    name: "Afghanistan",
    code: "AF",
  },
  {
    id: "2008",
    name: "Albania",
    code: "AL",
  },
  {
    id: "2012",
    name: "Algeria",
    code: "DZ",
  },
  {
    id: "2016",
    name: "American Samoa",
    code: "AS",
  },
  {
    id: "2020",
    name: "Andorra",
    code: "AD",
  },
  {
    id: "2024",
    name: "Angola",
    code: "AO",
  },
  {
    id: "2010",
    name: "Antarctica",
    code: "AQ",
  },
  {
    id: "2028",
    name: "Antigua and Barbuda",
    code: "AG",
  },
  {
    id: "2032",
    name: "Argentina",
    code: "AR",
  },
  {
    id: "2051",
    name: "Armenia",
    code: "AM",
  },
  {
    id: "2036",
    name: "Australia",
    code: "AU",
  },
  {
    id: "2040",
    name: "Austria",
    code: "AT",
  },
  {
    id: "2031",
    name: "Azerbaijan",
    code: "AZ",
  },
  {
    id: "2048",
    name: "Bahrain",
    code: "BH",
  },
  {
    id: "2050",
    name: "Bangladesh",
    code: "BD",
  },
  {
    id: "2052",
    name: "Barbados",
    code: "BB",
  },
  {
    id: "2112",
    name: "Belarus",
    code: "BY",
  },
  {
    id: "2056",
    name: "Belgium",
    code: "BE",
  },
  {
    id: "2084",
    name: "Belize",
    code: "BZ",
  },
  {
    id: "2204",
    name: "Benin",
    code: "BJ",
  },
  {
    id: "2064",
    name: "Bhutan",
    code: "BT",
  },
  {
    id: "2068",
    name: "Bolivia",
    code: "BO",
  },
  {
    id: "2070",
    name: "Bosnia and Herzegovina",
    code: "BA",
  },
  {
    id: "2072",
    name: "Botswana",
    code: "BW",
  },
  {
    id: "2076",
    name: "Brazil",
    code: "BR",
  },
  {
    id: "2096",
    name: "Brunei",
    code: "BN",
  },
  {
    id: "2100",
    name: "Bulgaria",
    code: "BG",
  },
  {
    id: "2854",
    name: "Burkina Faso",
    code: "BF",
  },
  {
    id: "2108",
    name: "Burundi",
    code: "BI",
  },
  {
    id: "2116",
    name: "Cambodia",
    code: "KH",
  },
  {
    id: "2120",
    name: "Cameroon",
    code: "CM",
  },
  {
    id: "2124",
    name: "Canada",
    code: "CA",
  },
  {
    id: "2132",
    name: "Cape Verde",
    code: "CV",
  },
  {
    id: "2535",
    name: "Caribbean Netherlands",
    code: "BQ",
  },
  {
    id: "2140",
    name: "Central African Republic",
    code: "CF",
  },
  {
    id: "2148",
    name: "Chad",
    code: "TD",
  },
  {
    id: "2152",
    name: "Chile",
    code: "CL",
  },
  {
    id: "2156",
    name: "China",
    code: "CN",
  },
  {
    id: "2162",
    name: "Christmas Island",
    code: "CX",
  },
  {
    id: "2166",
    name: "Cocos (Keeling) Islands",
    code: "CC",
  },
  {
    id: "2170",
    name: "Colombia",
    code: "CO",
  },
  {
    id: "2174",
    name: "Comoros",
    code: "KM",
  },
  {
    id: "2184",
    name: "Cook Islands",
    code: "CK",
  },
  {
    id: "2188",
    name: "Costa Rica",
    code: "CR",
  },
  {
    id: "2384",
    name: "Cote d'Ivoire",
    code: "CI",
  },
  {
    id: "2191",
    name: "Croatia",
    code: "HR",
  },
  {
    id: "2531",
    name: "Curacao",
    code: "CW",
  },
  {
    id: "2196",
    name: "Cyprus",
    code: "CY",
  },
  {
    id: "2203",
    name: "Czechia",
    code: "CZ",
  },
  {
    id: "2180",
    name: "Democratic Republic of the Congo",
    code: "CD",
  },
  {
    id: "2208",
    name: "Denmark",
    code: "DK",
  },
  {
    id: "2262",
    name: "Djibouti",
    code: "DJ",
  },
  {
    id: "2212",
    name: "Dominica",
    code: "DM",
  },
  {
    id: "2214",
    name: "Dominican Republic",
    code: "DO",
  },
  {
    id: "2218",
    name: "Ecuador",
    code: "EC",
  },
  {
    id: "2818",
    name: "Egypt",
    code: "EG",
  },
  {
    id: "2222",
    name: "El Salvador",
    code: "SV",
  },
  {
    id: "2226",
    name: "Equatorial Guinea",
    code: "GQ",
  },
  {
    id: "2232",
    name: "Eritrea",
    code: "ER",
  },
  {
    id: "2233",
    name: "Estonia",
    code: "EE",
  },
  {
    id: "2748",
    name: "Eswatini",
    code: "SZ",
  },
  {
    id: "2231",
    name: "Ethiopia",
    code: "ET",
  },
  {
    id: "2583",
    name: "Federated States of Micronesia",
    code: "FM",
  },
  {
    id: "2242",
    name: "Fiji",
    code: "FJ",
  },
  {
    id: "2246",
    name: "Finland",
    code: "FI",
  },
  {
    id: "2250",
    name: "France",
    code: "FR",
  },
  {
    id: "2258",
    name: "French Polynesia",
    code: "PF",
  },
  {
    id: "2260",
    name: "French Southern and Antarctic Lands",
    code: "TF",
  },
  {
    id: "2266",
    name: "Gabon",
    code: "GA",
  },
  {
    id: "2268",
    name: "Georgia",
    code: "GE",
  },
  {
    id: "2276",
    name: "Germany",
    code: "DE",
  },
  {
    id: "2288",
    name: "Ghana",
    code: "GH",
  },
  {
    id: "2300",
    name: "Greece",
    code: "GR",
  },
  {
    id: "2308",
    name: "Grenada",
    code: "GD",
  },
  {
    id: "2316",
    name: "Guam",
    code: "GU",
  },
  {
    id: "2320",
    name: "Guatemala",
    code: "GT",
  },
  {
    id: "2831",
    name: "Guernsey",
    code: "GG",
  },
  {
    id: "2324",
    name: "Guinea",
    code: "GN",
  },
  {
    id: "2624",
    name: "Guinea-Bissau",
    code: "GW",
  },
  {
    id: "2328",
    name: "Guyana",
    code: "GY",
  },
  {
    id: "2332",
    name: "Haiti",
    code: "HT",
  },
  {
    id: "2334",
    name: "Heard Island and McDonald Islands",
    code: "HM",
  },
  {
    id: "2340",
    name: "Honduras",
    code: "HN",
  },
  {
    id: "2348",
    name: "Hungary",
    code: "HU",
  },
  {
    id: "2352",
    name: "Iceland",
    code: "IS",
  },
  {
    id: "2356",
    name: "India",
    code: "IN",
  },
  {
    id: "2360",
    name: "Indonesia",
    code: "ID",
  },
  {
    id: "2368",
    name: "Iraq",
    code: "IQ",
  },
  {
    id: "2372",
    name: "Ireland",
    code: "IE",
  },
  {
    id: "2376",
    name: "Israel",
    code: "IL",
  },
  {
    id: "2380",
    name: "Italy",
    code: "IT",
  },
  {
    id: "2388",
    name: "Jamaica",
    code: "JM",
  },
  {
    id: "2392",
    name: "Japan",
    code: "JP",
  },
  {
    id: "2832",
    name: "Jersey",
    code: "JE",
  },
  {
    id: "2400",
    name: "Jordan",
    code: "JO",
  },
  {
    id: "2398",
    name: "Kazakhstan",
    code: "KZ",
  },
  {
    id: "2404",
    name: "Kenya",
    code: "KE",
  },
  {
    id: "2296",
    name: "Kiribati",
    code: "KI",
  },
  {
    id: "2414",
    name: "Kuwait",
    code: "KW",
  },
  {
    id: "2417",
    name: "Kyrgyzstan",
    code: "KG",
  },
  {
    id: "2418",
    name: "Laos",
    code: "LA",
  },
  {
    id: "2428",
    name: "Latvia",
    code: "LV",
  },
  {
    id: "2422",
    name: "Lebanon",
    code: "LB",
  },
  {
    id: "2426",
    name: "Lesotho",
    code: "LS",
  },
  {
    id: "2430",
    name: "Liberia",
    code: "LR",
  },
  {
    id: "2434",
    name: "Libya",
    code: "LY",
  },
  {
    id: "2438",
    name: "Liechtenstein",
    code: "LI",
  },
  {
    id: "2440",
    name: "Lithuania",
    code: "LT",
  },
  {
    id: "2442",
    name: "Luxembourg",
    code: "LU",
  },
  {
    id: "2450",
    name: "Madagascar",
    code: "MG",
  },
  {
    id: "2454",
    name: "Malawi",
    code: "MW",
  },
  {
    id: "2458",
    name: "Malaysia",
    code: "MY",
  },
  {
    id: "2462",
    name: "Maldives",
    code: "MV",
  },
  {
    id: "2466",
    name: "Mali",
    code: "ML",
  },
  {
    id: "2470",
    name: "Malta",
    code: "MT",
  },
  {
    id: "2584",
    name: "Marshall Islands",
    code: "MH",
  },
  {
    id: "2478",
    name: "Mauritania",
    code: "MR",
  },
  {
    id: "2480",
    name: "Mauritius",
    code: "MU",
  },
  {
    id: "2484",
    name: "Mexico",
    code: "MX",
  },
  {
    id: "2498",
    name: "Moldova",
    code: "MD",
  },
  {
    id: "2492",
    name: "Monaco",
    code: "MC",
  },
  {
    id: "2496",
    name: "Mongolia",
    code: "MN",
  },
  {
    id: "2499",
    name: "Montenegro",
    code: "ME",
  },
  {
    id: "2504",
    name: "Morocco",
    code: "MA",
  },
  {
    id: "2508",
    name: "Mozambique",
    code: "MZ",
  },
  {
    id: "2104",
    name: "Myanmar (Burma)",
    code: "MM",
  },
  {
    id: "2516",
    name: "Namibia",
    code: "NA",
  },
  {
    id: "2520",
    name: "Nauru",
    code: "NR",
  },
  {
    id: "2524",
    name: "Nepal",
    code: "NP",
  },
  {
    id: "2528",
    name: "Netherlands",
    code: "NL",
  },
  {
    id: "2540",
    name: "New Caledonia",
    code: "NC",
  },
  {
    id: "2554",
    name: "New Zealand",
    code: "NZ",
  },
  {
    id: "2558",
    name: "Nicaragua",
    code: "NI",
  },
  {
    id: "2562",
    name: "Niger",
    code: "NE",
  },
  {
    id: "2566",
    name: "Nigeria",
    code: "NG",
  },
  {
    id: "2570",
    name: "Niue",
    code: "NU",
  },
  {
    id: "2574",
    name: "Norfolk Island",
    code: "NF",
  },
  {
    id: "2807",
    name: "North Macedonia",
    code: "MK",
  },
  {
    id: "2580",
    name: "Northern Mariana Islands",
    code: "MP",
  },
  {
    id: "2578",
    name: "Norway",
    code: "NO",
  },
  {
    id: "2512",
    name: "Oman",
    code: "OM",
  },
  {
    id: "2586",
    name: "Pakistan",
    code: "PK",
  },
  {
    id: "2585",
    name: "Palau",
    code: "PW",
  },
  {
    id: "2591",
    name: "Panama",
    code: "PA",
  },
  {
    id: "2598",
    name: "Papua New Guinea",
    code: "PG",
  },
  {
    id: "2600",
    name: "Paraguay",
    code: "PY",
  },
  {
    id: "2604",
    name: "Peru",
    code: "PE",
  },
  {
    id: "2608",
    name: "Philippines",
    code: "PH",
  },
  {
    id: "2612",
    name: "Pitcairn Islands",
    code: "PN",
  },
  {
    id: "2616",
    name: "Poland",
    code: "PL",
  },
  {
    id: "2620",
    name: "Portugal",
    code: "PT",
  },
  {
    id: "2634",
    name: "Qatar",
    code: "QA",
  },
  {
    id: "2178",
    name: "Republic of the Congo",
    code: "CG",
  },
  {
    id: "2642",
    name: "Romania",
    code: "RO",
  },
  {
    id: "2643",
    name: "Russia",
    code: "RU",
  },
  {
    id: "2646",
    name: "Rwanda",
    code: "RW",
  },
  {
    id: "2652",
    name: "Saint Barthelemy",
    code: "BL",
  },
  {
    id: "2654",
    name: "Saint Helena, Ascension and Tristan da Cunha",
    code: "SH",
  },
  {
    id: "2659",
    name: "Saint Kitts and Nevis",
    code: "KN",
  },
  {
    id: "2662",
    name: "Saint Lucia",
    code: "LC",
  },
  {
    id: "2663",
    name: "Saint Martin",
    code: "MF",
  },
  {
    id: "2666",
    name: "Saint Pierre and Miquelon",
    code: "PM",
  },
  {
    id: "2670",
    name: "Saint Vincent and the Grenadines",
    code: "VC",
  },
  {
    id: "2882",
    name: "Samoa",
    code: "WS",
  },
  {
    id: "2674",
    name: "San Marino",
    code: "SM",
  },
  {
    id: "2678",
    name: "Sao Tome and Principe",
    code: "ST",
  },
  {
    id: "2682",
    name: "Saudi Arabia",
    code: "SA",
  },
  {
    id: "2686",
    name: "Senegal",
    code: "SN",
  },
  {
    id: "2688",
    name: "Serbia",
    code: "RS",
  },
  {
    id: "2690",
    name: "Seychelles",
    code: "SC",
  },
  {
    id: "2694",
    name: "Sierra Leone",
    code: "SL",
  },
  {
    id: "2702",
    name: "Singapore",
    code: "SG",
  },
  {
    id: "2534",
    name: "Sint Maarten",
    code: "SX",
  },
  {
    id: "2703",
    name: "Slovakia",
    code: "SK",
  },
  {
    id: "2705",
    name: "Slovenia",
    code: "SI",
  },
  {
    id: "2090",
    name: "Solomon Islands",
    code: "SB",
  },
  {
    id: "2706",
    name: "Somalia",
    code: "SO",
  },
  {
    id: "2710",
    name: "South Africa",
    code: "ZA",
  },
  {
    id: "2239",
    name: "South Georgia and the South Sandwich Islands",
    code: "GS",
  },
  {
    id: "2410",
    name: "South Korea",
    code: "KR",
  },
  {
    id: "2728",
    name: "South Sudan",
    code: "SS",
  },
  {
    id: "2724",
    name: "Spain",
    code: "ES",
  },
  {
    id: "2144",
    name: "Sri Lanka",
    code: "LK",
  },
  {
    id: "2736",
    name: "Sudan",
    code: "SD",
  },
  {
    id: "2740",
    name: "Suriname",
    code: "SR",
  },
  {
    id: "2752",
    name: "Sweden",
    code: "SE",
  },
  {
    id: "2756",
    name: "Switzerland",
    code: "CH",
  },
  {
    id: "2158",
    name: "Taiwan",
    code: "TW",
  },
  {
    id: "2762",
    name: "Tajikistan",
    code: "TJ",
  },
  {
    id: "2834",
    name: "Tanzania",
    code: "TZ",
  },
  {
    id: "2764",
    name: "Thailand",
    code: "TH",
  },
  {
    id: "2044",
    name: "The Bahamas",
    code: "BS",
  },
  {
    id: "2270",
    name: "The Gambia",
    code: "GM",
  },
  {
    id: "2626",
    name: "Timor-Leste",
    code: "TL",
  },
  {
    id: "2768",
    name: "Togo",
    code: "TG",
  },
  {
    id: "2772",
    name: "Tokelau",
    code: "TK",
  },
  {
    id: "2776",
    name: "Tonga",
    code: "TO",
  },
  {
    id: "2780",
    name: "Trinidad and Tobago",
    code: "TT",
  },
  {
    id: "2788",
    name: "Tunisia",
    code: "TN",
  },
  {
    id: "2792",
    name: "Turkey",
    code: "TR",
  },
  {
    id: "2795",
    name: "Turkmenistan",
    code: "TM",
  },
  {
    id: "2798",
    name: "Tuvalu",
    code: "TV",
  },
  {
    id: "2800",
    name: "Uganda",
    code: "UG",
  },
  {
    id: "2804",
    name: "Ukraine",
    code: "UA",
  },
  {
    id: "2784",
    name: "United Arab Emirates",
    code: "AE",
  },
  {
    id: "2826",
    name: "United Kingdom",
    code: "GB",
  },
  {
    id: "2840",
    name: "United States",
    code: "US",
  },
  {
    id: "2581",
    name: "United States Minor Outlying Islands",
    code: "UM",
  },
  {
    id: "2858",
    name: "Uruguay",
    code: "UY",
  },
  {
    id: "2860",
    name: "Uzbekistan",
    code: "UZ",
  },
  {
    id: "2548",
    name: "Vanuatu",
    code: "VU",
  },
  {
    id: "2336",
    name: "Vatican City",
    code: "VA",
  },
  {
    id: "2862",
    name: "Venezuela",
    code: "VE",
  },
  {
    id: "2704",
    name: "Vietnam",
    code: "VN",
  },
  {
    id: "2876",
    name: "Wallis and Futuna",
    code: "WF",
  },
  {
    id: "2887",
    name: "Yemen",
    code: "YE",
  },
  {
    id: "2894",
    name: "Zambia",
    code: "ZM",
  },
  {
    id: "2716",
    name: "Zimbabwe",
    code: "ZW",
  },
];

export default function getCountryById(geoId) {
  const country = countryList.find((c) => c.id == geoId);
  return country ? { name: country.name, code: country.code } : null;
}
