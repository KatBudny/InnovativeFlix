import { LightningElement, wire, api } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';

export default class ExposeIDToFlow extends LightningElement {

    subscription = null;
    @api seriesid;
    @wire(MessageContext)
    messageContext;


    connectedCallback() {

      this.subscription = subscribe(
          this.messageContext,
          SERIES_MESSAGE,
          (message) => {
              this.handleSeriesPass(message);
          });
    }
    disconnectedCallback() {
      unsubscribe(this.subscription);
      this.subscription = null;
    }
    handleSeriesPass(message) {
        console.log(message);
        this.seriesid = message.seriesid;     
    }
}