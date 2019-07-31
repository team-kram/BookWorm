'use strict'

const db = require('../server/db')
const {User, Book, Order, OrderBook} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const allBooks = [
    {
      title: 'Princess Yang Kwei Fei (Yôkihi)',
      isbn: '711382930-9',
      email: 'vguilford0@wp.com',
      author: 'Valentia Guilford',
      genre: 'Drama|Romance',
      price: 2.1,
      stock: 92
    },
    {
      title: 'Who Killed Vincent Chin?',
      isbn: '952164521-0',
      email: 'jdavydkov1@comsenz.com',
      author: 'Janot Davydkov',
      genre: 'Crime|Documentary',
      price: 36.55,
      stock: 34
    },
    {
      title: 'Rings',
      isbn: '903334838-1',
      email: 'gmceniry2@xing.com',
      author: 'Gladi McEniry',
      genre: 'Horror|Thriller',
      price: 62.79,
      stock: 87
    },
    {
      title: 'Delivery, The',
      isbn: '586792122-0',
      email: 'jmisselbrook3@altervista.org',
      author: 'Jolynn Misselbrook',
      genre: 'Action|Adventure|Horror|Thriller',
      price: 63.92,
      stock: 56
    },
    {
      title: 'Bill Burr: Why Do I Do This?',
      isbn: '889767389-9',
      email: 'tbricket4@parallels.com',
      author: 'Titos Bricket',
      genre: 'Comedy',
      price: 20.37,
      stock: 42
    },
    {
      title: 'Only the Strong',
      isbn: '115993010-4',
      email: 'dpacey5@cyberchimps.com',
      author: 'Darrelle Pacey',
      genre: 'Action',
      price: 82.43,
      stock: 60
    },
    {
      title: 'New York, I Love You',
      isbn: '671593915-2',
      email: 'reivers6@taobao.com',
      author: 'Rudiger Eivers',
      genre: 'Drama|Romance',
      price: 77.95,
      stock: 25
    },
    {
      title: 'Newsies',
      isbn: '820172547-6',
      email: 'rmquharge7@addtoany.com',
      author: "Rudyard M'Quharge",
      genre: 'Children|Musical',
      price: 15.63,
      stock: 70
    },
    {
      title: 'Knucklehead',
      isbn: '645090960-9',
      email: 'nlocke8@pen.io',
      author: 'Nanci Locke',
      genre: 'Comedy|Drama',
      price: 86.2,
      stock: 7
    },
    {
      title: 'Breaking News (Daai si gin)',
      isbn: '464879749-3',
      email: 'vstorah9@multiply.com',
      author: 'Vera Storah',
      genre: 'Action|Crime|Drama',
      price: 73.05,
      stock: 14
    },
    {
      title: 'Casting Couch',
      isbn: '910043109-5',
      email: 'asuarta@netlog.com',
      author: 'Ardelle Suart',
      genre: '(no genres listed)',
      price: 10.83,
      stock: 15
    },
    {
      title: 'United',
      isbn: '941430440-1',
      email: 'tnibleyb@bloomberg.com',
      author: 'Tull Nibley',
      genre: 'Drama',
      price: 40.08,
      stock: 92
    },
    {
      title: 'Big Fat Liar',
      isbn: '864000654-7',
      email: 'eunsteadc@imdb.com',
      author: 'Elly Unstead',
      genre: 'Children|Comedy',
      price: 18.99,
      stock: 2
    },
    {
      title: 'Epic',
      isbn: '759491222-5',
      email: 'pbrodheadd@unesco.org',
      author: 'Prinz Brodhead',
      genre: 'Adventure|Animation|Fantasy',
      price: 57.16,
      stock: 33
    },
    {
      title: 'American Bandits: Frank and Jesse James',
      isbn: '557425210-4',
      email: 'dsybbee@statcounter.com',
      author: 'Delmer Sybbe',
      genre: 'Western',
      price: 85.93,
      stock: 10
    },
    {
      title: 'Backtrack (Catchfire)',
      isbn: '611968483-2',
      email: 'srothermelf@exblog.jp',
      author: 'Sisile Rothermel',
      genre: 'Action|Drama|Thriller',
      price: 67.41,
      stock: 23
    },
    {
      title: 'If You Are the One',
      isbn: '667168745-5',
      email: 'gdraperg@live.com',
      author: 'Gavin Draper',
      genre: 'Comedy|Romance',
      price: 46.13,
      stock: 24
    },
    {
      title: 'Far',
      isbn: '060287375-4',
      email: 'tpaoluccih@weibo.com',
      author: 'Tyne Paolucci',
      genre: 'Drama',
      price: 71.35,
      stock: 13
    },
    {
      title: 'P.S. Your Cat is Dead',
      isbn: '635432123-X',
      email: 'nbastini@wordpress.com',
      author: 'Nancee Bastin',
      genre: 'Comedy',
      price: 26.04,
      stock: 21
    },
    {
      title: 'Hitchcock',
      isbn: '919928519-3',
      email: 'mallbrookj@ucla.edu',
      author: 'Madelin Allbrook',
      genre: 'Drama',
      price: 10.07,
      stock: 43
    },
    {
      title: 'Before I Go to Sleep',
      isbn: '381862705-3',
      email: 'pdufferk@geocities.jp',
      author: 'Pavlov Duffer',
      genre: 'Mystery|Thriller',
      price: 33.69,
      stock: 19
    },
    {
      title: '1½ Knights - In Search of the Ravishing Princess Herzelinde',
      isbn: '479422954-2',
      email: 'cgoslandl@google.co.uk',
      author: 'Con Gosland',
      genre: 'Comedy',
      price: 66.63,
      stock: 11
    },
    {
      title: 'Treasure Island',
      isbn: '233025975-1',
      email: 'cbarrablem@about.com',
      author: 'Connie Barrable',
      genre: 'Adventure',
      price: 87.78,
      stock: 18
    },
    {
      title: 'Princess and the Goblin, The',
      isbn: '758006867-2',
      email: 'iconeybearen@state.tx.us',
      author: 'Inness Coneybeare',
      genre: 'Animation|Fantasy',
      price: 38.91,
      stock: 44
    },
    {
      title: 'Moonrise',
      isbn: '362221255-1',
      email: 'bflooko@people.com.cn',
      author: 'Bernelle Flook',
      genre: 'Drama|Film-Noir',
      price: 99.21,
      stock: 9
    },
    {
      title:
        'Eccentricities of a Blonde-haired Girl (Singularidades de uma Rapariga Loura)',
      isbn: '604130837-4',
      email: 'ygiabuccip@goo.gl',
      author: 'Yvette Giabucci',
      genre: 'Drama|Romance',
      price: 49.29,
      stock: 6
    },
    {
      title: 'Stockholm East (Stockholm Östra)',
      isbn: '736938896-4',
      email: 'bsalanq@taobao.com',
      author: 'Broddy Salan',
      genre: 'Drama',
      price: 34.75,
      stock: 76
    },
    {
      title: 'Heaven and Earth (Ten to Chi to)',
      isbn: '485364751-1',
      email: 'rmeldingr@facebook.com',
      author: 'Ruperto Melding',
      genre: 'Action|Adventure|Drama|War',
      price: 50.99,
      stock: 74
    },
    {
      title: 'Ladies in Retirement',
      isbn: '179027465-6',
      email: 'mposseks@dot.gov',
      author: 'Marshall Possek',
      genre: 'Drama',
      price: 59.89,
      stock: 54
    },
    {
      title: 'F for Fake (Vérités et mensonges)',
      isbn: '160614357-3',
      email: 'scastellinit@nytimes.com',
      author: 'Stearne Castellini',
      genre: 'Documentary|Mystery',
      price: 94.92,
      stock: 59
    },
    {
      title: 'Lost in Austen',
      isbn: '897029372-8',
      email: 'qbottonu@newyorker.com',
      author: 'Quill Botton',
      genre: 'Drama|Fantasy|Romance|Sci-Fi',
      price: 8.69,
      stock: 25
    },
    {
      title: 'Macheads',
      isbn: '050044159-6',
      email: 'cmoxtedv@usnews.com',
      author: 'Carline Moxted',
      genre: 'Documentary',
      price: 95.44,
      stock: 60
    },
    {
      title: 'From Noon Till Three',
      isbn: '903528142-X',
      email: 'jspreadw@mtv.com',
      author: 'Julia Spread',
      genre: 'Comedy|Romance|Western',
      price: 72.55,
      stock: 56
    },
    {
      title: 'Tai-Pan',
      isbn: '656567466-3',
      email: 'yballingalx@woothemes.com',
      author: 'Yolande Ballingal',
      genre: 'Adventure',
      price: 68.26,
      stock: 52
    },
    {
      title: 'Heavy',
      isbn: '945080174-6',
      email: 'ldimitrescoy@4shared.com',
      author: 'Letizia Dimitresco',
      genre: 'Drama|Romance',
      price: 3.89,
      stock: 91
    },
    {
      title: 'All I Want for Christmas',
      isbn: '476619325-3',
      email: 'praggz@opera.com',
      author: 'Putnam Ragg',
      genre: 'Children|Comedy',
      price: 57.57,
      stock: 75
    },
    {
      title: 'Dog Day (Canicule)',
      isbn: '853218824-9',
      email: 'jbosward10@networksolutions.com',
      author: 'Jackelyn Bosward',
      genre: 'Action|Crime|Drama|Thriller',
      price: 8.72,
      stock: 100
    },
    {
      title: 'Secrets of the Heart (Secretos del Corazón)',
      isbn: '478714333-6',
      email: 'alesley11@altervista.org',
      author: 'Addia Lesley',
      genre: 'Drama',
      price: 49.45,
      stock: 24
    },
    {
      title: 'Bridges at Toko-Ri, The',
      isbn: '162784579-8',
      email: 'cpenas12@issuu.com',
      author: 'Collie Penas',
      genre: 'Drama|Romance|War',
      price: 92.42,
      stock: 14
    },
    {
      title: "Beethoven's 3rd",
      isbn: '113096069-2',
      email: 'fforsythe13@youtu.be',
      author: 'Farr Forsythe',
      genre: 'Children|Comedy',
      price: 63.4,
      stock: 57
    },
    {
      title: "Von Ryan's Express",
      isbn: '199611522-7',
      email: 'hcavan14@mozilla.org',
      author: 'Hartley Cavan',
      genre: 'Action|Adventure|Drama|War',
      price: 48.73,
      stock: 62
    },
    {
      title: 'May I Kill U?',
      isbn: '724062571-0',
      email: 'bswinfon15@ezinearticles.com',
      author: 'Bobbye Swinfon',
      genre: 'Comedy|Horror|Thriller',
      price: 75.57,
      stock: 77
    },
    {
      title: 'The Child and the Policeman',
      isbn: '165573939-5',
      email: 'sluesley16@jalbum.net',
      author: 'Sloane Luesley',
      genre: 'Comedy',
      price: 68.44,
      stock: 97
    },
    {
      title: 'Dinner for Schmucks',
      isbn: '743436536-6',
      email: 'slucio17@howstuffworks.com',
      author: 'Sigismundo Lucio',
      genre: 'Comedy',
      price: 23.69,
      stock: 64
    },
    {
      title: 'Fist of the North Star',
      isbn: '522223665-X',
      email: 'hvivyan18@free.fr',
      author: 'Harwilll Vivyan',
      genre: 'Action|Thriller',
      price: 73.56,
      stock: 75
    },
    {
      title: 'No Place to Hide',
      isbn: '917361773-3',
      email: 'ecamier19@networksolutions.com',
      author: 'Emogene Camier',
      genre: 'Thriller',
      price: 90.94,
      stock: 3
    },
    {
      title: 'Mutual Appreciation',
      isbn: '946153401-9',
      email: 'mcourtin1a@ezinearticles.com',
      author: 'Mariska Courtin',
      genre: 'Comedy|Drama',
      price: 90.0,
      stock: 14
    },
    {
      title: 'When the Bough Breaks',
      isbn: '879669913-2',
      email: 'gmoxstead1b@diigo.com',
      author: 'Genovera Moxstead',
      genre: 'Drama|Thriller',
      price: 83.39,
      stock: 90
    },
    {
      title: "On the Other Side of the Tracks (De l'autre côté du périph)",
      isbn: '048120158-0',
      email: 'mchaffen1c@twitpic.com',
      author: 'Melisent Chaffen',
      genre: 'Action|Comedy|Crime',
      price: 65.6,
      stock: 78
    },
    {
      title: 'Lord Jim',
      isbn: '379446861-9',
      email: 'omarcus1d@cornell.edu',
      author: 'Othilia Marcus',
      genre: 'Adventure|Drama',
      price: 14.31,
      stock: 89
    }
  ]

  const allUsers = [
    {
      name: 'Douglass Sillars',
      email: 'dsillars0@sfgate.com',
      address: '6328 Burning Wood Crossing',
      password: 'test123'
    },
    {
      name: 'Rory Dutch',
      email: 'rdutch1@chronoengine.com',
      address: '93785 Sommers Point'
    },
    {
      name: 'Gregorio Kissell',
      email: 'gkissell2@godaddy.com',
      address: '81 Pearson Plaza'
    },
    {
      name: 'Fedora Case',
      email: 'fcase3@ed.gov',
      address: '3289 Red Cloud Circle'
    },
    {
      name: 'Tarrance Froom',
      email: 'tfroom4@webnode.com',
      address: '47590 Lakewood Gardens Drive'
    },
    {
      name: 'Kinna Blum',
      email: 'kblum5@furl.net',
      address: '424 Longview Park'
    },
    {
      name: 'Scarlet Leigh',
      email: 'sleigh6@irs.gov',
      address: '625 Welch Plaza'
    },
    {
      name: 'Kristel Kerbey',
      email: 'kkerbey7@jalbum.net',
      address: '431 Westport Alley'
    },
    {
      name: 'Geneva Gentery',
      email: 'ggentery8@twitpic.com',
      address: '28725 Nelson Center'
    },
    {
      name: 'Tobye Dart',
      email: 'tdart9@adobe.com',
      address: '9096 Cascade Park'
    },
    {
      name: 'Cathyleen Dugald',
      email: 'cdugalda@blog.com',
      address: '74310 Mcguire Pass'
    },
    {
      name: 'June Clemanceau',
      email: 'jclemanceaub@shinystat.com',
      address: '509 Memorial Street'
    },
    {
      name: 'Mortie Bond',
      email: 'mbondc@mashable.com',
      address: '8 Killdeer Pass'
    },
    {
      name: 'Kristopher Ashton',
      email: 'kashtond@parallels.com',
      address: '2 Shasta Road'
    },
    {
      name: 'Laure Grigoroni',
      email: 'lgrigoronie@salon.com',
      address: '2037 Monica Lane'
    },
    {
      name: 'Fonz Hanway',
      email: 'fhanwayf@123-reg.co.uk',
      address: '01006 Dexter Point'
    },
    {
      name: 'Darlene Adshead',
      email: 'dadsheadg@washingtonpost.com',
      address: '707 Lindbergh Terrace'
    },
    {
      name: 'Margit Roads',
      email: 'mroadsh@hubpages.com',
      address: '58266 Kingsford Drive'
    },
    {
      name: 'Innis Belsham',
      email: 'ibelshami@virginia.edu',
      address: '2317 Pepper Wood Drive'
    },
    {
      name: 'Prinz Icom',
      email: 'picomj@cmu.edu',
      address: '613 Hazelcrest Trail'
    }
  ]

  const allOrders = [
    {
      completed: true,
      userId: 8
    },
    {
      completed: false,
      userId: 11
    },
    {
      completed: true,
      userId: 7
    },
    {
      completed: true,
      userId: 19
    },
    {
      completed: false,
      userId: 2
    },
    {
      completed: false,
      userId: 17
    },
    {
      completed: true,
      userId: 16
    },
    {
      completed: true,
      userId: 2
    },
    {
      completed: true,
      userId: 12
    },
    {
      completed: true,
      userId: 13
    },
    {
      completed: true,
      userId: 10
    },
    {
      completed: false,
      userId: 6
    },
    {
      completed: false,
      userId: 4
    },
    {
      completed: true,
      userId: 12
    },
    {
      completed: true,
      userId: 11
    },
    {
      completed: true,
      userId: 20
    },
    {
      completed: true,
      userId: 19
    },
    {
      completed: false,
      userId: 15
    },
    {
      completed: true,
      userId: 20
    },
    {
      completed: false,
      userId: 14
    }
  ]

  const allOrderBooks = [
    {
      quantity: 19,
      bookId: 26,
      orderId: 13
    },
    {
      quantity: 13,
      bookId: 6,
      orderId: 2
    },
    {
      quantity: 15,
      bookId: 23,
      orderId: 11
    },
    {
      quantity: 2,
      bookId: 29,
      orderId: 8
    },
    {
      quantity: 14,
      bookId: 12,
      orderId: 1
    },
    {
      quantity: 12,
      bookId: 13,
      orderId: 12
    },
    {
      quantity: 17,
      bookId: 8,
      orderId: 12
    },
    {
      quantity: 4,
      bookId: 1,
      orderId: 5
    },
    {
      quantity: 19,
      bookId: 4,
      orderId: 18
    },
    {
      quantity: 19,
      bookId: 14,
      orderId: 14
    },
    {
      quantity: 2,
      bookId: 6,
      orderId: 4
    },
    {
      quantity: 18,
      bookId: 21,
      orderId: 2
    },
    {
      quantity: 17,
      bookId: 30,
      orderId: 12
    },
    {
      quantity: 18,
      bookId: 27,
      orderId: 11
    },
    {
      quantity: 10,
      bookId: 11,
      orderId: 6
    },
    {
      quantity: 15,
      bookId: 21,
      orderId: 12
    },
    {
      quantity: 9,
      bookId: 15,
      orderId: 6
    },
    {
      quantity: 1,
      bookId: 24,
      orderId: 1
    },
    {
      quantity: 7,
      bookId: 17,
      orderId: 10
    }
  ]

  const books = await Promise.all(
    allBooks.map(book => {
      return Book.create(book)
    })
  )
  console.log(`seeded ${books.length} book data`)
  console.log(`book data seeded successfully`)

  const users = await Promise.all(
    allUsers.map(user => {
      return User.create(user)
    })
  )
  console.log(`seeded ${users.length} user data`)
  console.log(`user data seeded successfully`)

  const orders = await Promise.all(
    allOrders.map(order => {
      return Order.create(order)
    })
  )
  console.log(`seeded ${orders.length} order data`)
  console.log(`order data seeded successfully`)

  const orderBooks = await Promise.all(
    allOrderBooks.map(order => {
      return OrderBook.create(order)
    })
  )
  console.log(`seeded ${orderBooks.length} order data`)
  console.log(`book-order data seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
