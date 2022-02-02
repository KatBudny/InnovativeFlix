import {LightningElement,api,wire,track} from 'lwc';
import GetSeriesList from '@salesforce/apex/GetSeries.GetSeriesList';
import { publish, MessageContext } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';


export default class seriesList extends LightningElement {
    @track multiple = true;
    @track series;
    @wire(MessageContext) messageContext;
    @wire(GetSeriesList)    
    
    wiredSeries({
        error,
        data
    }) {
        if (data) {
            this.series = data;

        } else if (error) {
            this.error = error;
        }
    }

    handleSeriesclick(event){
        
        console.log(event.target.dataset.name);
        console.log(event.target.dataset.id);
        this.selectedID = event.target.dataset.id;
        this.selectedName = event.target.dataset.name;
        const message = {seriesid: this.selectedID, seriesname: this.selectedName};
        console.log('do spakowania: '+JSON.stringify(message));
        publish(this.messageContext, SERIES_MESSAGE, message);

    }

}