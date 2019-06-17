import { Component, OnInit } from '@angular/core';
import * as lessons from '../../../assets/json/lessons.json';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  audio;
  params;
  lessonAge;
  lessonLang;
  lessonAuthor;
  lessonLesson;
  actualLesson;
  actualLessonText;
  actualLessonAudio;
  actualLessonImage;

  constructor(private route: ActivatedRoute, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.params = this.route.snapshot.params;
    this.lessonAge = this.route.snapshot.params.age;
    this.lessonLang = this.route.snapshot.params.lang;
    this.lessonAuthor = this.route.snapshot.params.author;
    this.lessonLesson = this.route.snapshot.params.lesson;
    this.actualLesson = lessons[this.lessonAge][this.lessonLang][this.lessonAuthor][this.lessonLesson];
    this.actualLessonText = this.sanitizer.bypassSecurityTrustResourceUrl(this.actualLesson.text);
    this.actualLessonAudio = this.sanitizer.bypassSecurityTrustResourceUrl(this.actualLesson.audio);
    this.actualLessonImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.actualLesson.image);
    console.log(this.actualLesson);
  }
}
