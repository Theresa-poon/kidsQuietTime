import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//export interface Item {
//  id: number,
//  date: number
//}

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  currentId_Date: any;

  constructor(private storage: Storage) { }

  // READ local storage 'my-items' array
    // items[0]: last read page
    // items[1]: date of completion of last read page
    // items[2]: month of completion of last read page
    // items[3]: year of completion of last read page
    // items[4]: number of consecutive reading days 
    // items[5]: score
  getItems(): Promise<any> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  updateItem(item): Promise<any> {
    return this.storage.set(ITEMS_KEY, item);
  };
  

}
