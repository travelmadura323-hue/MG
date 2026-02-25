export const destinations: Record<string, string[]> = {
  India: [
    "Andaman", "Assam", "Arunachal Pradesh", "Golden Triangle", "Gujarat",
    "Himachal Pradesh", "Karnataka", "Kashmir", "Kerala", "Maharashtra",
    "Madhya Pradesh", "North East India", "Orissa", "Rajasthan", "Tamil Nadu",
    "Telangana", "Goa", "Sikkim", "Delhi", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  ],
  "South East Asia": [
    "Bhutan", "Maldives", "Nepal", "Sri Lanka", "Cambodia",
    "Indonesia", "Malaysia", "Philippines", "Singapore", "Thailand", "Vietnam",
  ],
  "Mainland Europe": [
    "Austria", "Belgium", "Finland", "France", "Germany", "Iceland",
    "Ireland", "Italy", "Luxembourg", "Netherlands", "Norway", "Poland",
    "Portugal", "Denmark", "Spain", "Sweden", "Switzerland", "United Kingdom", "Vatican City",
  ],
  Australasia: ["Australia", "New Zealand", "Fiji", "Queensland"],
  "East Asia": ["China", "Japan", "South Korea", "Taiwan", "Hong Kong"],
  "Eastern Europe": ["Greece", "Bulgaria", "Czech Republic", "Hungary", "Russia", "Croatia"],
  "Middle East": ["Jordan", "Kuwait", "Oman", "Qatar", "Saudi Arabia", "Turkey", "Dubai"],
  Africa: [
    "Egypt", "Kenya", "Madagascar", "Mauritius", "Morocco",
    "Mozambique", "Namibia", "Seychelles", "South Africa",
  ],
  "North America": ["Canada", "United States of America", "Mexico"],
  "Central Asia": ["Kazakhstan", "Uzbekistan", "Azerbaijan"],
}

export interface Tour {
  slug: string
  title: string
  location: string
  duration: string
  price: string
  image: string
  description: string
  minAge: string
  travelers: string
  startingPlace: string
  overview: string
  itinerary: { day: string; title: string; description: string }[]
  included: string[]
  excluded: string[]
}

export interface Destination {
  slug: string
  name: string
  region: string
  duration: string
  priceRange: string
  image: string
  description: string
  overview: string
  minAge: string
  travelers: string
  bestTime: string
  attractions: string[]
  accommodations: string[]
  itinerary: { day: string; activities: string }[]
  createdAt: string
}

export const popularTours: Tour[] = [
  {
    slug: "enchanting-bali",
    title: "Enchanting Bali Getaway",
    location: "Bali, Indonesia",
    duration: "7 Days / 6 Nights",
    price: "$1,299",
    image: "/images/tours/bali.jpg",
    description: "Discover the magical island of Bali with ancient temples, rice terraces, and pristine beaches.",
    minAge: "10",
    travelers: "2-15",
    startingPlace: "Ngurah Rai International Airport",
    overview: "Immerse yourself in the enchanting beauty of Bali on this 7-day adventure. From the spiritual temple of Uluwatu perched on dramatic clifftops to the lush Tegallalang Rice Terraces, every day brings a new wonder. Enjoy world-class surfing, traditional Balinese dance performances, and culinary experiences that will tantalize your taste buds. This tour perfectly blends cultural immersion with relaxation.",
    itinerary: [
      { day: "Day 1", title: "Arrival & Welcome", description: "Arrive at Ngurah Rai Airport. Transfer to your luxury resort in Seminyak. Evening welcome dinner with traditional Balinese performance." },
      { day: "Day 2", title: "Ubud Cultural Tour", description: "Visit Sacred Monkey Forest, Tegallalang Rice Terraces, and local artisan villages. Afternoon spa treatment." },
      { day: "Day 3", title: "Temple Discovery", description: "Explore Uluwatu Temple at sunset, visit Tanah Lot and enjoy the spectacular cliff-side Kecak dance." },
      { day: "Day 4", title: "Water Adventures", description: "Full day of water sports at Nusa Dua: snorkeling, parasailing, and jet skiing. Sunset dinner cruise." },
      { day: "Day 5", title: "Mount Batur Sunrise", description: "Early morning trek to Mount Batur for a breathtaking sunrise. Hot spring relaxation in the afternoon." },
      { day: "Day 6", title: "Beach & Leisure", description: "Free day to explore Seminyak Beach, shop at local boutiques, or enjoy a full-body Balinese massage." },
      { day: "Day 7", title: "Departure", description: "Leisurely breakfast and airport transfer. Farewell Bali!" },
    ],
    included: ["Luxury hotel accommodation", "Daily breakfast & 3 dinners", "Private guided tours", "Airport transfers", "Entry fees to attractions", "Spa treatments"],
    excluded: ["International flights", "Travel insurance", "Personal expenses", "Optional activities", "Tips & gratuities"],
  },
  {
    slug: "romantic-paris",
    title: "Romantic Paris Experience",
    location: "Paris, France",
    duration: "5 Days / 4 Nights",
    price: "$1,899",
    image: "/images/tours/paris.jpg",
    description: "Experience the City of Light with its iconic landmarks, world-class cuisine, and romantic ambiance.",
    minAge: "12",
    travelers: "2-10",
    startingPlace: "Charles de Gaulle Airport",
    overview: "Paris, the City of Light, beckons with its timeless charm and unparalleled elegance. This 5-day journey takes you through iconic landmarks, hidden gems, and gastronomic delights. From the majestic Eiffel Tower to the artistic treasures of the Louvre, every moment in Paris is a masterpiece waiting to unfold.",
    itinerary: [
      { day: "Day 1", title: "Arrival in Paris", description: "Arrive at CDG Airport. Transfer to your boutique hotel near the Champs-Elysees. Evening Seine River cruise." },
      { day: "Day 2", title: "Iconic Landmarks", description: "Visit the Eiffel Tower, Arc de Triomphe, and Notre-Dame. Afternoon in Montmartre and Sacre-Coeur." },
      { day: "Day 3", title: "Art & Culture", description: "Full day at the Louvre and Musee d'Orsay. Evening dinner at a Michelin-starred restaurant." },
      { day: "Day 4", title: "Versailles Excursion", description: "Day trip to the Palace of Versailles and its stunning gardens. Evening free for exploration." },
      { day: "Day 5", title: "Departure", description: "Morning shopping at Galleries Lafayette. Airport transfer." },
    ],
    included: ["Boutique hotel stay", "Daily breakfast", "Guided city tours", "Museum passes", "Seine River cruise", "Versailles day trip"],
    excluded: ["International flights", "Travel insurance", "Lunches and some dinners", "Personal shopping", "Tips"],
  },
  {
    slug: "swiss-alps-adventure",
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    duration: "6 Days / 5 Nights",
    price: "$2,499",
    image: "/images/tours/switzerland.jpg",
    description: "Explore the breathtaking Swiss Alps with pristine lakes, charming villages, and world-class skiing.",
    minAge: "8",
    travelers: "2-12",
    startingPlace: "Zurich Airport",
    overview: "Switzerland awaits with its dramatic alpine scenery, crystal-clear lakes, and charming mountain villages. This 6-day adventure takes you through the heart of the Swiss Alps, from the cosmopolitan cities of Zurich and Lucerne to the iconic peaks of Jungfrau and Matterhorn. Experience world-class Swiss hospitality, indulge in fondue and chocolate, and ride some of the most scenic railways on Earth.",
    itinerary: [
      { day: "Day 1", title: "Arrival in Zurich", description: "Arrive at Zurich Airport. Explore the Old Town and enjoy a lakeside dinner." },
      { day: "Day 2", title: "Lucerne & Mount Pilatus", description: "Travel to Lucerne. Visit Chapel Bridge and take the cable car to Mount Pilatus." },
      { day: "Day 3", title: "Jungfraujoch Top of Europe", description: "Scenic train ride to Jungfraujoch, the highest railway station in Europe at 3,454m." },
      { day: "Day 4", title: "Interlaken Adventures", description: "Paragliding, lake cruises, or hiking in the Interlaken region." },
      { day: "Day 5", title: "Zermatt & Matterhorn", description: "Train to Zermatt. View the iconic Matterhorn. Gornergrat Railway panoramic experience." },
      { day: "Day 6", title: "Departure", description: "Morning at leisure. Transfer to Zurich Airport." },
    ],
    included: ["4-star hotel accommodation", "Daily breakfast", "Swiss Travel Pass", "Jungfraujoch excursion", "Guided tours", "Airport transfers"],
    excluded: ["International flights", "Travel insurance", "Lunches and dinners", "Adventure activities", "Personal expenses"],
  },
  {
    slug: "magical-dubai",
    title: "Magical Dubai Experience",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: "$1,599",
    image: "/images/tours/dubai.jpg",
    description: "Discover the glittering city of Dubai with luxury shopping, ultramodern architecture, and desert safaris.",
    minAge: "5",
    travelers: "2-20",
    startingPlace: "Dubai International Airport",
    overview: "Dubai is a city of superlatives where the extraordinary is ordinary. From the world's tallest building to man-made islands, this 5-day tour showcases the best of this ultramodern metropolis. Experience the thrill of a desert safari, the opulence of luxury shopping, and the warmth of Arabian hospitality.",
    itinerary: [
      { day: "Day 1", title: "Arrival & City Tour", description: "Airport pickup. Visit Dubai Marina, JBR Beach, and Palm Jumeirah. Check in at your luxury hotel." },
      { day: "Day 2", title: "Iconic Dubai", description: "Burj Khalifa At The Top experience, Dubai Mall, Dubai Fountain show, and Gold Souk exploration." },
      { day: "Day 3", title: "Desert Safari", description: "Morning at leisure. Afternoon desert safari with dune bashing, camel riding, and BBQ dinner under the stars." },
      { day: "Day 4", title: "Abu Dhabi Day Trip", description: "Visit Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, and Yas Island." },
      { day: "Day 5", title: "Departure", description: "Morning shopping at Mall of Emirates. Airport transfer." },
    ],
    included: ["5-star hotel stay", "Daily breakfast", "Desert safari with dinner", "Burj Khalifa tickets", "Abu Dhabi day trip", "Airport transfers"],
    excluded: ["International flights", "Travel insurance", "Lunches", "Shopping expenses", "Optional activities"],
  },
  {
    slug: "maldives-paradise",
    title: "Maldives Paradise Retreat",
    location: "Maldives",
    duration: "5 Days / 4 Nights",
    price: "$2,999",
    image: "/images/tours/maldives.jpg",
    description: "Escape to the pristine Maldives with overwater villas, crystal-clear waters, and world-class diving.",
    minAge: "12",
    travelers: "2-8",
    startingPlace: "Male International Airport",
    overview: "The Maldives is the ultimate tropical paradise, where turquoise waters meet powdery white sand. Stay in a luxurious overwater villa with a glass floor, snorkel with manta rays, and dine on the beach under a canopy of stars. This exclusive 5-day retreat is designed for those seeking unparalleled luxury and tranquility.",
    itinerary: [
      { day: "Day 1", title: "Arrival in Paradise", description: "Speedboat transfer to your overwater villa. Sunset welcome cocktails and dinner on the beach." },
      { day: "Day 2", title: "Ocean Adventures", description: "Snorkeling at coral reefs, dolphin watching cruise, and underwater restaurant dinner." },
      { day: "Day 3", title: "Island Hopping", description: "Visit local islands, explore fishing villages, and enjoy a sandbank picnic." },
      { day: "Day 4", title: "Spa & Relaxation", description: "Full-day spa treatment, yoga session, and sunset fishing experience." },
      { day: "Day 5", title: "Departure", description: "Sunrise breakfast over the ocean. Transfer to Male Airport." },
    ],
    included: ["Overwater villa accommodation", "All meals (full board)", "Snorkeling equipment", "Speedboat transfers", "Spa treatments", "Island hopping tour"],
    excluded: ["International flights", "Travel insurance", "Scuba diving courses", "Premium beverages", "Tips"],
  },
  {
    slug: "incredible-kashmir",
    title: "Incredible Kashmir",
    location: "Kashmir, India",
    duration: "6 Days / 5 Nights",
    price: "$899",
    image: "/images/tours/kashmir.jpg",
    description: "Explore the 'Paradise on Earth' with stunning valleys, serene lakes, and snow-capped mountains.",
    minAge: "6",
    travelers: "2-15",
    startingPlace: "Srinagar Airport",
    overview: "Kashmir, often called 'Paradise on Earth,' is a land of breathtaking beauty where snow-capped Himalayan peaks meet lush green valleys and serene lakes. This 6-day tour takes you through the best of Kashmir, from the iconic Dal Lake houseboats to the flower-filled gardens of Srinagar, the pine forests of Pahalgam, and the ski slopes of Gulmarg.",
    itinerary: [
      { day: "Day 1", title: "Arrival in Srinagar", description: "Airport pickup. Check into a deluxe houseboat on Dal Lake. Shikara ride at sunset." },
      { day: "Day 2", title: "Mughal Gardens", description: "Visit Nishat Bagh, Shalimar Bagh, and Chashme Shahi gardens. Shankaracharya Temple visit." },
      { day: "Day 3", title: "Gulmarg Excursion", description: "Drive to Gulmarg. Gondola ride to Apharwat Peak (Phase 1 & 2). Snow activities." },
      { day: "Day 4", title: "Pahalgam Valley", description: "Drive to Pahalgam. Visit Betaab Valley, Aru Valley, and Chandanwari." },
      { day: "Day 5", title: "Sonmarg Day Trip", description: "Visit Sonmarg (Meadow of Gold). Thajiwas Glacier trek and Zero Point visit." },
      { day: "Day 6", title: "Departure", description: "Morning floating market visit on Dal Lake. Airport transfer." },
    ],
    included: ["Houseboat & hotel accommodation", "Daily breakfast & dinner", "All sightseeing", "Private car & driver", "Shikara rides", "Gondola tickets"],
    excluded: ["Airfare", "Travel insurance", "Lunches", "Pony rides", "Personal expenses", "Tips"],
  },
]

export const trendingTours = [
  { title: "Golden Triangle Tour", location: "India", price: "$699", image: "/images/tours/kashmir.jpg" },
  { title: "Thailand Beach Escape", location: "Thailand", price: "$999", image: "/images/tours/bali.jpg" },
  { title: "Italian Riviera", location: "Italy", price: "$1,799", image: "/images/tours/paris.jpg" },
  { title: "Japanese Cherry Blossoms", location: "Japan", price: "$2,199", image: "/images/tours/switzerland.jpg" },
  { title: "Egyptian Pyramids", location: "Egypt", price: "$1,099", image: "/images/tours/dubai.jpg" },
  { title: "Maldives Honeymoon", location: "Maldives", price: "$3,499", image: "/images/tours/maldives.jpg" },
  { title: "New Zealand Adventure", location: "New Zealand", price: "$2,799", image: "/images/tours/switzerland.jpg" },
  { title: "Moroccan Discovery", location: "Morocco", price: "$1,299", image: "/images/tours/dubai.jpg" },
]

export const middleEastCountries = [
  { name: "Jordan", image: "/images/destinations/jordan.jpg" },
  { name: "Kuwait", image: "/images/destinations/kuwait.jpg" },
  { name: "Oman", image: "/images/destinations/oman.jpg" },
  { name: "Qatar", image: "/images/destinations/qatar.jpg" },
  { name: "Saudi Arabia", image: "/images/destinations/saudi-arabia.jpg" },
  { name: "Turkey", image: "/images/destinations/turkey.jpg" },
  { name: "Dubai", image: "/images/tours/dubai.jpg" },
]

export const categories = [
  { name: "Medical Tourism", slug: "medical-tourism", description: "Access world-class medical facilities and treatments while enjoying a rejuvenating travel experience." },
  { name: "Spiritual Tourism", slug: "spiritual-tourism", description: "Embark on a journey of spiritual awakening visiting sacred temples, monasteries, and pilgrimage sites." },
  { name: "Wellness Tourism", slug: "wellness-tourism", description: "Rejuvenate your mind, body, and soul with luxury spa retreats, yoga, and holistic healing experiences." },
  { name: "Sports Tourism", slug: "sports-tourism", description: "Experience world-class sporting events and adventure activities across stunning global destinations." },
  { name: "Family Tourism", slug: "family-tourism", description: "Create lasting memories with family-friendly packages designed for travelers of all ages." },
  { name: "Honeymoon Tourism", slug: "honeymoon-tourism", description: "Celebrate your love with romantic getaways to the most enchanting destinations around the world." },
]

export function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}
