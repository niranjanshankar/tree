import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import * as _ from 'lodash';
import * as moment from 'moment';

export interface Data {
  id: number;
  location: string;
  time: number;
  author: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: Data[] = [
    {
      'id': 1,
      'location': 'San Francisco',
      'time': 1552657573,
      'author': 'Happy User',
      'text': 'Proper PDF conversion ensures that every element of your document remains just as you left it.'
    },
    {
      'id': 2,
      'location': 'San Francisco',
      'time': 1552571173,
      'author': 'Happy User',
      'text': 'The modern workplace is increasingly digital, and workflows are constantly evolving. '
    },
    {
      'id': 3,
      'location': 'San Francisco',
      'time': 1552571174,
      'author': 'Happy Developer',
      'text': 'Digital transformation isn’t just a buzzword'
    },
    {
      'id': 4,
      'location': 'Sydney',
      'time': 1552563973,
      'author': 'Happy Developer',
      'text': 'An expectation of digital efficiency has become the norm in our daily lives'
    },
    {
      'id': 5,
      'location': 'Dublin',
      'time': 1553080742,
      'author': 'Happy Manager',
      'text': 'A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need.'
    },
    {
      'id': 6,
      'location': 'Dublin',
      'time': 1553099742,
      'author': 'Happy Manager',
      'text': 'An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time.'
    }
  ];

  constructor() { }

  // send data with a delay to mock the service call
  // step 1: Using lodash & momentJS, group by ISO-week using the timestamp property
  // step 2: remove the time value from the data
  // step 3: return these values as observable with 3 sec delay
  public getData(): Observable<any> {
    const groupedData = _.mapValues(_.groupBy(this.data, function (item) {
      return moment.unix(item.time).startOf('isoWeek');
    }), list => list.map(item => _.omit(item, 'time')));
    return of(groupedData).pipe(delay(3000));
  }

  // group data by location or author based on key
  public groupDataByKey(key: string) {
    const groupedData = _.mapValues(_.groupBy(this.data, key),
      list => list.map(item => _.omit(item, key))
    );
    return groupedData;
  }

  // find the index of the new Data using findIndex and item's ID value
  // then update the data accordingly
  public updateData(newData: Data) {
    const index = this.data.findIndex(item => item.id === newData.id);
    if (newData.location) {
      this.data[index].location = newData.location;
    }
    if (newData.author) {
      this.data[index].author = newData.author;
    }
  }

}
