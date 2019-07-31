'use strict'

const db = require('../server/db')
const {User, Book, Order, OrderBook} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const allBooks = [
    {
      title: 'Blessed Event',
      isbn: '768266650-1',
      email: 'jwalmsley0@wikispaces.com',
      author: 'Jamie Walmsley',
      genre: 'Comedy|Drama',
      price: 46.72,
      stock: 75,
      description:
        'vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam'
    },
    {
      title: 'Swimming',
      isbn: '060574803-9',
      email: 'wraiker1@mysql.com',
      author: 'Waverly Raiker',
      genre: 'Drama',
      price: 18.01,
      stock: 83,
      description:
        'in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis'
    },
    {
      title: 'Paintball',
      isbn: '703096335-0',
      email: 'gkelmere2@globo.com',
      author: 'Glyn Kelmere',
      genre: 'Action|Thriller',
      price: 35.58,
      stock: 45,
      description:
        'vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt'
    },
    {
      title: 'Seventh Horse of the Sun  (Suraj Ka Satvan Ghoda)',
      isbn: '984246174-2',
      email: 'sethridge3@spotify.com',
      author: 'Selig Ethridge',
      genre: 'Drama|Romance',
      price: 70.56,
      stock: 19,
      description:
        'elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante'
    },
    {
      title: 'On the Ropes',
      isbn: '687133302-9',
      email: 'ifebre4@columbia.edu',
      author: 'Ingar Febre',
      genre: 'Documentary|Drama',
      price: 21.98,
      stock: 41,
      description:
        'lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in'
    },
    {
      title: 'Kisses for My President',
      isbn: '147706360-9',
      email: 'mphilippault5@bloglovin.com',
      author: 'Mela Philippault',
      genre: 'Comedy',
      price: 14.09,
      stock: 52,
      description:
        'sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien'
    },
    {
      title:
        "10th Judicial Court: Judicial Hearings, The (10e chambre - Instants d'audience)",
      isbn: '400002601-1',
      email: 'aguillerman6@com.com',
      author: 'Arnuad Guillerman',
      genre: 'Documentary',
      price: 83.41,
      stock: 27,
      description:
        'odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse'
    },
    {
      title: 'Mission: Impossible III',
      isbn: '597039133-6',
      email: 'adanilowicz7@quantcast.com',
      author: 'Aretha Danilowicz',
      genre: 'Action|Adventure|Thriller',
      price: 17.51,
      stock: 33,
      description:
        'fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id'
    },
    {
      title: 'D.C. Cab',
      isbn: '732497980-7',
      email: 'chaibel8@howstuffworks.com',
      author: 'Curry Haibel',
      genre: 'Action|Comedy',
      price: 63.22,
      stock: 78,
      description:
        'porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia'
    },
    {
      title: 'Bobo, The',
      isbn: '442504088-0',
      email: 'gchastand9@discuz.net',
      author: 'Gwenni Chastand',
      genre: 'Comedy',
      price: 95.22,
      stock: 18,
      description:
        'quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel'
    },
    {
      title: 'Carried Away',
      isbn: '948354169-7',
      email: 'mstaggea@privacy.gov.au',
      author: 'Meg Stagge',
      genre: 'Drama|Romance',
      price: 18.52,
      stock: 71,
      description:
        'amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit'
    },
    {
      title: 'Blood Spattered Bride, The (La novia ensangrentada)',
      isbn: '975313490-8',
      email: 'atortisb@springer.com',
      author: 'Ariana Tortis',
      genre: 'Horror',
      price: 73.7,
      stock: 21,
      description:
        'ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a'
    },
    {
      title: 'Make Way for Tomorrow',
      isbn: '075523704-8',
      email: 'jfusterc@jugem.jp',
      author: 'Janek Fuster',
      genre: 'Drama',
      price: 75.0,
      stock: 78,
      description:
        'ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam'
    },
    {
      title: 'Sirens',
      isbn: '253031384-9',
      email: 'areadheadd@reuters.com',
      author: 'Ari Readhead',
      genre: 'Drama',
      price: 67.65,
      stock: 58,
      description:
        'ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit'
    },
    {
      title: 'Dreamgirls',
      isbn: '133651869-3',
      email: 'mobriene@blogspot.com',
      author: "Mikael O'Brien",
      genre: 'Drama|Musical',
      price: 88.68,
      stock: 12,
      description:
        'justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut'
    },
    {
      title: 'El Dorado',
      isbn: '756029322-0',
      email: 'garmanf@soundcloud.com',
      author: 'Georgetta Arman',
      genre: 'Western',
      price: 34.22,
      stock: 56,
      description:
        'non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem'
    },
    {
      title: 'Imagine Me & You',
      isbn: '479296414-8',
      email: 'hmorradg@histats.com',
      author: 'Herbert Morrad',
      genre: 'Comedy|Drama|Romance',
      price: 5.57,
      stock: 21,
      description:
        'morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna'
    },
    {
      title: 'Tell It to the Marines',
      isbn: '530531419-4',
      email: 'gperelloh@ask.com',
      author: 'Gregg Perello',
      genre: 'Comedy|Drama|Romance|War',
      price: 44.06,
      stock: 76,
      description:
        'curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu'
    },
    {
      title: 'Winnie the Pooh and the Blustery Day',
      isbn: '622429717-7',
      email: 'iguillardi@ft.com',
      author: 'Irv Guillard',
      genre: 'Animation|Children|Musical',
      price: 98.86,
      stock: 31,
      description:
        'adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin'
    },
    {
      title: 'Yogi Bear',
      isbn: '686861856-5',
      email: 'btinghillj@google.com.hk',
      author: 'Barnie Tinghill',
      genre: 'Children|Comedy',
      price: 59.08,
      stock: 92,
      description:
        'metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel'
    },
    {
      title: 'Stoic',
      isbn: '559391393-5',
      email: 'elangfordk@mtv.com',
      author: 'Evangeline Langford',
      genre: 'Drama',
      price: 8.94,
      stock: 42,
      description:
        'nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in'
    },
    {
      title: 'Lonely Guy, The',
      isbn: '696979593-4',
      email: 'adalemanl@mac.com',
      author: 'Aline Daleman',
      genre: 'Comedy',
      price: 41.94,
      stock: 7,
      description:
        'vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere'
    },
    {
      title: "Spencer's Mountain",
      isbn: '082204180-4',
      email: 'pkenionm@trellian.com',
      author: 'Perri Kenion',
      genre: 'Comedy|Drama',
      price: 36.74,
      stock: 5,
      description:
        'congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia'
    },
    {
      title: 'Return of Martin Guerre, The (Retour de Martin Guerre, Le)',
      isbn: '508484975-9',
      email: 'iairetonn@washingtonpost.com',
      author: 'Isabel Aireton',
      genre: 'Drama',
      price: 20.52,
      stock: 78,
      description:
        'pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat'
    },
    {
      title: 'Young Unknowns, The',
      isbn: '047289710-1',
      email: 'dconroyo@nature.com',
      author: 'Demetria Conroy',
      genre: 'Drama',
      price: 59.42,
      stock: 86,
      description:
        'nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget'
    },
    {
      title: 'Many Adventures of Winnie the Pooh, The',
      isbn: '238408503-4',
      email: 'aorrettp@fastcompany.com',
      author: 'Ashleigh Orrett',
      genre: 'Animation|Children|Musical',
      price: 51.45,
      stock: 23,
      description:
        'et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer'
    },
    {
      title: "I'll See You in My Dreams",
      isbn: '005788701-2',
      email: 'mlettenq@yolasite.com',
      author: 'Martynne Letten',
      genre: 'Comedy|Drama',
      price: 35.88,
      stock: 18,
      description:
        'duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh'
    },
    {
      title: 'Dilettante, La',
      isbn: '827726183-7',
      email: 'bterransr@netlog.com',
      author: 'Brandy Terrans',
      genre: 'Comedy',
      price: 93.51,
      stock: 57,
      description:
        'consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a'
    },
    {
      title: 'Hana and Alice (Hana to Arisu)',
      isbn: '882721714-2',
      email: 'fmaclises@alexa.com',
      author: 'Fancy MacLise',
      genre: 'Comedy|Drama',
      price: 95.25,
      stock: 57,
      description:
        'ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla'
    },
    {
      title: 'Children in the Wind (Kaze no naka no kodomo)',
      isbn: '373334839-7',
      email: 'mickovitzt@goo.gl',
      author: 'Millisent Ickovitz',
      genre: 'Drama',
      price: 42.86,
      stock: 94,
      description:
        'suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at'
    },
    {
      title: 'Four Lions',
      isbn: '283743131-1',
      email: 'shammertonu@blogger.com',
      author: 'Sheila Hammerton',
      genre: 'Comedy|Drama',
      price: 40.34,
      stock: 14,
      description:
        'curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum'
    },
    {
      title: 'Little Engine That Could, The',
      isbn: '803481679-5',
      email: 'nstandevenv@qq.com',
      author: 'Nonie Standeven',
      genre: 'Animation|Children',
      price: 24.03,
      stock: 89,
      description:
        'molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris'
    },
    {
      title: 'Spy in Black, The',
      isbn: '951863365-7',
      email: 'trushsorthw@infoseek.co.jp',
      author: 'Tabina Rushsorth',
      genre: 'Thriller|War',
      price: 82.56,
      stock: 41,
      description:
        'odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim'
    },
    {
      title: 'Vietnam in HD',
      isbn: '504943171-9',
      email: 'nmuffx@parallels.com',
      author: 'Natty Muff',
      genre: 'War',
      price: 6.55,
      stock: 97,
      description:
        'nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec'
    },
    {
      title: "Story of Adele H., The (Histoire d'Adèle H., L')",
      isbn: '592122391-3',
      email: 'bstockauy@qq.com',
      author: 'Brooks Stockau',
      genre: 'Drama',
      price: 54.24,
      stock: 70,
      description:
        'et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum'
    },
    {
      title: 'River, The (He liu)',
      isbn: '525699582-0',
      email: 'lferronz@cnet.com',
      author: 'Lion Ferron',
      genre: 'Drama',
      price: 59.18,
      stock: 12,
      description:
        'neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam'
    },
    {
      title: 'Half a Loaf of Kung Fu (Dian zhi gong fu gan chian chan)',
      isbn: '543118567-5',
      email: 'cmasson10@squarespace.com',
      author: 'Courtnay Masson',
      genre: 'Action|Comedy',
      price: 10.41,
      stock: 88,
      description:
        'ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis'
    },
    {
      title: "Casanova '70",
      isbn: '290069335-7',
      email: 'jcloughton11@soup.io',
      author: 'Jacky Cloughton',
      genre: 'Comedy|Drama',
      price: 42.99,
      stock: 57,
      description:
        'ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum'
    },
    {
      title: 'Assassin Next Door, The (Kirot)',
      isbn: '827250810-9',
      email: 'bpoyle12@indiatimes.com',
      author: 'Briant Poyle',
      genre: 'Action|Film-Noir|Thriller',
      price: 59.0,
      stock: 20,
      description:
        'vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu'
    },
    {
      title: "Santa's Apprentice",
      isbn: '572154205-5',
      email: 'lcausier13@sohu.com',
      author: 'Linnell Causier',
      genre: 'Animation|Children',
      price: 50.17,
      stock: 37,
      description:
        'cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere'
    },
    {
      title: 'Now or Never',
      isbn: '270169931-2',
      email: 'hbanane14@macromedia.com',
      author: 'Hort Banane',
      genre: 'Comedy',
      price: 16.62,
      stock: 95,
      description:
        'ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam'
    },
    {
      title: "My Baby's Daddy",
      isbn: '922895490-6',
      email: 'ewinger15@google.co.jp',
      author: 'Emmet Winger',
      genre: 'Comedy',
      price: 83.53,
      stock: 78,
      description:
        'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper'
    },
    {
      title: 'Kicking & Screaming',
      isbn: '876457896-8',
      email: 'rfroggatt16@gravatar.com',
      author: 'Richardo Froggatt',
      genre: 'Comedy',
      price: 85.86,
      stock: 40,
      description:
        'molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut'
    },
    {
      title: 'Mister Johnson',
      isbn: '163506171-7',
      email: 'acussons17@delicious.com',
      author: 'Aymer Cussons',
      genre: 'Drama',
      price: 90.48,
      stock: 40,
      description:
        'adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis'
    },
    {
      title: 'Brothers Lionheart, The (Bröderna Lejonhjärta)',
      isbn: '721729732-X',
      email: 'odavidson18@yellowbook.com',
      author: 'Obed Davidson',
      genre: 'Adventure|Children|Fantasy',
      price: 36.38,
      stock: 52,
      description:
        'justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus'
    },
    {
      title: 'Amanece, que no es poco',
      isbn: '485655390-9',
      email: 'ddrought19@nyu.edu',
      author: 'Des Drought',
      genre: 'Comedy',
      price: 33.08,
      stock: 99,
      description:
        'praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit'
    },
    {
      title: 'Duma',
      isbn: '130864919-3',
      email: 'jovise1a@state.gov',
      author: 'Jaymee Ovise',
      genre: 'Adventure|Drama',
      price: 98.46,
      stock: 75,
      description:
        'nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis'
    },
    {
      title: 'Hedd Wyn',
      isbn: '202387819-5',
      email: 'fmerrall1b@theglobeandmail.com',
      author: 'Federica Merrall',
      genre: 'Drama|Romance|War',
      price: 65.58,
      stock: 86,
      description:
        'eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum'
    },
    {
      title: 'Streetcar Named Desire, A',
      isbn: '799600161-8',
      email: 'cmaurice1c@tripod.com',
      author: 'Cordie Maurice',
      genre: 'Drama',
      price: 67.03,
      stock: 94,
      description:
        'nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus'
    },
    {
      title: 'Dave',
      isbn: '308561326-9',
      email: 'kzamorrano1d@dmoz.org',
      author: 'Kayley Zamorrano',
      genre: 'Comedy|Romance',
      price: 9.85,
      stock: 32,
      description:
        'turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce'
    }
  ]

  const allUsers = [
    {
      name: 'Erskine Louedey',
      email: 'elouedey0@google.nl',
      address: '833 Buell Street',
      password: 'M7Wtybyt'
    },
    {
      name: 'Ingamar Steeden',
      email: 'isteeden1@shutterfly.com',
      address: '98 Northland Court',
      password: 'SQXPf7ykH'
    },
    {
      name: 'Kanya Cartmale',
      email: 'kcartmale2@ox.ac.uk',
      address: '40497 Bashford Crossing',
      password: 'jgK8VsDbiACV'
    },
    {
      name: 'Ginni Franks',
      email: 'gfranks3@usatoday.com',
      address: '26 Mesta Place',
      password: 'QspUAT58eQde'
    },
    {
      name: 'Elyssa Crisell',
      email: 'ecrisell4@nature.com',
      address: '729 Monica Center',
      password: '88Jklc'
    },
    {
      name: 'Arluene Scotti',
      email: 'ascotti5@examiner.com',
      address: '2 Hallows Park',
      password: 'jzRFFwlZ2'
    },
    {
      name: "Annis O'Gleasane",
      email: 'aogleasane6@jugem.jp',
      address: '387 Mallory Point',
      password: '7ZBqB77pA'
    },
    {
      name: 'Vernor Lesmonde',
      email: 'vlesmonde7@vinaora.com',
      address: '28 Annamark Court',
      password: 'oIAu6Wg9o'
    },
    {
      name: 'Elwood Amy',
      email: 'eamy8@drupal.org',
      address: '05 Mendota Alley',
      password: 'HPgfRi1H'
    },
    {
      name: 'Emmery Hayworth',
      email: 'ehayworth9@cam.ac.uk',
      address: '3 Laurel Lane',
      password: 'jLsfujHmtMo9'
    },
    {
      name: 'Emanuele Prescot',
      email: 'eprescota@intel.com',
      address: '3 Hauk Park',
      password: 'OtNLO3qwySL'
    },
    {
      name: 'Artemus Clements',
      email: 'aclementsb@eventbrite.com',
      address: '73187 David Center',
      password: 'FXWt4b8ENw'
    },
    {
      name: 'Reider Lusted',
      email: 'rlustedc@reddit.com',
      address: '62850 Northwestern Parkway',
      password: 'MLwlfbsHXCF'
    },
    {
      name: 'Dianna Austwick',
      email: 'daustwickd@illinois.edu',
      address: '76 Montana Crossing',
      password: 'lm5CGaMY'
    },
    {
      name: 'Collen Hunnable',
      email: 'chunnablee@pinterest.com',
      address: '97999 Pond Street',
      password: 'CUl53J'
    },
    {
      name: 'Normand Ianniello',
      email: 'nianniellof@youtu.be',
      address: '0 Blue Bill Park Way',
      password: 'm1GIibI12Dc'
    },
    {
      name: 'Olimpia Gillions',
      email: 'ogillionsg@vk.com',
      address: '064 Anniversary Court',
      password: 'ml2rvcZgfj'
    },
    {
      name: 'Dela Tamplin',
      email: 'dtamplinh@t.co',
      address: '1 Express Drive',
      password: 'xtDkDEHCkNi'
    },
    {
      name: 'Aldridge Hackworthy',
      email: 'ahackworthyi@dropbox.com',
      address: '6429 3rd Avenue',
      password: 'nKtMxWRP8'
    },
    {
      name: 'Stacie Johanning',
      email: 'sjohanningj@bloglines.com',
      address: '12 Wayridge Circle',
      password: 'qWxzfPPF3'
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
