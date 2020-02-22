import { SimpleChange, Input, Component, OnInit, NgZone, Inject, NgModule } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],

})


export class CustomerListComponent implements OnInit {
  @Input() userAuthToken: string;
  elementParameters: any[] = [];
  elementTypeParameters: any[] = [];
  systemParameters: any[] = [];
  customerList: any = [];
  revitdata: any = [];
  groups: any = [];
  showEdit = false;
  wrapStrLength = 28;
  panelElementOpenState: boolean = true;
  displayedColumns: string[] = ['name', 'value', 'abbrev'];

  public parashow: boolean = true;
  public paraButtonName: any = 'Parameters Hide'; 

  public circuitshow: boolean = true;
  public circuitbutton: any = 'Circuit Object Hide';

  public linkedshow: boolean = true;
  public linkedbutton: any = 'Linked details Item Hide';


  constructor(
    public customerService: CustomerService,
    private ngZone: NgZone,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if(propName=='userAuthToken'){
        let currentValue = changedProp.currentValue;
        if (currentValue!=null) {
          this._SyncWithWsRevitElementData(currentValue); 
        }
      }
    }
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

  paratoggle() {
    this.parashow = !this.parashow;
    // CHANGE THE PARAMETER NAME OF THE BUTTON.
    if (this.parashow)
      this.paraButtonName = "Parameters Hide";
    else
      this.paraButtonName = "Parameters Show";
  }

  circuitoggle() {
    this.circuitshow = !this.circuitshow;
    // CHANGE THE CIRCUIT NAME OF THE BUTTON.
    if (this.circuitshow)
      this.circuitbutton = "Circuit Object Hide";
    else
      this.circuitbutton = "Circuit Object Show";
  }

  getGroups(parameters) {
    let groups = [];
    parameters.forEach(parameter => {
      let group = this.getGroup(parameter);
      //push group if new
      if (groups.indexOf(group) === -1) {
        groups.push(group);
      }
    });
    return groups;
  }

  getParametersByGroup(parameters, group) {
    let parametersVisible = []
    parameters.forEach(parameter => {
      let paraGroup = this.getGroup(parameter);
      if (paraGroup == group) {
        parametersVisible.push(parameter);
      }
    });
    return parametersVisible;
  }

  linkedtoggle() {
    this.linkedshow = !this.linkedshow;
    // CHANGE THE Linked details Item NAME OF THE BUTTON.
    if (this.linkedshow)
      this.linkedbutton = "Linked details Item Hide";
    else
      this.linkedbutton = "Linked details Item Show";
  }

  isNumber(parameter) {
    let result = this.isDouble(parameter) || (this.isInteger(parameter) && !this.isCheckbox(parameter));
    result = result && !this.isCheckbox(parameter);
    return result;
  }

  isCheckbox(parameter) {
    if (parameter.ParameterType == "YesNo") {
      return true;
    }
    return false;
  }

  isDouble(parameter) {
    if (parameter.Type == "double" || parameter.Type == "doubleIntegral") {
      return true;
    }
    return false;
  }

  isInteger(parameter) {
    if (parameter.Type == "int") {
      return true;
    }
    return false;
  }

  isString(parameter) {
    if (parameter.Type == "string") {
      return true;
    }
    return false;
  }

  isStringShort(parameter) {
    if (parameter.Type == "string" && this.getValue(parameter).length < this.wrapStrLength) {
      return true;
    }
    return false;
  }

  isStringMultipleLines(parameter) {
    if (parameter.Type == "string") {
      let str = this.getValue(parameter);
      var match = /\r|\n/.exec(str);
      if (match) {
        return true;
      }
    }
    return false;
  }

  togglePanel() {
    return "";
  }

  showCheckBox(parameter) {
    return this.isCheckbox(parameter);
  }

  showTextArea(parameter) {
    return this.isString(parameter) && (!this.isStringShort(parameter) || this.isStringMultipleLines(parameter));
  }

  showInputArea(parameter) {
    return this.isNumber(parameter) || (this.isStringShort(parameter) && !this.isStringMultipleLines(parameter));
  }

  getAbbrev(parameter) {
    let abbrev = parameter.ValueAbbrev != null ? parameter.ValueAbbrev : "";
    return abbrev;
  }

  getGroup(parameter) {
    let group = parameter.ParameterGroup != null ? parameter.ParameterGroup : "";
    return group;
  }

  getElementInfo() {
    let elemsInfo: { Name, Category } = { Name: "", Category: "" };
    if (this.revitdata !== undefined && this.revitdata.length > 0) {       //if t=undefined, call tt
      this.revitdata.forEach(element => {
        if (element !== undefined) {
          if (elemsInfo == null) {
            elemsInfo = element;
          } else {
            //For multiple elements should blank values
            elemsInfo.Name = elemsInfo.Name != element.Name ? element.Name : "";
            elemsInfo.Category = elemsInfo.Category != element.Category ? element.Category : "";
          }
          //elems.push(element);
        }
      });
    }
    return elemsInfo;
  }

  //Needs to handle multiple elements
  setElementParameters() {
    //clear this.elementParameters if set
    this.elementParameters = [];
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.ObjectParameters !== undefined) {
          element.ObjectParameters.forEach(parameter => {
            if (this.verifyParameter(parameter)) {
              parameter.RevitWsSessionId = element.RevitWsSessionId;
              this.elementParameters.push(parameter);
            }
          });
        }
      });
    } else {
      //clear array
      this.elementParameters = [];
    }
    //this.elementParameters.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  //Needs to handle multiple elements
  setSystemParameters() {
    //clear this.systemarameters if set
    this.systemParameters = [];
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ElectricalSystems != null) {
          element.ElectricalSystems.forEach(system => {
            if (system != null
              && system.ObjectParameters != null) {
              system.ObjectParameters.forEach(parameter => {
                if (this.verifyParameter(parameter)) {
                  parameter.RevitWsSessionId = element.RevitWsSessionId;
                  this.systemParameters.push(parameter);
                }
              });
            }
          });
        }
      });
    } else {
      //clear array
      this.elementParameters = [];
    }
    //this.systemParameters.sort((a, b) => a.Name.localeCompare(b.Name));

  }

  //Needs to handle multiple elements
  showElectricalSystem() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ElectricalSystems != null) {
          result = element.ElectricalSystems.length > 0 ? true : false;
        }
      });
    }
    return result;
  }

  verifyParameter(parameter) {
    return parameter !== undefined && this.hasValue(parameter)
      && parameter.Visible
  }

  isModifiable(parameter) {
    return parameter !== undefined && !parameter.IsReadOnly
      && (parameter.UserModifiable || parameter.BUILTIN != null) && parameter.Visible
  }

  getValue(parameter, isCheckbox = false): any {
    var value;
    if (parameter != null) {
      switch (parameter.Type) {
        case "double":
          value = parameter.ValueDouble;
          break;
        case "doubleIntegral":
          value = parameter.ValueDoubleIntegral;
          break;
        case "int":
          value = parameter.ValueInteger;
          if (isCheckbox) {
            value = value == 1 ? true : false;
          }
          break;
        case "string":
          value = parameter.ValueString == null ? "" : parameter.ValueString;
          break;
      }
    }
    return value;

  }

  hasValue(parameter): any {
    var value = false;
    if (parameter != null) {
      switch (parameter.Type) {
        case "double":
          value = true;
          break;
        case "doubleIntegral":
          value = true;
          break;
        case "int":
          value = true;
          break;
        case "string":
          value = true;
          break;
      }
    }
    return value;
  }

  getInputType(parameter): any {
    var value;
    if (parameter != null) {
      switch (parameter.Type) {
        case "double":
          value = "number";
          break;
        case "doubleIntegral":
          value = "number";
          break;
        case "int":
          value = "number";
          break;
        case "string":
          value = "text";
          break;
      }
    }
    return value;
  }


  setValue(event: any, element): any {
    var value;
    switch (element.Type) {
      case "double":
        value = event.target.valueAsNumber;
        break;
      case "doubleIntegral":
        value = event.target.valueAsNumber;
        break;
      case "int":
        if (event.target != null) {
          value = event.target.valueAsNumber;
        }
        if (event.checked != null) {
          value = event.checked ? 1 : 0;
        }
        break;
      case "string":
        value = event.target.value == null ? "" : event.target.value;
        break;
    }
    this.customerService
      ._UpdateRevitParameter(element.ParentElementUniqueId, value, element.GUID, element.BUILTIN, element.DocumentHashCode, element.RevitWsSessionId)
      .subscribe(data => {
        this.revitdata = data;
      }, error => {
        console.log(error)
      })

  }

  resetValue(event: any, element): any {
    event.target.value = this.getValue(element);
  }

  // Web Socket method from here

  // load json data using websocket  
  _SyncWithWsRevitElementData(token:string) {
    this.customerService._SyncWithWsRevitElementData(token).subscribe(data => {
      this.revitdata = data;
      this.setElementParameters();
      this.setSystemParameters();
    },
      error => {
        console.log(error)
      })
  }

}