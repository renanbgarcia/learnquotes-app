import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomquoteService {
  constructor(private http: HttpClient) { }

  lang = new BehaviorSubject('en')
  quote = new BehaviorSubject({text: 'carregando', source: ''})

  changeLanguage(lang) {
    this.lang.next(lang)
  }

  requestWord(){
    this.quote.next({ text: 'carregando', source: '' })
    return this.http.get(`https://${this.lang.getValue()}.wikiquote.org/w/api.php?action=query&list=random&&rnlimit=50&rnnamespace=0&format=json&origin=*`)
  }

  getSections(pageid: number) {
    return this.http.get(`https://${this.lang.getValue()}.wikiquote.org/w/api.php?action=parse&pageid=${pageid}&prop=sections&format=json&origin=*`)
  }

  getQuoteBySection(item) {
    console.log(item.parse.pageid)
    let page = item.parse.pageid
    return this.http.get(`https://${this.lang.getValue()}.wikiquote.org/w/api.php?action=parse&pageid=${page}&section=1&format=json&origin=*`)
  }

  extractStringFr(str) {
    let ix1 = str.search('<div class="citation">')
    let ix2 = str.search('</li>')
    let nstr = str.substring(ix1, ix2)
    let ix3 = nstr.lastIndexOf('<div class="ref">')
    let nstr2 = nstr.substring(0, ix3) //texto da quote
    let src = nstr.substr(ix3)
    src = this.cleanTags(src)
    let nstr3 = this.cleanTags(nstr2)
    return ({text:nstr3, source:src})
  }

  useLang(param) {
    if (this.lang.getValue() === 'en') {
      return this.extractStringEn(param)
    } else if (this.lang.getValue() === 'fr') {
      return this.extractStringFr(param)
    } else {
      return this.extractStringEn(param)
    }
  }

  cleanTags(str) {
    let newStr = str.replace(/<ul>|<li>|<\/ul>|<\/li>|<div>|<\/div>|<p>|<\/p>|<b>|<\/b>|<div class="citation">|<div class="ref">|/g, '')
    return newStr
  }

  extractStringEn(str) {
    const ix1 = str.search('<ul><li>')
    const ix2 = str.search(/<\/li>/)

    const nstr = str.substring(ix1, ix2)
    const ix3 = nstr.lastIndexOf('<ul><li>')
    const nstr2 = nstr.substring(0, ix3) //nstr2 é so a quote

    let src = nstr.substr(ix3)
    src = this.cleanTags(src)
    const nstr3 = this.cleanTags(nstr2)
    return ({text:nstr3, source:src})
  }

  testString(str) {
    const reg = new RegExp(/Quote|Citazioni|Citação|Frases|Atribuídas|Citations/)
    return reg.test(str)
  }

  getRes() {
    this.requestWord().subscribe(
      (result) => {
        let hasfound = false
        for (let item of result['query'].random) {
          this.getSections(item.id)
            .subscribe(html => { 
              if (this.testString(html['parse'].sections[0].anchor) && hasfound == false) {
                hasfound = true
                this.getQuoteBySection(html).subscribe((res) => this.quote.next(this.useLang(res['parse'].text['*'])))
              };
            })
        }
      }
    )
  }

}