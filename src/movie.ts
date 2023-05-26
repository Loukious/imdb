/* eslint-disable no-undef */

import * as cheerio from 'cheerio'
import request from 'request-promise-native'

export default class Movie {
  private id: string
  private title?: string
  private originalTitle?: string
  private poster?: string
  private contentRating?: string
  private year?: string
  private runtime?: string
  private description?: string
  private rating?: number
  private ratingCount?: string
  private director?: string
  private metascore?: number
  private writers?: Array<string>
  private cast?: Array<string>

  constructor (id: string) {
    this.id = id
  }

  async get (endpoint: string): Promise<Movie> {
    let r = await request(`${endpoint}/title/${this.id}/`)
    const $ = cheerio.load(r)

    this.title = $('h1[data-testid="hero__pageTitle"]').text().trim()

    let poster = $('div[data-testid="hero-media__poster"] > div.ipc-media__img > img').attr('src')
    if (poster !== undefined) { this.poster = poster.trim() } else { this.poster = undefined }

    this.contentRating = $('h1[data-testid="hero__pageTitle"]').parent().children().last().find('a').last().text().trim()
    this.year = $('h1[data-testid="hero__pageTitle"]').parent().children().last().find('a').first().text().trim()
    this.runtime = $('h1[data-testid="hero__pageTitle"]').parent().children().last().find('li').last().text().trim()
    this.description = $('p[data-testid="plot"] > span[data-testid="plot-l"]').text().trim()
    this.rating = parseInt($('div[data-testid="hero-rating-bar__aggregate-rating__score"] > span').text().split("/")[0])
    this.ratingCount = $('div[data-testid="hero-rating-bar__aggregate-rating__score"]').first().parent().children().last().text()
    this.director = $('li[data-testid="title-pc-principal-credit"] > div > ul > li > a').first().text().trim()
    this.metascore = parseInt($('span[class="score-meta"]').text().trim())

    let writers: Array<string> = [ ]
    let writersElements = $('li[data-testid="title-pc-principal-credit"]:nth-child(2) > div').first().find('ul > li > a')
    writersElements.each(function (this: any) { writers.push($(this).text().trim()) })
    this.writers = writers

    let cast: Array<string> = [ ]
    let castElements = $('a[data-testid="title-cast-item__actor"]')
    castElements.each(function (this: any) { cast.push($(this).text().trim()) })
    this.cast = cast

    return this
  }

  getTitle () {
    return this.title
  }

  getOriginalTitle () {
    return this.originalTitle
  }

  getYear () {
    return this.year
  }

  getContentRating () {
    return this.contentRating
  }

  getRuntime () {
    return this.runtime
  }

  getDescription () {
    return this.description
  }

  getRating () {
    return this.rating
  }

  getRatingCount () {
    return this.ratingCount
  }

  getPoster () {
    return this.poster
  }

  getDirector () {
    return this.director
  }

  getMetascore () {
    return this.metascore
  }

  getWriters () {
    return this.writers
  }

  getCast () {
    return this.cast
  }
}
