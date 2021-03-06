import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagedProperty } from '../../../models/managedProperty';
import { SearchSchemaListService } from '../../../services/search-schema-list.service';
import { ManagedPropertyType } from '../../../models/enums/mpTypeEnum';
import { Sortable } from '../../../models/enums/sortableEnum';
import { Refinable } from '../../../models/enums/refinableEnum';
import { Mapping } from '../../../models/mapping';
import { MappingFormComponent } from '../mapping-form/mapping-form.component';

@Component({
  selector: 'app-search-schema-form',
  templateUrl: './search-schema-form.component.html',
  styleUrls: ['./search-schema-form.component.scss']
})
export class SearchSchemaFormComponent implements OnInit {
  item: ManagedProperty = new ManagedProperty();
  types: Array<string> = [
    ManagedPropertyType[0], 
    ManagedPropertyType[1], 
    ManagedPropertyType[2],
    ManagedPropertyType[3],
    ManagedPropertyType[4],
    ManagedPropertyType[5],
    ManagedPropertyType[6]];
  refinables: Array<string> = [Refinable.Shallow, Refinable.Latent, Refinable.Deep]; 
<<<<<<< HEAD
  sortables: Array<string> = [Sortable.None, Sortable.Latent, Sortable.Enabled];
=======
  sortables: Array<string> = [Sortable.Shallow, Sortable.Latent, Sortable.Deep];
>>>>>>> 0c2a2adb8bd934ddd6bac1e78c93cb3e55c7eda6
  required: boolean = false;
  private editedRowIndex: number;
  private editedItem: Mapping;
  
  validationMessage: string;

  @Output() windowState = new EventEmitter<boolean>();

  constructor(private store: SearchSchemaListService) {
  }

  ngOnInit() {
  }

  clear() {
    this.item = null;
    this.item = new ManagedProperty();
    this.validationMessage = null;
  }

  clearMapping() {
    this.item.Mapping = null;
    this.validationMessage = null;
  }

  cancel() {
    this.windowState.emit(false);
  }

  onSubmit(form: any): void{
    if(form.valid) {
      if(this.item.Searchable == undefined || this.item.Searchable == null) { this.item.Searchable = false }
      if(this.item.Queryable == undefined || this.item.Queryable == null) { this.item.Queryable = false }
      if(this.item.Retrievable == undefined || this.item.Retrievable == null) { this.item.Retrievable = false }
      if(this.item.MultiValue == undefined || this.item.MultiValue == null) { this.item.MultiValue = false }
      if(this.item.Safe == undefined || this.item.Safe == null) { this.item.Safe = false }
      if(this.item.Token == undefined || this.item.Token == null) { this.item.Token = false }
      if(this.item.Complete == undefined || this.item.Complete == null) { this.item.Complete = false }
      if(this.item.Order == undefined || this.item.Order == null) { this.item.Order = false }
      if(this.item.OnlyMapping == undefined || this.item.OnlyMapping == null) { this.item.OnlyMapping = false }

      if(this.item.Mapping) {
        this.parseMapping(this.item.Mapping);
      }

      this.addItem(this.item);  
        
      this.windowState.emit(false);
      this.clear();
    } else {
      this.validationMessage = "Enter required data";
    } 
  }

  mappingAdded(ev) {
    this.item.Mapping.push(ev);
  }

  parseMapping(obj: Array<Mapping>) {
    obj.forEach( el => {
      el.CrawledProperties.forEach( cp => {
        this.item.ViewMapping += el.Action.concat(":", el.Category.toString(), ":", cp, "\n");
      })
    })
  }

  onMappingChange(ev) {
    this.required = ev;
  }

  onOrderChange(ev) {
    this.item.Order = ev.target.value;
  }

  addItem(item: ManagedProperty){
    this.store.addItem(item);
  }

  removeItem({dataItem}){
    let index = this.item.Mapping.indexOf(dataItem, 0);
    if (index > -1) {
      this.item.Mapping.splice(index, 1);
    }
  }
}
