export class Customer {
   // _id: string;
   // FirstName: string;
   // LastName: string
    ID: string;
    Name: string;
    Category: string
}

export class Parameter  {
    Name: String;
    GUID: String;
    ParameterGroup: String;
    ParameterType: String;
    UnitType: String;
    Type: String;
    DisplayUnitType: String;
    HasValue: Boolean;
    Id: Number;
    IsReadOnly: Boolean;
    IsShared: Boolean;
    UserModifiable: Boolean;
    ValueDouble: Number; // double
    ValueString: String;
    ValueInteger: Number // double
}

export class PatameterObject {
    Name: String;
    GUID: String;
    ParameterGroup: String;
    ParameterType: String;
    UnitType: String;
    Type: String;
    DisplayUnitType: String;
    HasValue: Boolean;
    Id: Number;
    IsReadOnly: Boolean;
    IsShared: Boolean;
    UserModifiable: Boolean;
    ValueDouble: Number; // double
    ValueString: String;
    ValueInteger: Number // double
}

export class LinkedDetailItems {

}

export class CircuitObject {
    ListPatameterObject: PatameterObject;
    Id: Number
}

export class RootObject {
    ListParameter: Parameter;
    ListCircuitObject: CircuitObject;
    ListLinkedDetailItems: LinkedDetailItems;
    Name: String;
    Id: Number;
    UniqueId: String;
    FamilyName: String;
    FamilyType: String;
    IsTransient: Boolean;
    IsValidObject: Boolean;
    LevelId: Number;
    Pinned: Boolean
}