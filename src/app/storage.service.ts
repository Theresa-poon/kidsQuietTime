import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//export interface Item {
//  id: number,
//  date: number
//}

const ITEMS_KEY = 'kidsQT2019-items'; //local storage 'my-items' array
const PAGES_KEY = 'kidsQT2019-pages'; //local storage 'my-pages' array

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  currentId_Date: any; //app storage of 'my-items' array (to be deleted)
  currentName_Date: any; //app storage of 'my-items' array
  currentPages: any; //app storage of 'my-pages' array
  v: any; //current book volume

  constructor(private storage: Storage) { }

  // READ local storage 'my-items' array to currentID_Date / currentName_Date field
    // items[0]: last read page (to be deleted) / username
    // items[1]: date of completion of last read page
    // items[2]: month of completion of last read page
    // items[3]: year of completion of last read page
    // items[4]: number of consecutive reading days 
    // items[5]: score 
    // items[6]: fruits purchase array
  getItems(): Promise<any> {
    return this.storage.get(ITEMS_KEY);
  }

  // READ local storage 'my-pages' array to currentPages field
    // pages[i]: last read page of book volume i+1
  getPages(): Promise<any> {
    return this.storage.get(PAGES_KEY);
  }

  // UPDATE
  updateItem(item): Promise<any> {
    return this.storage.set(ITEMS_KEY, item);
  };

  updatePages(pages): Promise<any> {
    return this.storage.set(PAGES_KEY, pages);
  };
  

}
