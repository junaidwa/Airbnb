const sampleData = 
 [
    {
      "title": "Beautiful Beach House",
      "description": "A stunning beach house with ocean views.",
      "price": 250,
      "image": "https://plus.unsplash.com/premium_photo-1733288413391-a88bbe8be696?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Malibu, CA"
    },
    {
      "title": "Cozy Mountain Cabin",
      "description": "Secluded cabin nestled in the mountains, perfect for a peaceful getaway.",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1690623836825-fa3478b9ca00?q=80&w=1137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Aspen, CO"
    },
    {
      "title": "Charming City Apartment",
      "description": "Modern apartment in the heart of the city, close to all major attractions.",
      "price": 120,
      "image": "https://images.unsplash.com/photo-1695439928125-3b3903b7f9ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "New York, NY"
    },
    {
      "title": "Luxurious Private Villa",
      "description": "Expansive villa with a private pool and breathtaking views.",
      "price": 500,
      "image": "https://plus.unsplash.com/premium_photo-1697729612944-b5b73ea1bf2c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Santorini, Greece"
    },
    {
      "title": "Quaint Countryside Cottage",
      "description": "A charming cottage in the peaceful countryside, ideal for a quiet escape.",
      "price": 90,
      "image": "https://plus.unsplash.com/premium_photo-1730658556676-bcf03b6f38e4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Cotswolds, UK"
    },
    {
      "title": "Desert Oasis Home",
      "description": "Unique desert home with panoramic views and a tranquil atmosphere.",
      "price": 180,
      "image": "https://plus.unsplash.com/premium_photo-1661879431460-df58018cb00c?q=80&w=1040&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Palm Springs, CA"
    },
    {
      "title": "Lakeside Retreat",
      "description": "Beautiful home right on the lake, perfect for water activities and relaxation.",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1707297817876-bba78d9c942b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Lake Tahoe, CA"
    },
    {
      "title": "Ski-in/Ski-out Chalet",
      "description": "Convenient chalet with direct access to ski slopes.",
      "price": 300,
      "image": "https://plus.unsplash.com/premium_photo-1697730447144-a2f7257e4a1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Whistler, BC"
    },
    {
      "title": "Historic Townhouse",
      "description": "Elegantly restored townhouse in a vibrant historic district.",
      "price": 170,
      "image": "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Charleston, SC"
    },
    {
      "title": "Modern Loft with Skyline Views",
      "description": "Stylish loft apartment offering stunning city skyline views.",
      "price": 220,
      "image": "https://plus.unsplash.com/premium_photo-1661962992065-ce02d11c1d28?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Chicago, IL"
    },
    {
      "title": "Tropical Bungalow",
      "description": "Secluded bungalow surrounded by lush tropical gardens.",
      "price": 180,
      "image": "https://images.unsplash.com/photo-1597234670730-93ef4628e124?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Maui, HI"
    },
    {
      "title": "Vineyard Estate",
      "description": "Grand estate in the heart of wine country with sprawling vineyards.",
      "price": 400,
      "image": "https://images.unsplash.com/photo-1667233286274-702db7bc50d1?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Napa Valley, CA"
    },
    {
      "title": "Rustic Farmhouse",
      "description": "Authentic farmhouse experience with modern comforts on a working farm.",
      "price": 130,
      "image": "https://plus.unsplash.com/premium_photo-1697729756292-f1b8d4c8fde3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Provence, France"
    },
    {
      "title": "Riverside Cabin",
      "description": "Charming cabin by the river, perfect for fishing and nature lovers.",
      "price": 110,
      "image": "https://plus.unsplash.com/premium_photo-1678398381832-21d55102a4ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Great Smoky Mountains, TN"
    },
    {
      "title": "Penthouse with Panoramic Views",
      "description": "Luxury penthouse offering unparalleled city and ocean views.",
      "price": 600,
      "image": "https://images.unsplash.com/photo-1706793990035-eda935d69950?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Miami Beach, FL"
    },
    {
      "title": "Seaside Fisherman's Cottage",
      "description": "Authentic cottage steps from the beach, with a rustic charm.",
      "price": 160,
      "image": "https://images.unsplash.com/photo-1697400516670-86096a420256?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWwlMjBhbmQlMjBob3VzZXMlMjBhbmQlMjByZXNvdHMlMjBpc2xhbWFiYXN8ZW58MHx8MHx8fDA%3D",
      "location": "Cape Cod, MA"
    },
    {
      "title": "Architectural Gem",
      "description": "Uniquely designed home with modern architecture and stylish interiors.",
      "price": 350,
      "image": "https://images.unsplash.com/photo-1595019327736-af703263ecad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjBhbmQlMjBob3VzZXMlMjBhbmQlMjByZXNvdHMlMjBpc2xhbWFiYXN8ZW58MHx8MHx8fDA%3D",
      "location": "Los Angeles, CA"
    },
    {
      "title": "Forest Treehouse",
      "description": "Experience nature in this magical treehouse nestled in the forest.",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1690623836825-fa3478b9ca00?q=80&w=1137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Asheville, NC"
    },
    {
      "title": "Canal-side House",
      "description": "Picturesque house directly on the canal, ideal for exploring the waterways.",
      "price": 190,
      "image": "https://plus.unsplash.com/premium_photo-1733342515327-e15b5cec3c4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Amsterdam, Netherlands"
    },
    {
      "title": "Remote Wilderness Lodge",
      "description": "An off-grid lodge in the heart of the wilderness, for true adventurers.",
      "price": 280,
      "image": "https://images.unsplash.com/photo-1615431303449-9ad9207d05de?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "location": "Alaska, USA"
    }
  ]
module.exports = {data: sampleData};