import ResponseActions = require("../Enumerations/ResponseActions");
import XmlElementNames = require("../Core/XmlElementNames");
import ExchangeService = require("../Core/ExchangeService");
import PropertyBag = require("../Core/PropertyBag");
import EwsServiceXmlReader = require("../Core/EwsServiceXmlReader");
import JsonObject = require("../Core/JsonObject");
import {StringHelper} from "../ExtensionMethods";
import PropertyDefinition = require("./PropertyDefinition");
import EwsServiceXmlWriter = require("../Core/EwsServiceXmlWriter");
class ResponseObjectsPropertyDefinition extends PropertyDefinition {
    IsNullable: boolean;
    Type: any;//System.Type;
    static GetResponseAction(responseActionString: string): ResponseActions {
        var value: ResponseActions = ResponseActions.None;

        switch (responseActionString) {
            case XmlElementNames.AcceptItem:
                value = ResponseActions.Accept;
                break;
            case XmlElementNames.TentativelyAcceptItem:
                value = ResponseActions.TentativelyAccept;
                break;
            case XmlElementNames.DeclineItem:
                value = ResponseActions.Decline;
                break;
            case XmlElementNames.ReplyToItem:
                value = ResponseActions.Reply;
                break;
            case XmlElementNames.ForwardItem:
                value = ResponseActions.Forward;
                break;
            case XmlElementNames.ReplyAllToItem:
                value = ResponseActions.ReplyAll;
                break;
            case XmlElementNames.CancelCalendarItem:
                value = ResponseActions.Cancel;
                break;
            case XmlElementNames.RemoveItem:
                value = ResponseActions.RemoveFromCalendar;
                break;
            case XmlElementNames.SuppressReadReceipt:
                value = ResponseActions.SuppressReadReceipt;
                break;
            case XmlElementNames.PostReplyItem:
                value = ResponseActions.PostReply;
                break;
        }
        return value;
    }
    LoadPropertyValueFromJson(value: any, service: ExchangeService, propertyBag: PropertyBag): any { throw new Error("ResponseObjectsPropertyDefinition.ts - LoadPropertyValueFromJson : Not implemented."); }
    LoadPropertyValueFromXmlJsObject(jsonObject: any, propertyBag: PropertyBag): void {
        debugger; //todo: validate
        var responseActionValue: ResponseActions = ResponseActions.None;

        var jsonResponseActions: any[] = jsonObject;// as object[];
        if (jsonResponseActions != null) {
            for (var jsonResponseAction of jsonResponseActions) {
                if (jsonResponseAction.__type) {
                    var actionString: string = jsonResponseAction.__type;

                    if (!StringHelper.IsNullOrEmpty(actionString)) {
                        responseActionValue |= ResponseObjectsPropertyDefinition.GetResponseAction(actionString);
                    }
                }
            }
        }

        propertyBag._propSet(this, responseActionValue);
    }
    WriteJsonValue(jsonObject: JsonObject, propertyBag: PropertyBag, service: ExchangeService, isUpdateOperation: boolean): void { /* ResponseObjects is a read-only property, no need to implement this.*/ }
    WritePropertyValueToXml(writer: EwsServiceXmlWriter, propertyBag: PropertyBag, isUpdateOperation: boolean): void { /* ResponseObjects is a read-only property, no need to implement this.*/ }
}

export = ResponseObjectsPropertyDefinition;
//module Microsoft.Exchange.WebServices.Data {
//}
//import _export = Microsoft.Exchange.WebServices.Data;
//export = _export;
