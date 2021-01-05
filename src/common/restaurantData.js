let restaurantData = [
  {
    id: 1,
    restaurant_name: "Gateway Taproom",
    photo_url:
      "https://b.zmtcdn.com/data/pictures/0/18564740/686000d2b5cfebfad3300f313eaae79c.jpg?output-format=webp",
    customer_rating: 4.7,
    average_price_for_two: 2200,
    number_of_customers_rated: 714,
    categories: [
      {
        id: 1,
        category_name: "chinese",
      },
      {
        id: 2,
        category_name: "continental",
      },
      {
        id: 3,
        category_name: "indian",
      },
    ],
  },
  {
    id: 2,
    restaurant_name: "Lion Heart",
    photo_url:
      "https://b.zmtcdn.com/data/res_imagery/18432402_RESTAURANT_f755bf0b6a6ee7aca44d7ddffd464b7e.jpg",
    customer_rating: 4.5,
    average_price_for_two: 1200,
    number_of_customers_rated: 562,
    categories: [
      {
        id: 1,
        category_name: "chinese",
      },
      {
        id: 2,
        category_name: "continental",
      },
      {
        id: 3,
        category_name: "snacks",
      },
      {
        id: 4,
        category_name: "sweet dish",
      },
    ],
  },
  {
    id: 3,
    restaurant_name: "Rikē - Terrace Bar & Grill",
    photo_url:
      "https://b.zmtcdn.com/data/pictures/0/18600990/249d197cb4d6537d5560d0a74c9fa4ce.jpg",
    customer_rating: 4.2,
    average_price_for_two: 1800,
    number_of_customers_rated: 2002,
    categories: [
      {
        id: 1,
        category_name: "chinese",
      },
      {
        id: 2,
        category_name: "continental",
      },
      {
        id: 3,
        category_name: "snacks",
      },
      {
        id: 4,
        category_name: "sweet dish",
      },
      {
        id: 5,
        category_name: "italian",
      },
    ],
  },
  {
    id: 4,
    restaurant_name: "Splitsvilla Bar & Lounge",
    photo_url:
      "https://b.zmtcdn.com/data/pictures/9/18634739/6d62975f9bb88caec207ef0c1f570f81.jpg?output-format=webp",
    customer_rating: 4.0,
    average_price_for_two: 1000,
    number_of_customers_rated: 848,
    categories: [
      {
        id: 1,
        category_name: "chinese",
      },
      {
        id: 2,
        category_name: "continental",
      },
      {
        id: 3,
        category_name: "snacks",
      },
      {
        id: 4,
        category_name: "sweet dish",
      },
      {
        id: 5,
        category_name: "italian",
      },
      {
        id: 6,
        category_name: "drinks",
      },
    ],
  },
  {
    id: 5,
    restaurant_name: "3 Wise Monkeys",
    photo_url:
      "https://b.zmtcdn.com/data/res_imagery/42597_RESTAURANT_obp1.jpg",
    customer_rating: 3.2,
    average_price_for_two: 1100,
    number_of_customers_rated: 28,
    categories: [
      {
        id: 1,
        category_name: "chinese",
      },
      {
        id: 2,
        category_name: "continental",
      },
      {
        id: 3,
        category_name: "snacks",
      },
      {
        id: 4,
        category_name: "sweet dish",
      },
      {
        id: 5,
        category_name: "italian",
      },
    ]
  }
];

/*

INSERT INTO RESTAURANT(uuid,restaurant_name,photo_url,customer_rating,average_price_for_two,number_of_customers_rated,address_id) VALUES('2461973c-a238-11e8-9077-720006ceb890','Lion Heart','https://b.zmtcdn.com/data/res_imagery/18432402_RESTAURANT_f755bf0b6a6ee7aca44d7ddffd464b7e.jpg',4.50,1200,562,1);
INSERT INTO RESTAURANT(uuid,restaurant_name,photo_url,customer_rating,average_price_for_two,number_of_customers_rated,address_id) VALUES('359f7e8a-a23b-11e8-9077-720006ceb890','Rikē - Terrace Bar & Grill','https://b.zmtcdn.com/data/pictures/0/18600990/249d197cb4d6537d5560d0a74c9fa4ce.jpg',4.20,1800,2002,2);
INSERT INTO RESTAURANT(uuid,restaurant_name,photo_url,customer_rating,average_price_for_two,number_of_customers_rated,address_id) VALUES('5485e5b4-a23b-11e8-9077-720006ceb890','Raasta','https://b.zmtcdn.com/data/res_imagery/18354546_RESTAURANT_c7eaf3dcf52bc4034e59767f01a73472.jpg',3.60,1500,2848,4);
INSERT INTO RESTAURANT(uuid,restaurant_name,photo_url,customer_rating,average_price_for_two,number_of_customers_rated,address_id) VALUES('5485eb18-a23b-11e8-9077-720006ceb890','Splitsvilla Bar & Lounge','https://b.zmtcdn.com/data/pictures/9/18634739/6d62975f9bb88caec207ef0c1f570f81.jpg?output-format=webp',4.00,1000,848,5);
INSERT INTO RESTAURANT(uuid,restaurant_name,photo_url,customer_rating,average_price_for_two,number_of_customers_rated,address_id) VALUES('3097b8f4-a294-11e8-9a3a-720006ceb890','Loud Silence','https://b.zmtcdn.com/data/reviews_photos/94a/be67cc20a6ab663f95330e5af6afb94a_1521359398.jpg',4.40,600,658,6);
INSERT INTO RESTAURANT(uuid,restaurant_name,photo_url,customer_rating,average_price_for_two,number_of_customers_rated,address_id) VALUES('9df46816-a294-11e8-9a3a-720006ceb890','Oozo','https://b.zmtcdn.com/data/pictures/4/18528394/6c3590212b3700b1b160422fd8478287.jpg?output-format=webp',3.20,2500,298,7);
INSERT INTO RESTAURANT(uuid,restaurant_name,photo_url,customer_rating,average_price_for_two,number_of_customers_rated,address_id) VALUES('1dd86f90-a296-11e8-9a3a-720006ceb890','3 Wise Monkeys','https://b.zmtcdn.com/data/res_imagery/42597_RESTAURANT_obp1.jpg',4.90,1100,28,8);
*/

export default restaurantData;
