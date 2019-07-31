'use strict'

const db = require('../server/db')
const {User, Book, Order, OrderBook} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const allBooks = [
    {
      title: 'Last Days in the Desert',
      isbn: '254862926-0',
      email: 'ltripp0@4shared.com',
      author: 'Lockwood Tripp',
      genre: 'Adventure|Drama',
      price: 7.11,
      description:
        'congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet'
    },
    {
      title: 'Sense and Sensibility',
      isbn: '106295664-8',
      email: 'kfrancillo1@archive.org',
      author: 'Kellen Francillo',
      genre: 'Drama|Romance',
      price: 1.27,
      description:
        'pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst'
    },
    {
      title: 'Secret Adventures of Gustave Klopp, The (Narco)',
      isbn: '665572861-4',
      email: 'rstayt2@4shared.com',
      author: 'Rosabelle Stayt',
      genre: 'Action|Comedy|Fantasy',
      price: 13.48,
      description:
        'in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque'
    },
    {
      title: 'Pet, The',
      isbn: '428887945-0',
      email: 'rmerfin3@soup.io',
      author: 'Ramona Merfin',
      genre: 'Drama|Thriller',
      price: 24.14,
      description:
        'odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas'
    },
    {
      title: '7 Faces of Dr. Lao',
      isbn: '744109167-5',
      email: 'mramsdell4@mapquest.com',
      author: 'Morgun Ramsdell',
      genre: 'Fantasy|Mystery|Western',
      price: 7.1,
      description:
        'enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum'
    },
    {
      title: 'Day of the Triffids, The',
      isbn: '374581106-2',
      email: 'jlearned5@qq.com',
      author: 'Jobie Learned',
      genre: 'Horror|Sci-Fi',
      price: 3.03,
      description:
        'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget'
    },
    {
      title: '42nd Street',
      isbn: '570911987-3',
      email: 'hjones6@shutterfly.com',
      author: 'Holli Jones',
      genre: 'Drama|Musical|Romance',
      price: 27.85,
      description:
        'nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh'
    },
    {
      title: 'Cyborg 2: Glass Shadow',
      isbn: '867449266-5',
      email: 'ssueter7@amazon.co.uk',
      author: 'Sally Sueter',
      genre: 'Action|Sci-Fi|Thriller',
      price: 19.3,
      description:
        'dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim'
    },
    {
      title: 'Body of Water (Syvälle salattu)',
      isbn: '590752599-1',
      email: 'dohengerty8@pagesperso-orange.fr',
      author: "Delmor O'Hengerty",
      genre: 'Drama|Mystery|Thriller',
      price: 22.12,
      description:
        'varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan'
    },
    {
      title: 'Friends & Lovers',
      isbn: '238674016-1',
      email: 'cthinn9@mac.com',
      author: 'Cliff Thinn',
      genre: 'Comedy|Drama|Romance',
      price: 20.67,
      description:
        'nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec'
    },
    {
      title: 'Diary of Anne Frank, The',
      isbn: '698691275-7',
      email: 'cwoodsona@admin.ch',
      author: 'Charles Woodson',
      genre: 'Drama|War',
      price: 5.36,
      description:
        'maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque'
    },
    {
      title: 'Sea Wolf, The',
      isbn: '028953900-5',
      email: 'mleirmonthb@archive.org',
      author: 'Malva Leirmonth',
      genre: 'Adventure|Drama',
      price: 9.42,
      description:
        'sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla'
    },
    {
      title: 'Last Ride, The',
      isbn: '459919811-0',
      email: 'cattwoollc@usa.gov',
      author: 'Carri Attwooll',
      genre: 'Drama',
      price: 25.31,
      description:
        'cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum'
    },
    {
      title: 'Visual Acoustics',
      isbn: '759989369-5',
      email: 'aswiggerd@yelp.com',
      author: 'Ardenia Swigger',
      genre: 'Documentary',
      price: 14.15,
      description:
        'molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut'
    },
    {
      title: 'Flowers in the Attic',
      isbn: '106852087-6',
      email: 'ewestoffe@altervista.org',
      author: 'Elly Westoff',
      genre: 'Drama|Mystery|Thriller',
      price: 2.98,
      description:
        'hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit'
    },
    {
      title: 'Squeeze',
      isbn: '510363034-6',
      email: 'mbarhamsf@123-reg.co.uk',
      author: 'Margareta Barhams',
      genre: 'Drama',
      price: 21.45,
      description:
        'sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget'
    },
    {
      title: 'Antwone Fisher',
      isbn: '753568496-3',
      email: 'mknowlysg@ihg.com',
      author: 'Moll Knowlys',
      genre: 'Drama',
      price: 14.05,
      description:
        'tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit'
    },
    {
      title: 'Clifford',
      isbn: '012732570-0',
      email: 'snunanh@free.fr',
      author: 'Stirling Nunan',
      genre: 'Comedy',
      price: 8.2,
      description:
        'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at'
    },
    {
      title: 'Cry_Wolf (a.k.a. Cry Wolf)',
      isbn: '392339656-2',
      email: 'ochomiczi@sourceforge.net',
      author: 'Olva Chomicz',
      genre: 'Drama|Horror|Mystery|Thriller',
      price: 9.11,
      description:
        'in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur'
    },
    {
      title: 'Snitch',
      isbn: '825229574-6',
      email: 'cgadaultj@abc.net.au',
      author: 'Cyrill Gadault',
      genre: 'Action|Drama|Thriller',
      price: 9.12,
      description:
        'felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum'
    },
    {
      title: 'Ginger and Fred (Ginger e Fred)',
      isbn: '082697236-5',
      email: 'wgrocottk@china.com.cn',
      author: 'Willi Grocott',
      genre: 'Comedy|Drama',
      price: 28.36,
      description:
        'odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed'
    },
    {
      title: 'Stark Raving Mad',
      isbn: '732679442-1',
      email: 'gghiottol@hubpages.com',
      author: 'Giffy Ghiotto',
      genre: 'Action|Comedy|Crime',
      price: 11.67,
      description:
        'nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo'
    },
    {
      title: 'Fear and Desire',
      isbn: '286171603-7',
      email: 'cstirmanm@theguardian.com',
      author: 'Chiquita Stirman',
      genre: 'Drama|War',
      price: 1.0,
      description:
        'enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque'
    },
    {
      title: 'Blue Gold: World Water Wars',
      isbn: '119148915-9',
      email: 'jmillmoen@wsj.com',
      author: 'Jens Millmoe',
      genre: 'Documentary',
      price: 11.24,
      description:
        'in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris'
    },
    {
      title: 'Sgt. Bilko',
      isbn: '515617175-3',
      email: 'gmatthiso@github.io',
      author: 'Graehme Matthis',
      genre: 'Comedy',
      price: 23.54,
      description:
        'euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla'
    },
    {
      title: 'Where the Boys Are',
      isbn: '420654393-3',
      email: 'lwegenenp@amazon.co.uk',
      author: 'Loralyn Wegenen',
      genre: 'Comedy',
      price: 9.15,
      description:
        'morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis'
    },
    {
      title: "Nun's Story, The",
      isbn: '187837750-7',
      email: 'rmacconnultyq@t-online.de',
      author: 'Reinwald MacConnulty',
      genre: 'Drama',
      price: 9.87,
      description:
        'cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean'
    },
    {
      title: 'Save the Last Dance',
      isbn: '985940767-3',
      email: 'nlandar@scribd.com',
      author: 'Ninette Landa',
      genre: 'Drama|Romance',
      price: 19.76,
      description:
        'cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis'
    },
    {
      title: 'Non-Stop',
      isbn: '616971467-0',
      email: 'dbuckseys@goo.ne.jp',
      author: 'Dannie Bucksey',
      genre: 'Action|Mystery|Thriller',
      price: 4.31,
      description:
        'est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque'
    },
    {
      title: 'Smashing Pumpkins: If All Goes Wrong',
      isbn: '107106327-8',
      email: 'jblincoet@nba.com',
      author: 'Jarrod Blincoe',
      genre: 'Documentary|Musical',
      price: 16.51,
      description:
        'pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in'
    }
  ]

  const allUsers = [
    {
      name: 'Douglass Sillars',
      email: 'dsillars0@sfgate.com',
      address: '6328 Burning Wood Crossing'
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
      completed: false,
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
  console.log(`order data seeded successfully`)
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
