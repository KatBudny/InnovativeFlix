import {LightningElement,api,wire,track} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import refresh_message from '@salesforce/messageChannel/SeriesRefresh__c';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
 

export default class SeriesRefreshRequest extends LightningElement {
    
    @wire(MessageContext) messageContext;

    connectedCallback(){
        const message = {action: 'refresh'};
        publish(this.messageContext, refresh_message, message);
        const navigateNextEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(navigateNextEvent);
    }

}