export class Action {
    ParameterName?: string;
    Action?: string;
    ParentElementUniqueId?: string;
    Value?: string;
    GUID?: string;
    BUILTIN?: string;
    DocumentHashCode?: string;
    IdToken?: string;
    RevitWsSessionId?: string;
    FromWebapp?: boolean;
    constructor(){
      this.FromWebapp=true;
    }
  };