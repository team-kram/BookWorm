/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')
const {Book, db} = require('../db')

describe('Books routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/books/', () => {
    const book = {
      title: 'Mockingjay',
      author: 'Suzanne Collins',
      imageUrl:
        'https://en.wikipedia.org/wiki/Mockingjay#/media/File:Mockingjay.JPG',
      description:
        'Following her rescue from the devastating Quarter Quell, Katniss (Jennifer Lawrence) awakes in the complex beneath the supposedly destroyed District 13. Her home, District 12, has been reduced to rubble, and Peeta Mellark (Josh Hutcherson) is now the brainwashed captive of President Snow (Donald Sutherland). At the same time, Katniss also learns about a secret rebellion spreading throughout all of Panem -- a rebellion that will place her at the center of a plot to turn the tables on Snow.',
      isbn: '978-0-439-02351-1',
      genre: 'Adventure',
      price: 9.95
    }
    const book2 = {
      title: 'Mockingjay2',
      author: 'Suzanne Collins',
      imageUrl:
        'https://en.wikipedia.org/wiki/Mockingjay#/media/File:Mockingjay.JPG',
      description:
        'Following her rescue from the devastating Quarter Quell, Katniss (Jennifer Lawrence) awakes in the complex beneath the supposedly destroyed District 13. Her home, District 12, has been reduced to rubble, and Peeta Mellark (Josh Hutcherson) is now the brainwashed captive of President Snow (Donald Sutherland). At the same time, Katniss also learns about a secret rebellion spreading throughout all of Panem -- a rebellion that will place her at the center of a plot to turn the tables on Snow.',
      isbn: '978-0-439-02351-12',
      genre: 'Adventure',
      price: 9.95
    }

    beforeEach(() => {
      return Book.create(book)
    })

    it('GET /api/books', async () => {
      const res = await request(app)
        .get('/api/books')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].isbn).to.be.equal(book.isbn)
    })
    it('POST /api/books', async () => {
      await request(app).post('/api/books', book2)
      const newBook = await Book.findOne({
        where: {
          isbn: book2.isbn
        }
      })
      expect(newBook.isbn).to.be.equal(book2.isbn)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
